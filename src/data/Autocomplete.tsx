import React, { useState, useRef, useEffect, useMemo } from "react";

interface Option {
  code: string;
  label: string;
}

interface AutocompleteInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (code: string) => void;
  options: Option[];
  placeholder?: string;
  required?: boolean;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "",
  required = false,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Compute display value from the code value
  const displayValue = useMemo(() => {
    if (value) {
      const option = options.find((opt) => opt.code === value);
      return option ? option.label : "";
    }
    return "";
  }, [value, options]);

  // derive what should be shown in the input (no setState in effects)
  const renderedInputValue = showSuggestions ? inputValue : displayValue;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Compute suggestions (derived via useMemo)
  const suggestions = useMemo(() => {
    if (!showSuggestions) return [];
    const q = inputValue.trim().toLowerCase();
    if (!q) {
      return options.slice(0, 10);
    }
    return options
      .filter(
        (option) =>
          option.label.toLowerCase().includes(q) ||
          option.code.toLowerCase().includes(q),
      )
      .slice(0, 10);
  }, [inputValue, options, showSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowSuggestions(true);
    setActiveIndex(-1);

    // Clear the selected code if user starts typing again
    if (value) {
      onChange("");
    }
  };

  const handleSuggestionClick = (option: Option) => {
    setInputValue(option.label);
    onChange(option.code);
    setShowSuggestions(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === "ArrowDown") {
        setShowSuggestions(true);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSuggestionClick(suggestions[activeIndex]);
      } else if (suggestions.length === 1) {
        handleSuggestionClick(suggestions[0]);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <input
        type="text"
        name={name}
        value={renderedInputValue}
        onChange={handleInputChange}
        onFocus={() => {
          setShowSuggestions(true);
          setActiveIndex(-1);
        }}
        onKeyDown={handleKeyDown}
        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
        placeholder={placeholder}
        required={required}
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={showSuggestions}
        aria-haspopup="listbox"
      />

      {/* Hidden input to store the actual code (include name so native forms pick it up) */}
      <input type="hidden" name={name} value={value} />

      {/* Selected code display */}
      {value && !showSuggestions && (
        <div className="mt-1 text-xs text-green-400">Selected: {value}</div>
      )}

      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          role="listbox"
          aria-label={`${label} suggestions`}
          className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg max-h-48 overflow-y-auto scrollbar-custom sm:max-h-60 md:max-h-80"
        >
          {suggestions.map((option, idx) => (
            <div
              key={option.code}
              role="option"
              aria-selected={idx === activeIndex}
              onMouseDown={(e) => {
                // use onMouseDown to prevent input blur before click
                e.preventDefault();
                handleSuggestionClick(option);
              }}
              className={`px-3 py-2 cursor-pointer border-b border-slate-700 last:border-b-0 transition-colors sm:px-4 sm:py-3 ${
                idx === activeIndex ? "bg-slate-700" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-white text-xs font-medium sm:text-sm truncate">
                    {option.label}
                  </div>
                </div>
                <div className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded flex-shrink-0">
                  {option.code}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No results message */}
      {showSuggestions && inputValue && suggestions.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-3 scrollbar-custom sm:p-4">
          <p className="text-gray-400 text-xs sm:text-sm">
            No matches found for "{inputValue}"
          </p>
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;

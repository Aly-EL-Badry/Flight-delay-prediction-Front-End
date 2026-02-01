import React, { useState } from "react";
import AutocompleteInput from "../data/Autocomplete";
import { AIRLINES } from "../data/airlinesData";
import { AIRPORTS } from "../data/airportsData";

function timeToMinutes(timeStr: string): number {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}

// function estimateDistance(origin: string, destination: string): number {
//   // TODO: Add real distance calculation or lookup table
//   // For now, return default
//   return 1000;
// }

interface FormData {
  // Airport codes
  originAirport: string;
  destinationAirport: string;

  // Airline
  airline: string;

  // Date fields
  year: string;
  month: string;
  day: string;
  dayOfWeek: string;

  // Time and delay
  departureDelay: string;
  scheduledTime: string;

  // Distance
  distance: string;
}

interface PredictionResult {
  prediction: string;
  error?: string;
}

const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    originAirport: "",
    destinationAirport: "",
    airline: "",
    year: "2026",
    month: "",
    day: "",
    dayOfWeek: "",
    departureDelay: "0",
    scheduledTime: "",
    distance: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setPrediction(null);

    try {
      // Convert form data to API format
      const apiPayload = {
        ORIGIN_AIRPORT: formData.originAirport.toUpperCase(),
        DESTINATION_AIRPORT: formData.destinationAirport.toUpperCase(),
        AIRLINE: formData.airline.toUpperCase(),
        YEAR: parseInt(formData.year),
        MONTH: parseInt(formData.month),
        DAY: parseInt(formData.day),
        DAY_OF_WEEK: parseInt(formData.dayOfWeek),
        DEPARTURE_DELAY: parseInt(formData.departureDelay),
        SCHEDULED_TIME: timeToMinutes(formData.scheduledTime),
        DISTANCE: parseInt(formData.distance),
      };

      console.log("Sending to API:", apiPayload);

      // TODO: Replace with your actual API URL
      const API_URL = "https://flight-delay-prediction-system.fly.dev/predict";

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${response.statusText}`,
        );
      }

      const result = await response.json();
      console.log("API response:", result);

      // Parse response (customize based on your API)
      setPrediction({
        prediction: String(result.predicted_arrival_delay_minutes ?? "Unknown"),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to get prediction");
      console.error("Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrediction = (p: PredictionResult | null) => {
    if (!p) return "";
    const num = Number(p.prediction);
    if (!Number.isFinite(num)) return String(p.prediction);
    return num < 0
      ? `${Math.abs(num).toFixed(2)} minutes early`
      : `${num.toFixed(2)} minutes delayed`;
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Airport Information */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
            Airport Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <AutocompleteInput
                label="Origin Airport"
                name="originAirport"
                value={formData.originAirport}
                onChange={(code) =>
                  setFormData({ ...formData, originAirport: code })
                }
                options={AIRPORTS}
                placeholder="Type to search airports..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                3-letter airport code
              </p>
            </div>

            <div>
              <AutocompleteInput
                label="Destination Airport"
                name="destinationAirport"
                value={formData.destinationAirport}
                onChange={(code) =>
                  setFormData({ ...formData, destinationAirport: code })
                }
                options={AIRPORTS}
                placeholder="Type to search airports..."
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                3-letter airport code
              </p>
            </div>
          </div>
        </div>

        {/* Airline Information */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
            Airline Information
          </h3>
          <div>
            <AutocompleteInput
              label="Airline"
              name="airline"
              value={formData.airline}
              onChange={(code) => setFormData({ ...formData, airline: code })}
              options={AIRLINES}
              placeholder="Type to search airlines..."
              required
            />
            <p className="text-xs text-gray-500 mt-1">2-letter airline code</p>
          </div>
        </div>

        {/* Date and Time Information */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
            Date & Time Information
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="2026"
                min="2015"
                max="2030"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Month *
              </label>
              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select Month</option>
                <option value="1">January (1)</option>
                <option value="2">February (2)</option>
                <option value="3">March (3)</option>
                <option value="4">April (4)</option>
                <option value="5">May (5)</option>
                <option value="6">June (6)</option>
                <option value="7">July (7)</option>
                <option value="8">August (8)</option>
                <option value="9">September (9)</option>
                <option value="10">October (10)</option>
                <option value="11">November (11)</option>
                <option value="12">December (12)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Day *
              </label>
              <input
                type="number"
                name="day"
                value={formData.day}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="15"
                min="1"
                max="31"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Day of Week *
              </label>
              <select
                name="dayOfWeek"
                value={formData.dayOfWeek}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              >
                <option value="">Select Day</option>
                <option value="0">Monday (0)</option>
                <option value="1">Tuesday (1)</option>
                <option value="2">Wednesday (2)</option>
                <option value="3">Thursday (3)</option>
                <option value="4">Friday (4)</option>
                <option value="5">Saturday (5)</option>
                <option value="6">Sunday (6)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                0 = Monday, 6 = Sunday
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scheduled Time *
              </label>
              <input
                type="time"
                name="scheduledTime"
                value={formData.scheduledTime}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="14:30"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Departure Delay
              </label>
              <input
                type="number"
                name="departureDelay"
                value={formData.departureDelay}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="0"
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Usually 0 for predictions
              </p>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4 border-b border-slate-700 pb-2">
            Flight Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Distance (miles) *
              </label>
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="2475"
                min="0"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Flight distance in miles
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/30"
        >
          {isLoading ? "Predicting..." : "Predict Flight Delay"}
        </button>
      </form>

      {/* Results Section */}
      <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">
          Prediction Results
        </h3>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-blue-400">Analyzing flight data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
            <p className="text-red-300 font-semibold mb-2">Error</p>
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Success State */}
        {prediction && !isLoading && !error && (
          <div className="space-y-3">
            <div className="p-4 bg-slate-800 rounded-lg">
              <p className="text-white mb-2">
                <span className="font-semibold">Route:</span>{" "}
                {formData.originAirport.toUpperCase()} →{" "}
                {formData.destinationAirport.toUpperCase()}
              </p>
              <p className="text-white mb-2">
                <span className="font-semibold">Airline:</span>{" "}
                {formData.airline.toUpperCase()}
              </p>
              <p className="text-white">
                <span className="font-semibold">Date:</span> {formData.year}-
                {formData.month}-{formData.day}
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg border-2 border-blue-500/30">
              <p className="text-white mb-3 text-center">
                <span className="text-sm font-semibold text-gray-400 block mb-2">
                  PREDICTION
                </span>
                <span className="text-3xl font-bold text-purple-400 block mb-1">
                  {formatPrediction(prediction)}
                </span>
              </p>
              {/* <div className="border-t border-slate-600 pt-3 mt-3">
                <p className="text-white text-center">
                  <span className="font-semibold">Confidence:</span>{" "}
                  <span className="text-blue-400 text-xl font-bold">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </span>
                </p>
              </div> */}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!prediction && !isLoading && !error && (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm">
              Fill in all the flight details above and click "Predict Flight
              Delay"
            </p>
            <p className="text-gray-500 text-xs mt-2">
              All fields marked with * are required
            </p>
          </div>
        )}
      </div>

      {/* Helper Info Box */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <p className="text-blue-300 text-sm font-semibold mb-2">
          💡 Quick Tips:
        </p>
        <ul className="text-blue-200 text-xs space-y-1">
          <li>• Airport codes are 3 letters (JFK, LAX, ORD)</li>
          <li>• Airline codes are 2 letters (DL, UA, AA)</li>
          <li>• Scheduled time in minutes: 6:00 AM = 360, 2:30 PM = 870</li>
          <li>• Day of week: 0 = Monday, 6 = Sunday</li>
        </ul>
      </div>
    </div>
  );
};

export default PredictionForm;

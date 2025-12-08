import React, { useState } from "react";
import type { FormData } from "../types";

// ========== PREDICTION FORM COMPONENT ==========
const PredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    airline: "",
    flightNumber: "",
    origin: "",
    destination: "",
    date: "",
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Prediction feature will be connected to your Django API soon!");
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 shadow-2xl">
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Airline
            </label>
            <input
              type="text"
              name="airline"
              value={formData.airline}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., Delta, United"
              required
            />
          </div>

          <div id="FlightNumber">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Flight Number
            </label>
            <input
              type="text"
              name="flightNumber"
              value={formData.flightNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., DL123"
              required
            />
          </div>

          <div id="OriginAirport">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Origin Airport
            </label>
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., JFK, LAX"
              required
            />
          </div>

          <div id="DestinationAirport">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Destination Airport
            </label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g., ORD, SFO"
              required
            />
          </div>

          <div id="DepartureDate">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Departure Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>

          <div id="DepartureTime">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Departure Time
            </label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              required
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-[1.02] shadow-lg shadow-blue-500/30"
        >
          Predict Delay
        </button>
      </div>

      <div className="mt-8 p-6 bg-slate-900/50 rounded-lg border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-2">
          Prediction Results
        </h3>
        <p className="text-gray-400 text-sm">
          Results will appear here once you submit the form and connect to the
          API.
        </p>
      </div>
    </div>
  );
};

export default PredictionForm;

// import React from "react";
// import type { PageProps } from "../types";
// import { Link } from "react-router-dom";

// CTA is the design term for an element that encourages people to try our app

import React from "react";
import { useNavigate } from "react-router-dom";

const CTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Predict Your Flight?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of travelers who plan smarter with FlightPredict.
        </p>
        <button
          onClick={() => navigate("/predict")}
          className="px-10 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50"
        >
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default CTA;

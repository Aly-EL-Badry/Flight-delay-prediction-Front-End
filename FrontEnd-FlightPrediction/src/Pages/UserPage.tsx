import React from "react";
import PredictionForm from "../Components/PredictionForm";

const UserPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Predict Flight Delay
          </h1>
          <p className="text-xl text-gray-300">
            Enter your flight details to get AI-powered delay predictions
          </p>
        </div>
        <PredictionForm />
      </div>
    </div>
  );
};

export default UserPage;

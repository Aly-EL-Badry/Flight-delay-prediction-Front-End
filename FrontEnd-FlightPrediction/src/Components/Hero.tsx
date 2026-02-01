// import React from "react";
// import { Link } from "react-router-dom";
// import type { PageProps } from "../types";

// interface PageProps {
//   setCurrentPage: (page: string) => void;
// }

// const Hero = ({ setCurrentPage }: PageProps) => {
//   return <section>...</section>
// }

// we use this prop to change the current page
// but we will change that to a proper routing
import React from "react";

// what is that
// what is the difference between link and navigate
import { useNavigate } from "react-router-dom";

const Hero: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section
      className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url('/src/assets/flight-background1.jpg')",
      }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block mb-4 px-4 py-2 bg-blue-500/20 rounded-full border border-blue-500/30">
          <span className="text-blue-400 text-sm font-medium">
            AI-Powered Flight Delay Predictions
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className=" bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Know Your Flight Delays
          </span>
          <br />
          <span className=" bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            Before They Happen
          </span>
        </h1>
        <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
          Our advanced AI model predicts flight delays with high accuracy,
          helping you plan your journey better and avoid unexpected surprises.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/predict")}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-all transform  shadow-lg shadow-blue-500/50"
          >
            Try Prediction Now
          </button>
          <button className="px-8 py-4 bg-slate-800 text-white text-lg font-semibold rounded-lg hover:bg-slate-700 transition-all border border-slate-700">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

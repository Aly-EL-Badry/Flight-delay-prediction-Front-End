import React from "react";
import { Clock, TrendingUp, Plane } from "lucide-react";
import type { Feature } from "../types"; // you have to import it as a type

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      title: "Real-Time Predictions",
      description:
        "Get instant delay predictions based on current conditions and historical data patterns.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "High Accuracy",
      description: "Our AI model is trained to provide reliable predictions.",
    },
    {
      icon: <Plane className="w-8 h-8 text-blue-500" />,
      title: "Easy to Use",
      description:
        "Simply enter your flight details and get predictions in seconds. No complicated setup required.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Why Use FlightPredict?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-blue-500 transition-all"
            >
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

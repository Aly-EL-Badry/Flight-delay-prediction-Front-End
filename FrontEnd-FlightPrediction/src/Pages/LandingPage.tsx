import React from "react";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import CTA from "../Components/CTA";
// import type { PageProps } from "../types";
// import { Link, useLocation } from "react-router-dom";

const LandingPage: React.FC = () => {
//   const location = useLocation();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
};

export default LandingPage;

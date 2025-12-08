import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import LandingPage from "./Pages/LandingPage";
import UserPage from "./Pages/UserPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={<UserPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../Hooks/useAuth";

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Plane className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">FlightPredict</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              to="/predict"
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/predict"
                  ? "text-blue-500"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Predict Flight
            </Link>

            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2 text-gray-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === "/" ? "text-blue-500" : "text-gray-300"
                }`}
              >
                Home
              </Link>
              <Link
                to="/predict"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left px-4 py-2 text-sm font-medium transition-colors ${
                  location.pathname === "/predict"
                    ? "text-blue-500"
                    : "text-gray-300"
                }`}
              >
                Predict Flight
              </Link>

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 text-gray-300 text-sm">
                    Logged in as: {user?.username}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="mx-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

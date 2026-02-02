import { useContext } from "react";
import { AuthContext } from "../context/AuthContextType";
import type { AuthContextType } from "../context/AuthContextType";

/**
 * Custom hook to access authentication context
 * Must be used within AuthProvider
 */

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};

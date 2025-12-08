// ========== COMPONENT PROPS ==========
export interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export interface PageProps {
  setCurrentPage: (page: string) => void;
}

// ========== FORM DATA ==========
export interface FormData {
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
}

// ========== PREDICTION API RESPONSE ==========
// This is what you'll get back from Django API
export interface PredictionResponse {
  delayMinutes: number;
  probability: number;
  factors: string[];
  timestamp: string;
}

// ========== USER DATA ==========
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// ========== FEATURE ==========
export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// ========== API ERROR ==========
export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

// // ========== TYPE DEFINITIONS ==========
// export interface HeaderProps {
//   currentPage: string;
//   setCurrentPage: (page: string) => void;
// }

// export interface PageProps {
//   setCurrentPage: (page: string) => void;
// }

// export interface FormData {
//   airline: string;
//   flightNumber: string;
//   origin: string;
//   destination: string;
//   date: string;
//   time: string;
// }

// export interface Feature {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }

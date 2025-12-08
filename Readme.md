# ✈️ Flight Delay Predictor

An AI-powered web application that predicts flight delays using machine learning. Built with React (TypeScript) frontend and Django backend.

## 🚀 Project Overview

This application helps travelers predict potential flight delays before they happen, allowing for better journey planning and avoiding unexpected surprises.

### Features

- 🎯 AI-powered flight delay predictions
- 📊 Real-time prediction based on historical data
- 💻 Modern, responsive UI built with React & TypeScript
- 🎨 Sleek design using Tailwind CSS
- 🔐 User authentication system (coming soon)
- 📱 Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Icon library

### Backend (Coming Soon)

- **Django** - Python web framework
- **Django REST Framework** - API development
- **FastAPI** - ML model serving (from team)
- **PostgreSQL** - Database

## 📁 Project Structure

```
flight-predictor/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── PredictionForm.tsx
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.tsx
│   │   │   └── UserPage.tsx
│   │   ├── types/           # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                 # Django backend (coming soon)
    ├── manage.py
    ├── users/              # User module
    ├── predictions/        # Flight prediction logic
    └── suggestions/        # Suggestions module
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Python 3.10+ (for backend, when ready)

### Frontend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/flight-predictor.git
   cd flight-predictor/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Pages

### Landing Page (`/`)

- Hero section with call-to-action
- Feature showcase
- Benefits overview

### Prediction Page (`/predict`)

- Flight information form
- AI prediction results
- Delay probability display

## 🔮 Upcoming Features

- [ ] User authentication (login/signup)
- [ ] Flight search history
- [ ] Email notifications for delays
- [ ] Alternative flight suggestions
- [ ] Integration with Django backend
- [ ] Connection to ML prediction model
- [ ] User dashboard
- [ ] Saved flight preferences

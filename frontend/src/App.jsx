// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoalProvider } from "./context/GoalContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";
import "./App.css";

// Dashboard Subpages
import Transactions from "./pages/Transactions.jsx";
import Budget from "./pages/Budget.jsx";
import Goals from "./pages/Goals.jsx";
import CreateGoal from "./pages/CreateGoal.jsx";
import Investments from "./pages/Investments.jsx";
import Predictions from "./pages/Predictions.jsx";
import Recommendations from "./pages/Recommendations.jsx";
import MarketAnalysis from "./pages/MarketAnalysis.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={`app-container ${sidebarCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar collapsed={sidebarCollapsed} />
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/dashboard/transactions" element={<Transactions />} />
            <Route path="/dashboard/budget" element={<Budget />} />
            <Route path="/dashboard/goals" element={<Goals />} />
            <Route path="/dashboard/create-goal" element={<CreateGoal />} />
            <Route path="/dashboard/investments" element={<Investments />} />
            <Route path="/dashboard/predictions" element={<Predictions />} />
            <Route path="/dashboard/recommendations" element={<Recommendations />} />
            <Route path="/dashboard/market-analysis" element={<MarketAnalysis />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const RootApp = () => (
  <AuthProvider>
    <GoalProvider>
      <Router>
        <App />
      </Router>
    </GoalProvider>
  </AuthProvider>
);

export default RootApp;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Intelligent Financial Planning with AI</h1>
          <p className="hero-subtitle">
            Plan smarter, save more, and reach your financial goals with our AI-powered financial advisor.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Log In</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Financial Planning Illustration</div>
        </div>
      </header>
    </div>
  );
};

export default Home;

// Navbar.jsx - Top navigation component

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css'; // Better to use a separate CSS file

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="menu-icon">☰</span>
          </button>
          <Link to="/" className="navbar-brand">
            FinAI Advisor
          </Link>
        </div>
        
        <div className="navbar-right">
          {currentUser ? (
            <>
              <div className="navbar-notifications">
                <button className="icon-button">
                  <span className="material-icons">notifications</span>
                  <span className="notification-badge">3</span>
                </button>
              </div>
              
              <div className="user-dropdown">
                <button className="user-dropdown-toggle" onClick={toggleDropdown}>
                  <div className="avatar">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span className="user-name">{currentUser.name || 'User'}</span>
                  <span className="dropdown-icon">▼</span>
                </button>
                
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <span className="material-icons">person</span>
                      Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <span className="material-icons">settings</span>
                      Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={logout} className="dropdown-item">
                      <span className="material-icons">logout</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline" >Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


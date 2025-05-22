import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth, useLogout } from '../context/AuthContext';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <span className="menu-icon">☰</span>
          </button>
          <Link to="/" className="navbar-brand">Finova</Link>
        </div>
        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <div className="navbar-notifications">
                <button className="icon-button">
                  <span className="material-icons">Notifications</span>
                  <span className="notification-badge">7</span>
                </button>
              </div>
              <div className="user-dropdown">
                <button className="user-dropdown-toggle" onClick={toggleDropdown}>
                  <div className="avatar">{user?.name?.charAt(0).toUpperCase() || '?'}</div>
                  <span className="user-name">{user?.name || 'User'}</span>
                  <span className="dropdown-icon">▼</span>
                </button>
                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">
                      <span className="material-icons"></span> Profile
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <span className="material-icons"></span> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button onClick={logout} className="dropdown-item">
                      <span className="material-icons"></span> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

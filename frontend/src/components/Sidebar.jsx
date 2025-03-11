// Sidebar.jsx - Sidebar navigation component

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ collapsed }) => {
  const { currentUser } = useAuth();
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  
  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };
  
  // Menu items
  const menuItems = [
    // {
    //   title: 'Dashboard',
    //   // icon: 'dashboard',
    //   path: '/dashboard'
    // },
    {
      title: 'Financial Overview',
      // icon: 'account_balance',
      path: '/dashboard/overview'
    },
    {
      title: 'Transactions',
      // icon: 'receipt_long',
      path: '/dashboard/transactions'
    },
    {
      title: 'Budget Planner',
      // icon: 'savings',
      path: '/dashboard/budget'
    },
    {
      title: 'Goals',
      // icon: 'flag',
      submenu: [
        { title: 'My Goals', path: '/dashboard/goals' },
        { title: 'Create Goal', path: '/dashboard/goals/create' }
      ]
    },
    {
      title: 'Investments',
      // icon: 'trending_up',
      path: '/dashboard/investments'
    },
    {
      title: 'AI Insights',
      // icon: 'insights',
      submenu: [
        { title: 'Predictions', path: '/dashboard/insights/predictions' },
        { title: 'Recommendations', path: '/dashboard/insights/recommendations' },
        { title: 'Market Analysis', path: '/dashboard/insights/market' }
      ]
    },
    {
      title: 'Reports',
      // icon: 'bar_chart',
      path: '/dashboard/reports'
    },
    {
      title: 'Settings',
      // icon: 'settings',
      path: '/dashboard/settings'
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {/* <div className="logo">
          {collapsed ? 'FA' : 'FinAI Advisor'}
        </div> */}
      </div>
      
      {currentUser && (
        <div className="user-info">
          <div className="user-avatar">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : '?'}
          </div>
          {!collapsed && (
            <div className="user-details">
              <div className="user-name">{currentUser.name || 'User'}</div>
              <div className="user-email">{currentUser.email}</div>
            </div>
          )}
        </div>
      )}
      
      <nav className="sidebar-nav">
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li key={index} className="menu-item">
              {item.submenu ? (
                <>
                  <button 
                    className={`menu-link ${activeSubmenu === index ? 'active' : ''}`}
                    onClick={() => toggleSubmenu(index)}
                  >
                    <span className="material-icons">{item.icon}</span>
                    {!collapsed && <span className="menu-text">{item.title}</span>}
                    {!collapsed && (
                      <span className={`submenu-icon ${activeSubmenu === index ? 'open' : ''}`}>
                        ▼
                      </span>
                    )}
                  </button>
                  {(activeSubmenu === index || !collapsed) && (
                    <ul className={`submenu ${activeSubmenu === index ? 'active' : ''}`}>
                      {item.submenu.map((subitem, subindex) => (
                        <li key={subindex} className="submenu-item">
                          <NavLink 
                            to={subitem.path}
                            className={({ isActive }) => `submenu-link ${isActive ? 'active' : ''}`}
                          >
                            {!collapsed && subitem.title}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <NavLink 
                  to={item.path} 
                  className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`}
                >
                  <span className="material-icons">{item.icon}</span>
                  {!collapsed && <span className="menu-text">{item.title}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* <div className="sidebar-footer">
        {!collapsed && (
          <div className="upgrade-banner">
            <div className="upgrade-text">Upgrade to Pro</div>
            <button className="upgrade-button">Upgrade</button>
          </div>
        )}
      </div> */}
    </aside>
  );
};

// Additional CSS for the Sidebar component
// Sidebar.jsx - Continued from previous code

// Additional CSS for the Sidebar component
const styles = `
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: var(--background-dark);
  color: white;
  z-index: 200;
  transition: width var(--transition-speed);
  display: flex;
  flex-direction: column;
}

.sidebar.collapsed {
  width: 0px;
  overflow: visible;
}

.sidebar-header {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-light);
}

.user-info {
  padding: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  flex-shrink: 0;
}

.user-details {
  margin-left: 12px;
  overflow: hidden;
}

.user-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-email {
  font-size: 0.8rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px 0;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  margin-bottom: 5px;
}

.menu-link {
  display: flex;
  align-items: center;
  gap:10px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 0;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  cursor: pointer;
}

.menu-link:hover, .menu-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.menu-link.active {
  border-left: 3px solid var(--primary-light);
}

.material-icons {
  margin-right: 12px;
  font-size: 20px;
}

.sidebar.collapsed .material-icons {
  margin-right: 0;
}

.menu-text {
  flex-grow: 1;
}

.submenu-icon {
  font-size: 0.7rem;
  transition: transform 0.3s;
}

.submenu-icon.open {
  transform: rotate(180deg);
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s;
  opacity: 0;
  display:none;
}

.submenu.active {
  max-height: 500px;
  opacity: 1;
  display:block;
}

.submenu-item {
  padding-left: 20px;
}

.submenu-link {
  display: block;
  padding: 10px 10px 10px 32px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 0;
}

.submenu-link:hover, .submenu-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.upgrade-banner {
  background: linear-gradient(45deg, var(--primary-dark), var(--primary-color));
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.upgrade-text {
  font-weight: 500;
  margin-bottom: 10px;
}

.upgrade-button {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.upgrade-button:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    width: 260px;
  }
  
  .sidebar.collapsed {
    width: 260px;
    transform: translateX(0);
  }
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Sidebar; 
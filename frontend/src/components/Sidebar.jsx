import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ collapsed }) => {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <ul>
        <li><Link to="/dashboard/overview">Overview</Link></li>
        <li><Link to="/dashboard/transactions">Transactions</Link></li>
        <li><Link to="/dashboard/budget">Budget</Link></li>
        <li><Link to="/dashboard/goals">Goals</Link></li>
        <li><Link to="/dashboard/create-goal">Create Goal</Link></li>  {/* Add this line */}
        <li><Link to="/dashboard/investments">Investments</Link></li>
        <li><Link to="/dashboard/predictions">Predictions</Link></li>
        <li><Link to="/dashboard/recommendations">Recommendations</Link></li>
        <li><Link to="/dashboard/market-analysis">Market Analysis</Link></li>
        {/* <li><Link to="/dashboard/reports">Reports</Link></li> */}
        <li><Link to="/dashboard/settings">Settings</Link></li>
      </ul>
    </div>
  );
};




export default Sidebar; 
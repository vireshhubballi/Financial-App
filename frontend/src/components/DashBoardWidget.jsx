// Dashboard.jsx - Main dashboard component with routing for dashboard sections

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { financialService } from '../utils/api';

// Dashboard sections (these would be separate components in a full app)
const Overview = () => {
  const [data, setData] = useState({
    balance: 0,
    income: 0,
    expenses: 0,
    savings: 0,
    investmentValue: 0,
    growthRate: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData({
        balance: 24650.75,
        income: 5820.00,
        expenses: 3245.50,
        savings: 2574.50,
        investmentValue: 15280.25,
        growthRate: 8.5
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <div className="loading">Loading financial data...</div>;
  }

  return (
    <div className="dashboard-overview">
      <h1 className="page-title">Financial Overview</h1>
      
      <div className="grid grid-col-3">
        <div className="card stats-card">
          <div className="stats-icon">💰</div>
          <div className="stats-value">₹ {data.balance.toLocaleString()}</div>
          <div className="stats-label">Total Balance</div>
        </div>
        
        <div className="card stats-card">
          <div className="stats-icon">📈</div>
          <div className="stats-value">₹ {data.income.toLocaleString()}</div>
          <div className="stats-label">Monthly Income</div>
        </div>
        
        <div className="card stats-card">
          <div className="stats-icon">📉</div>
          <div className="stats-value">₹ {data.expenses.toLocaleString()}</div>
          <div className="stats-label">Monthly Expenses</div>
        </div>
      </div>
      
      <div className="grid grid-col-2">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Income vs Expenses</h2>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">Income/Expense Chart</div>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Savings Growth</h2>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">Savings Growth Chart</div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Investment Performance</h2>
        </div>
        <div className="grid grid-col-2">
          <div className="investment-stats">
            <div className="investment-value">
              <span className="label">Total Value</span>
              <span className="value">${data.investmentValue.toLocaleString()}</span>
            </div>
            <div className="investment-growth">
              <span className="label">Annual Growth</span>
              <span className="value growth-positive">+{data.growthRate}%</span>
            </div>
          </div>
          <div className="chart-container">
            <div className="chart-placeholder">Investment Performance Chart</div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">AI-Powered Insights</h2>
        </div>
        <div className="ai-insights">
          <div className="insight-card">
            <div className="insight-icon">💡</div>
            <div className="insight-content">
              <h3>Spending Pattern</h3>
              <p>Your restaurant spending increased by 15% this month. Consider setting a budget for dining out.</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">🎯</div>
            <div className="insight-content">
              <h3>Goal Progress</h3>
              <p>You're on track to reach your vacation savings goal by July 2023.</p>
            </div>
          </div>
          <div className="insight-card">
            <div className="insight-icon">📊</div>
            <div className="insight-content">
              <h3>Investment Opportunity</h3>
              <p>Based on your risk profile, consider increasing your allocation to technology ETFs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Dashboard component with routing
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/transactions" element={<DashboardTransactions />} />
        <Route path="/budget" element={<DashboardBudget />} />
        <Route path="/goals" element={<DashboardGoals />} />
        <Route path="/investments" element={<DashboardInvestments />} />
        <Route path="/insights/*" element={<DashboardInsights />} />
        <Route path="/reports" element={<DashboardReports />} />
        <Route path="/settings" element={<DashboardSettings />} />
      </Routes>
    </div>
  );
};

// Placeholder components for dashboard sections
const DashboardTransactions = () => <div className="dashboard-section"><h1>Transactions</h1></div>;
const DashboardBudget = () => <div className="dashboard-section"><h1>Budget Planner</h1></div>;
const DashboardGoals = () => <div className="dashboard-section"><h1>Financial Goals</h1></div>;
const DashboardInvestments = () => <div className="dashboard-section"><h1>Investments</h1></div>;
const DashboardInsights = () => {
  return (
    <div className="dashboard-section">
      <h1>AI Insights</h1>
      <Routes>
        <Route path="predictions" element={<h2>Predictions</h2>} />
        <Route path="recommendations" element={<h2>Recommendations</h2>} />
        <Route path="market" element={<h2>Market Analysis</h2>} />
      </Routes>
    </div>
  );
};
const DashboardReports = () => <div className="dashboard-section"><h1>Reports</h1></div>;
const DashboardSettings = () => <div className="dashboard-section"><h1>Settings</h1></div>;

// Additional CSS for the Dashboard
const styles = `
.dashboard-container {
  padding-top: 64px;
}

.page-title {
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  font-size: 1.2rem;
  color: var(--text-secondary);
}
 
.stats-card {
  text-align: center;
  padding: 1.5rem;
  border-radius:1rem;
  box-shadow:  4px 0px rgba(0, 0, 0, 0.1);
  
}

.stats-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.stats-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
}

.stats-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.chart-container {
  height: 300px;
  width: 100%;
  position: relative;
}

.chart-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba(25, 118, 210, 0.05);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
}

.investment-stats {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.investment-value, .investment-growth {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.investment-growth {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: var(--text-secondary);
}

.value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.growth-positive {
  color: var(--success-color);
}

.growth-negative {
  color: var(--danger-color);
}

.ai-insights {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 70px;
  padding: 1rem 0;

}

.insight-card {
  display: flex;
  align-items: flex-start;
  padding: 1.5rem;
  background-color: rgba(25, 118, 210, 0.03);
  border-radius: var(--border-radius);
  border-left: 3px solid var(--primary-color);
}

.insight-icon {
  font-size: 1.5rem;
  margin-right: 1rem;
}

.insight-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.insight-content p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

@media (max-width: 992px) {
  .investment-stats {
    padding: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard-container {
    padding-top: 64px;
  }
  
  .insight-card {
    padding: 1rem;
  }
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Dashboard;
// src/pages/Dashboard.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext, useLogout } from '../context/AuthContext.jsx';
import DashboardWidget from '../components/DashBoardWidget';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  const [financialData, setFinancialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const mockData = {
          balance: 25000,
          expenses: 1200,
          income: 3500,
          recentTransactions: [
            { id: 1, description: 'Salary', amount: 3500, type: 'income', date: '2025-03-01' },
            { id: 2, description: 'Rent', amount: -800, type: 'expense', date: '2025-03-02' },
            { id: 3, description: 'Groceries', amount: -120, type: 'expense', date: '2025-03-05' }
          ]
        };
        setFinancialData(mockData);
      } catch (err) {
        console.error('Error fetching financial data:', err);
        setError('Failed to load financial data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && !loading) {
      fetchFinancialData();
    }
  }, [isAuthenticated, loading, user]);

  if (loading || isLoading) {
    return <div className="loading">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}!</h1>

        
      </div>

      {financialData && (
        <DashboardWidget 
          balance={financialData.balance}
          expenses={financialData.expenses}
          income={financialData.income}
          recentTransactions={financialData.recentTransactions}
        />
      )}
    </div>
  );
};

export default Dashboard;

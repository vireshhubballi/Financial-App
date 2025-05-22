import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './DashboardWidget.css'; // Import your CSS file for styling
import ChartComponent from '../components/ChartComponent'; // Import the ChartComponent

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

  // Chart data for Income vs Expenses
  const incomeVsExpensesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Example months
    datasets: [
      {
        label: 'Income',
        data: [5000, 5200, 5500, 5700, 6000, 6200], // Replace with dynamic data
        borderColor: 'rgba(0, 150, 136, 1)',
        backgroundColor: 'rgba(0, 150, 136, 0.2)',
        fill: true,
      },
      {
        label: 'Expenses',
        data: [3000, 3100, 3200, 3300, 3400, 3500], // Replace with dynamic data
        borderColor: 'rgba(244, 67, 54, 1)',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
      }
    ]
  };

  // Chart options (responsive)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹ ${tooltipItem.raw.toLocaleString()}`, // Formatting currency
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

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
            <ChartComponent data={incomeVsExpensesData} options={chartOptions} />
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

export default Overview;

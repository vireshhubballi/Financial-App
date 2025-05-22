// src/pages/dashboard/Transactions.jsx
import React, { useEffect, useState } from "react";
import { financialService } from "../utils/financialService";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch transactions from the financial service
    financialService.getTransactions()
      .then((res) => {
        console.log('API Response:', res); // Log the full response
        if (Array.isArray(res.data)) {
          setTransactions(res.data);
        } else {
          setTransactions([]);  // Fallback to an empty array if not an array
          setError('Received data is not in expected format.');
        }
      })
      .catch((err) => {
        console.error("Failed to fetch transactions:", err);
        setError('Failed to load transactions. Please try again later.');
      });
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      
      {/* Display error if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {/* Ensure transactions is an array and map over it */}
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <li key={tx.id}>
              {tx.description} - ₹{tx.amount} on {tx.date}
            </li>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </ul>
    </div>
  );
};

export default Transactions;

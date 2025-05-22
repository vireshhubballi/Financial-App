// src/context/GoalContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const GoalContext = createContext();

export const useGoals = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:8080/api/goals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Fetched goals: ", response.data);  // Log the response here
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals', error);
    }
  };
  

  const createGoal = async (goal) => {
    const token = localStorage.getItem("token");
    const response = await axios.post('http://localhost:8080/api/goals', goal, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchGoals();
    return response.data;
  };

  const updateGoal = async (id, goal) => {
    const token = localStorage.getItem("token");
    const response = await axios.put(`http://localhost:8080/api/goals/${id}`, goal, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchGoals();
    return response.data;
  };

  const deleteGoal = async (id) => {
    const token = localStorage.getItem("token");
    await axios.delete(`http://localhost:8080/api/goals/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchGoals();
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalContext.Provider value={{ goals, createGoal, updateGoal, deleteGoal }}>
      {children}
    </GoalContext.Provider>
  );
};

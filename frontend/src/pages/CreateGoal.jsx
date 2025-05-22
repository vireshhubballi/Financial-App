// src/pages/CreateGoal.jsx
import React, { useState } from "react";
import { financialService } from "../utils/financialService";
import { useNavigate } from "react-router-dom";
import "./CreateGoal.css";

const CreateGoal = () => {
  const [goal, setGoal] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    targetAmount: "",
    currentAmount: "",
    dueDate: "",
    reminderDate: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const goalData = {
        ...goal,
        targetAmount: parseFloat(goal.targetAmount),
        currentAmount: parseFloat(goal.currentAmount),
      };

      await financialService.createGoal(goalData);
      alert("Goal created successfully!");
      navigate("/dashboard/goals");
    } catch (error) {
      alert("Error creating goal. Please try again.");
      console.error("Error creating goal:", error);
    }
  };

  return (
    <div className="custom-goal-container">
      <div className="custom-goal-card">
        <h2 className="custom-goal-title">🚀 Create Your Financial Goal</h2>
        <form onSubmit={handleSubmit} className="custom-goal-form">
          <div className="custom-form-group">
            <label>Title</label>
            <input
              type="text"
              value={goal.title}
              onChange={(e) => setGoal({ ...goal, title: e.target.value })}
              required
            />
          </div>

          <div className="custom-form-group full-width">
            <label>Description</label>
            <textarea
              value={goal.description}
              onChange={(e) => setGoal({ ...goal, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="custom-form-group">
            <label>Category</label>
            <input
              type="text"
              value={goal.category}
              onChange={(e) => setGoal({ ...goal, category: e.target.value })}
            />
          </div>

          <div className="custom-form-group">
            <label>Priority</label>
            <select
              value={goal.priority}
              onChange={(e) => setGoal({ ...goal, priority: e.target.value })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="custom-form-group">
            <label>Target Amount</label>
            <input
              type="number"
              value={goal.targetAmount}
              onChange={(e) => setGoal({ ...goal, targetAmount: e.target.value })}
              required
            />
          </div>

          <div className="custom-form-group">
            <label>Current Amount</label>
            <input
              type="number"
              value={goal.currentAmount}
              onChange={(e) => setGoal({ ...goal, currentAmount: e.target.value })}
              required
            />
          </div>

          <div className="custom-form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={goal.dueDate}
              onChange={(e) => setGoal({ ...goal, dueDate: e.target.value })}
              required
            />
          </div>

          <div className="custom-form-group">
            <label>Reminder Date</label>
            <input
              type="date"
              value={goal.reminderDate}
              onChange={(e) => setGoal({ ...goal, reminderDate: e.target.value })}
            />
          </div>

          <button type="submit" className="custom-goal-button">
            ➕ Add Goal
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGoal;

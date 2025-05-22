import React, { useEffect, useState } from "react";
import financialService from "../utils/financialService";
import { FaEdit, FaTrash } from "react-icons/fa";
import "./Goals.css";

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [editedGoal, setEditedGoal] = useState({
    name: "",
    description: "",
    targetAmount: "",
    currentAmount: "",
    category: "",
    priority: "",
    deadline: "",
    reminder: false,
  });

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await financialService.getGoals(); // API response
        console.log("Fetched goals data:", response); // ✅ Debug line
        if (Array.isArray(response.data)) {
          setGoals(response.data); // Use response.data to access the goals array
        } else {
          console.error("Unexpected data format for goals:", response.data);
          setGoals([]);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
    fetchGoals();
  }, []);

  const handleDelete = async (id) => {
    try {
      await financialService.deleteGoal(id);
      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal.id);
    setEditedGoal(goal);
  };

  const handleSaveEdit = async () => {
    try {
      await financialService.updateGoal(editedGoal.id, editedGoal);
      setGoals(goals.map((goal) => (goal.id === editedGoal.id ? editedGoal : goal)));
      setEditingGoal(null);
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedGoal({ ...editedGoal, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="goals-container">
      <h2 className="goals-header">🎯 My Financial Goals</h2>
      {goals.length === 0 ? (
        <p className="text-gray-600">No goals found.</p>
      ) : (
        <div>
          {goals.map((goal) => (
            <div key={goal.id} className="goal-card">
              {editingGoal === goal.id ? (
                <div className="goal-edit-form">
                  <input
                    type="text"
                    name="name"
                    placeholder="Goal Name"
                    value={editedGoal.name || ""}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={editedGoal.description || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="targetAmount"
                    placeholder="Target Amount"
                    value={editedGoal.targetAmount || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="number"
                    name="currentAmount"
                    placeholder="Current Amount"
                    value={editedGoal.currentAmount || ""}
                    onChange={handleInputChange}
                  />
                  <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={editedGoal.category || ""}
                    onChange={handleInputChange}
                  />
                  <select
                    name="priority"
                    value={editedGoal.priority || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <input
                    type="date"
                    name="deadline"
                    value={editedGoal.deadline || ""}
                    onChange={handleInputChange}
                  />
                  <label>
                    <input
                      type="checkbox"
                      name="reminder"
                      checked={editedGoal.reminder || false}
                      onChange={handleInputChange}
                    />
                    Reminder
                  </label>
                  <button onClick={handleSaveEdit} className="save-btn">
                    Save
                  </button>
                </div>
              ) : (
                <div className="goal-card-flex">
                  <div className="goal-info">
                    <h3>{goal.name || "Unnamed Goal"}</h3>
                    <p>{goal.description}</p>
                    <p>💰 Target: ₹{goal.targetAmount}</p>
                    <p>📈 Current: ₹{goal.currentAmount}</p>
                    <p>🏷️ Category: {goal.category}</p>
                    <p>🔥 Priority: {goal.priority}</p>
                    <p>📅 Deadline: {goal.deadline}</p>
                    <p>🔔 Reminder: {goal.reminder ? "Yes" : "No"}</p>
                  </div>
                  <div className="goal-actions">
                    <button onClick={() => handleEdit(goal)} className="edit-btn">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(goal.id)} className="delete-btn">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Goals;

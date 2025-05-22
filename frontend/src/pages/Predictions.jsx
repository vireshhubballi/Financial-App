import React, { useState } from "react";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import "./Prediction.css";
import { generatePrediction } from "../utils/api";  // Updated import for API call

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Prediction = () => {
  const [formData, setFormData] = useState({
    budget: "",
    income: "",
    expenses: "",
    investments: "",
    savings: "",
    riskTolerance: "Medium",
    goalTarget: "",
  });

  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedPrediction, setSavedPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const prompt = `Given these financial inputs:
      - Current Budget: ${formData.budget}
      - Total Income: ${formData.income}
      - Total Expenses: ${formData.expenses}
      - Investment Amount: ${formData.investments}
      - Savings Amount: ${formData.savings}
      - Risk Tolerance: ${formData.riskTolerance}
      - Goal Target: ${formData.goalTarget}

      Predict and reply only with JSON like:
      {
        "budgetTrend": "...",
        "riskLevel": "...",
        "goalAchievement": "...",
        "aiTips": ["...", "..."],
        "investmentReturnPrediction": "...",
        "historicalInsight": "..."
      }`;

      const aiReply = await generatePrediction(prompt);  // Using Gemini API

      // 🛠️ Extract only the JSON part
      const jsonStart = aiReply.indexOf('{');
      const jsonEnd = aiReply.lastIndexOf('}');
      const jsonString = aiReply.slice(jsonStart, jsonEnd + 1);

      const parsedResult = JSON.parse(jsonString);
      setPredictionResult(parsedResult);
    } catch (error) {
      console.error(error);
      alert("Prediction failed. See console for details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrediction = () => {
    setSavedPrediction(predictionResult);
    alert("Prediction saved successfully!");
  };

  return (
    <div className="prediction-container">
      <h1>🔮 Smart Financial Prediction</h1>
      <div className="glass-card input-form">
        <h2>Enter Your Details</h2>
        <label>Current Budget</label>
        <input type="number" name="budget" value={formData.budget} onChange={handleChange} />
        <label>Total Income</label>
        <input type="number" name="income" value={formData.income} onChange={handleChange} />
        <label>Total Expenses</label>
        <input type="number" name="expenses" value={formData.expenses} onChange={handleChange} />
        <label>Investment Amount</label>
        <input type="number" name="investments" value={formData.investments} onChange={handleChange} />
        <label>Savings Amount</label>
        <input type="number" name="savings" value={formData.savings} onChange={handleChange} />
        <label>Risk Tolerance</label>
        <select name="riskTolerance" value={formData.riskTolerance} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <label>Goal Target (Optional)</label>
        <input type="text" name="goalTarget" value={formData.goalTarget} onChange={handleChange} />
        <button onClick={handlePredict} disabled={loading}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </div>

      {predictionResult && (
        <div className="prediction-results">
          <div className="glass-card">
            <h2>📈 Your Prediction</h2>
            <p><strong>Future Budget Trend:</strong> {predictionResult.budgetTrend}</p>
            <p><strong>Risk Level:</strong> {predictionResult.riskLevel}</p>
            <p><strong>Goal Achievement:</strong> {predictionResult.goalAchievement}</p>
            <p><strong>Expected Investment Returns:</strong> {predictionResult.investmentReturnPrediction}</p>
            <p><strong>Historical Insight:</strong> {predictionResult.historicalInsight}</p>
          </div>

          <div className="charts-grid">
            {/* Line Chart */}
            <LineChart width={300} height={200} data={[
              { month: "Now", budget: Number(formData.budget) },
              { month: "3 months", budget: Number(formData.budget) + 3000 },
              { month: "6 months", budget: Number(formData.budget) + 6000 },
            ]}>
              <Line type="monotone" dataKey="budget" stroke="#4fc3f7" />
              <Tooltip />
            </LineChart>

            {/* Pie Chart */}
            <PieChart width={250} height={250}>
              <Pie
                data={[
                  { name: "Expenses", value: Number(formData.expenses) },
                  { name: "Savings", value: Number(formData.savings) }
                ]}
                dataKey="value"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {COLORS.map((color, index) => <Cell key={index} fill={color} />)}
              </Pie>
              <Tooltip />
            </PieChart>

            {/* Bar Chart */}
            <BarChart width={300} height={200} data={[
              { name: "Income", amount: Number(formData.income) },
              { name: "Expenses", amount: Number(formData.expenses) },
              { name: "Investments", amount: Number(formData.investments) },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </div>

          <div className="ai-tips-section">
            <h3>💡 AI Financial Tips</h3>
            <div className="tips-grid">
              {predictionResult.aiTips.map((tip, idx) => (
                <div key={idx} className="tip-card">
                  <p>✨ {tip}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="save-section">
            <button onClick={handleSavePrediction}>Save Prediction</button>

            {savedPrediction && (
              <div className="glass-card compare-card">
                <h3>📊 Last Saved Prediction</h3>
                <p><strong>Budget Trend:</strong> {savedPrediction.budgetTrend}</p>
                <p><strong>Risk Level:</strong> {savedPrediction.riskLevel}</p>
                <p><strong>Goal Achievement:</strong> {savedPrediction.goalAchievement}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Prediction;

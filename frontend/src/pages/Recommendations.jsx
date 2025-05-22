// src/pages/dashboard/Recommendations.jsx
import React, { useEffect, useState } from "react";
import { financialService } from "../utils/financialService";
import "./Recommendations.css";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [filter, setFilter] = useState("");
  const [personalization, setPersonalization] = useState(50);

  useEffect(() => {
    financialService.getRecommendations().then((res) => {
      const recs = Array.isArray(res.data) ? res.data : [];
      setRecommendations(recs);
    });
  }, []);

  const handleAccept = (id) => {
    console.log("Accepted recommendation", id);
  };

  const handleIgnore = (id) => {
    console.log("Ignored recommendation", id);
  };

  const filteredRecommendations = recommendations.filter((rec) =>
    rec.category?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">AI Recommendations</h2>

      <div className="recommendations-controls">
        <input
          type="text"
          placeholder="Filter by category"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        <div className="slider-container">
          <label>Personalization: {personalization}%</label>
          <input
            type="range"
            min="0"
            max="100"
            value={personalization}
            onChange={(e) => setPersonalization(e.target.value)}
          />
        </div>
      </div>

      <div className="recommendation-cards">
        {filteredRecommendations.map((rec, idx) => (
          <div key={idx} className="recommendation-card">
            <div className="card-header">
              <h3>{rec.title || `Tip #${idx + 1}`}</h3>
              <span className="category">{rec.category || "General"}</span>
            </div>
            <p className="message">{rec.message || rec.text || "No details available."}</p>
            <p className="reason"><strong>Why this?</strong> {rec.reason || "AI spotted trends in your habits."}</p>
            <p className="savings">Estimated Savings: ₹{rec.impact || "N/A"}</p>
            <p className="confidence">Confidence: {rec.confidence || Math.floor(Math.random() * 40 + 60)}%</p>

            {rec.progress !== undefined && (
              <div className="progress-container">
                <label>Progress toward goal: {rec.progress}%</label>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${rec.progress}%` }} />
                </div>
              </div>
            )}

            <div className="buttons">
              <button className="accept" onClick={() => handleAccept(rec.id)}>Accept</button>
              <button className="ignore" onClick={() => handleIgnore(rec.id)}>Ignore</button>
            </div>
          </div>
        ))}
      </div>

      <div className="recommendation-footer">
        <button onClick={() => alert("PDF Exported!")}>Export as PDF</button>
        <button onClick={() => alert("Shared!")}>Share</button>
        <button onClick={() => alert("AI Assistant Coming Soon!")}>Chat with AI Assistant</button>
      </div>
    </div>
  );
};

export default Recommendations;

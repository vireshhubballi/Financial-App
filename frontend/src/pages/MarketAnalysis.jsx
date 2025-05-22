import React, { useEffect, useState } from "react";
import "./MarketAnalysis.css";

const MarketAnalysis = () => {
  const [marketSentiment, setMarketSentiment] = useState("Loading...");
  const [fearGreedIndex, setFearGreedIndex] = useState(50); // 0 = Fear, 100 = Greed
  const [hotStocks, setHotStocks] = useState([]);
  const [riskLevel, setRiskLevel] = useState("Moderate");
  const [consensus, setConsensus] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setMarketSentiment("Positive");
      setFearGreedIndex(68);
      setHotStocks([
        { name: "Tesla", change: "+5.2%" },
        { name: "NVIDIA", change: "+4.8%" },
        { name: "Amazon", change: "+3.5%" },
      ]);
      setConsensus([
        { sector: "Technology", rating: "Strong Buy" },
        { sector: "Healthcare", rating: "Buy" },
        { sector: "Energy", rating: "Hold" },
      ]);
    }, 1000);
  }, []);

  return (
    <div className="market-analysis-container">
      <h2>📊 Market Analysis Dashboard</h2>

      <div className="section hot-stocks">
        <h3>🔥 Hot Stocks Today</h3>
        <ul>
          {hotStocks.map((stock, idx) => (
            <li key={idx}>
              <strong>{stock.name}</strong> ({stock.change})
            </li>
          ))}
        </ul>
      </div>

      <div className="section ai-sentiment">
        <h3>🧠 AI Market Sentiment</h3>
        <p>{marketSentiment}</p>
      </div>

      <div className="section fear-greed">
        <h3>🌡️ Fear & Greed Index</h3>
        <div className="gauge">
          {fearGreedIndex} - {fearGreedIndex > 50 ? "Greed" : "Fear"}
        </div>
      </div>

      <div className="section risk-meter">
        <h3>🛡️ Volatility Meter (Risk-O-Meter)</h3>
        <div className={`gauge ${riskLevel.toLowerCase()}`}>{riskLevel} Risk</div>
      </div>

      <div className="section analyst-consensus">
        <h3>🎯 Analyst Consensus</h3>
        <table>
          <thead>
            <tr>
              <th>Sector</th>
              <th>Consensus</th>
            </tr>
          </thead>
          <tbody>
            {consensus.map((item, idx) => (
              <tr key={idx}>
                <td>{item.sector}</td>
                <td>{item.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section portfolio-tips">
        <h3>🛡️ Portfolio Protection Tips</h3>
        <ul>
          <li>Diversify across sectors</li>
          <li>Limit exposure to high-risk assets</li>
          <li>Use stop-loss orders</li>
        </ul>
      </div>

      {/* --- 🌍 Geo-Market Radar Section --- */}
      <div className="section geo-market">
        <h3>🌍 Geo-Market Radar</h3>
        <div className="geo-placeholder">
          <p>🗺️ Interactive World Market Map</p>
          <p className="small-note">[Feature Coming Soon! Visualize country-wise stock indices]</p>
        </div>
      </div>

      {/* --- 🔄 Compare Stocks/Crypto Section --- */}
      <div className="section compare-assets">
        <h3>🔄 Compare Stocks/Crypto</h3>
        <div className="compare-placeholder">
          <p>📈 Compare performance of two assets side-by-side</p>
          <p className="small-note">[Feature Coming Soon! Price, Volume, Volatility comparison charts]</p>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;

import React, { useEffect, useState } from "react";
import { financialService } from "../utils/financialService";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import axios from "axios";
import "./Investments.css";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00c49f"];

const featuredCompanies = [
  {
    name: "Zerodha",
    logo: "https://zerodha.com/static/images/logo.svg",
    link: "https://zerodha.com"
  },
  {
    name: "Paytm Money",
    logo: "https://assets.paytm.com/images/catalog/view_item/728048/1618569386531.png",
    link: "https://www.paytmmoney.com"
  },
  {
    name: "5paisa",
    logo: "https://www.5paisa.com/favicon.ico",
    link: "https://www.5paisa.com"
  },
  {
    name: "Motilal Oswal",
    logo: "https://www.motilaloswal.com/favicon.ico",
    link: "https://www.motilaloswal.com"
  },
  {
    name: "Sharekhan",
    logo: "https://www.sharekhan.com/favicon.ico",
    link: "https://www.sharekhan.com"
  },
  {
    name: "Groww",
    logo: "https://groww.in/favicon.ico",
    link: "https://groww.in"
  },
  {
    name: "Upstox",
    logo: "https://upstox.com/favicon.ico",
    link: "https://upstox.com"
  },
  {
    name: "HDFC Securities",
    logo: "https://www.hdfcsec.com/favicon.ico",
    link: "https://www.hdfcsec.com"
  },
];

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [news, setNews] = useState([]);
  const [newInvestment, setNewInvestment] = useState({
    name: "",
    amount: "",
    type: "",
    returnRate: "",
    date: ""
  });

  useEffect(() => {
    fetchInvestments();
    fetchMarketNews();
  }, []);

  const fetchInvestments = async () => {
    const res = await financialService.getInvestments();
    if (Array.isArray(res.data)) setInvestments(res.data);
    else setInvestments([]);
  };

  const fetchMarketNews = async () => {
    try {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=stock+market&sortBy=publishedAt&apiKey=c32b5703de7844c4b28882df1ae3fbe7`
      );
      setNews(res.data.articles.slice(0, 5));
    } catch (error) {
      console.error("News fetch failed", error);
    }
  };

  const handleChange = (e) => {
    setNewInvestment({ ...newInvestment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await financialService.createInvestment(newInvestment);
    alert("Investment added!");
    setNewInvestment({ name: "", amount: "", type: "", returnRate: "", date: "" });
    fetchInvestments();
  };

  const investmentTypeData = Object.values(
    investments.reduce((acc, inv) => {
      acc[inv.type] = acc[inv.type] || { name: inv.type, value: 0 };
      acc[inv.type].value += Number(inv.amount);
      return acc;
    }, {})
  );

  const totalInvested = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const totalExpectedReturn = investments.reduce(
    (sum, inv) => sum + (Number(inv.amount) * Number(inv.returnRate)) / 100,
    0
  );

  const monthlyReturn = (totalExpectedReturn / 12).toFixed(2);
  const roiPercentage = ((totalExpectedReturn / totalInvested) * 100).toFixed(2);

  return (
    <div className="container">
      <h2 className="title">Investments Dashboard</h2>

      {/* Featured Platforms */}
      <div className="featured-companies">
        {featuredCompanies.map((company) => (
          <a
            key={company.name}
            href={company.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={company.logo} alt={company.name} />
            <span>{company.name}</span>
          </a>
        ))}
      </div>

      {/* Investment Form */}
      <form onSubmit={handleSubmit} className="investment-form">
        <input name="name" placeholder="Investment Name" value={newInvestment.name} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" value={newInvestment.amount} onChange={handleChange} required />
        <select name="type" value={newInvestment.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Stocks">Stocks</option>
          <option value="Mutual Funds">Mutual Funds</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Gold">Gold</option>
          <option value="Crypto">Crypto</option>
        </select>
        <input name="returnRate" type="number" placeholder="Expected Return (%)" value={newInvestment.returnRate} onChange={handleChange} required />
        <input name="date" type="date" value={newInvestment.date} onChange={handleChange} required />
        <button type="submit">Add Investment</button>
      </form>

      {/* Charts */}
      <div className="chart-container">
        <div>
          <h3>Investment Distribution (Pie)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={investmentTypeData} dataKey="value" nameKey="name" outerRadius={80}>
                {investmentTypeData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3>Investment by Type (Bar)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={investmentTypeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Returns and ROI */}
      <div className="returns-roi">
        <div>
          <h3>📊 Monthly Return Estimate</h3>
          <p>₹{monthlyReturn}</p>
        </div>
        <div>
          <h3>📈 ROI Tracker</h3>
          <p>{roiPercentage}%</p>
        </div>
      </div>

      {/* Market News */}
      <div className="market-news">
        <h3>📢 Market Trends & News</h3>
        {news.length ? (
          <ul>
            {news.map((article, i) => (
              <li key={i}>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                  {i + 1}. {article.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="loading">Loading news...</p>
        )}
      </div>

      {/* AI Tips */}
      <div className="ai-tips">
        <h3>🧠 AI Investment Tips</h3>
        <ul>
          <li>💡 Diversify your portfolio across asset types.</li>
          <li>📈 Choose higher return options for long-term goals.</li>
          <li>🕒 Review performance regularly and adjust strategy.</li>
          <li>🔁 Reinvest returns for compound growth.</li>
          <li>🛡️ Avoid overexposure to volatile assets like crypto.</li>
        </ul>
      </div>

      {/* Investment List */}
      <div className="investment-list">
        <h3>📋 My Investments</h3>
        {investments.length > 0 ? (
          <ul>
            {investments.map((inv) => (
              <li key={inv.id}>
                <p><strong>Name:</strong> {inv.name}</p>
                <p><strong>Amount:</strong> ₹{inv.amount}</p>
                <p><strong>Type:</strong> {inv.type}</p>
                <p><strong>Return Rate:</strong> {inv.returnRate}%</p>
                <p><strong>Date:</strong> {inv.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No investments added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Investments;

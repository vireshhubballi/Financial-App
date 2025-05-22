import axios from 'axios';

// Financial App API (localhost backend)
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// Attach JWT token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle unauthorized responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.warn('Unauthorized: Please log in again.');
    }
    return Promise.reject(error);
  }
);

// OpenAI API (separate)
const OpenAI_API = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // use env variable!
    'Content-Type': 'application/json',
  },
});

// Export service methods
export const financialService = {
  // Transactions
  getTransactions: () => API.get('/transactions'),
  createTransaction: (data) => API.post('/transactions', data),

  // Budget
  getBudget: () => API.get('/budget'),
  updateBudget: (data) => API.post('/budget', data),

  // Goals
  getGoals: () => API.get('/goals'),
  deleteGoal: (id) => API.delete(`/goals/${id}`),
  updateGoal: (id, data) => API.put(`/goals/${id}`, data),
  createGoal: (data) => API.post('/goals', data),

  // Investments
  getInvestments: () => API.get('/investments'),
  createInvestment: (data) => API.post('/investments', data),

  // AI Predictions, Recommendations, Market, and Reports
  getPredictions: () => API.get('/predictions'),
  getRecommendations: () => API.get('/recommendations'),
  getMarketAnalysis: () => API.get('/market'),
  getReport: () => API.get('/reports'),

  // Settings
  updateSettings: (data) => API.put('/settings', data),
  changePassword: (currentPassword, newPassword) => {
    const userId = 1; // Replace with actual user ID from auth context
    return API.put(`/settings/password/${userId}`, { currentPassword, newPassword });
  },
  deleteAccount: () => {
    const userId = 1; // Replace with actual user ID
    return API.delete(`/settings/${userId}`);
  },

  // 🧠 AI Prediction via OpenAI
  getAIPrediction: (prompt) => {
    return OpenAI_API.post('/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }).then(response => response.data.choices[0].message.content);
  }
};

export default financialService;

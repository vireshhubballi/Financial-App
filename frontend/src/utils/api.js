import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Authentication services
export const authService = {
  // Modified to return a properly structured promise
  login: async (credentials) => {
    try {
      console.log("authService.login called with:", credentials);
      const response = await apiClient.post('/auth/login', credentials);
      console.log("login response from server:", response);
      return response;
    } catch (error) {
      console.error("Error in authService.login:", error);
      throw error; // Re-throw to let component handle it
    }
  },
  signup: (userData) => apiClient.post('/auth/signup', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Financial data services
export const financialService = {
  getUserProfile: () => apiClient.get('/financial/profile'),
  updateUserProfile: (data) => apiClient.put('/financial/profile', data),
  
  getGoals: () => apiClient.get('/financial/goals'),
  createGoal: (goal) => apiClient.post('/financial/goals', goal),
  updateGoal: (id, goal) => apiClient.put(`/financial/goals/${id}`, goal),
  deleteGoal: (id) => apiClient.delete(`/financial/goals/${id}`),

  getTransactions: (params) => apiClient.get('/financial/transactions', { params }),
  addTransaction: (transaction) => apiClient.post('/financial/transactions', transaction),

  getBudget: () => apiClient.get('/financial/budget'),
  updateBudget: (budget) => apiClient.put('/financial/budget', budget),

  getPredictions: () => apiClient.get('/ml/predictions'),
  getInvestmentSuggestions: () => apiClient.get('/ml/investment-suggestions'),
  getSavingsSuggestions: () => apiClient.get('/ml/savings-suggestions'),
  getBudgetRecommendations: () => apiClient.get('/ml/budget-recommendations')
};

// Export login separately with correct parameter structure
export const login = async (email, password) => {
  console.log("standalone login function called");
  return authService.login({ email, password });
};

// Removed potentially conflicting signup function

export default {
  auth: authService,
  financial: financialService
};
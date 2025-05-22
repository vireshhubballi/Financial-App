// api.js
import axios from 'axios';

// Create Axios instance
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

// Add request interceptor to include JWT token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.log('Authentication error. You may need to log in again.');
      // Optional:
      // localStorage.removeItem('token');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Exported signup function
export const signup = async (userData) => {
  try {
    const response = await API.post('/auth/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Exported login function
export const login = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Gemini API Instance
const GeminiAPI = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to call Gemini
export const generatePrediction = async (prompt) => {
  try {
    const response = await GeminiAPI.post(
      `?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }
    );
    const aiText = response.data.candidates[0].content.parts[0].text;
    return aiText;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw error;
  }
};

// Default export of Axios instance for general use
export default API;

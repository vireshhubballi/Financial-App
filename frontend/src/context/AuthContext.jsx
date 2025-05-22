import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    loading: true,
  });

  useEffect(() => {
    // Load auth state from localStorage on initial render
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuth({
          isAuthenticated: true,
          user,
          token,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to parse user data from localStorage", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setAuth(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuth(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Sync auth state to localStorage when it changes
  useEffect(() => {
    if (auth.token && auth.user) {
      localStorage.setItem("token", auth.token);
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else if (!auth.loading) {
      // Only clear localStorage if we're not in the initial loading state
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [auth.token, auth.user, auth.loading]);

  return (
    <AuthContext.Provider value={{ ...auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  return () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({ 
      isAuthenticated: false, 
      user: null, 
      token: null, 
      loading: false 
    });
    navigate("/login");
  };
};
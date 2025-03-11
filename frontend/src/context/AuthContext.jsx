import { createContext, useContext, useState } from 'react';
// Add this import at the top of your AuthContext.jsx file
import React, {  useEffect } from 'react';

// Rest of your component code...

// Create the AuthContext
export const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate authentication loading
  useEffect(() => {
    setTimeout(() => {
      setUser({ name: "John Doe", id: 1 });
      setIsAuthenticated(true);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the AuthContext
export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosConfig';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
const AuthContext = createContext();

const isTokenExpired = (token) => {
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  if (token) {
    
  }

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      if (isTokenExpired(token)) {
        console.log('Token is expired');
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axiosInstance.get('/auth/me');
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
      }
      
      setLoading(false);
    };

    loadUser();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, userData);
      
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      localStorage.setItem('token', res.data.token);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, userData);
      
      setToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      localStorage.setItem('token', res.data.token);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

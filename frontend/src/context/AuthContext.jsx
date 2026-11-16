import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('petlove_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('petlove_token') || null;
  });
  const [loading, setLoading] = useState(true);

  // Set default axios authorization header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('petlove_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('petlove_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('petlove_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('petlove_user');
    }
  }, [user]);

  // Refresh current user data from backend on load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await axios.get('/api/auth/me');
          setUser(res.data.user);
        } catch (err) {
          console.warn('Session expired or invalid, logging out:', err);
          logout();
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (userData) => {
    const res = await axios.post('/api/auth/register', userData);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const demoLogin = async (role) => {
    const res = await axios.post('/api/auth/demo-login', { role });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    localStorage.removeItem('petlove_token');
    localStorage.removeItem('petlove_user');
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
    } catch (err) {
      console.error('Error refreshing user profile:', err);
    }
  };

  const updateUserProfile = (newUserData) => {
    setUser(prev => ({ ...prev, ...newUserData }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        demoLogin,
        logout,
        refreshUser,
        updateUserProfile,
        isAuthenticated: !!user,
        isAdopter: user?.role === 'adopter',
        isNgo: user?.role === 'ngo',
        isAdmin: user?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

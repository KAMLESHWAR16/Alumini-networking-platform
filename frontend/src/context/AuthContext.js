import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/Axios';

// Holds the logged in user. We keep it in localStorage so the
// user stays logged in after refreshing the page. Simple and
// easy to understand - no need for anything bigger like redux.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      localStorage.removeItem('user');
      return null;
    }
  });

  const storeSession = (authData) => {
    const userData = {
      ...authData.user,
      role: authData.user.role.toLowerCase(),
    };
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', authData.token);
    setUser(userData);
    return userData;
  };

  const login = async (credentials) => {
    const response = await api.post('/v1/auth/login', credentials);
    return storeSession(response.data.data);
  };

  const register = async (registration) => {
    const response = await api.post('/v1/auth/register', registration);
    return storeSession(response.data.data);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
    };
    window.addEventListener('auth:unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth:unauthorized', handleUnauthorized);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useState, useContext } from 'react';

// Holds the logged in user. We keep it in localStorage so the
// user stays logged in after refreshing the page. Simple and
// easy to understand - no need for anything bigger like redux.

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    // pretend there is a token for now
    localStorage.setItem('token', 'demo-token');
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

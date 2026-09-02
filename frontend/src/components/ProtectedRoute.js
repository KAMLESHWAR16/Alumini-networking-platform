import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Simple guard for pages that need a login.
// If the user is not logged in, send them to the login page.

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // optional role check for admin only pages
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Super Admin Protected Route
export const SuperAdminRoute = ({ children }) => {
  const { isAuthenticated, isSuperAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isSuperAdmin()) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

// Verifier Protected Route
export const VerifierRoute = ({ children }) => {
  const { isAuthenticated, isVerifier, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isVerifier()) {
    return <Navigate to="/verify/login" state={{ from: location }} replace />;
  }

  return children;
};


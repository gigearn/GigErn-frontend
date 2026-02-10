import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useUserManager } from '../hooks/useUserManager';
import { useAdmin } from '../hooks/useAdmin';

const ProtectedRoute = ({ children, requireDocuments = false, requiredRole = null, requireAdmin = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { userData, getDocumentProgress } = useUserManager();
  const { isAdmin } = useAdmin();

  // Show loading state while authentication is being checked
  if (isLoading) {
    console.log('ProtectedRoute: Loading authentication state...');
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>;
  }

  console.log('ProtectedRoute: Check - user:', user);
  console.log('ProtectedRoute: Check - isAuthenticated:', isAuthenticated);
  console.log('ProtectedRoute: Check - requiredRole:', requiredRole);
  console.log('ProtectedRoute: Check - requireAdmin:', requireAdmin);
  console.log('ProtectedRoute: Check - user.role:', user?.role);
  console.log('ProtectedRoute: Check - isAdmin:', isAdmin);

  // If not logged in, redirect to login
  if (!user || !isAuthenticated) {
    console.log('ProtectedRoute: not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // If admin access is required and user is not admin, redirect to unauthorized
  if (requireAdmin && !isAdmin) {
    console.log('ProtectedRoute: admin access required but user is not admin, redirecting to unauthorized');
    return <Navigate to="/unauthorized" replace />;
  }

  // If role is required and user doesn't have the correct role, redirect to unauthorized
  if (requiredRole && user.role !== requiredRole) {
    console.log('ProtectedRoute: wrong role. User role:', user.role, 'Required:', requiredRole);
    return <Navigate to="/unauthorized" replace />;
  }

  // If route requires documents, check if user has uploaded all required documents
  if (requireDocuments) {
    const documentProgress = getDocumentProgress();
    const hasAllDocuments = documentProgress.uploaded === documentProgress.total && documentProgress.total > 0;
    
    if (!hasAllDocuments) {
      console.log('ProtectedRoute: documents required but not uploaded. Progress:', documentProgress);
      // Redirect to appropriate documents page based on user role
      const documentsRoute = user.role === 'gig' ? '/gig/documents' : '/store/documents';
      return <Navigate to={documentsRoute} replace />;
    }
  }

  console.log('ProtectedRoute: access granted for user:', user);
  return children;
};

export default ProtectedRoute;
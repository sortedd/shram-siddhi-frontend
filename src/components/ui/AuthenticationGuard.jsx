import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useNavigation } from './ContextualNavigation';

const AuthenticationGuard = ({ children, requireAuth = true, redirectTo = '/admin-login' }) => {
  const { isAuthenticated, setIsAuthenticated } = useNavigation();
  const location = useLocation();

  useEffect(() => {
    // Check for stored authentication token
    const token = sessionStorage.getItem('auth-token');
    if (token && !isAuthenticated) {
      // Validate token here in real implementation
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  // Protect routes that require authentication
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Redirect authenticated users away from login page
  if (!requireAuth && isAuthenticated && location?.pathname === '/admin-login') {
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default AuthenticationGuard;
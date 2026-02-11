import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const userData = localStorage.getItem('gigEarn_userData');
      const authData = localStorage.getItem('gigEarn_auth');
      
      if (userData && authData) {
        const parsedUser = JSON.parse(userData);
        const parsedAuth = JSON.parse(authData);
        
        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = (userData, authData) => {
    try {
      localStorage.setItem('gigEarn_userData', JSON.stringify(userData));
      localStorage.setItem('gigEarn_auth', JSON.stringify(authData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('gigEarn_userData');
      localStorage.removeItem('gigEarn_auth');
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateUser = (userData) => {
    try {
      localStorage.setItem('gigEarn_userData', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const hasRole = (role) => {
    return user?.role === role;
  };

  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  const isSuperAdmin = () => {
    return user?.role === 'super_admin';
  };

  const isVerifier = () => {
    return user?.role === 'verifier';
  };

  const isInternalUser = () => {
    return ['super_admin', 'verifier'].includes(user?.role);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    hasRole,
    hasAnyRole,
    isSuperAdmin,
    isVerifier,
    isInternalUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

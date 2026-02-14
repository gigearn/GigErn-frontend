import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = localStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          // Check if user has admin userType
          const isAdminUser = ['admin', 'verifier'].includes(parsedUser.userType);
          setIsAdmin(isAdminUser);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      }
      setIsLoading(false);
    };

    checkAdminStatus();
  }, []);

  return {
    isAdmin,
    isLoading
  };
};

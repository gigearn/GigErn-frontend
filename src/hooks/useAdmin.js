import { useState, useEffect } from 'react';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    const checkAdminAccess = () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (!user || !token) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(user);
        // For now, we'll use a simple check - in production, this should be server-validated
        // You could add an 'admin' role to the user object or check against an admin list
        const isAdminUser = parsedUser.phone === '9241272626' || 
                           parsedUser.role === 'admin' ||
                           parsedUser.isAdmin === true;
        
        setIsAdmin(isAdminUser);
      } catch (error) {
        console.error('Error checking admin access:', error);
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    };

    checkAdminAccess();
  }, []);

  const loginAsAdmin = (phone, otp) => {
    // Simple admin login - in production, this should be server-validated
    if (phone === '9241272626' && otp === '123456') {
      const adminUser = {
        id: 'admin_001',
        phone: '9241272626',
        name: 'System Administrator',
        role: 'admin',
        isAdmin: true,
        email: 'admin@gigearn.com' // Keep email for reference
      };
      
      localStorage.setItem('user', JSON.stringify(adminUser));
      localStorage.setItem('token', 'admin-token-' + Date.now());
      setIsAdmin(true);
      return { success: true };
    }
    
    return { success: false, error: 'Invalid admin credentials' };
  };

  return {
    isAdmin,
    isLoading,
    loginAsAdmin
  };
};

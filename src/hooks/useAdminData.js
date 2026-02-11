import { useState, useEffect } from 'react';

export const useAdminData = () => {
  const [pendingStoreVerifications, setPendingStoreVerifications] = useState([]);
  const [pendingGigVerifications, setPendingGigVerifications] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = () => {
    try {
      // Load all users from localStorage
      const users = [];
      
      // Load from gigEarn_userData (current user data)
      const userData = localStorage.getItem('gigEarn_userData');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          users.push({
            id: user.id,
            name: user.name || user.storeName || 'Unknown',
            email: user.email,
            phone: user.phone,
            role: user.role,
            verificationStatus: user.verificationStatus || 'unverified',
            status: user.status || 'active',
            registeredAt: user.registeredAt || new Date().toISOString(),
            documents: user.documents || {},
            requiredDocuments: getRequiredDocumentsForRole(user.role || 'gig'),
            hasAllDocuments: checkIfAllDocumentsUploaded(user.documents || {}, user.role || 'gig')
          });
        } catch (error) {
          console.error('Error parsing current user data:', error);
        }
      }

      // Load from allUsers array if it exists
      const allUsersData = localStorage.getItem('gigEarn_allUsers');
      if (allUsersData) {
        try {
          const parsedUsers = JSON.parse(allUsersData);
          parsedUsers.forEach(user => {
            try {
              users.push({
                id: user.id,
                name: user.name || user.storeName || 'Unknown',
                email: user.email,
                phone: user.phone,
                role: user.role,
                verificationStatus: user.verificationStatus || 'unverified',
                status: user.status || 'active',
                registeredAt: user.registeredAt || new Date().toISOString(),
                documents: user.documents || {},
                requiredDocuments: getRequiredDocumentsForRole(user.role || 'gig'),
                hasAllDocuments: checkIfAllDocumentsUploaded(user.documents || {}, user.role || 'gig')
              });
            } catch (error) {
              console.error('Error processing user:', user, error);
            }
          });
        } catch (error) {
          console.error('Error parsing all users:', error);
        }
      }

      // Load mock users for demonstration
      const mockUsers = [
        {
          id: 'store_001',
          name: 'FreshMart Grocery',
          email: 'contact@freshmart.com',
          phone: '9876543213',
          role: 'store',
          verificationStatus: 'pending',
          status: 'active',
          registeredAt: '2024-01-25T10:30:00Z',
          documents: {
            gst: { uploaded: true, fileData: 'mock-gst-data' },
            pan: { uploaded: true, fileData: 'mock-pan-data' },
            aadhaar: { uploaded: false },
            shopLicense: { uploaded: false }
          },
          requiredDocuments: getRequiredDocumentsForRole('store'),
          hasAllDocuments: false
        },
        {
          id: 'gig_001',
          name: 'Raj Kumar',
          email: 'raj@example.com',
          phone: '9876543211',
          role: 'gig',
          verificationStatus: 'pending',
          status: 'active',
          registeredAt: '2024-01-26T14:15:00Z',
          documents: {
            aadhaar: { uploaded: true, fileData: 'mock-aadhaar-data' },
            pan: { uploaded: true, fileData: 'mock-pan-data' },
            drivingLicense: { uploaded: false },
            vehicleRC: { uploaded: false }
          },
          requiredDocuments: getRequiredDocumentsForRole('gig'),
          hasAllDocuments: false
        }
      ];
      
      const allUsersList = [...users, ...mockUsers];
      setAllUsers(allUsersList);

      // Filter pending verifications
      const pendingStores = allUsersList.filter(user => 
        user.role === 'store' && user.verificationStatus === 'pending'
      );
      const pendingGigs = allUsersList.filter(user => 
        user.role === 'gig' && user.verificationStatus === 'pending'
      );

      setPendingStoreVerifications(pendingStores);
      setPendingGigVerifications(pendingGigs);
    } catch (error) {
      console.error('Critical error in loadAdminData:', error);
      // Set empty arrays to prevent crashes
      setAllUsers([]);
      setPendingStoreVerifications([]);
      setPendingGigVerifications([]);
    }
  };

  const getRequiredDocumentsForRole = (role) => {
    if (role === 'store') {
      return [
        { id: 'gst', name: 'GST Certificate', required: true },
        { id: 'pan', name: 'PAN Card', required: true },
        { id: 'aadhaar', name: 'Aadhaar Card', required: true },
        { id: 'shopLicense', name: 'Shop License', required: true }
      ];
    } else if (role === 'gig') {
      return [
        { id: 'aadhaar', name: 'Aadhaar Card', required: true },
        { id: 'pan', name: 'PAN Card', required: true },
        { id: 'drivingLicense', name: 'Driving License', required: true },
        { id: 'vehicleRC', name: 'Vehicle RC', required: true }
      ];
    }
    return [];
  };

  const checkIfAllDocumentsUploaded = (documents, role) => {
    if (!documents || !role) return false;
    try {
      const requiredDocs = getRequiredDocumentsForRole(role);
      if (!requiredDocs || requiredDocs.length === 0) return false;
      return requiredDocs.every(doc => documents && documents[doc.id] && documents[doc.id].uploaded);
    } catch (error) {
      console.error('Error checking documents:', error);
      return false;
    }
  };

  const approveStoreVerification = (storeId) => {
    // Update user verification status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === storeId) {
        user.verificationStatus = 'verified';
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === storeId ? { ...user, verificationStatus: 'verified' } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    loadAdminData();
  };

  const approveGigVerification = (gigId) => {
    // Update user verification status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === gigId) {
        user.verificationStatus = 'verified';
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === gigId ? { ...user, verificationStatus: 'verified' } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    loadAdminData();
  };

  const rejectStoreVerification = (storeId, reason) => {
    // Update user verification status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === storeId) {
        user.verificationStatus = 'rejected';
        user.rejectionReason = reason;
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === storeId ? { ...user, verificationStatus: 'rejected', rejectionReason: reason } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    loadAdminData();
  };

  const rejectGigVerification = (gigId, reason) => {
    // Update user verification status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === gigId) {
        user.verificationStatus = 'rejected';
        user.rejectionReason = reason;
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === gigId ? { ...user, verificationStatus: 'rejected', rejectionReason: reason } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    loadAdminData();
  };

  const blockUser = (userId, reason) => {
    // Update user status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === userId) {
        user.status = 'blocked';
        user.blockReason = reason;
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, status: 'blocked', blockReason: reason } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    // Add to blocked users list
    const blockedList = localStorage.getItem('gigEarn_blockedUsers') 
      ? JSON.parse(localStorage.getItem('gigEarn_blockedUsers')) 
      : [];
    blockedList.push({ userId, reason, blockedAt: new Date().toISOString() });
    localStorage.setItem('gigEarn_blockedUsers', JSON.stringify(blockedList));

    loadAdminData();
  };

  const unblockUser = (userId) => {
    // Update user status
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.id === userId) {
        user.status = 'active';
        delete user.blockReason;
        localStorage.setItem('gigEarn_userData', JSON.stringify(user));
      }
    }

    // Update all users list
    const allUsersData = localStorage.getItem('gigEarn_allUsers');
    if (allUsersData) {
      const users = JSON.parse(allUsersData);
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, status: 'active', blockReason: undefined } : user
      );
      localStorage.setItem('gigEarn_allUsers', JSON.stringify(updatedUsers));
    }

    // Remove from blocked users list
    const blockedList = localStorage.getItem('gigEarn_blockedUsers') 
      ? JSON.parse(localStorage.getItem('gigEarn_blockedUsers')) 
      : [];
    const updatedBlockedList = blockedList.filter(user => user.userId !== userId);
    localStorage.setItem('gigEarn_blockedUsers', JSON.stringify(updatedBlockedList));

    loadAdminData();
  };

  const getSystemStats = () => {
    return {
      totalUsers: allUsers.length,
      totalStores: allUsers.filter(u => u.role === 'store').length,
      totalGigs: allUsers.filter(u => u.role === 'gig').length,
      pendingVerifications: allUsers.filter(u => u.verificationStatus === 'pending').length,
      blockedUsers: allUsers.filter(u => u.status === 'blocked').length,
      verifiedUsers: allUsers.filter(u => u.verificationStatus === 'verified').length
    };
  };

  return {
    pendingStoreVerifications,
    pendingGigVerifications,
    blockedUsers,
    allUsers,
    approveStoreVerification,
    approveGigVerification,
    rejectStoreVerification,
    rejectGigVerification,
    blockUser,
    unblockUser,
    getSystemStats,
    loadAdminData
  };
};

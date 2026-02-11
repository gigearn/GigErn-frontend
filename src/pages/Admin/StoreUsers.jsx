import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminStoreUsers = () => {
  const [storeUsers, setStoreUsers] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadStoreUsers();
  }, []);

  const loadStoreUsers = () => {
    // Load store users from localStorage
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'store') {
        // Create mock store users data for demonstration
        const mockStoreUsers = [
          {
            id: user.id,
            name: user.storeName || 'Store User',
            email: user.email,
            phone: user.phone,
            verificationStatus: user.verificationStatus,
            status: user.status || 'active',
            totalJobsCreated: 45,
            activeJobs: 8,
            completedJobs: 37,
            totalSpent: 125000,
            joinedDate: user.registeredAt,
            lastActive: new Date().toISOString(),
            avgJobValue: 3378,
            rating: 4.2
          },
          // Add more mock stores for demonstration
          {
            id: 'store_002',
            name: 'FreshMart Grocery',
            email: 'contact@freshmart.com',
            phone: '9876543213',
            verificationStatus: 'verified',
            status: 'active',
            totalJobsCreated: 128,
            activeJobs: 15,
            completedJobs: 113,
            totalSpent: 456000,
            joinedDate: '2024-01-10T09:15:00Z',
            lastActive: new Date().toISOString(),
            avgJobValue: 4035,
            rating: 4.5
          },
          {
            id: 'store_003',
            name: 'Quick Delivery Services',
            email: 'info@quickdelivery.com',
            phone: '9876543214',
            verificationStatus: 'verified',
            status: 'suspended',
            totalJobsCreated: 67,
            activeJobs: 0,
            completedJobs: 67,
            totalSpent: 234000,
            joinedDate: '2024-02-05T11:30:00Z',
            lastActive: '2024-01-28T16:45:00Z',
            avgJobValue: 3493,
            rating: 3.8
          }
        ];
        setStoreUsers(mockStoreUsers);
      }
    }
  };

  const handleSuspend = (storeId) => {
    setSelectedStore(storeId);
    setShowSuspendModal(true);
  };

  const confirmSuspend = () => {
    if (suspendReason.trim()) {
      // Update local store status
      setStoreUsers(prev => prev.map(store => 
        store.id === selectedStore 
          ? { ...store, status: 'suspended', suspendedAt: new Date().toISOString(), suspendReason }
          : store
      ));
      
      setShowSuspendModal(false);
      setSuspendReason('');
      setSelectedStore(null);
    }
  };

  const handleReinstate = (storeId) => {
    setStoreUsers(prev => prev.map(store => 
      store.id === storeId 
        ? { ...store, status: 'active', reinstatedAt: new Date().toISOString() }
        : store
    ));
  };

  const filteredUsers = storeUsers.filter(store =>
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.phone.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 4.0) return 'text-primary';
    if (rating >= 3.5) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Store Users Oversight</h1>
          <p className="text-muted-foreground">Monitor store accounts and job creation activity</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Stores</p>
            <p className="text-2xl font-bold text-foreground">{storeUsers.length}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="Search" size={20} className="text-muted-foreground" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by store name, email, or phone..."
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="Store" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{storeUsers.filter(s => s.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Stores</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Pause" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{storeUsers.filter(s => s.status === 'suspended').length}</p>
              <p className="text-sm text-muted-foreground">Suspended</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Briefcase" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{storeUsers.reduce((acc, s) => acc + s.activeJobs, 0)}</p>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="CreditCard" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">₹{Math.round(storeUsers.reduce((acc, s) => acc + s.totalSpent, 0) / 1000)}K</p>
              <p className="text-sm text-muted-foreground">Total Spent</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stores List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Store
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Spending
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((store) => (
                <tr key={store.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{store.name}</div>
                      <div className="text-sm text-muted-foreground">{store.email}</div>
                      <div className="text-xs text-muted-foreground">{store.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        store.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {store.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        store.verificationStatus === 'verified' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {store.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getRatingColor(store.rating)}`}>
                        {store.rating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={12}
                            className={i < Math.floor(store.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{store.totalJobsCreated} created</div>
                    <div className="text-xs text-muted-foreground">{store.activeJobs} active</div>
                    <div className="text-xs text-muted-foreground">{store.completedJobs} completed</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      ₹{store.totalSpent.toLocaleString('en-IN')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Avg: ₹{store.avgJobValue.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{formatDate(store.joinedDate)}</div>
                    <div className="text-xs text-muted-foreground">
                      Last: {formatDate(store.lastActive)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {store.status === 'active' ? (
                        <button
                          onClick={() => handleSuspend(store.id)}
                          className="p-1 text-warning hover:text-warning/80 transition-colors"
                          title="Suspend store"
                        >
                          <Icon name="Pause" size={16} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleReinstate(store.id)}
                          className="p-1 text-success hover:text-success/80 transition-colors"
                          title="Reinstate store"
                        >
                          <Icon name="Play" size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Suspend Store</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will temporarily suspend the store's ability to create new jobs. Please provide a reason for this action.
            </p>
            
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="Enter suspension reason (fraud, misuse, policy violation, etc.)..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows={4}
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmSuspend}
                disabled={!suspendReason.trim()}
                className="flex-1 px-4 py-2 bg-warning text-warning-foreground rounded-lg hover:bg-warning/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suspend Store
              </button>
              <button
                onClick={() => {
                  setShowSuspendModal(false);
                  setSuspendReason('');
                  setSelectedStore(null);
                }}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoreUsers;

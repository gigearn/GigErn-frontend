import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminGigUsers = () => {
  const { blockedUsers, blockUser, unblockUser } = useAdminData();
  const [gigUsers, setGigUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [blockReason, setBlockReason] = useState('');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadGigUsers();
  }, []);

  const loadGigUsers = () => {
    // Load gig users from localStorage
    const userData = localStorage.getItem('gigEarn_userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.role === 'gig') {
        // Create mock gig users data for demonstration
        const mockGigUsers = [
          {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            vehicleNumber: user.vehicleNumber,
            verificationStatus: user.verificationStatus,
            currentLayer: 'Newcomer',
            reliabilityScore: 75,
            completedJobs: 12,
            activeJobs: 2,
            totalEarnings: 45000,
            joinedDate: user.registeredAt,
            lastActive: new Date().toISOString(),
            status: user.status || 'active'
          },
          // Add more mock users for demonstration
          {
            id: 'gig_002',
            name: 'Raj Kumar',
            email: 'raj@example.com',
            phone: '9876543211',
            vehicleNumber: 'MH12AB1234',
            verificationStatus: 'verified',
            currentLayer: 'Regular',
            reliabilityScore: 92,
            completedJobs: 156,
            activeJobs: 1,
            totalEarnings: 245000,
            joinedDate: '2024-01-15T10:30:00Z',
            lastActive: new Date().toISOString(),
            status: 'active'
          },
          {
            id: 'gig_003',
            name: 'Priya Singh',
            email: 'priya@example.com',
            phone: '9876543212',
            vehicleNumber: 'DL5CD5678',
            verificationStatus: 'verified',
            currentLayer: 'Pro',
            reliabilityScore: 96,
            completedJobs: 342,
            activeJobs: 3,
            totalEarnings: 520000,
            joinedDate: '2023-11-20T14:15:00Z',
            lastActive: new Date().toISOString(),
            status: 'active'
          }
        ];
        setGigUsers(mockGigUsers);
      }
    }
  };

  const handleBlock = (userId) => {
    setSelectedUser(userId);
    setShowBlockModal(true);
  };

  const confirmBlock = () => {
    if (blockReason.trim()) {
      blockUser(selectedUser, blockReason);
      setShowBlockModal(false);
      setBlockReason('');
      setSelectedUser(null);
      
      // Update local user status
      setGigUsers(prev => prev.map(user => 
        user.id === selectedUser 
          ? { ...user, status: 'blocked' }
          : user
      ));
    }
  };

  const handleUnblock = (userId) => {
    unblockUser(userId);
    
    // Update local user status
    setGigUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: 'active' }
        : user
    ));
  };

  const handleFlagForReview = (userId) => {
    alert(`User ${userId} flagged for review. This would trigger a review workflow.`);
  };

  const filteredUsers = gigUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm)
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getLayerColor = (layer) => {
    switch (layer) {
      case 'Newcomer': return 'text-warning';
      case 'Regular': return 'text-primary';
      case 'Pro': return 'text-success';
      case 'Elite': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 75) return 'text-primary';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gig Users Oversight</h1>
          <p className="text-muted-foreground">Read-only view of gig worker profiles and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Gig Workers</p>
            <p className="text-2xl font-bold text-foreground">{gigUsers.length}</p>
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
            placeholder="Search by name, email, or phone..."
            className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="Users" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{gigUsers.filter(u => u.status === 'active').length}</p>
              <p className="text-sm text-muted-foreground">Active Workers</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{gigUsers.filter(u => u.currentLayer === 'Newcomer').length}</p>
              <p className="text-sm text-muted-foreground">Newcomers</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name="Star" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{Math.round(gigUsers.reduce((acc, u) => acc + u.reliabilityScore, 0) / gigUsers.length)}</p>
              <p className="text-sm text-muted-foreground">Avg Reliability</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="ShieldX" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{blockedUsers.length}</p>
              <p className="text-sm text-muted-foreground">Blocked Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Worker
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Layer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Reliability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Jobs
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Earnings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-foreground">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                      <div className="text-xs text-muted-foreground">{user.phone}</div>
                      {user.vehicleNumber && (
                        <div className="text-xs text-muted-foreground">Vehicle: {user.vehicleNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === 'active' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-destructive/10 text-destructive'
                      }`}>
                        {user.status.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.verificationStatus === 'verified' 
                          ? 'bg-success/10 text-success' 
                          : 'bg-warning/10 text-warning'
                      }`}>
                        {user.verificationStatus.toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getLayerColor(user.currentLayer)}`}>
                      {user.currentLayer}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getScoreColor(user.reliabilityScore)}`}>
                        {user.reliabilityScore}
                      </span>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            user.reliabilityScore >= 90 ? 'bg-success' :
                            user.reliabilityScore >= 75 ? 'bg-primary' :
                            user.reliabilityScore >= 60 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: `${user.reliabilityScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-foreground">{user.completedJobs} completed</div>
                    <div className="text-xs text-muted-foreground">{user.activeJobs} active</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-foreground">
                      ₹{user.totalEarnings.toLocaleString('en-IN')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {user.status === 'active' ? (
                        <>
                          <button
                            onClick={() => handleFlagForReview(user.id)}
                            className="p-1 text-warning hover:text-warning/80 transition-colors"
                            title="Flag for review"
                          >
                            <Icon name="Flag" size={16} />
                          </button>
                          <button
                            onClick={() => handleBlock(user.id)}
                            className="p-1 text-destructive hover:text-destructive/80 transition-colors"
                            title="Block user"
                          >
                            <Icon name="ShieldX" size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleUnblock(user.id)}
                          className="p-1 text-success hover:text-success/80 transition-colors"
                          title="Unblock user"
                        >
                          <Icon name="ShieldCheck" size={16} />
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

      {/* Block Modal */}
      {showBlockModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Block Gig Worker</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This will prevent the worker from accessing the platform. Please provide a reason for this action.
            </p>
            
            <textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Enter block reason (fraud, safety concerns, policy violation, etc.)..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows={4}
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmBlock}
                disabled={!blockReason.trim()}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Block Worker
              </button>
              <button
                onClick={() => {
                  setShowBlockModal(false);
                  setBlockReason('');
                  setSelectedUser(null);
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

export default AdminGigUsers;

import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';
import { getAllVerifiersStats, getAuditLogs } from '../../utils/auditLog';

const VerifierManagement = () => {
  const [verifiers, setVerifiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVerifier, setSelectedVerifier] = useState(null);
  const [dateRange, setDateRange] = useState('30d');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock verifiers data
  const mockVerifiers = [
    {
      id: 'verifier_001',
      name: 'Rahul Kumar',
      email: 'rahul@gigearn.com',
      phone: '9876543210',
      status: 'active',
      joinedAt: '2024-01-15T00:00:00Z',
      lastActive: '2025-02-01T10:30:00Z',
    },
    {
      id: 'verifier_002',
      name: 'Priya Sharma',
      email: 'priya@gigearn.com',
      phone: '9876543211',
      status: 'active',
      joinedAt: '2024-02-01T00:00:00Z',
      lastActive: '2025-02-01T09:15:00Z',
    },
    {
      id: 'verifier_003',
      name: 'Amit Patel',
      email: 'amit@gigearn.com',
      phone: '9876543212',
      status: 'inactive',
      joinedAt: '2024-01-20T00:00:00Z',
      lastActive: '2025-01-28T16:45:00Z',
    },
  ];

  useEffect(() => {
    loadVerifierData();
  }, [dateRange]);

  const loadVerifierData = () => {
    setLoading(true);
    
    // Calculate date range
    const now = new Date();
    let startDate = null;
    
    switch (dateRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = null;
    }

    // Get verifier stats from audit logs
    const verifierStats = getAllVerifiersStats(startDate?.toISOString());
    
    // Merge with mock verifier data
    const enrichedVerifiers = mockVerifiers.map(verifier => {
      const stats = verifierStats.find(s => s.verifierId === verifier.id) || {
        totalReviewed: 0,
        approved: 0,
        rejected: 0,
        requestedReupload: 0,
        approvalRate: 0,
      };
      
      return {
        ...verifier,
        ...stats,
      };
    });

    setVerifiers(enrichedVerifiers);
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-muted-foreground';
  };

  const getStatusBadge = (status) => {
    return status === 'active' 
      ? 'bg-success/10 text-success' 
      : 'bg-muted text-muted-foreground';
  };

  const toggleVerifierStatus = (verifierId) => {
    setVerifiers(prev => prev.map(v => 
      v.id === verifierId 
        ? { ...v, status: v.status === 'active' ? 'inactive' : 'active' }
        : v
    ));
  };

  const filteredVerifiers = verifiers.filter(verifier =>
    verifier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verifier.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verifier.phone.includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Verifier Management</h1>
            <p className="text-muted-foreground">
              Manage verification agents and monitor their performance
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Add Verifier
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Verifiers</p>
              <p className="text-2xl font-bold text-foreground">{verifiers.length}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="Users" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Verifiers</p>
              <p className="text-2xl font-bold text-success">
                {verifiers.filter(v => v.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold text-foreground">
                {verifiers.reduce((sum, v) => sum + v.totalReviewed, 0)}
              </p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon name="ClipboardList" size={24} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Avg Approval Rate</p>
              <p className="text-2xl font-bold text-foreground">
                {verifiers.length > 0 
                  ? (verifiers.reduce((sum, v) => sum + v.approvalRate, 0) / verifiers.length).toFixed(1)
                  : 0}%
              </p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <Icon name="TrendingUp" size={24} className="text-info" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search verifiers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Time Period:</span>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Verifiers Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Verifier</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Performance</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reviews</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Approval Rate</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Active</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredVerifiers.map((verifier) => (
                <tr key={verifier.id} className="hover:bg-muted/30">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-foreground">{verifier.name}</p>
                      <p className="text-sm text-muted-foreground">{verifier.email}</p>
                      <p className="text-sm text-muted-foreground">{verifier.phone}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(verifier.status)}`}>
                      {verifier.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-success">✓ {verifier.approved}</span>
                        <span className="text-sm text-destructive">✗ {verifier.rejected}</span>
                      </div>
                      {verifier.requestedReupload > 0 && (
                        <p className="text-xs text-warning">↻ {verifier.requestedReupload} re-uploads</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-foreground">{verifier.totalReviewed}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-success h-2 rounded-full"
                          style={{ width: `${verifier.approvalRate}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{verifier.approvalRate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-foreground">{formatDateTime(verifier.lastActive)}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedVerifier(verifier)}
                        className="p-1 text-primary hover:text-primary/80 transition-colors"
                        title="View details"
                      >
                        <Icon name="Eye" size={16} />
                      </button>
                      <button
                        onClick={() => toggleVerifierStatus(verifier.id)}
                        className={`p-1 ${getStatusColor(verifier.status)} hover:opacity-80 transition-opacity`}
                        title={verifier.status === 'active' ? 'Deactivate' : 'Activate'}
                      >
                        <Icon name={verifier.status === 'active' ? 'ToggleRight' : 'ToggleLeft'} size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Verifier Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">Add New Verifier</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter verifier name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Verifier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Verifier Details Modal */}
      {selectedVerifier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Verifier Details</h3>
              <button
                onClick={() => setSelectedVerifier(null)}
                className="p-1 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-foreground mb-3">Basic Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="text-foreground">{selectedVerifier.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span className="text-foreground">{selectedVerifier.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="text-foreground">{selectedVerifier.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(selectedVerifier.status)}`}>
                      {selectedVerifier.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span className="text-foreground">{formatDate(selectedVerifier.joinedAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Active:</span>
                    <span className="text-foreground">{formatDateTime(selectedVerifier.lastActive)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Performance Metrics</h4>
                <div className="space-y-3">
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Total Reviews</span>
                      <span className="font-medium text-foreground">{selectedVerifier.totalReviewed}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-success font-medium">{selectedVerifier.approved}</p>
                        <p className="text-muted-foreground">Approved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-destructive font-medium">{selectedVerifier.rejected}</p>
                        <p className="text-muted-foreground">Rejected</p>
                      </div>
                      <div className="text-center">
                        <p className="text-warning font-medium">{selectedVerifier.requestedReupload}</p>
                        <p className="text-muted-foreground">Re-upload</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Approval Rate</span>
                      <span className="font-medium text-foreground">{selectedVerifier.approvalRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 mt-2">
                      <div 
                        className="bg-success h-2 rounded-full"
                        style={{ width: `${selectedVerifier.approvalRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setSelectedVerifier(null)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifierManagement;

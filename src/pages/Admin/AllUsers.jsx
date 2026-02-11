import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminAllUsers = () => {
  const { allUsers, approveStoreVerification, approveGigVerification, rejectStoreVerification, rejectGigVerification, blockUser, unblockUser } = useAdminData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load data when component mounts
  }, []);

  const handleAction = (user, type) => {
    setSelectedUser(user);
    setActionType(type);
    setShowModal(true);
  };

  const handleViewDocuments = (user) => {
    setSelectedUser(user);
    setShowDocumentModal(true);
  };

  const confirmAction = () => {
    if (!selectedUser || !actionReason.trim()) return;

    // Check if action is approve and user has all documents
    if (actionType === 'approve' && !selectedUser.hasAllDocuments) {
      alert('Cannot approve verification. All required documents must be uploaded first.');
      setShowModal(false);
      setActionReason('');
      setSelectedUser(null);
      setActionType('');
      return;
    }

    switch (actionType) {
      case 'approve':
        if (selectedUser.role === 'store') {
          approveStoreVerification(selectedUser.id);
        } else {
          approveGigVerification(selectedUser.id);
        }
        break;
      case 'reject':
        if (selectedUser.role === 'store') {
          rejectStoreVerification(selectedUser.id, actionReason);
        } else {
          rejectGigVerification(selectedUser.id, actionReason);
        }
        break;
      case 'block':
        blockUser(selectedUser.id, actionReason);
        break;
      case 'unblock':
        unblockUser(selectedUser.id);
        break;
    }

    setShowModal(false);
    setActionReason('');
    setSelectedUser(null);
    setActionType('');
  };

  const filteredUsers = allUsers.filter(user => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && user.verificationStatus === 'pending') ||
      (filter === 'verified' && user.verificationStatus === 'verified') ||
      (filter === 'rejected' && user.verificationStatus === 'rejected') ||
      (filter === 'blocked' && user.status === 'blocked') ||
      (filter === 'store' && user.role === 'store') ||
      (filter === 'gig' && user.role === 'gig');

    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-destructive bg-destructive/10';
      case 'blocked': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getDocumentStatus = (user) => {
    if (!user.requiredDocuments || !user.documents) return { uploaded: 0, total: 0 };
    const uploaded = user.requiredDocuments.filter(doc => user.documents[doc.id]?.uploaded).length;
    const total = user.requiredDocuments.length;
    return { uploaded, total };
  };

  const stats = {
    total: allUsers.length,
    pending: allUsers.filter(u => u.verificationStatus === 'pending').length,
    verified: allUsers.filter(u => u.verificationStatus === 'verified').length,
    rejected: allUsers.filter(u => u.verificationStatus === 'rejected').length,
    blocked: allUsers.filter(u => u.status === 'blocked').length,
    stores: allUsers.filter(u => u.role === 'store').length,
    gigs: allUsers.filter(u => u.role === 'gig').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Registered Users</h1>
          <p className="text-muted-foreground">View and manage all platform users and their verification status</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/10">
              <Icon name="Users" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.verified}</p>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="ShieldX" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.blocked}</p>
              <p className="text-sm text-muted-foreground">Blocked</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
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
        
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'All', count: stats.total },
            { id: 'pending', label: 'Pending', count: stats.pending },
            { id: 'verified', label: 'Verified', count: stats.verified },
            { id: 'store', label: 'Stores', count: stats.stores },
            { id: 'gig', label: 'Gigs', count: stats.gigs }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 border rounded-lg transition-colors ${
                filter === tab.id
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:bg-muted'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-current/20">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Registered
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => {
                const docStatus = getDocumentStatus(user);
                return (
                  <tr key={user.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                        <div className="text-xs text-muted-foreground">{user.phone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === 'store' ? 'bg-primary/10 text-primary' : 'bg-success/10 text-success'
                      }`}>
                        {user.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="text-sm">
                          {docStatus.uploaded}/{docStatus.total}
                        </div>
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              docStatus.uploaded === docStatus.total ? 'bg-success' : 'bg-warning'
                            }`}
                            style={{ width: `${(docStatus.uploaded / docStatus.total) * 100}%` }}
                          ></div>
                        </div>
                        <button
                          onClick={() => handleViewDocuments(user)}
                          className="p-1 text-primary hover:text-primary/80 transition-colors"
                          title="View documents"
                        >
                          <Icon name="Eye" size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.verificationStatus === 'verified' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {user.verificationStatus.toUpperCase()}
                        </span>
                        {!user.hasAllDocuments && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                            DOCUMENTS MISSING
                          </span>
                        )}
                        {user.status === 'blocked' && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                            BLOCKED
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">{formatDate(user.registeredAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDocuments(user)}
                          className="p-1 text-primary hover:text-primary/80 transition-colors"
                          title="View documents"
                        >
                          <Icon name="FileText" size={16} />
                        </button>
                        
                        {user.verificationStatus === 'pending' && (
                          <>
                            <button
                              onClick={() => handleAction(user, 'approve')}
                              disabled={!user.hasAllDocuments}
                              className={`p-1 text-success hover:text-success/80 transition-colors ${
                                user.hasAllDocuments
                                  ? ''
                                  : 'cursor-not-allowed opacity-50'
                              }`}
                              title={user.hasAllDocuments ? 'Approve verification' : 'All documents must be uploaded first'}
                            >
                              <Icon name="Check" size={16} />
                            </button>
                            <button
                              onClick={() => handleAction(user, 'reject')}
                              className="p-1 text-destructive hover:text-destructive/80 transition-colors"
                            >
                              <Icon name="X" size={16} />
                            </button>
                          </>
                        )}
                        
                        {user.status !== 'blocked' ? (
                          <button
                            onClick={() => handleAction(user, 'block')}
                            className="p-1 text-warning hover:text-warning/80 transition-colors"
                            title="Block user"
                          >
                            <Icon name="ShieldX" size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAction(user, 'unblock')}
                            className="p-1 text-success hover:text-success/80 transition-colors"
                            title="Unblock user"
                          >
                            <Icon name="ShieldCheck" size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {actionType === 'approve' && 'Approve Verification'}
              {actionType === 'reject' && 'Reject Verification'}
              {actionType === 'block' && 'Block User'}
              {actionType === 'unblock' && 'Unblock User'}
            </h3>
            
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                User: <span className="font-medium text-foreground">{selectedUser.name}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Email: <span className="font-medium text-foreground">{selectedUser.email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Role: <span className="font-medium text-foreground">{selectedUser.role}</span>
              </p>
            </div>

            {(actionType === 'reject' || actionType === 'block') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Reason {actionType === 'reject' ? 'for rejection' : 'for blocking'}
                </label>
                <textarea
                  value={actionReason}
                  onChange={(e) => setActionReason(e.target.value)}
                  placeholder={`Enter ${actionType} reason...`}
                  className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
                  rows={4}
                  required
                />
              </div>
            )}

            {actionType === 'approve' && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  This will approve the user's verification and grant them full platform access.
                </p>
              </div>
            )}

            {actionType === 'unblock' && (
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  This will unblock the user and restore their platform access.
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={confirmAction}
                disabled={(actionType === 'reject' || actionType === 'block') && !actionReason.trim()}
                className={`flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'approve' || actionType === 'unblock' ? 'bg-success text-success-foreground' :
                  actionType === 'reject' ? 'bg-destructive text-destructive-foreground' :
                  'bg-warning text-warning-foreground'
                }`}
              >
                {actionType === 'approve' && 'Approve'}
                {actionType === 'reject' && 'Reject'}
                {actionType === 'block' && 'Block'}
                {actionType === 'unblock' && 'Unblock'}
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setActionReason('');
                  setSelectedUser(null);
                  setActionType('');
                }}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocumentModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">
                Documents - {selectedUser.name}
              </h3>
              <button
                onClick={() => setShowDocumentModal(false)}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-sm text-muted-foreground">
                Email: <span className="font-medium text-foreground">{selectedUser.email}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Phone: <span className="font-medium text-foreground">{selectedUser.phone}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Role: <span className="font-medium text-foreground">{selectedUser.role}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Status: <span className={`font-medium ${getStatusColor(selectedUser.verificationStatus)}`}>
                  {selectedUser.verificationStatus.toUpperCase()}
                </span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedUser.requiredDocuments?.map((doc) => {
                const uploadedDoc = selectedUser.documents?.[doc.id];
                const isUploaded = !!uploadedDoc?.uploaded;
                
                return (
                  <div key={doc.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{doc.name}</span>
                      <span className={`text-sm ${isUploaded ? 'text-success' : 'text-destructive'}`}>
                        {isUploaded ? 'Uploaded' : 'Missing'}
                      </span>
                    </div>
                    
                    {isUploaded && uploadedDoc.fileData && (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Size: {uploadedDoc.size ? `${(uploadedDoc.size / (1024 * 1024)).toFixed(2)} MB` : 'Unknown'}
                        </p>
                        {uploadedDoc.fileData.startsWith('data:image/') && (
                          <div className="border border-border rounded-lg overflow-hidden">
                            <img 
                              src={uploadedDoc.fileData} 
                              alt={doc.name}
                              className="w-full h-32 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => window.open(uploadedDoc.fileData, '_blank')}
                            />
                          </div>
                        )}
                        {uploadedDoc.fileData.startsWith('data:application/pdf') && (
                          <button
                            onClick={() => window.open(uploadedDoc.fileData, '_blank')}
                            className="text-sm text-primary hover:underline"
                          >
                            View PDF Document
                          </button>
                        )}
                      </div>
                    )}
                    
                    {!isUploaded && (
                      <p className="text-sm text-destructive">Document not uploaded</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 mt-6">
              {selectedUser.verificationStatus === 'pending' && (
              <>
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    handleAction(selectedUser, 'approve');
                  }}
                  disabled={!selectedUser.hasAllDocuments}
                  className={`flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    selectedUser.hasAllDocuments
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {selectedUser.hasAllDocuments ? 'Approve Verification' : 'All Documents Required'}
                </button>
                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    handleAction(selectedUser, 'reject');
                  }}
                  className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
                >
                  Reject Verification
                </button>
              </>
            )}  
              <button
                onClick={() => setShowDocumentModal(false)}
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

export default AdminAllUsers;

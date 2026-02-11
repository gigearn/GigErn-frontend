import React, { useState } from 'react';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminStoreVerifications = () => {
  const { pendingStoreVerifications, approveStoreVerification, rejectStoreVerification } = useAdminData();
  const [selectedStore, setSelectedStore] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);

  const handleApprove = (storeId) => {
    const store = pendingStoreVerifications.find(s => s.userId === storeId);
    const hasAllDocuments = store && store.hasAllDocuments;
    
    if (!hasAllDocuments) {
      alert('Cannot approve verification. All required documents must be uploaded first.');
      return;
    }
    
    if (window.confirm('Are you sure you want to approve this store verification?')) {
      approveStoreVerification(storeId);
      setSelectedStore(null);
    }
  };

  const handleReject = (storeId) => {
    setSelectedStore(storeId);
    setShowRejectModal(true);
  };

  const confirmReject = () => {
    if (rejectReason.trim()) {
      rejectStoreVerification(selectedStore, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedStore(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'rejected': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingStoreVerifications.length}</p>
              <p className="text-sm text-muted-foreground">Pending Verifications</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Approved Today</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="XCircle" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Rejected Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification List */}
      <div className="space-y-4">
        {pendingStoreVerifications.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No Pending Verifications</h3>
            <p className="text-muted-foreground">All store verifications are up to date</p>
          </div>
        ) : (
          pendingStoreVerifications.map((store, index) => (
            <div key={`${store.userId}-${index}`} className="border border-border rounded-lg bg-card overflow-hidden">
              {/* Store Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{store.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning`}>
                        {store.verificationStatus.toUpperCase()}
                      </span>
                      {!store.hasAllDocuments && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-destructive/10 text-destructive">
                          DOCUMENTS MISSING
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="text-foreground">{store.email}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="text-foreground">{store.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Registered</p>
                        <p className="text-foreground">{formatDate(store.registeredAt)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleApprove(store.userId)}
                      disabled={!store.hasAllDocuments}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        store.hasAllDocuments 
                          ? 'bg-success text-success-foreground hover:bg-success/90' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                      title={store.hasAllDocuments ? 'Approve verification' : 'All required documents must be uploaded first'}
                    >
                      <Icon name="Check" size={16} className="mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(store.userId)}
                      className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                      <Icon name="X" size={16} className="mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="p-6">
                <h4 className="font-medium text-foreground mb-4">Uploaded Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(store.requiredDocuments || []).map((doc) => {
                    const uploadedDoc = store.documents && store.documents[doc.id];
                    const isUploaded = !!uploadedDoc && uploadedDoc.uploaded;
                    
                    return (
                      <div key={doc.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-foreground">{doc.name}</span>
                          <span className={`text-sm ${getDocumentStatusColor(isUploaded ? 'verified' : 'pending')}`}>
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
              </div>
            </div>
          ))
        )}
      </div>

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Reject Verification</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide a reason for rejecting this store verification.
            </p>
            
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Enter rejection reason..."
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows={4}
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmReject}
                disabled={!rejectReason.trim()}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
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

export default AdminStoreVerifications;

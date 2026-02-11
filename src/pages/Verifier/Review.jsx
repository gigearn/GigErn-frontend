import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';
import { useAuth } from '../../contexts/AuthContext';
import { createAuditLog, AUDIT_ACTIONS, REJECTION_REASONS } from '../../utils/auditLog';

const ReviewEntity = () => {
  const { entityType, entityId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { allUsers, approveStoreVerification, approveGigVerification, rejectStoreVerification, rejectGigVerification } = useAdminData();
  
  const [entity, setEntity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionNotes, setRejectionNotes] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadEntity();
  }, [entityType, entityId]);

  const loadEntity = () => {
    setLoading(true);
    const foundEntity = allUsers.find(u => u.id === entityId && u.role === entityType);
    
    if (!foundEntity) {
      navigate('/verify/queue');
      return;
    }

    setEntity(foundEntity);
    setLoading(false);
  };

  const handleApprove = () => {
    if (!entity.hasAllDocuments) {
      alert('Cannot approve verification. All required documents must be uploaded first.');
      return;
    }
    
    setAction('approve');
    setShowConfirmModal(true);
  };

  const handleReject = () => {
    if (!rejectionReason) {
      alert('Please select a rejection reason.');
      return;
    }
    
    setAction('reject');
    setShowConfirmModal(true);
  };

  const handleRequestReupload = () => {
    if (!rejectionReason) {
      alert('Please select a reason for re-upload request.');
      return;
    }
    
    setAction('request_reupload');
    setShowConfirmModal(true);
  };

  const confirmAction = async () => {
    setProcessing(true);
    
    try {
      const auditData = {
        entityType,
        entityId,
        verifierId: user.id,
        verifierName: user.name,
      };

      switch (action) {
        case 'approve':
          if (entityType === 'store') {
            approveStoreVerification(entityId);
          } else {
            approveGigVerification(entityId);
          }
          
          createAuditLog({
            ...auditData,
            action: AUDIT_ACTIONS.APPROVED,
          });
          break;

        case 'reject':
          if (entityType === 'store') {
            rejectStoreVerification(entityId, rejectionNotes);
          } else {
            rejectGigVerification(entityId, rejectionNotes);
          }
          
          createAuditLog({
            ...auditData,
            action: AUDIT_ACTIONS.REJECTED,
            reason: rejectionReason,
            notes: rejectionNotes,
          });
          break;

        case 'request_reupload':
          // This would trigger a re-upload request
          createAuditLog({
            ...auditData,
            action: AUDIT_ACTIONS.REQUESTED_REUPLOAD,
            reason: rejectionReason,
            notes: rejectionNotes,
          });
          break;
      }

      // Navigate back to queue
      navigate('/verify/queue');
      
    } catch (error) {
      console.error('Error processing verification:', error);
      alert('An error occurred while processing the verification. Please try again.');
    } finally {
      setProcessing(false);
      setShowConfirmModal(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!entity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Entity Not Found</h2>
          <p className="text-muted-foreground mb-4">The verification request you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/verify/queue')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Queue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-full px-6 pb-6" 
      style={{ 
        paddingTop: '0px !important', 
        marginTop: '0px !important',
        position: 'relative',
        top: '0px'
      }}
    >
      {/* Header */}
      <div 
        className="mb-4" 
        style={{ 
          marginTop: '0px !important',
          paddingTop: '0px !important'
        }}
      >
        <button
          onClick={() => navigate('/verify/queue')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
        >
          <Icon name="ArrowLeft" size={16} />
          Back to Queue
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {entityType === 'store' ? 'Store' : 'Gig'} Verification Review
            </h1>
            <p className="text-muted-foreground">
              Reviewing: {entity.name}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              entity.verificationStatus === 'pending' 
                ? 'bg-warning/10 text-warning' 
                : 'bg-success/10 text-success'
            }`}>
              {entity.verificationStatus.toUpperCase()}
            </span>
            {!entity.hasAllDocuments && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-destructive/10 text-destructive">
                DOCUMENTS MISSING
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Entity Information */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Entity Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-foreground">{entity.name}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-foreground">{entity.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="text-foreground">{entity.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Registered</p>
            <p className="text-foreground">{formatDate(entity.registeredAt)}</p>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Uploaded Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(entity.requiredDocuments || []).map((doc, index) => {
            const uploadedDoc = entity.documents?.[doc.id];
            const isUploaded = !!uploadedDoc?.uploaded;
            
            return (
              <div key={`doc-${doc.id}-${index}`} className="border border-border rounded-lg p-4">
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
      </div>

      {/* Previous Rejections */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Previous Rejections</h2>
        {/* This would show previous rejection history from audit logs */}
        <p className="text-muted-foreground">No previous rejections found.</p>
      </div>

      {/* Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Verification Actions</h2>
        
        <div className="space-y-4">
          {/* Rejection Reason */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Rejection Reason (if rejecting)
            </label>
            <select
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a reason...</option>
              <option value={REJECTION_REASONS.BLURRY_DOC}>Blurry Document</option>
              <option value={REJECTION_REASONS.MISMATCH}>Information Mismatch</option>
              <option value={REJECTION_REASONS.EXPIRED}>Expired Document</option>
              <option value={REJECTION_REASONS.INCOMPLETE}>Incomplete Information</option>
              <option value={REJECTION_REASONS.FAKE}>Fake Document</option>
              <option value={REJECTION_REASONS.POOR_QUALITY}>Poor Quality</option>
              <option value={REJECTION_REASONS.INVALID_FORMAT}>Invalid Format</option>
              <option value={REJECTION_REASONS.MISSING_INFO}>Missing Information</option>
            </select>
          </div>

          {/* Rejection Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Notes (optional)
            </label>
            <textarea
              value={rejectionNotes}
              onChange={(e) => setRejectionNotes(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Provide additional details about your decision..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleApprove}
              disabled={!entity.hasAllDocuments || processing}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                entity.hasAllDocuments && !processing
                  ? 'bg-success text-success-foreground hover:bg-success/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {processing ? 'Processing...' : 'Approve Verification'}
            </button>
            
            <button
              onClick={handleReject}
              disabled={!rejectionReason || processing}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                rejectionReason && !processing
                  ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {processing ? 'Processing...' : 'Reject Verification'}
            </button>
            
            <button
              onClick={handleRequestReupload}
              disabled={!rejectionReason || processing}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                rejectionReason && !processing
                  ? 'bg-warning text-warning-foreground hover:bg-warning/90'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {processing ? 'Processing...' : 'Request Re-upload'}
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Confirm {action === 'approve' ? 'Approval' : action === 'reject' ? 'Rejection' : 'Re-upload Request'}
            </h3>
            
            <p className="text-muted-foreground mb-6">
              Are you sure you want to {action} this verification? This action will be logged and cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={confirmAction}
                disabled={processing}
                className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                  processing
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : action === 'approve' 
                      ? 'bg-success text-success-foreground hover:bg-success/90'
                      : action === 'reject'
                        ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        : 'bg-warning text-warning-foreground hover:bg-warning/90'
                }`}
              >
                {processing ? 'Processing...' : 'Confirm'}
              </button>
              
              <button
                onClick={() => setShowConfirmModal(false)}
                disabled={processing}
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

export default ReviewEntity;

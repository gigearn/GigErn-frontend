import React, { useState } from 'react';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreDocuments = () => {
  const [uploading, setUploading] = useState(false);

  // Mock data - in real app, this would come from hooks/API
  const documents = [
    {
      id: 'DOC-001',
      type: 'GST Certificate',
      fileName: 'gst_certificate.pdf',
      fileSize: '2.4 MB',
      status: 'verified',
      expiryDate: '2025-12-31',
      uploadedDate: '2024-01-15',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'DOC-002',
      type: 'Business License',
      fileName: 'business_license.pdf',
      fileSize: '1.8 MB',
      status: 'verified',
      expiryDate: '2025-06-30',
      uploadedDate: '2024-01-15',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'DOC-003',
      type: 'Address Proof',
      fileName: 'address_proof.pdf',
      fileSize: '1.2 MB',
      status: 'verified',
      expiryDate: null,
      uploadedDate: '2024-01-15',
      lastUpdated: '2024-01-15'
    },
    {
      id: 'DOC-004',
      type: 'PAN Card',
      fileName: 'pan_card.pdf',
      fileSize: '0.8 MB',
      status: 'pending',
      expiryDate: null,
      uploadedDate: '2024-01-29',
      lastUpdated: '2024-01-29'
    }
  ];

  const requiredDocuments = [
    'GST Certificate',
    'Business License',
    'Address Proof',
    'PAN Card'
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      verified: { label: 'Verified', className: 'bg-success/10 text-success' },
      pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
      rejected: { label: 'Rejected', className: 'bg-error/10 text-error' },
      expired: { label: 'Expired', className: 'bg-error/10 text-error' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  };

  const isExpired = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  const handleFileUpload = (docType) => {
    // In real app, this would open file picker and upload
    console.log('Uploading document for:', docType);
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  const handleDownload = (docId) => {
    // In real app, this would download the document
    console.log('Downloading document:', docId);
  };

  const handleReplace = (docId) => {
    // In real app, this would allow replacing the document
    console.log('Replacing document:', docId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Documents</h1>
        <p className="text-muted-foreground">Compliance and document management</p>
      </div>

      {/* Compliance Status */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Compliance Status</h3>
          <Icon name="Shield" size={18} className="text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-semibold text-success">3</div>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-warning">1</div>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-error">0</div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-warning">1</div>
            <p className="text-sm text-muted-foreground">Expiring Soon</p>
          </div>
        </div>
      </div>

      {/* Required Documents */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Required Documents</h3>
          <p className="text-sm text-muted-foreground">All documents must be valid and verified</p>
        </div>
        
        <div className="divide-y divide-border">
          {requiredDocuments.map((docType) => {
            const doc = documents.find(d => d.type === docType);
            
            return (
              <div key={docType} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted/50">
                      <Icon name="FileText" size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground">{docType}</h4>
                      {doc ? (
                        <div className="mt-1 space-y-1">
                          <p className="text-xs text-muted-foreground">
                            {doc.fileName} • {doc.fileSize}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Uploaded: {doc.uploadedDate}
                            {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground mt-1">Not uploaded</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {doc && (
                      <>
                        {isExpiringSoon(doc.expiryDate) && !isExpired(doc.expiryDate) && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                            Expiring Soon
                          </span>
                        )}
                        {isExpired(doc.expiryDate) && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-error/10 text-error">
                            Expired
                          </span>
                        )}
                        {getStatusBadge(doc.status)}
                      </>
                    )}
                    
                    <div className="flex items-center gap-2">
                      {doc ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="Download"
                            iconPosition="left"
                            onClick={() => handleDownload(doc.id)}
                          >
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            iconName="RefreshCw"
                            iconPosition="left"
                            onClick={() => handleReplace(doc.id)}
                          >
                            Replace
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="default"
                          size="sm"
                          iconName="Upload"
                          iconPosition="left"
                          onClick={() => handleFileUpload(docType)}
                          disabled={uploading}
                        >
                          {uploading ? 'Uploading...' : 'Upload'}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Document Guidelines */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Document Guidelines</h3>
          <Icon name="Info" size={18} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Accepted Formats</p>
              <p className="text-xs text-muted-foreground">
                PDF, JPG, PNG (Max file size: 10MB)
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Document Quality</p>
              <p className="text-xs text-muted-foreground">
                Clear, readable, and all information visible
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Replacement Policy</p>
              <p className="text-xs text-muted-foreground">
                Documents can be replaced but not deleted. Previous versions are kept for audit purposes.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon name="Clock" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Verification Time</p>
              <p className="text-xs text-muted-foreground">
                Documents are typically verified within 24-48 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Notice */}
      <div className="rounded-xl border border-error/20 bg-error/5 p-4">
        <div className="flex items-start gap-3">
          <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Important Notice</p>
            <p className="text-xs text-muted-foreground">
              Expired or invalid documents will result in suspension of your store account. 
              Ensure all documents are valid and up-to-date to maintain uninterrupted service. 
              You will receive notifications before documents expire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDocuments;

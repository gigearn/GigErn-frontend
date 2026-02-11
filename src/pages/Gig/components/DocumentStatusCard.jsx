import React from 'react';
import Icon from '@/components/elements/Icon';
import Button from '@/components/elements/Button';

const DocumentStatusCard = ({ documents, onUpload, onViewDetails }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'expired':
        return 'text-error bg-error/10';
      case 'rejected':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle2';
      case 'pending':
        return 'Clock';
      case 'expired':
        return 'AlertCircle';
      case 'rejected':
        return 'XCircle';
      default:
        return 'FileText';
    }
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const allDocumentsVerified = documents?.every(doc => doc?.status === 'verified');
  const hasExpiredDocs = documents?.some(doc => doc?.status === 'expired');
  const hasExpiringSoon = documents?.some(doc => isExpiringSoon(doc?.expiryDate));

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Document Verification</h2>
        {allDocumentsVerified && (
          <span className="inline-flex items-center gap-2 rounded-md bg-success/10 px-3 py-1.5 text-sm font-medium text-success">
            <Icon name="CheckCircle2" size={16} />
            All Verified
          </span>
        )}
      </div>
      {hasExpiredDocs && (
        <div className="mb-6 rounded-lg bg-error/10 p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-error mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-error mb-1">Action Required</p>
              <p className="text-sm text-error">
                Your account is suspended due to expired documents. Please upload valid documents to continue accessing shift opportunities.
              </p>
            </div>
          </div>
        </div>
      )}
      {hasExpiringSoon && !hasExpiredDocs && (
        <div className="mb-6 rounded-lg bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-warning mb-1">Documents Expiring Soon</p>
              <p className="text-sm text-warning">
                Some of your documents will expire within 30 days. Please upload renewed documents to avoid account suspension.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {documents?.map((doc) => (
          <div
            key={doc?.id}
            className="rounded-lg border border-border bg-muted/30 p-4 hover:bg-muted/50 transition-colors duration-250"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <Icon name="FileText" size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-1">{doc?.name}</h3>
                  <p className="text-xs text-muted-foreground">{doc?.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium flex-shrink-0 ${getStatusColor(doc?.status)}`}>
                <Icon name={getStatusIcon(doc?.status)} size={12} />
                {doc?.status?.charAt(0)?.toUpperCase() + doc?.status?.slice(1)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              {doc?.uploadDate && (
                <div className="text-xs">
                  <p className="text-muted-foreground mb-1">Uploaded</p>
                  <p className="text-foreground font-medium">{formatDate(doc?.uploadDate)}</p>
                </div>
              )}
              {doc?.expiryDate && (
                <div className="text-xs">
                  <p className="text-muted-foreground mb-1">Expires</p>
                  <p className={`font-medium ${
                    doc?.status === 'expired' ? 'text-error' : 
                    isExpiringSoon(doc?.expiryDate) ? 'text-warning': 'text-foreground'
                  }`}>
                    {formatDate(doc?.expiryDate)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {(doc?.status === 'expired' || doc?.status === 'rejected' || !doc?.uploadDate) && (
                <Button
                  variant="default"
                  size="sm"
                  fullWidth
                  onClick={() => onUpload(doc?.id)}
                  iconName="Upload"
                  iconPosition="left"
                >
                  {doc?.uploadDate ? 'Re-upload' : 'Upload'}
                </Button>
              )}
              {doc?.uploadDate && (
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => onViewDetails(doc?.id)}
                  iconName="Eye"
                  iconPosition="left"
                >
                  View Details
                </Button>
              )}
            </div>

            {doc?.rejectionReason && (
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-error/10 p-3">
                <Icon name="AlertCircle" size={14} className="text-error mt-0.5 flex-shrink-0" />
                <div className="text-xs text-error">
                  <p className="font-medium mb-1">Rejection Reason:</p>
                  <p>{doc?.rejectionReason}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-lg bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Document Requirements</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>All documents must be valid and not expired</li>
              <li>Documents are reviewed within 24-48 hours</li>
              <li>You'll receive reminders 30 and 7 days before expiry</li>
              <li>Account will be suspended if documents expire</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentStatusCard;
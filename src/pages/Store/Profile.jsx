import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import { useAuth } from '../../hooks/useAuth';
import verifiedBadge from '../../assets/image.png';

const StoreProfile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Mock data - in real app, this would come from hooks/API
  const storeData = {
    name: 'FreshMart Grocery',
    ownerName: 'Rajesh Kumar',
    email: 'rajesh@freshmart.com',
    phone: '+91 98765 43210',
    address: '123 Main Street, Koramangala, Bangalore, Karnataka 560034',
    gstin: '29AAAPL1234C1ZV',
    verificationStatus: 'verified',
    registrationDate: '2024-01-15',
    storeType: 'Grocery Store',
    businessHours: '8:00 AM - 10:00 PM'
  };

  const documents = [
    {
      id: 'DOC-001',
      type: 'GST Certificate',
      status: 'verified',
      expiryDate: '2025-12-31',
      uploadedDate: '2024-01-15'
    },
    {
      id: 'DOC-002',
      type: 'Business License',
      status: 'verified',
      expiryDate: '2025-06-30',
      uploadedDate: '2024-01-15'
    },
    {
      id: 'DOC-003',
      type: 'Address Proof',
      status: 'verified',
      expiryDate: null,
      uploadedDate: '2024-01-15'
    }
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

  const getVerificationBadge = (status) => {
    const statusConfig = {
      verified: { 
        label: 'Verified Store', 
        className: 'bg-success/10 text-success',
        icon: 'CheckCircle'
      },
      pending: { 
        label: 'Verification Pending', 
        className: 'bg-warning/10 text-warning',
        icon: 'Clock'
      }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${config.className}`}>
        <Icon name={config.icon} size={16} />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    );
  };

  const isExpiringSoon = (expiryDate) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Store Profile</h1>
        <p className="text-muted-foreground">Store identity and verification status</p>
      </div>

      {/* Verification Status */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Verification Status</h3>
          <Icon name="Shield" size={18} className="text-muted-foreground" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            {getVerificationBadge(storeData.verificationStatus)}
            <p className="text-sm text-muted-foreground mt-2">
              Registered on {storeData.registrationDate}
            </p>
          </div>
          <Button
            variant="outline"
            iconName="FileText"
            iconPosition="left"
            onClick={() => navigate('/store/profile/documents')}
          >
            Manage Documents
          </Button>
        </div>
      </div>

      {/* Store Information */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Store Information</h3>
          <Icon name="Store" size={18} className="text-muted-foreground" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Store Name</label>
              <div className="flex items-center gap-1">
                <p className="text-foreground">{storeData.name}</p>
                {user?.verificationStatus === 'verified' && (
                  <img 
                    src={verifiedBadge} 
                    alt="Verified" 
                    className="w-4 h-4 flex-shrink-0"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
              <p className="text-foreground">{storeData.ownerName}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="text-foreground">{storeData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <p className="text-foreground">{storeData.phone}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Store Type</label>
              <p className="text-foreground">{storeData.storeType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Business Hours</label>
              <p className="text-foreground">{storeData.businessHours}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">GSTIN</label>
              <p className="text-foreground">{storeData.gstin}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <p className="text-foreground text-sm">{storeData.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Document Status Overview */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Document Status</h3>
            <Button
              variant="outline"
              iconName="Eye"
              iconPosition="left"
              onClick={() => navigate('/store/profile/documents')}
            >
              View All Documents
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50">
                    <Icon name="FileText" size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{doc.type}</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded: {doc.uploadedDate}
                      {doc.expiryDate && ` • Expires: ${doc.expiryDate}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {isExpiringSoon(doc.expiryDate) && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-warning/10 text-warning">
                      Expiring Soon
                    </span>
                  )}
                  {getStatusBadge(doc.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button
            variant="outline"
            iconName="Edit"
            iconPosition="left"
            className="justify-start"
          >
            Edit Store Information
          </Button>
          <Button
            variant="outline"
            iconName="Key"
            iconPosition="left"
            className="justify-start"
          >
            Change Password
          </Button>
          <Button
            variant="outline"
            iconName="Bell"
            iconPosition="left"
            className="justify-start"
          >
            Notification Settings
          </Button>
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            className="justify-start"
          >
            Download Reports
          </Button>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Store Verification</p>
            <p className="text-xs text-muted-foreground">
              Your store must maintain valid documents to remain verified. Expired documents will affect your ability 
              to create shifts and deliveries. Keep your documents updated to ensure uninterrupted service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProfile;

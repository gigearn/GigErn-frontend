import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserManager } from '../../hooks/useUserManager';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import verifiedBadge from '../../assets/image.png';

const GigProfile = () => {
  const { user } = useAuth();
  const { userData } = useUserManager();

  // Get real data from localStorage
  const isVerified = userData?.verificationStatus === 'verified';

  // Real worker data from localStorage
  const workerData = {
    name: userData?.name || user?.name || 'Worker',
    email: userData?.email || user?.email || 'worker@example.com',
    phone: userData?.phone || user?.phone || '+91 XXXXX XXXXX',
    role: 'Delivery Partner',
    joinDate: userData?.joinDate || new Date().toISOString().split('T')[0],
    currentLayer: userData?.currentLayer || 'Associated',
    reliabilityScore: userData?.reliabilityScore || 0,
    completedJobs: userData?.completedJobs || 0,
    onTimeRate: userData?.onTimeRate || 0,
    cancellationRate: userData?.cancellationRate || 0,
    averageRating: userData?.averageRating || 0,
    totalEarnings: userData?.totalEarnings || 0
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">Your worker profile and performance metrics</p>
      </div>

      {/* Profile Overview */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Icon name="User" size={24} />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <h2 className="text-xl font-semibold text-foreground">{workerData.name}</h2>
              {user?.verificationStatus === 'verified' && (
                <img 
                  src={verifiedBadge} 
                  alt="Verified" 
                  className="w-5 h-5 flex-shrink-0"
                />
              )}
            </div>
            <p className="text-sm text-muted-foreground">{workerData.role}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {workerData.currentLayer}
              </span>
              <span className="text-xs text-muted-foreground">
                Member since {workerData.joinDate}
              </span>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Contact Information</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Email:</span>
                <span className="text-sm font-medium text-foreground">{workerData.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone:</span>
                <span className="text-sm font-medium text-foreground">{workerData.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Join Date:</span>
                <span className="text-sm font-medium text-foreground">{workerData.joinDate}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Performance Metrics</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Reliability Score:</span>
                <span className="text-sm font-medium text-foreground">{workerData.reliabilityScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed Jobs:</span>
                <span className="text-sm font-medium text-foreground">{workerData.completedJobs}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">On-Time Rate:</span>
                <span className="text-sm font-medium text-foreground">{workerData.onTimeRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Cancellation Rate:</span>
                <span className="text-sm font-medium text-foreground">{workerData.cancellationRate}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Rating:</span>
                <span className="text-sm font-medium text-foreground">{workerData.averageRating} ⭐</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Status Link */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Documents</h3>
            <p className="text-sm text-muted-foreground">
              {isVerified ? 'All documents verified' : 'Upload documents to get verified'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isVerified && (
              <img 
                src={verifiedBadge} 
                alt="Verified" 
                className="w-5 h-5 flex-shrink-0"
              />
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = '/gig/documents'}
            >
              {isVerified ? 'View Documents' : 'Upload Documents'}
            </Button>
          </div>
        </div>
      </div>

      {/* System Learning Info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">System Preferences</h3>
          <Icon name="Settings" size={18} className="text-muted-foreground" />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Smart Matching</p>
              <p className="text-xs text-muted-foreground">
                System learns preferences from your activity - job types, locations, and timing preferences
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Automatic Optimization</p>
              <p className="text-xs text-muted-foreground">
                Job matching improves based on your reliability score and completion history
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Performance-Based Benefits</p>
              <p className="text-xs text-muted-foreground">
                Higher reliability scores unlock better pay rates and premium job opportunities
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Account Actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Account Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            <Icon name="Phone" size={16} />
            <span>Contact Support</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            <Icon name="HelpCircle" size={16} />
            <span>Help Center</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            <Icon name="FileText" size={16} />
            <span>Terms & Conditions</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors">
            <Icon name="Shield" size={16} />
            <span>Privacy Policy</span>
          </button>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Profile Information</p>
            <p className="text-xs text-muted-foreground">
              Your profile information is automatically updated based on your activity and performance. 
              Manual editing of preferences like distance, role, and availability is not required as the system 
              learns your preferences from your job acceptance patterns and work history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigProfile;

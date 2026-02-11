import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../../components/elements/MetricCard';
import ReliabilityScoreCard from './components/ReliabilityScoreCard';
import DocumentStatusCard from './components/DocumentStatusCard';
import Icon from '../../components/elements/Icon';
import { useAuth } from '../../hooks/useAuth';
import { useUserManager } from '../../hooks/useUserManager';
import Button from '../../components/elements/Button';

const GigOverview = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userData, getDocumentProgress, getMissingDocuments } = useUserManager();

  // Get real document data from localStorage
  const documentProgress = getDocumentProgress();
  const missingDocuments = getMissingDocuments();
  const isVerified = userData?.verificationStatus === 'verified';

  // Show verification banner if not verified
  if (!isVerified) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Verification Banner */}
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/20 flex-shrink-0">
              <Icon name="AlertCircle" size={24} className="text-warning" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your account is not verified yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Please upload required documents to start using the platform and access all features.
              </p>
              
              {/* Document Progress */}
              <div className="bg-background rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">
                    Documents Uploaded: {documentProgress.uploaded}/{documentProgress.total}
                  </span>
                  <span className="text-sm font-medium">
                    {documentProgress.percentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-warning transition-all duration-300"
                    style={{ width: `${documentProgress.percentage}%` }}
                  />
                </div>
              </div>

              {/* Missing Documents */}
              {missingDocuments.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Required Documents:</p>
                  <div className="flex flex-wrap gap-2">
                    {missingDocuments.map((doc) => (
                      <span key={doc.id} className="inline-flex items-center gap-1 px-2 py-1 bg-warning/10 text-warning text-xs rounded-md">
                        <Icon name="FileText" size={12} />
                        {doc.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => navigate('/gig/profile')}
                className="bg-warning text-warning-foreground hover:bg-warning/90"
              >
                <Icon name="Upload" size={16} className="mr-2" />
                Upload Documents
              </Button>
            </div>
          </div>
        </div>

        {/* Empty State Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Earnings"
            value="₹0"
            change={0}
            icon="DollarSign"
            disabled={true}
          />
          <MetricCard
            title="Completed Shifts"
            value="0"
            change={0}
            icon="CheckCircle"
            disabled={true}
          />
          <MetricCard
            title="Active Jobs"
            value="0"
            change={0}
            icon="Briefcase"
            disabled={true}
          />
          <MetricCard
            title="Reliability Score"
            value="--"
            change={0}
            icon="TrendingUp"
            disabled={true}
          />
        </div>

        {/* Empty State Content */}
        <div className="text-center py-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
            <Icon name="Lock" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Complete Verification to Access Features
          </h3>
          <p className="text-muted-foreground mb-4">
            Upload your documents to start receiving job offers and earning money.
          </p>
          <Button
            onClick={() => navigate('/gig/profile')}
            variant="outline"
          >
            Go to Documents
          </Button>
        </div>
      </div>
    );
  }

  // For verified users, show real data or mock data
  const workerData = {
    name: userData?.name || user?.name || "Worker",
    reliabilityScore: userData?.reliabilityScore || 92,
    scoreTrend: userData?.scoreTrend || 5,
    completedShifts: userData?.completedShifts || 0,
    onTimeRate: userData?.onTimeRate || 96,
    cancellationRate: userData?.cancellationRate || 2,
    totalEarnings: userData?.totalEarnings || 0,
    pendingPayments: userData?.pendingPayments || 0,
    walletBalance: userData?.walletBalance || 0,
    isDeliveryPartner: userData?.isDeliveryPartner || true,
    currentLayer: userData?.currentLayer || 'Associated',
    jobsToNextLayer: userData?.jobsToNextLayer || 8,
    documents: userData?.uploadedDocuments || []
  };

  const upcomingWork = [
    {
      id: 1,
      type: 'Delivery',
      title: 'Restaurant Delivery',
      time: 'Today, 2:00 PM',
      pay: '₹450',
      status: 'confirmed'
    },
    {
      id: 2,
      type: 'Shift',
      title: 'Warehouse Assistant',
      time: 'Tomorrow, 9:00 AM',
      pay: '₹800',
      status: 'confirmed'
    }
  ];

  const getLayerBadge = (layer) => {
    const layerConfig = {
      'Newcomer': { label: 'Newcomer', className: 'bg-muted/10 text-muted-foreground' },
      'Associated': { label: 'Associated', className: 'bg-primary/10 text-primary' },
      'Preferred': { label: 'Preferred', className: 'bg-success/10 text-success' },
      'Elite': { label: 'Elite', className: 'bg-warning/10 text-warning' }
    };
    
    const config = layerConfig[layer] || layerConfig['Newcomer'];
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Overview</h1>
          <p className="text-muted-foreground">Your gig work dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          {getLayerBadge(workerData.currentLayer)}
        </div>
      </div>

      {/* Progress Hint */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Progress to Next Level</p>
              <p className="text-xs text-muted-foreground">
                Complete {workerData.jobsToNextLayer} more jobs to unlock Preferred benefits
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-foreground">{workerData.jobsToNextLayer}</p>
            <p className="text-xs text-muted-foreground">jobs remaining</p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard
          title="Total Earnings"
          value={`₹${workerData.totalEarnings.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
        />
        <MetricCard
          title="Completed Jobs"
          value={workerData.completedShifts}
          icon="CheckCircle"
          trend="up"
          trendValue="+5"
        />
        <MetricCard
          title="Reliability Score"
          value={workerData.reliabilityScore}
          icon="Award"
          trend="up"
          trendValue="+3"
        />
        <MetricCard
          title="Wallet Balance"
          value={`₹${workerData.walletBalance.toLocaleString()}`}
          icon="Wallet"
          trend="down"
          trendValue="-₹285"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {/* Reliability Score Card */}
        <ReliabilityScoreCard
          score={workerData.reliabilityScore}
          scoreTrend={workerData.scoreTrend}
          completedShifts={workerData.completedShifts}
          onTimeRate={workerData.onTimeRate}
          cancellationRate={workerData.cancellationRate}
        />

        {/* Document Status Card */}
        <DocumentStatusCard
          documents={workerData.documents}
          onUpload={(docType) => console.log('Upload document:', docType)}
        />
      </div>

      {/* Upcoming Work */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Work</h3>
          <Icon name="Calendar" size={20} className="text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {upcomingWork.map((work) => (
            <div key={work.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-4">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  work.type === 'Delivery' ? 'bg-primary/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={work.type === 'Delivery' ? 'Truck' : 'Package'} 
                    size={18} 
                    color={work.type === 'Delivery' ? 'var(--color-primary)' : 'var(--color-success)'}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{work.title}</p>
                  <p className="text-xs text-muted-foreground">{work.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">{work.pay}</p>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  work.status === 'confirmed' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {work.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GigOverview;

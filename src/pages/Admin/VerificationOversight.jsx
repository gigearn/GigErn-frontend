import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';
import { getAllVerifiersStats, getAuditLogs } from '../../utils/auditLog';

const VerificationOversight = () => {
  const { pendingStoreVerifications, pendingGigVerifications, allUsers } = useAdminData();
  const [verifierStats, setVerifierStats] = useState([]);
  const [auditData, setAuditData] = useState([]);
  const [dateRange, setDateRange] = useState('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOversightData();
  }, [dateRange]);

  const loadOversightData = () => {
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

    // Get verifier performance stats
    const stats = getAllVerifiersStats(startDate?.toISOString());
    setVerifierStats(stats);

    // Get recent audit logs
    const audit = getAuditLogs({
      startDate: startDate?.toISOString(),
    });
    setAuditData(audit.slice(0, 50)); // Last 50 entries
    
    setLoading(false);
  };

  const calculateSLA = (submittedAt) => {
    const submitted = new Date(submittedAt);
    const now = new Date();
    const diffHours = (now - submitted) / (1000 * 60 * 60);
    
    if (diffHours > 24) {
      const days = Math.floor(diffHours / 24);
      return `${days}d ${Math.floor(diffHours % 24)}h`;
    }
    return `${Math.floor(diffHours)}h ${Math.floor((diffHours % 1) * 60)}m`;
  };

  const getSLAColor = (submittedAt) => {
    const submitted = new Date(submittedAt);
    const now = new Date();
    const diffHours = (now - submitted) / (1000 * 60 * 60);
    
    if (diffHours > 24) return 'text-destructive';
    if (diffHours > 8) return 'text-warning';
    return 'text-success';
  };

  const getActionColor = (action) => {
    switch (action) {
      case 'approved':
        return 'text-success';
      case 'rejected':
        return 'text-destructive';
      case 'requested_reupload':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'approved':
        return 'CheckCircle';
      case 'rejected':
        return 'XCircle';
      case 'requested_reupload':
        return 'RefreshCw';
      default:
        return 'Clock';
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const totalPending = pendingStoreVerifications.length + pendingGigVerifications.length;
  const totalReviews = verifierStats.reduce((sum, v) => sum + v.totalReviewed, 0);
  const totalApproved = verifierStats.reduce((sum, v) => sum + v.approved, 0);
  const avgApprovalRate = totalReviews > 0 ? (totalApproved / totalReviews) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Verification Oversight</h1>
        <p className="text-muted-foreground">
          Monitor verification performance and team metrics
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Time Period:</span>
          <div className="flex gap-2">
            {[
              { value: '7d', label: 'Last 7 days' },
              { value: '30d', label: 'Last 30 days' },
              { value: '90d', label: 'Last 90 days' },
              { value: 'all', label: 'All time' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setDateRange(range.value)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  dateRange === range.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending Verifications</p>
              <p className="text-2xl font-bold text-foreground">{totalPending}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-xs text-muted-foreground">
                  Stores: {pendingStoreVerifications.length}
                </span>
                <span className="text-xs text-muted-foreground">
                  Gigs: {pendingGigVerifications.length}
                </span>
              </div>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={24} className="text-warning" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-2xl font-bold text-foreground">{totalReviews}</p>
              <p className="text-xs text-muted-foreground mt-1">
                By {verifierStats.length} verifiers
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="ClipboardList" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
              <p className="text-2xl font-bold text-foreground">{avgApprovalRate.toFixed(1)}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalApproved} of {totalReviews} approved
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
              <p className="text-sm text-muted-foreground">Active Verifiers</p>
              <p className="text-2xl font-bold text-foreground">{verifierStats.length}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Avg {verifierStats.length > 0 ? Math.round(totalReviews / verifierStats.length) : 0} reviews/agent
              </p>
            </div>
            <div className="p-3 bg-info/10 rounded-lg">
              <Icon name="Users" size={24} className="text-info" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verifier Performance */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Verifier Performance</h2>
          
          {verifierStats.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No verifier activity in selected period</p>
            </div>
          ) : (
            <div className="space-y-4">
              {verifierStats.map((verifier) => (
                <div key={verifier.verifierId} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-foreground">{verifier.verifierName}</p>
                      <p className="text-sm text-muted-foreground">{verifier.verifierId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{verifier.approvalRate.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">approval rate</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-foreground">{verifier.totalReviewed}</p>
                      <p className="text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-success">{verifier.approved}</p>
                      <p className="text-muted-foreground">Approved</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-destructive">{verifier.rejected}</p>
                      <p className="text-muted-foreground">Rejected</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Approval Rate</span>
                      <span>{verifier.approvalRate.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full transition-all duration-300"
                        style={{ width: `${verifier.approvalRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Verification Activity</h2>
          
          {auditData.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No verification activity in selected period</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {auditData.map((entry) => (
                <div key={entry.id} className="border border-border rounded-lg p-3 hover:bg-muted/30">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Icon name={getActionIcon(entry.action)} size={16} className={getActionColor(entry.action)} />
                        <span className={`text-sm font-medium ${getActionColor(entry.action)}`}>
                          {entry.action.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {entry.entityType === 'store' ? 'Store' : 'Gig'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">
                        {entry.verifierName} • {formatDate(entry.timestamp)}
                      </p>
                      {entry.reason && (
                        <p className="text-xs text-muted-foreground">
                          Reason: {entry.reason}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Pending Verifications SLA */}
      <div className="bg-card border border-border rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Pending Verifications SLA</h2>
        
        {totalPending === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <p className="text-muted-foreground">No pending verifications</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Store Verifications */}
            {pendingStoreVerifications.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-2">Store Verifications ({pendingStoreVerifications.length})</h3>
                <div className="space-y-2">
                  {pendingStoreVerifications.slice(0, 5).map((store) => (
                    <div key={store.userId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{store.name}</p>
                        <p className="text-sm text-muted-foreground">{store.email}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getSLAColor(store.registeredAt)}`}>
                          {calculateSLA(store.registeredAt)}
                        </p>
                        <p className="text-xs text-muted-foreground">waiting</p>
                      </div>
                    </div>
                  ))}
                  {pendingStoreVerifications.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{pendingStoreVerifications.length - 5} more store verifications
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Gig Verifications */}
            {pendingGigVerifications.length > 0 && (
              <div>
                <h3 className="font-medium text-foreground mb-2">Gig Verifications ({pendingGigVerifications.length})</h3>
                <div className="space-y-2">
                  {pendingGigVerifications.slice(0, 5).map((gig) => (
                    <div key={gig.userId} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{gig.name}</p>
                        <p className="text-sm text-muted-foreground">{gig.email}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${getSLAColor(gig.registeredAt)}`}>
                          {calculateSLA(gig.registeredAt)}
                        </p>
                        <p className="text-xs text-muted-foreground">waiting</p>
                      </div>
                    </div>
                  ))}
                  {pendingGigVerifications.length > 5 && (
                    <p className="text-sm text-muted-foreground text-center">
                      +{pendingGigVerifications.length - 5} more gig verifications
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationOversight;

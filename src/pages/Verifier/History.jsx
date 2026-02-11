import React, { useState, useEffect, useMemo } from 'react';
import Icon from '../../components/elements/Icon';
import { useAuth } from '../../contexts/AuthContext';
import { getVerifierStats, getAuditLogs } from '../../utils/auditLog';

const VerifierHistory = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalReviewed: 0,
    approved: 0,
    rejected: 0,
    requestedReupload: 0,
    approvalRate: 0,
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d');

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

    // Get verifier stats
    const verifierStats = getVerifierStats(user.id, startDate?.toISOString());
    setStats(verifierStats);

    // Get detailed history
    const auditHistory = getAuditLogs({
      verifierId: user.id,
      startDate: startDate?.toISOString(),
    });
    setHistory(auditHistory);
    
    setLoading(false);
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

  const getEntityTypeLabel = (entityType) => {
    return entityType === 'store' ? 'Store' : 'Gig Worker';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
        <h1 className="text-3xl font-bold text-foreground mb-2">My Verification History</h1>
        <p className="text-muted-foreground">
          Track your verification performance and review history
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Reviewed</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalReviewed}</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Icon name="ClipboardList" size={24} className="text-primary" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold text-success">{stats.approved}</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <Icon name="CheckCircle" size={24} className="text-success" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
            </div>
            <div className="p-3 bg-destructive/10 rounded-lg">
              <Icon name="XCircle" size={24} className="text-destructive" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Approval Rate</p>
              <p className="text-2xl font-bold text-foreground">{stats.approvalRate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-warning/10 rounded-lg">
              <Icon name="TrendingUp" size={24} className="text-warning" />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Approval Rate</span>
              <span className="text-sm font-medium text-foreground">{stats.approvalRate.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.approvalRate}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Rejection Rate</span>
              <span className="text-sm font-medium text-foreground">
                {stats.totalReviewed > 0 ? ((stats.rejected / stats.totalReviewed) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-destructive h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalReviewed > 0 ? (stats.rejected / stats.totalReviewed) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Re-upload Requests</span>
              <span className="text-sm font-medium text-foreground">{stats.requestedReupload}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-warning h-2 rounded-full transition-all duration-300"
                style={{ width: `${stats.totalReviewed > 0 ? (stats.requestedReupload / stats.totalReviewed) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Detailed History */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Detailed History</h2>
        
        {history.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Verification History</h3>
            <p className="text-muted-foreground">You haven't processed any verifications in the selected time period.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date & Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Entity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {history.map((entry, index) => (
                  <tr key={`history-${entry.id}-${index}`} className="hover:bg-muted/30">
                    <td className="py-3 px-4 text-sm text-foreground">
                      {formatDate(entry.timestamp)}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {entry.entityId}
                    </td>
                    <td className="py-3 px-4 text-sm text-foreground">
                      {getEntityTypeLabel(entry.entityType)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Icon name={getActionIcon(entry.action)} size={16} className={getActionColor(entry.action)} />
                        <span className={`text-sm font-medium ${getActionColor(entry.action)}`}>
                          {entry.action.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {entry.reason || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifierHistory;

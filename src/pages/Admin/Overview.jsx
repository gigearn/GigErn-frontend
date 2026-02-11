import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminOverview = () => {
  const navigate = useNavigate();
  const { getSystemStats, pendingStoreVerifications, pendingGigVerifications, blockedUsers } = useAdminData();
  const systemStats = getSystemStats();

  const getHealthIndicator = (value, thresholds = { warning: 5, critical: 10 }) => {
    if (value >= thresholds.critical) return 'destructive';
    if (value >= thresholds.warning) return 'warning';
    return 'success';
  };

  const StatCard = ({ title, value, icon, color, onClick, subtitle }) => (
    <button
      onClick={onClick}
      className="w-full text-left p-6 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}/10`}>
          <Icon name={icon} size={24} className={`text-${color}`} />
        </div>
        <div className={`w-3 h-3 rounded-full bg-${getHealthIndicator(value)}`}></div>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
      </div>
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Operations Control Panel</h1>
          <p className="text-muted-foreground">System health and status overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm font-medium text-foreground">Operational</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Pending Store Verifications"
          value={pendingStoreVerifications.length}
          icon="Store"
          color="warning"
          onClick={() => navigate('/admin/verifications/stores')}
          subtitle="Require admin review"
        />
        
        <StatCard
          title="Pending Gig Verifications"
          value={pendingGigVerifications.length}
          icon="Users"
          color="warning"
          onClick={() => navigate('/admin/verifications/gigs')}
          subtitle="Require admin review"
        />
        
        <StatCard
          title="Blocked Users"
          value={blockedUsers.length}
          icon="ShieldX"
          color="destructive"
          onClick={() => navigate('/admin/all-users')}
          subtitle="Safety or fraud issues"
        />
        
        <StatCard
          title="Total Stores"
          value={systemStats.totalStores}
          icon="Store"
          color="primary"
          onClick={() => navigate('/admin/users/stores')}
          subtitle="Registered stores"
        />
        
        <StatCard
          title="Total Gig Workers"
          value={systemStats.totalGigs}
          icon="Users"
          color="success"
          onClick={() => navigate('/admin/users/gigs')}
          subtitle="Active workers"
        />
      </div>

      {/* Issues Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-foreground">System Issues</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatCard
              title="Pending Verifications"
              value={systemStats.pendingVerifications}
              icon="Clock"
              color="warning"
              onClick={() => navigate('/admin/all-users')}
              subtitle="Need review"
            />
            
            <StatCard
              title="Verified Users"
              value={systemStats.verifiedUsers}
              icon="CheckCircle"
              color="success"
              onClick={() => navigate('/admin/all-users')}
              subtitle="Approved accounts"
            />
          </div>
        </div>

        {/* Quick Access */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Quick Access</h2>
          
          <div className="space-y-2">
            <button
              onClick={() => navigate('/admin/verifications')}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name="ShieldCheck" size={20} className="text-warning" />
                <span className="font-medium text-foreground">All Verifications</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{pendingStoreVerifications.length + pendingGigVerifications.length} pending</span>
                <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
              </div>
            </button>

            <button
              onClick={() => navigate('/admin/reports')}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name="FileText" size={20} className="text-primary" />
                <span className="font-medium text-foreground">Export Reports</span>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>

            <button
              onClick={() => navigate('/admin/settings')}
              className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon name="Settings" size={20} className="text-muted-foreground" />
                <span className="font-medium text-foreground">System Settings</span>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* System Health Summary */}
      <div className="p-6 rounded-xl border border-border bg-muted/20">
        <h2 className="text-lg font-semibold text-foreground mb-4">System Health Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-foreground">Authentication</p>
              <p className="text-xs text-muted-foreground">All systems operational</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full bg-${getHealthIndicator(pendingStoreVerifications.length + pendingGigVerifications.length, { warning: 1, critical: 5 })}`}></div>
            <div>
              <p className="text-sm font-medium text-foreground">Verification Queue</p>
              <p className="text-xs text-muted-foreground">{pendingStoreVerifications.length + pendingGigVerifications.length} items pending</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full bg-${getHealthIndicator(0, { warning: 1, critical: 3 })}`}></div>
            <div>
              <p className="text-sm font-medium text-foreground">Payment System</p>
              <p className="text-xs text-muted-foreground">All payments processing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;

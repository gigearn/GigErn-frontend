import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [actionReason, setActionReason] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = () => {
    // Create mock exception jobs for demonstration
    const mockJobs = [
      {
        id: 'job_001',
        type: 'stuck',
        title: 'Grocery Delivery - FreshMart',
        storeName: 'FreshMart Grocery',
        gigWorkerName: 'Raj Kumar',
        gigWorkerPhone: '9876543211',
        status: 'stuck',
        priority: 'high',
        createdAt: '2024-01-30T14:30:00Z',
        stuckAt: '2024-01-30T16:45:00Z',
        estimatedDuration: '2 hours',
        issue: 'Worker not responding to pickup confirmation',
        location: 'Andheri, Mumbai',
        value: 350
      },
      {
        id: 'job_002',
        type: 'failed',
        title: 'Document Delivery - Quick Services',
        storeName: 'Quick Delivery Services',
        gigWorkerName: 'Priya Singh',
        gigWorkerPhone: '9876543212',
        status: 'failed',
        priority: 'medium',
        createdAt: '2024-01-30T12:15:00Z',
        failedAt: '2024-01-30T15:20:00Z',
        estimatedDuration: '1 hour',
        issue: 'Delivery address incorrect - customer unreachable',
        location: 'Bandra, Mumbai',
        value: 200
      },
      {
        id: 'job_003',
        type: 'disputed',
        title: 'Food Delivery - Spice Kitchen',
        storeName: 'Spice Kitchen',
        gigWorkerName: 'Amit Kumar',
        gigWorkerPhone: '9876543213',
        status: 'disputed',
        priority: 'high',
        createdAt: '2024-01-30T10:00:00Z',
        disputedAt: '2024-01-30T18:30:00Z',
        estimatedDuration: '45 minutes',
        issue: 'Customer claims food was cold and incomplete',
        location: 'Powai, Mumbai',
        value: 450
      },
      {
        id: 'job_004',
        type: 'stuck',
        title: 'Package Delivery - E-Commerce Store',
        storeName: 'E-Commerce Store',
        gigWorkerName: 'Suresh Patel',
        gigWorkerPhone: '9876543214',
        status: 'stuck',
        priority: 'low',
        createdAt: '2024-01-30T09:30:00Z',
        stuckAt: '2024-01-30T13:00:00Z',
        estimatedDuration: '3 hours',
        issue: 'GPS tracking not updating - possible technical issue',
        location: 'Thane, Mumbai',
        value: 150
      }
    ];
    setJobs(mockJobs);
  };

  const handleAction = (jobId, type) => {
    setSelectedJob(jobId);
    setActionType(type);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (actionReason.trim()) {
      // Update job status based on action
      setJobs(prev => prev.map(job => 
        job.id === selectedJob 
          ? { 
              ...job, 
              status: actionType === 'resolved' ? 'resolved' : 
                     actionType === 'refunded' ? 'refunded' : 'escalated',
              resolvedAt: new Date().toISOString(),
              resolutionReason: actionReason,
              adminAction: actionType
            }
          : job
      ));
      
      setShowActionModal(false);
      setActionReason('');
      setSelectedJob(null);
      setActionType('');
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filter === 'all') return true;
    return job.type === filter;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'stuck': return 'text-warning';
      case 'failed': return 'text-destructive';
      case 'disputed': return 'text-warning';
      case 'resolved': return 'text-success';
      case 'refunded': return 'text-primary';
      case 'escalated': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'stuck': return 'Clock';
      case 'failed': return 'XCircle';
      case 'disputed': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const stats = {
    total: jobs.length,
    stuck: jobs.filter(j => j.type === 'stuck').length,
    failed: jobs.filter(j => j.type === 'failed').length,
    disputed: jobs.filter(j => j.type === 'disputed').length,
    highPriority: jobs.filter(j => j.priority === 'high').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Exception Handling</h1>
          <p className="text-muted-foreground">Manage stuck, failed, and disputed jobs</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/10">
              <Icon name="AlertTriangle" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Issues</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.stuck}</p>
              <p className="text-sm text-muted-foreground">Stuck Jobs</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="XCircle" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.failed}</p>
              <p className="text-sm text-muted-foreground">Failed Jobs</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.disputed}</p>
              <p className="text-sm text-muted-foreground">Disputed</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="Zap" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.highPriority}</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Issues', count: stats.total },
            { id: 'stuck', label: 'Stuck', count: stats.stuck },
            { id: 'failed', label: 'Failed', count: stats.failed },
            { id: 'disputed', label: 'Disputed', count: stats.disputed }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                filter === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No Issues Found</h3>
            <p className="text-muted-foreground">All jobs are running smoothly</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <div key={job.id} className="border border-border rounded-lg bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={getTypeIcon(job.type)} size={20} className={getStatusColor(job.status)} />
                    <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)} bg-current/10`}>
                      {job.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(job.status)} bg-current/10`}>
                      {job.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-muted-foreground">Store</p>
                      <p className="text-foreground">{job.storeName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Worker</p>
                      <p className="text-foreground">{job.gigWorkerName}</p>
                      <p className="text-xs text-muted-foreground">{job.gigWorkerPhone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="text-foreground">{job.location}</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-foreground mb-1">Issue Details:</p>
                    <p className="text-sm text-muted-foreground">{job.issue}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                    <div>
                      <p>Created: {formatDate(job.createdAt)}</p>
                    </div>
                    <div>
                      <p>Duration: {job.estimatedDuration}</p>
                    </div>
                    <div>
                      <p>Value: ₹{job.value}</p>
                    </div>
                    <div>
                      {job.stuckAt && <p>Stuck at: {formatDate(job.stuckAt)}</p>}
                      {job.failedAt && <p>Failed at: {formatDate(job.failedAt)}</p>}
                      {job.disputedAt && <p>Disputed at: {formatDate(job.disputedAt)}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleAction(job.id, 'resolved')}
                    className="px-3 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors text-sm"
                  >
                    <Icon name="Check" size={14} className="mr-1" />
                    Resolve
                  </button>
                  <button
                    onClick={() => handleAction(job.id, 'refunded')}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Icon name="CreditCard" size={14} className="mr-1" />
                    Refund
                  </button>
                  <button
                    onClick={() => handleAction(job.id, 'escalated')}
                    className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
                  >
                    <Icon name="ArrowUp" size={14} className="mr-1" />
                    Escalate
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {actionType === 'resolved' && 'Mark as Resolved'}
              {actionType === 'refunded' && 'Process Refund'}
              {actionType === 'escalated' && 'Escalate for Manual Review'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {actionType === 'resolved' && 'Mark this job issue as resolved. Please provide details about the resolution.'}
              {actionType === 'refunded' && 'Process a refund for this job. Please specify the refund reason.'}
              {actionType === 'escalated' && 'Escalate this issue for manual review. Please provide details for the review team.'}
            </p>
            
            <textarea
              value={actionReason}
              onChange={(e) => setActionReason(e.target.value)}
              placeholder={`Enter ${actionType} reason...`}
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground resize-none"
              rows={4}
            />
            
            <div className="flex gap-3 mt-4">
              <button
                onClick={confirmAction}
                disabled={!actionReason.trim()}
                className={`flex-1 px-4 py-2 rounded-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === 'resolved' ? 'bg-success text-success-foreground' :
                  actionType === 'refunded' ? 'bg-primary text-primary-foreground' :
                  'bg-destructive text-destructive-foreground'
                }`}
              >
                {actionType === 'resolved' && 'Mark Resolved'}
                {actionType === 'refunded' && 'Process Refund'}
                {actionType === 'escalated' && 'Escalate'}
              </button>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setActionReason('');
                  setSelectedJob(null);
                  setActionType('');
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

export default AdminJobs;

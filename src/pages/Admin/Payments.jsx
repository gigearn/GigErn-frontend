import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [actionReason, setActionReason] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    // Create mock payment issues for demonstration
    const mockPayments = [
      {
        id: 'pay_001',
        type: 'failed',
        gigWorkerName: 'Raj Kumar',
        gigWorkerPhone: '9876543211',
        storeName: 'FreshMart Grocery',
        jobId: 'job_001',
        amount: 350,
        fee: 35,
        netAmount: 315,
        status: 'failed',
        priority: 'high',
        createdAt: '2024-01-30T16:45:00Z',
        failedAt: '2024-01-30T16:50:00Z',
        retryCount: 2,
        issue: 'Bank server timeout - payment gateway unresponsive',
        paymentMethod: 'UPI',
        transactionId: 'TXN123456789',
        walletBalance: 2450
      },
      {
        id: 'pay_002',
        type: 'stuck',
        gigWorkerName: 'Priya Singh',
        gigWorkerPhone: '9876543212',
        storeName: 'Quick Delivery Services',
        jobId: 'job_002',
        amount: 200,
        fee: 20,
        netAmount: 180,
        status: 'stuck',
        priority: 'medium',
        createdAt: '2024-01-30T15:20:00Z',
        stuckAt: '2024-01-30T15:25:00Z',
        retryCount: 1,
        issue: 'Payment processing for over 30 minutes - possible network issue',
        paymentMethod: 'Wallet',
        transactionId: 'TXN987654321',
        walletBalance: 3200
      },
      {
        id: 'pay_003',
        type: 'mismatch',
        gigWorkerName: 'Amit Kumar',
        gigWorkerPhone: '9876543213',
        storeName: 'Spice Kitchen',
        jobId: 'job_003',
        amount: 450,
        fee: 45,
        netAmount: 405,
        status: 'mismatch',
        priority: 'high',
        createdAt: '2024-01-30T18:30:00Z',
        detectedAt: '2024-01-30T18:35:00Z',
        retryCount: 0,
        issue: 'Wallet balance mismatch - expected ₹3200, found ₹2795',
        paymentMethod: 'Wallet',
        transactionId: 'TXN456789123',
        walletBalance: 2795
      },
      {
        id: 'pay_004',
        type: 'suspicious',
        gigWorkerName: 'Suresh Patel',
        gigWorkerPhone: '9876543214',
        storeName: 'E-Commerce Store',
        jobId: 'job_004',
        amount: 150,
        fee: 15,
        netAmount: 135,
        status: 'suspicious',
        priority: 'medium',
        createdAt: '2024-01-30T13:00:00Z',
        flaggedAt: '2024-01-30T13:05:00Z',
        retryCount: 0,
        issue: 'Multiple rapid payment attempts from same IP address',
        paymentMethod: 'UPI',
        transactionId: 'TXN789123456',
        walletBalance: 1850
      }
    ];
    setPayments(mockPayments);
  };

  const handleAction = (paymentId, type) => {
    setSelectedPayment(paymentId);
    setActionType(type);
    setShowActionModal(true);
  };

  const confirmAction = () => {
    if (actionReason.trim()) {
      // Update payment status based on action
      setPayments(prev => prev.map(payment => 
        payment.id === selectedPayment 
          ? { 
              ...payment, 
              status: actionType === 'retried' ? 'retried' : 
                     actionType === 'refunded' ? 'refunded' : 'flagged',
              resolvedAt: new Date().toISOString(),
              resolutionReason: actionReason,
              adminAction: actionType
            }
          : payment
      ));
      
      setShowActionModal(false);
      setActionReason('');
      setSelectedPayment(null);
      setActionType('');
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    return payment.type === filter;
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
      case 'failed': return 'text-destructive';
      case 'stuck': return 'text-warning';
      case 'mismatch': return 'text-warning';
      case 'suspicious': return 'text-destructive';
      case 'retried': return 'text-primary';
      case 'refunded': return 'text-success';
      case 'flagged': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'failed': return 'XCircle';
      case 'stuck': return 'Clock';
      case 'mismatch': return 'AlertTriangle';
      case 'suspicious': return 'ShieldX';
      default: return 'HelpCircle';
    }
  };

  const stats = {
    total: payments.length,
    failed: payments.filter(p => p.type === 'failed').length,
    stuck: payments.filter(p => p.type === 'stuck').length,
    mismatch: payments.filter(p => p.type === 'mismatch').length,
    suspicious: payments.filter(p => p.type === 'suspicious').length,
    totalAmount: payments.reduce((acc, p) => acc + p.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Money Safety Panel</h1>
          <p className="text-muted-foreground">Monitor failed payments and wallet discrepancies</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Total at Risk</p>
          <p className="text-2xl font-bold text-destructive">₹{stats.totalAmount.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted/10">
              <Icon name="CreditCard" size={20} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.total}</p>
              <p className="text-sm text-muted-foreground">Total Issues</p>
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
              <p className="text-sm text-muted-foreground">Failed</p>
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
              <p className="text-sm text-muted-foreground">Stuck</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <Icon name="AlertTriangle" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.mismatch}</p>
              <p className="text-sm text-muted-foreground">Mismatch</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Icon name="ShieldX" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.suspicious}</p>
              <p className="text-sm text-muted-foreground">Suspicious</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {[
            { id: 'all', label: 'All Issues', count: stats.total },
            { id: 'failed', label: 'Failed', count: stats.failed },
            { id: 'stuck', label: 'Stuck', count: stats.stuck },
            { id: 'mismatch', label: 'Mismatch', count: stats.mismatch },
            { id: 'suspicious', label: 'Suspicious', count: stats.suspicious }
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

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground">No Payment Issues</h3>
            <p className="text-muted-foreground">All payments are processing normally</p>
          </div>
        ) : (
          filteredPayments.map((payment) => (
            <div key={payment.id} className="border border-border rounded-lg bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name={getTypeIcon(payment.type)} size={20} className={getStatusColor(payment.status)} />
                    <h3 className="text-lg font-semibold text-foreground">Payment Issue - Job #{payment.jobId}</h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(payment.priority)} bg-current/10`}>
                      {payment.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)} bg-current/10`}>
                      {payment.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <p className="text-muted-foreground">Worker</p>
                      <p className="text-foreground">{payment.gigWorkerName}</p>
                      <p className="text-xs text-muted-foreground">{payment.gigWorkerPhone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Store</p>
                      <p className="text-foreground">{payment.storeName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="text-foreground">₹{payment.amount} (Fee: ₹{payment.fee})</p>
                      <p className="text-xs text-muted-foreground">Net: ₹{payment.netAmount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Method</p>
                      <p className="text-foreground">{payment.paymentMethod}</p>
                      <p className="text-xs text-muted-foreground">Wallet: ₹{payment.walletBalance}</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/20 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-foreground mb-1">Issue Details:</p>
                    <p className="text-sm text-muted-foreground">{payment.issue}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                    <div>
                      <p>Created: {formatDate(payment.createdAt)}</p>
                    </div>
                    <div>
                      <p>Retry Count: {payment.retryCount}</p>
                    </div>
                    <div>
                      <p>Transaction ID: {payment.transactionId}</p>
                    </div>
                    <div>
                      {payment.failedAt && <p>Failed at: {formatDate(payment.failedAt)}</p>}
                      {payment.stuckAt && <p>Stuck at: {formatDate(payment.stuckAt)}</p>}
                      {payment.detectedAt && <p>Detected at: {formatDate(payment.detectedAt)}</p>}
                      {payment.flaggedAt && <p>Flagged at: {formatDate(payment.flaggedAt)}</p>}
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleAction(payment.id, 'retried')}
                    className="px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm"
                  >
                    <Icon name="RefreshCw" size={14} className="mr-1" />
                    Retry
                  </button>
                  <button
                    onClick={() => handleAction(payment.id, 'refunded')}
                    className="px-3 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90 transition-colors text-sm"
                  >
                    <Icon name="CreditCard" size={14} className="mr-1" />
                    Refund
                  </button>
                  <button
                    onClick={() => handleAction(payment.id, 'flagged')}
                    className="px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors text-sm"
                  >
                    <Icon name="Flag" size={14} className="mr-1" />
                    Flag
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
              {actionType === 'retried' && 'Retry Payment'}
              {actionType === 'refunded' && 'Process Refund'}
              {actionType === 'flagged' && 'Flag Suspicious Activity'}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {actionType === 'retried' && 'Retry this payment processing. Please specify the reason for retry.'}
              {actionType === 'refunded' && 'Process a refund for this failed payment. Please provide refund details.'}
              {actionType === 'flagged' && 'Flag this payment as suspicious activity for further investigation.'}
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
                  actionType === 'retried' ? 'bg-primary text-primary-foreground' :
                  actionType === 'refunded' ? 'bg-success text-success-foreground' :
                  'bg-destructive text-destructive-foreground'
                }`}
              >
                {actionType === 'retried' && 'Retry Payment'}
                {actionType === 'refunded' && 'Process Refund'}
                {actionType === 'flagged' && 'Flag Activity'}
              </button>
              <button
                onClick={() => {
                  setShowActionModal(false);
                  setActionReason('');
                  setSelectedPayment(null);
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

export default AdminPayments;

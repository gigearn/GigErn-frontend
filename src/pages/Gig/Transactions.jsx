import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const GigTransactions = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from hooks/API
  const transactions = [
    {
      id: 'TXN-001',
      type: 'payment',
      description: 'Delivery - Restaurant Point to HSR Layout',
      amount: 320,
      date: '2024-01-30',
      time: '3:45 PM',
      status: 'completed',
      jobId: 'JOB-001'
    },
    {
      id: 'TXN-002',
      type: 'payment',
      description: 'Shift - Warehouse Assistant',
      amount: 850,
      date: '2024-01-29',
      time: '6:30 PM',
      status: 'completed',
      jobId: 'JOB-002'
    },
    {
      id: 'TXN-003',
      type: 'pending',
      description: 'Delivery - QuickMart Express',
      amount: 285,
      date: '2024-01-30',
      time: '2:15 PM',
      status: 'pending',
      jobId: 'JOB-003'
    },
    {
      id: 'TXN-004',
      type: 'payment',
      description: 'Shift - Retail Store Assistant',
      amount: 450,
      date: '2024-01-28',
      time: '11:20 AM',
      status: 'completed',
      jobId: 'JOB-004'
    },
    {
      id: 'TXN-005',
      type: 'payment',
      description: 'Delivery - FoodHub Delivery',
      amount: 380,
      date: '2024-01-27',
      time: '4:10 PM',
      status: 'completed',
      jobId: 'JOB-005'
    }
  ];

  const getTransactionIcon = (type) => {
    return type === 'payment' ? 'ArrowDown' : 'ArrowUp';
  };

  const getTransactionColor = (type) => {
    return type === 'payment' ? 'text-success' : 'text-error';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: 'Completed', className: 'bg-success/10 text-success' },
      pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
      failed: { label: 'Failed', className: 'bg-error/10 text-error' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Transaction History</h1>
          <p className="text-muted-foreground">Complete payment and earnings history</p>
        </div>
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => navigate('/gig/earnings')}
        >
          Back to Earnings
        </Button>
      </div>

      {/* Transactions List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">All Transactions</h3>
            <Icon name="Receipt" size={18} className="text-muted-foreground" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Job ID
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{transaction.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{transaction.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'payment' ? '+' : '-'}₹{Math.abs(transaction.amount).toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{transaction.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{transaction.time}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(transaction.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{transaction.jobId}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Completed</span>
            <Icon name="CheckCircle" size={16} className="text-success" />
          </div>
          <p className="text-2xl font-semibold text-foreground">4</p>
          <p className="text-xs text-muted-foreground">transactions</p>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Pending</span>
            <Icon name="Clock" size={16} className="text-warning" />
          </div>
          <p className="text-2xl font-semibold text-warning">1</p>
          <p className="text-xs text-muted-foreground">transaction</p>
        </div>
        
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
            <Icon name="DollarSign" size={16} className="text-primary" />
          </div>
          <p className="text-2xl font-semibold text-foreground">₹2,285</p>
          <p className="text-xs text-muted-foreground">completed</p>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Payment Information</p>
            <p className="text-xs text-muted-foreground">
              Payments are processed within 24-48 hours after job completion. 
              Completed payments appear in your wallet balance and are available for withdrawal.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigTransactions;

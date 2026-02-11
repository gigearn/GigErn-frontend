import React from 'react';
import { useNavigate } from 'react-router-dom';
import MetricCard from '../../components/elements/MetricCard';
import EarningsCard from './components/EarningsCard';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const GigEarnings = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from hooks/API
  const earningsData = {
    totalEarnings: 3847.50,
    pendingPayments: 285.00,
    walletBalance: 1250.75,
    thisWeekEarnings: 1250.00,
    lastWeekEarnings: 980.00,
    completedJobs: 47,
    averagePerJob: 81.86
  };

  const recentTransactions = [
    {
      id: 'TXN-001',
      type: 'payment',
      description: 'Delivery - Restaurant Point to HSR Layout',
      amount: 320,
      date: '2024-01-30',
      status: 'completed'
    },
    {
      id: 'TXN-002',
      type: 'payment',
      description: 'Shift - Warehouse Assistant',
      amount: 850,
      date: '2024-01-29',
      status: 'completed'
    },
    {
      id: 'TXN-003',
      type: 'pending',
      description: 'Delivery - QuickMart Express',
      amount: 285,
      date: '2024-01-30',
      status: 'pending'
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
          <h1 className="text-2xl font-semibold text-foreground mb-2">Earnings</h1>
          <p className="text-muted-foreground">Your income and payment history</p>
        </div>
        <Button
          variant="outline"
          iconName="List"
          iconPosition="left"
          onClick={() => navigate('/gig/earnings/transactions')}
        >
          View All Transactions
        </Button>
      </div>

      {/* Earnings Stability */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="TrendingUp" size={20} className="text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">Earnings Stability</p>
              <p className="text-xs text-muted-foreground">
                Earnings stability over last 7 days: Stable (+27% from last week)
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold text-success">+27%</p>
            <p className="text-xs text-muted-foreground">vs last week</p>
          </div>
        </div>
      </div>

      {/* Earnings Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard
          title="Total Earnings"
          value={`₹${earningsData.totalEarnings.toLocaleString()}`}
          icon="DollarSign"
          trend="up"
          trendValue="+12%"
        />
        <MetricCard
          title="Pending"
          value={`₹${earningsData.pendingPayments.toLocaleString()}`}
          icon="Clock"
          trend="up"
          trendValue="+2"
        />
        <MetricCard
          title="Wallet Balance"
          value={`₹${earningsData.walletBalance.toLocaleString()}`}
          icon="Wallet"
          trend="down"
          trendValue="-₹285"
        />
        <MetricCard
          title="Avg per Job"
          value={`₹${earningsData.averagePerJob.toFixed(2)}`}
          icon="TrendingUp"
          trend="up"
          trendValue="+5%"
        />
      </div>

      {/* Earnings Card */}
      <EarningsCard
        totalEarnings={earningsData.totalEarnings}
        pendingPayments={earningsData.pendingPayments}
        walletBalance={earningsData.walletBalance}
        thisWeekEarnings={earningsData.thisWeekEarnings}
        lastWeekEarnings={earningsData.lastWeekEarnings}
        completedJobs={earningsData.completedJobs}
        averagePerJob={earningsData.averagePerJob}
      />

      {/* Recent Transactions */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Icon name="Receipt" size={18} className="text-muted-foreground" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Transaction
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
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Icon 
                        name={getTransactionIcon(transaction.type)} 
                        size={16} 
                        className={getTransactionColor(transaction.type)}
                      />
                      <span className="text-sm font-medium text-foreground">{transaction.id}</span>
                    </div>
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
                    {getStatusBadge(transaction.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Payment Processing</p>
            <p className="text-xs text-muted-foreground">
              Payments are processed within 24-48 hours after job completion. 
              Pending payments will appear in your wallet balance once processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigEarnings;

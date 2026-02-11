import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreWallet = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from hooks/API
  const walletData = {
    balance: 12500,
    upcomingDeductions: 2500,
    availableBalance: 10000
  };

  const transactions = [
    {
      id: 'TXN-1001',
      type: 'deduction',
      description: 'Shift Payment - 3 Workers',
      amount: -1500,
      date: '2024-01-30',
      status: 'completed'
    },
    {
      id: 'TXN-1002',
      type: 'deduction',
      description: 'Delivery Payment - 2 Partners',
      amount: -800,
      date: '2024-01-29',
      status: 'completed'
    },
    {
      id: 'TXN-1003',
      type: 'topup',
      description: 'Wallet Recharge',
      amount: 5000,
      date: '2024-01-28',
      status: 'completed'
    },
    {
      id: 'TXN-1004',
      type: 'deduction',
      description: 'Shift Payment - 1 Worker',
      amount: -500,
      date: '2024-01-27',
      status: 'pending'
    }
  ];

  const upcomingPayments = [
    {
      id: 'UP-1001',
      description: 'Morning Shift - 2 Workers',
      amount: 1200,
      date: '2024-01-31'
    },
    {
      id: 'UP-1002',
      description: 'Delivery Jobs - 3 Partners',
      amount: 1300,
      date: '2024-01-31'
    }
  ];

  const getTransactionIcon = (type) => {
    return type === 'deduction' ? 'ArrowUp' : 'ArrowDown';
  };

  const getTransactionColor = (type) => {
    return type === 'deduction' ? 'text-error' : 'text-success';
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
          <h1 className="text-2xl font-semibold text-foreground mb-2">Wallet</h1>
          <p className="text-muted-foreground">Financial clarity and transaction history</p>
        </div>
        <Button
          variant="outline"
          iconName="List"
          iconPosition="left"
          onClick={() => navigate('/store/wallet/transactions')}
        >
          View All Transactions
        </Button>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Current Balance</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Wallet" size={18} color="var(--color-primary)" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-foreground mb-1">
            ₹{walletData.balance.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total wallet balance</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Upcoming Deductions</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Icon name="Clock" size={18} color="var(--color-warning)" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-warning mb-1">
            -₹{walletData.upcomingDeductions.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Pending payments</p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Available Balance</h3>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Icon name="CheckCircle" size={18} color="var(--color-success)" />
            </div>
          </div>
          <div className="text-2xl font-semibold text-success mb-1">
            ₹{walletData.availableBalance.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Available for operations</p>
        </div>
      </div>

      {/* Upcoming Payments */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Upcoming Payments</h3>
          <Icon name="Calendar" size={18} className="text-muted-foreground" />
        </div>
        <div className="space-y-3">
          {upcomingPayments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm font-medium text-foreground">{payment.description}</p>
                <p className="text-xs text-muted-foreground">Due on {payment.date}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">₹{payment.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
            </div>
          ))}
        </div>
      </div>

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
              {transactions.map((transaction) => (
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
                      {transaction.type === 'deduction' ? '-' : '+'}₹{Math.abs(transaction.amount).toLocaleString()}
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
            <p className="text-sm font-medium text-foreground">Automatic Payments</p>
            <p className="text-xs text-muted-foreground">
              Payments are automatically processed when shifts and deliveries are completed. 
              Ensure sufficient wallet balance to avoid service interruptions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreWallet;

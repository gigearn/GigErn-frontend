import React from 'react';
import Icon from '@/components/elements/Icon';
import Button from '@/components/elements/Button';

const EarningsCard = ({ totalEarnings, pendingPayments, walletBalance, recentTransactions, onViewAll }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'shift_payment':
        return 'DollarSign';
      case 'delivery_payment':
        return 'Truck';
      case 'bonus':
        return 'Gift';
      case 'withdrawal':
        return 'ArrowDownCircle';
      default:
        return 'DollarSign';
    }
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground">Earnings Overview</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
        <div className="rounded-lg bg-primary/10 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
              <Icon name="Wallet" size={20} color="var(--color-primary)" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Wallet Balance</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-primary">{formatCurrency(walletBalance)}</p>
        </div>

        <div className="rounded-lg bg-success/10 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/20">
              <Icon name="TrendingUp" size={20} color="var(--color-success)" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Total Earned</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-success">{formatCurrency(totalEarnings)}</p>
        </div>

        <div className="rounded-lg bg-warning/10 p-4 md:p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/20">
              <Icon name="Clock" size={20} color="var(--color-warning)" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Pending</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-warning">{formatCurrency(pendingPayments)}</p>
        </div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold text-foreground mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions?.map((transaction) => (
            <div
              key={transaction?.id}
              className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3 md:p-4 hover:bg-muted/50 transition-colors duration-250"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 ${
                  transaction?.type === 'withdrawal' ? 'bg-error/10' : 'bg-success/10'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={18} 
                    color={transaction?.type === 'withdrawal' ? 'var(--color-error)' : 'var(--color-success)'} 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{transaction?.description}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(transaction?.date)}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-3">
                <p className={`text-base md:text-lg font-semibold ${
                  transaction?.type === 'withdrawal' ? 'text-error' : 'text-success'
                }`}>
                  {transaction?.type === 'withdrawal' ? '-' : '+'}{formatCurrency(transaction?.amount)}
                </p>
                <p className="text-xs text-muted-foreground">{transaction?.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 rounded-lg bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Payment Schedule</p>
            <p>Shift payments are processed daily. Delivery payments are processed after successful completion and customer verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsCard;
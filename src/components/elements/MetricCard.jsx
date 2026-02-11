import React from 'react';
import Icon from './Icon';

const MetricCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  trendLabel = 'vs last period',
  onClick,
  className = '',
}) => {
  const isPositiveTrend = trend === 'up';
  const trendIcon = isPositiveTrend ? 'TrendingUp' : 'TrendingDown';
  const trendColorClass = isPositiveTrend ? 'text-success' : 'text-error';

  return (
    <div
      className={`rounded-lg border border-border bg-card p-6 ${onClick ? 'cursor-pointer hover:shadow-elevation-sm transition-shadow duration-200' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon name={icon} size={20} color="var(--color-primary)" />
        </div>
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      {trendValue && (
        <div className={`flex items-center gap-1 text-sm ${trendColorClass}`}>
          <Icon name={trendIcon} size={16} />
          <span className="font-medium">{trendValue}</span>
          <span className="text-muted-foreground">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default MetricCard;

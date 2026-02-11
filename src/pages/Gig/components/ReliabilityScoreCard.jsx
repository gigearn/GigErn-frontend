import React from 'react';
import Icon from '@/components/elements/Icon';

const ReliabilityScoreCard = ({ score, trend, completedShifts, onTimeRate, cancellationRate }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-success/10';
    if (score >= 70) return 'bg-warning/10';
    return 'bg-error/10';
  };

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 70) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full ${getScoreBgColor(score)}`}>
            <span className={`text-3xl md:text-4xl font-bold ${getScoreColor(score)}`}>{score}</span>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-1">Reliability Score</h2>
            <p className={`text-sm md:text-base font-medium ${getScoreColor(score)}`}>{getScoreLabel(score)}</p>
            {trend && (
              <div className="flex items-center gap-1 mt-2 text-sm">
                <Icon name={trend > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} className={trend > 0 ? 'text-success' : 'text-error'} />
                <span className={trend > 0 ? 'text-success' : 'text-error'}>
                  {Math.abs(trend)} points this week
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="text-center">
            <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-primary/10 mx-auto mb-2">
              <Icon name="CheckCircle2" size={20} color="var(--color-primary)" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{completedShifts}</p>
            <p className="text-xs md:text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="text-center">
            <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-success/10 mx-auto mb-2">
              <Icon name="Clock" size={20} color="var(--color-success)" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{onTimeRate}%</p>
            <p className="text-xs md:text-sm text-muted-foreground">On Time</p>
          </div>
          <div className="text-center">
            <div className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-lg bg-error/10 mx-auto mb-2">
              <Icon name="XCircle" size={20} color="var(--color-error)" />
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{cancellationRate}%</p>
            <p className="text-xs md:text-sm text-muted-foreground">Cancelled</p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">How to improve your score:</p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Complete all confirmed shifts on time</li>
              <li>Submit both 24-hour and 6-hour confirmations</li>
              <li>Maintain valid document verification</li>
              <li>Avoid last-minute cancellations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReliabilityScoreCard;
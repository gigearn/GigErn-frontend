import React from 'react';
import Icon from '../../../components/elements/Icon';
import Button from '../../../components/elements/Button';

const ShiftCard = ({ shift, onViewDetails, onManageWorkers }) => {
  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-success/10 text-success',
      pending: 'bg-warning/10 text-warning',
      active: 'bg-primary/10 text-primary',
      completed: 'bg-muted text-muted-foreground',
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      confirmed: 'CheckCircle2',
      pending: 'Clock',
      active: 'Activity',
      completed: 'Check',
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6 transition-all duration-250 hover:shadow-elevation-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-1 truncate">
              {shift?.role}
            </h3>
            <p className="text-sm text-muted-foreground">
              {shift?.date} • {shift?.time}
            </p>
          </div>
          <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap ${getStatusColor(shift?.status)}`}>
            <Icon name={getStatusIcon(shift?.status)} size={16} />
            <span className="capitalize">{shift?.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Users" size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Workers</p>
              <p className="text-sm font-semibold text-foreground">{shift?.confirmedWorkers}/{shift?.requiredWorkers}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
              <Icon name="IndianRupee" size={16} className="text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pay Rate</p>
              <p className="text-sm font-semibold text-foreground">₹{shift?.payRate}/hr</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Icon name="Clock" size={16} className="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Duration</p>
              <p className="text-sm font-semibold text-foreground">{shift?.duration}h</p>
            </div>
          </div>

          
        </div>

        {shift?.priority && (
          <div className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-2">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">Priority Shift - Higher Pay</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(shift)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => onManageWorkers(shift)}
            iconName="Users"
            iconPosition="left"
            className="flex-1"
          >
            Manage Workers
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShiftCard;

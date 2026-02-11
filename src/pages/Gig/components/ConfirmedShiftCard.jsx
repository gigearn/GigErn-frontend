import React, { useState, useEffect } from 'react';
import Icon from '@/components/elements/Icon';
import Button from '@/components/elements/Button';

const ConfirmedShiftCard = ({ shift, onConfirm, onCancel }) => {
  const [timeUntilShift, setTimeUntilShift] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState({
    twentyFourHour: shift?.twentyFourHourConfirmed || false,
    sixHour: shift?.sixHourConfirmed || false,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const shiftDateTime = new Date(`${shift.date} ${shift.startTime}`);
      const now = new Date();
      const diff = shiftDateTime - now;
      
      if (diff <= 0) {
        setTimeUntilShift('Shift started');
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        setTimeUntilShift(`${days} day${days > 1 ? 's' : ''} ${hours % 24}h`);
      } else {
        setTimeUntilShift(`${hours}h ${minutes}m`);
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000);
    return () => clearInterval(interval);
  }, [shift?.date, shift?.startTime]);

  const needsTwentyFourHourConfirmation = () => {
    const shiftDateTime = new Date(`${shift.date} ${shift.startTime}`);
    const now = new Date();
    const hoursUntilShift = (shiftDateTime - now) / (1000 * 60 * 60);
    return hoursUntilShift <= 24 && hoursUntilShift > 6 && !confirmationStatus?.twentyFourHour;
  };

  const needsSixHourConfirmation = () => {
    const shiftDateTime = new Date(`${shift.date} ${shift.startTime}`);
    const now = new Date();
    const hoursUntilShift = (shiftDateTime - now) / (1000 * 60 * 60);
    return hoursUntilShift <= 6 && !confirmationStatus?.sixHour;
  };

  const isLocked = () => {
    const shiftDateTime = new Date(`${shift.date} ${shift.startTime}`);
    const now = new Date();
    const hoursUntilShift = (shiftDateTime - now) / (1000 * 60 * 60);
    return hoursUntilShift <= 12;
  };

  const handleConfirmation = (type) => {
    if (type === '24hour') {
      setConfirmationStatus(prev => ({ ...prev, twentyFourHour: true }));
    } else if (type === '6hour') {
      setConfirmationStatus(prev => ({ ...prev, sixHour: true }));
    }
    onConfirm(shift?.id, type);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const [hours, minutes] = timeString?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="rounded-xl border border-border bg-card p-4 md:p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">{shift?.role}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <Icon name="MapPin" size={14} />
            <span className="truncate">{shift?.storeName}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-1 text-xs font-medium text-success">
            <Icon name="CheckCircle2" size={12} />
            Confirmed
          </span>
          {isLocked() && (
            <Icon name="Lock" size={16} className="text-muted-foreground" />
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Calendar" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-foreground truncate">{formatDate(shift?.date)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Clock" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-foreground">{formatTime(shift?.startTime)} - {formatTime(shift?.endTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="DollarSign" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-foreground font-medium">${shift?.payRate}/hour</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Timer" size={16} className="text-muted-foreground flex-shrink-0" />
          <span className="text-foreground">{timeUntilShift}</span>
        </div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <Icon 
              name={confirmationStatus?.twentyFourHour ? "CheckCircle2" : "Circle"} 
              size={18} 
              className={confirmationStatus?.twentyFourHour ? "text-success" : "text-muted-foreground"} 
            />
            <span className="text-sm font-medium text-foreground">24-hour confirmation</span>
          </div>
          {confirmationStatus?.twentyFourHour ? (
            <span className="text-xs text-success">Completed</span>
          ) : needsTwentyFourHourConfirmation() ? (
            <span className="text-xs text-warning font-medium">Required</span>
          ) : (
            <span className="text-xs text-muted-foreground">Pending</span>
          )}
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
          <div className="flex items-center gap-2">
            <Icon 
              name={confirmationStatus?.sixHour ? "CheckCircle2" : "Circle"} 
              size={18} 
              className={confirmationStatus?.sixHour ? "text-success" : "text-muted-foreground"} 
            />
            <span className="text-sm font-medium text-foreground">6-hour confirmation</span>
          </div>
          {confirmationStatus?.sixHour ? (
            <span className="text-xs text-success">Completed</span>
          ) : needsSixHourConfirmation() ? (
            <span className="text-xs text-warning font-medium">Required</span>
          ) : (
            <span className="text-xs text-muted-foreground">Pending</span>
          )}
        </div>
      </div>
      {(needsTwentyFourHourConfirmation() || needsSixHourConfirmation()) && (
        <div className="mb-4 rounded-lg bg-warning/10 p-3">
          <div className="flex items-start gap-2">
            <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
            <div className="text-sm text-warning">
              <p className="font-medium mb-1">Confirmation Required</p>
              <p className="text-xs">
                {needsTwentyFourHourConfirmation() 
                  ? "Please confirm your attendance within 24 hours of shift start"
                  : "Final confirmation required within 6 hours of shift start"}
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center gap-3">
        {needsTwentyFourHourConfirmation() && (
          <Button
            variant="default"
            fullWidth
            onClick={() => handleConfirmation('24hour')}
            iconName="CheckCircle2"
            iconPosition="left"
          >
            Confirm (24h)
          </Button>
        )}
        {needsSixHourConfirmation() && (
          <Button
            variant="default"
            fullWidth
            onClick={() => handleConfirmation('6hour')}
            iconName="CheckCircle2"
            iconPosition="left"
          >
            Confirm (6h)
          </Button>
        )}
        {!isLocked() && !needsTwentyFourHourConfirmation() && !needsSixHourConfirmation() && (
          <Button
            variant="outline"
            fullWidth
            onClick={() => onCancel(shift?.id)}
            iconName="XCircle"
            iconPosition="left"
          >
            Cancel Shift
          </Button>
        )}
        <Button
          variant="outline"
          size="icon"
          onClick={() => {}}
        >
          <Icon name="MapPin" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default ConfirmedShiftCard;
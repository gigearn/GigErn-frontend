import React from 'react';
import Icon from '../../../components/elements/Icon';
import Button from "../../../components/elements/Button";
import verifiedBadge from '../../../assets/image.png';

const DeliveryCard = ({ delivery, onTrack, onViewDetails }) => {
  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-warning/10 text-warning',
      accepted: 'bg-primary/10 text-primary',
      'in-transit': 'bg-accent/10 text-accent',
      delivered: 'bg-success/10 text-success',
      failed: 'bg-error/10 text-error',
      assigned: 'bg-success/10 text-success'
    };
    return colors?.[status] || 'bg-muted text-muted-foreground';
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: 'Clock',
      accepted: 'CheckCircle2',
      'in-transit': 'Truck',
      delivered: 'PackageCheck',
      failed: 'XCircle',
      assigned: 'CheckCircle'
    };
    return icons?.[status] || 'Package';
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4 md:p-6 transition-all duration-250 hover:shadow-elevation-md">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-base md:text-lg font-semibold text-foreground">
                #{delivery?.id}
              </h3>
              {delivery?.urgent && (
                <span className="flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  <Icon name="Zap" size={12} />
                  Urgent
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Created: {delivery?.createdAt}
            </p>
          </div>
          <div className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs md:text-sm font-medium whitespace-nowrap ${getStatusColor(delivery?.status)}`}>
            <Icon name={getStatusIcon(delivery?.status)} size={16} />
            <span className="capitalize">{delivery?.status?.replace('-', ' ')}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
              <Icon name="User" size={16} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Customer</p>
              <p className="text-sm font-medium text-foreground">{delivery?.customerName}</p>
              <p className="text-xs text-muted-foreground">{delivery?.customerPhone}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 flex-shrink-0">
              <Icon name="MapPin" size={16} className="text-secondary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Delivery Address</p>
              <p className="text-sm font-medium text-foreground line-clamp-2">{delivery?.address}</p>
              {delivery?.digiPin && (
                <p className="text-xs text-primary mt-1">DigiPIN: {delivery?.digiPin}</p>
              )}
            </div>
          </div>

          {delivery?.partner && (
            <div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium text-foreground">{delivery?.partner?.name}</p>
                  <img 
                    src={verifiedBadge} 
                    alt="Verified" 
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-accent" />
                    <span className="text-xs text-muted-foreground">{delivery?.partner?.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{delivery?.partner?.vehicle}</span>
                </div>
              </div>
              {delivery?.status === 'in-transit' && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onTrack(delivery)}
                  className="flex-shrink-0"
                >
                  <Icon name="Navigation" size={18} />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(delivery)}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          {delivery?.status === 'in-transit' && (
            <Button
              variant="default"
              size="sm"
              onClick={() => onTrack(delivery)}
              iconName="Navigation"
              iconPosition="left"
              className="flex-1"
            >
              Track Live
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeliveryCard;

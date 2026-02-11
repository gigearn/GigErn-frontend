import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreCreateDelivery = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => navigate('/store/deliveries')}
        >
          Back to Deliveries
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">Create Delivery</h1>
      </div>
      
      <div className="rounded-xl border border-border bg-card p-6">
        <p className="text-muted-foreground">Create delivery page - Coming soon</p>
      </div>
    </div>
  );
};

export default StoreCreateDelivery;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import { generateOrderID, generateDeliveryID } from '../../utils/idGenerator';

const GigActiveJob = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('in-progress');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  // Mock active job data with unique IDs
  const activeJob = {
    id: generateOrderID(),
    type: 'delivery',
    title: 'Restaurant Delivery',
    customerName: 'Priya Sharma',
    customerPhone: '+91 98765 43210',
    pickupLocation: {
      address: 'Restaurant Point, Koramangala',
      contactPerson: 'Manager',
      contactPhone: '+91 87654 32109'
    },
    deliveryLocation: {
      address: 'HSR Layout, Sector 2, Bangalore',
      landmark: 'Near BDA Complex'
    },
    timeWindow: '3:30 PM - 4:30 PM',
    pay: 320,
    estimatedTime: '25 minutes',
    status: 'in-progress',
    startedAt: '3:35 PM',
    deliveryId: generateDeliveryID(),
    orderItems: [
      { id: 1, name: 'Butter Chicken', quantity: 1 },
      { id: 2, name: 'Naan', quantity: 4 },
      { id: 3, name: 'Veg Biryani', quantity: 1 }
    ]
  };

  const handleStartDelivery = () => {
    setShowOtpInput(true);
  };

  const handleConfirmPickup = () => {
    setCurrentStep('picked-up');
  };

  const handleCompleteDelivery = () => {
    setCurrentStep('completed');
    setTimeout(() => {
      navigate('/gig/job-offers');
    }, 2000);
  };

  const handleOtpSubmit = () => {
    if (otp.length === 6) {
      handleConfirmPickup();
      setShowOtpInput(false);
      setOtp('');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'in-progress': { label: 'In Progress', className: 'bg-primary/10 text-primary' },
      'picked-up': { label: 'Picked Up', className: 'bg-warning/10 text-warning' },
      'completed': { label: 'Completed', className: 'bg-success/10 text-success' }
    };
    const badge = badges[status] || badges['in-progress'];
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${badge.className}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          iconName="ArrowLeft"
          iconPosition="left"
          onClick={() => navigate('/gig/job-offers')}
        >
          Back to Job Offers
        </Button>
        <h1 className="text-2xl font-semibold text-foreground">Active Job</h1>
        {getStatusBadge(currentStep)}
      </div>

      {/* Job Details */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{activeJob.title}</h2>
            <p className="text-muted-foreground">Order ID: {activeJob.id} • Delivery ID: {activeJob.deliveryId}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">₹{activeJob.pay}</p>
            <p className="text-sm text-muted-foreground">Estimated {activeJob.estimatedTime}</p>
          </div>
        </div>

        {/* Customer and Pickup Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Name:</span>
                <span className="text-sm font-medium text-foreground">{activeJob.customerName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone:</span>
                <span className="text-sm font-medium text-foreground">{activeJob.customerPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Delivery Address:</span>
                <span className="text-sm font-medium text-foreground text-right">{activeJob.deliveryLocation.address}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground mb-3">Pickup Information</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="text-sm font-medium text-foreground text-right">{activeJob.pickupLocation.address}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Contact:</span>
                <span className="text-sm font-medium text-foreground">{activeJob.pickupLocation.contactPerson}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Phone:</span>
                <span className="text-sm font-medium text-foreground">{activeJob.pickupLocation.contactPhone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-foreground mb-3">Order Items</h3>
          <div className="space-y-2">
            {activeJob.orderItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground">x{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {currentStep === 'in-progress' && (
            <Button
              variant="default"
              iconName="Navigation"
              iconPosition="left"
              onClick={handleStartDelivery}
              className="flex-1"
            >
              Start Delivery
            </Button>
          )}
          
          {currentStep === 'picked-up' && (
            <Button
              variant="default"
              iconName="CheckCircle"
              iconPosition="left"
              onClick={handleCompleteDelivery}
              className="flex-1"
            >
              Complete Delivery
            </Button>
          )}
          
          {currentStep === 'completed' && (
            <div className="flex-1 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-2" />
              <p className="text-lg font-medium text-foreground">Delivery Completed!</p>
              <p className="text-sm text-muted-foreground">₹{activeJob.pay} added to your earnings</p>
            </div>
          )}
          
          <Button
            variant="outline"
            iconName="Phone"
            iconPosition="left"
            className="flex-1"
          >
            Contact Support
          </Button>
        </div>
      </div>

      {/* Time Information */}
      <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Clock" size={20} className="text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">Time Window</p>
              <p className="text-xs text-muted-foreground">{activeJob.timeWindow}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">Started at</p>
            <p className="text-xs text-muted-foreground">{activeJob.startedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigActiveJob;

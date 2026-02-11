import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import { generateOrderID, generateDeliveryID } from '../../utils/idGenerator';

// Simple card components since they're missing
const DeliveryOpportunityCard = ({ delivery, onAccept, onDecline, isLoading }) => (
  <div className="bg-card border border-border rounded-lg p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">{delivery.title || 'Delivery Job'}</h3>
      <span className="text-2xl font-bold text-success">₹{delivery.pay}</span>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon name="MapPin" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{delivery.pickupLocation}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="Navigation" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{delivery.deliveryLocation}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="Clock" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{delivery.timeWindow}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="Route" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{delivery.distance}</span>
      </div>
    </div>
    
    <div className="flex gap-3">
      <Button
        variant="default"
        iconName="Check"
        iconPosition="left"
        onClick={onAccept}
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading ? 'Accepting...' : 'Accept Job'}
      </Button>
      <Button
        variant="outline"
        iconName="X"
        iconPosition="left"
        onClick={onDecline}
        disabled={isLoading}
        className="flex-1"
      >
        Decline
      </Button>
    </div>
  </div>
);

const ShiftOpportunityCard = ({ shift, onAccept, onDecline, isLoading }) => (
  <div className="bg-card border border-border rounded-lg p-6 space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-foreground">{shift.role || 'Shift Job'}</h3>
      <span className="text-2xl font-bold text-success">₹{shift.pay}</span>
    </div>
    
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon name="Building" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{shift.company}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="Clock" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">{shift.duration}</span>
      </div>
      <div className="flex items-center gap-2">
        <Icon name="Star" size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Reliability: {shift.reliabilityRequired}</span>
      </div>
    </div>
    
    <div className="flex gap-3">
      <Button
        variant="default"
        iconName="Check"
        iconPosition="left"
        onClick={onAccept}
        disabled={isLoading}
        className="flex-1"
      >
        {isLoading ? 'Accepting...' : 'Accept Job'}
      </Button>
      <Button
        variant="outline"
        iconName="X"
        iconPosition="left"
        onClick={onDecline}
        disabled={isLoading}
        className="flex-1"
      >
        Decline
      </Button>
    </div>
  </div>
);

const GigJobOffers = () => {
  const navigate = useNavigate();
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [countdown, setCountdown] = useState(45);
  const [acceptedOffers, setAcceptedOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate IDs once using useMemo to prevent regeneration
  const jobOffers = useMemo(() => [
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'delivery',
      title: 'Restaurant Delivery',
      storeName: 'Spice Garden',
      pickupLocation: 'Koramangala, Bangalore',
      deliveryLocation: 'HSR Layout, Bangalore',
      distance: '2.5 km',
      estimatedTime: '25 minutes',
      pay: 320,
      timeWindow: '3:30 PM - 4:30 PM',
      difficulty: 'Easy',
      requirements: ['Smartphone', 'Vehicle'],
      rating: 4.8
    },
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'delivery',
      title: 'Grocery Delivery',
      storeName: 'FreshMart',
      pickupLocation: 'Indiranagar, Bangalore',
      deliveryLocation: 'Whitefield, Bangalore',
      distance: '8.2 km',
      estimatedTime: '45 minutes',
      pay: 450,
      timeWindow: '4:00 PM - 5:00 PM',
      difficulty: 'Medium',
      requirements: ['Smartphone', 'Vehicle', 'GPS'],
      rating: 4.6
    },
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'delivery',
      title: 'Package Delivery',
      storeName: 'QuickShip',
      pickupLocation: 'Electronic City, Bangalore',
      deliveryLocation: 'Marathahalli, Bangalore',
      distance: '12.1 km',
      estimatedTime: '55 minutes',
      pay: 580,
      timeWindow: '4:30 PM - 5:30 PM',
      difficulty: 'Medium',
      requirements: ['Smartphone', 'Vehicle', 'GPS'],
      rating: 4.5
    },
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'shift',
      title: 'Warehouse Assistant',
      role: 'Warehouse Assistant',
      company: 'LogiCorp',
      location: 'Electronic City, Bangalore',
      duration: '6 hours',
      pay: 1200,
      timeWindow: '2:00 PM - 8:00 PM',
      difficulty: 'Easy',
      requirements: ['Smartphone', 'Physical Fitness'],
      rating: 4.4,
      reliabilityRequired: 85
    },
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'shift',
      title: 'Event Staff',
      role: 'Event Staff',
      company: 'EventPro',
      location: 'Koramangala, Bangalore',
      duration: '4 hours',
      pay: 800,
      timeWindow: '6:00 PM - 10:00 PM',
      difficulty: 'Easy',
      requirements: ['Smartphone', 'Customer Service'],
      rating: 4.7,
      reliabilityRequired: 90
    },
    {
      id: generateOrderID(),
      deliveryId: generateDeliveryID(),
      type: 'delivery',
      title: 'Food Delivery',
      storeName: 'Burger King',
      pickupLocation: 'HSR Layout, Bangalore',
      deliveryLocation: 'Bellandur, Bangalore',
      distance: '5.8 km',
      estimatedTime: '30 minutes',
      pay: 380,
      timeWindow: '5:00 PM - 6:00 PM',
      difficulty: 'Easy',
      requirements: ['Smartphone', 'Vehicle'],
      rating: 4.7
    }
  ], []); // Empty dependency array means this runs only once

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 0) {
          moveToNextOffer();
          return 45; // Reset countdown to 45 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const moveToNextOffer = () => {
    const currentIndex = jobOffers.findIndex(offer => offer.id === currentOffer?.id);
    const nextIndex = (currentIndex + 1) % jobOffers.length;
    setCurrentOfferIndex(nextIndex);
  };

  const handleAccept = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    navigate('/gig/active-job');
  };

  const handleDecline = () => {
    moveToNextOffer();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      high: 'text-destructive',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors[urgency] || colors.medium;
  };

  // Get current offer from the array
  const currentOffer = jobOffers[currentOfferIndex];

  if (!currentOffer) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Icon name="Briefcase" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Job Offers Available</h3>
          <p className="text-muted-foreground">Check back later for new opportunities</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{currentOffer.title}</h3>
          <p className="text-sm text-muted-foreground">Order ID: {currentOffer.id} • Delivery ID: {currentOffer.deliveryId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Time remaining</p>
          <p className={`text-2xl font-bold ${getUrgencyColor(currentOffer.urgency)}`}>
            {formatTime(countdown)}
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center gap-2">
        {jobOffers.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              jobOffers[index].id === currentOffer.id
                ? 'bg-primary'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>

      {/* Current Offer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-foreground">Current Offer</h2>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentOffer.urgency === 'high'
              ? 'bg-error/10 text-error' 
              : currentOffer.urgency === 'medium'
              ? 'bg-warning/10 text-warning'
              : 'bg-success/10 text-success'
          }`}>
            {(currentOffer.urgency || 'medium').toUpperCase()} PRIORITY
          </span>
        </div>

        {currentOffer.type === 'shift' ? (
          <ShiftOpportunityCard
            key={currentOffer.id}
            shift={{
              id: currentOffer.id,
              role: currentOffer.role,
              company: currentOffer.company,
              location: currentOffer.location,
              distance: currentOffer.distance,
              pay: currentOffer.pay,
              timeWindow: currentOffer.timeWindow,
              duration: currentOffer.duration,
              reliabilityRequired: currentOffer.reliabilityRequired
            }}
            onAccept={handleAccept}
            onDecline={handleDecline}
            isLoading={isLoading}
          />
        ) : (
          <DeliveryOpportunityCard
            key={currentOffer.id}
            delivery={{
              id: currentOffer.id,
              customerName: currentOffer.customerName,
              pickupLocation: currentOffer.pickupLocation,
              deliveryLocation: currentOffer.deliveryLocation,
              distance: currentOffer.distance,
              pay: currentOffer.pay,
              timeWindow: currentOffer.timeWindow
            }}
            onAccept={handleAccept}
            onDecline={handleDecline}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="default"
          iconName="Check"
          iconPosition="left"
          onClick={handleAccept}
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Accepting...' : 'Accept Job'}
        </Button>
        <Button
          variant="outline"
          iconName="X"
          iconPosition="left"
          onClick={handleDecline}
          disabled={isLoading}
          className="flex-1"
        >
          Decline
        </Button>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">System-Led Matching</p>
            <p className="text-xs text-muted-foreground">
              Jobs are matched to you based on your location, reliability score, and availability. 
              You have limited time to respond to each offer. Declining too many offers may affect future matching.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigJobOffers;

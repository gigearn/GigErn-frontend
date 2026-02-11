import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmedShiftCard from './components/ConfirmedShiftCard';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import { generateShiftID } from '../../utils/idGenerator';

const GigShifts = () => {
  const navigate = useNavigate();
  
  const confirmedShifts = [
    {
      id: generateShiftID(),
      role: 'Delivery Partner',
      company: 'QuickMart Express',
      location: 'Koramangala, Bangalore',
      date: '2024-01-30',
      time: '14:00 - 18:00',
      pay: 850,
      status: 'confirmed',
      lockTime: '24 hours before shift'
    },
    {
      id: generateShiftID(),
      role: 'Warehouse Assistant',
      company: 'LogiHub Solutions',
      location: 'Electronic City, Bangalore',
      date: '2024-01-31',
      time: '09:00 - 13:00',
      pay: 1200,
      status: 'confirmed',
      lockTime: '6 hours before shift'
    },
    {
      id: generateShiftID(),
      role: 'Delivery Partner',
      company: 'FoodHub Delivery',
      location: 'Indiranagar, Bangalore',
      date: '2024-02-01',
      time: '17:00 - 21:00',
      pay: 900,
      status: 'pending',
      lockTime: '24 hours before shift'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { label: 'Confirmed', className: 'bg-success/10 text-success' },
      pending: { label: 'Pending', className: 'bg-warning/10 text-warning' },
      completed: { label: 'Completed', className: 'bg-muted/10 text-muted-foreground' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">My Shifts</h1>
          <p className="text-muted-foreground">Manage your upcoming work commitments</p>
        </div>
        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/gig/shifts/create')}
        >
          Find More Shifts
        </Button>
      </div>

      {/* Confirmed Shifts */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Confirmed Shifts</h3>
          <p className="text-sm text-muted-foreground">Your upcoming work commitments</p>
        </div>
        
        <div className="divide-y divide-border">
          {confirmedShifts.map((shift) => (
            <ConfirmedShiftCard
              key={shift.id}
              shift={shift}
              onConfirm={(shiftId) => console.log('Confirmed shift:', shiftId)}
              onCancel={(shiftId) => console.log('Cancelled shift:', shiftId)}
            />
          ))}
        </div>
      </div>

      {/* Cancellation Policy */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={20} className="text-muted-foreground mt-0.5" />
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Cancellation Policy</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Cancel before lock time to avoid penalties. Late cancellations may affect your reliability score and future opportunities.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-foreground">24-hour shifts: Lock 24 hours before start time</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Clock" size={16} className="text-warning" />
                <span className="text-foreground">6-hour shifts: Lock 6 hours before start time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigShifts;

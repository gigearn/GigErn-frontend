import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreShifts = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from hooks/API
  const shifts = [
    {
      id: 1,
      role: 'Delivery Partner',
      date: '2024-01-30',
      time: '09:00 AM',
      required: 3,
      assigned: 3,
      status: 'assigned',
      confidence: 'high'
    },
    {
      id: 2,
      role: 'Warehouse Staff',
      date: '2024-01-30',
      time: '02:00 PM',
      required: 2,
      assigned: 1,
      status: 'partial',
      confidence: 'medium'
    },
    {
      id: 3,
      role: 'Delivery Partner',
      date: '2024-01-31',
      time: '10:00 AM',
      required: 4,
      assigned: 0,
      status: 'pending',
      confidence: 'low'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      assigned: { label: 'Assigned', className: 'bg-success/10 text-success' },
      partial: { label: 'Partial', className: 'bg-warning/10 text-warning' },
      pending: { label: 'Pending', className: 'bg-muted/10 text-muted-foreground' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getConfidenceBadge = (confidence) => {
    const confidenceConfig = {
      high: { label: 'High', className: 'bg-success/10 text-success' },
      medium: { label: 'Medium', className: 'bg-warning/10 text-warning' },
      low: { label: 'Low', className: 'bg-error/10 text-error' }
    };
    
    const config = confidenceConfig[confidence] || confidenceConfig.low;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Shifts</h1>
          <p className="text-muted-foreground">Shift visibility and status tracking</p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/store/shifts/create')}
        >
          Create Shift
        </Button>
      </div>

      {/* Shifts List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">All Shifts</h3>
          <p className="text-sm text-muted-foreground">Visibility into shift requirements and assignments</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Shift Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Requirements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {shifts.map((shift) => (
                <tr key={shift.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-foreground">{shift.role}</p>
                      <p className="text-xs text-muted-foreground">
                        {shift.date} at {shift.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <span className="font-medium text-foreground">{shift.assigned}</span>
                      <span className="text-muted-foreground">/{shift.required}</span>
                      <p className="text-xs text-muted-foreground">workers assigned</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(shift.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getConfidenceBadge(shift.confidence)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => navigate(`/store/shifts/${shift.id}`)}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">System Assignment</p>
            <p className="text-xs text-muted-foreground">
              Workers are automatically assigned by the system based on availability, reliability scores, and proximity. 
              Store users can view shift status but cannot manually select or contact workers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreShifts;

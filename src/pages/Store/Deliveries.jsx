import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';

const StoreDeliveries = () => {
  const navigate = useNavigate();

  // Mock data - in real app, this would come from hooks/API
  const deliveries = [
    {
      id: 'DEL-1001',
      customerName: 'Rajesh Kumar',
      status: 'in-transit',
      eta: '15 mins',
      assignedPartner: 'System Assigned',
      priority: 'normal'
    },
    {
      id: 'DEL-1002',
      customerName: 'Priya Sharma',
      status: 'assigned',
      eta: '30 mins',
      assignedPartner: 'System Assigned',
      priority: 'high'
    },
    {
      id: 'DEL-1003',
      customerName: 'Amit Patel',
      status: 'delivered',
      eta: 'Completed',
      assignedPartner: 'System Assigned',
      priority: 'normal'
    }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      'in-transit': { label: 'In Transit', className: 'bg-primary/10 text-primary' },
      'assigned': { label: 'Assigned', className: 'bg-warning/10 text-warning' },
      'delivered': { label: 'Delivered', className: 'bg-success/10 text-success' },
      'pending': { label: 'Pending', className: 'bg-muted/10 text-muted-foreground' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.className}`}>
        {config.label}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityConfig = {
      high: { label: 'High', className: 'bg-error/10 text-error' },
      normal: { label: 'Normal', className: 'bg-muted/10 text-muted-foreground' },
      low: { label: 'Low', className: 'bg-success/10 text-success' }
    };
    
    const config = priorityConfig[priority] || priorityConfig.normal;
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
          <h1 className="text-2xl font-semibold text-foreground mb-2">Deliveries</h1>
          <p className="text-muted-foreground">Track delivery jobs and assignments</p>
        </div>
        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => navigate('/store/deliveries/create')}
        >
          Create Delivery
        </Button>
      </div>

      {/* Delivery Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active</p>
              <p className="text-2xl font-semibold text-foreground">2</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Truck" size={18} color="var(--color-primary)" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Delivered</p>
              <p className="text-2xl font-semibold text-foreground">1</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Icon name="CheckCircle" size={18} color="var(--color-success)" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-foreground">0</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
              <Icon name="Clock" size={18} color="var(--color-warning)" />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Avg Time</p>
              <p className="text-2xl font-semibold text-foreground">25m</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/10">
              <Icon name="Timer" size={18} color="var(--color-muted-foreground)" />
            </div>
          </div>
        </div>
      </div>

      {/* Deliveries List */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">All Deliveries</h3>
          <p className="text-sm text-muted-foreground">Track delivery jobs and partner assignments</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Job ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  ETA
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Assigned Partner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {deliveries.map((delivery) => (
                <tr key={delivery.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-foreground">{delivery.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{delivery.customerName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(delivery.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-foreground">{delivery.eta}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-muted-foreground">{delivery.assignedPartner}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityBadge(delivery.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-primary hover:text-primary/80 font-medium">
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
              Delivery partners are automatically assigned by the system based on availability, location proximity, 
              and reliability scores. Store users can track delivery status but cannot manually select or contact partners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDeliveries;

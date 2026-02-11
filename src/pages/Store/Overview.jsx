import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import { generateShiftID, generateDeliveryID } from '../../utils/idGenerator';
import DeliveryCard from './components/DeliveryCard';
import ShiftCard from './components/ShiftCard';
import { useUserManager } from '../../hooks/useUserManager';

const StoreOverview = () => {
  const navigate = useNavigate();
  const { getDocumentProgress, getMissingDocuments, isDocumentComplete } = useUserManager();
  const todayJobs = 8;
  const activeDeliveries = 3;
  const walletBalance = 12500;
  const systemStatus = "operational";

  // Get document progress and missing documents
  const documentProgress = getDocumentProgress();
  const missingDocuments = getMissingDocuments();

  // Show notification until all documents are uploaded
  const showDocumentNotification = !isDocumentComplete();

  // Generate unique IDs for mock data (memoized to prevent regeneration on re-render)
  const recentShifts = useMemo(() => {
    // Generate IDs once and keep them constant
    const shiftIds = [generateShiftID(), generateShiftID(), generateShiftID()];
    
    return [
      {
        shiftId: shiftIds[0],
        role: 'Morning Shift',
        date: '2024-01-30',
        time: '09:00 AM',
        status: 'confirmed',
        confirmedWorkers: 2,
        requiredWorkers: 2,
        payRate: 850,
        duration: 4,
        location: 'Koramangala, Bangalore',
        priority: false
      },
      {
        shiftId: shiftIds[1],
        role: 'Evening Shift', 
        date: '2024-01-30',
        time: '02:00 PM',
        status: 'pending',
        confirmedWorkers: 1,
        requiredWorkers: 3,
        payRate: 950,
        duration: 4,
        location: 'Indiranagar, Bangalore',
        priority: true
      },
      {
        shiftId: shiftIds[2],
        role: 'Night Shift',
        date: '2024-01-30',
        time: '06:00 PM',
        status: 'pending',
        confirmedWorkers: 0,
        requiredWorkers: 2,
        payRate: 1200,
        duration: 6,
        location: 'Electronic City, Bangalore',
        priority: false
      }
    ];
  }, []);

  const activeDeliveriesList = useMemo(() => {
    // Generate IDs once and keep them constant
    const deliveryIds = [generateDeliveryID(), generateDeliveryID(), generateDeliveryID()];
    
    return [
      {
        id: deliveryIds[0],
        status: 'in-transit',
        createdAt: '2024-01-30 14:30',
        customerName: 'Priya Sharma',
        customerPhone: '+91 98765 43210',
        address: '123 MG Road, Brigade Gateway, Bangalore - 560001',
        digiPin: 'DL-2024-001',
        urgent: true,
        partner: {
          name: 'Raj Kumar',
          avatar: '/api/placeholder/40/40',
          avatarAlt: 'Delivery partner',
          rating: 4.8,
          vehicle: 'Honda Activa'
        },
        etaMinutes: 25
      },
      {
        id: deliveryIds[1],
        status: 'picked_up',
        createdAt: '2024-01-30 15:15',
        customerName: 'Amit Patel',
        customerPhone: '+91 87654 32109',
        address: '456 Residency Road, Koramangala, Bangalore - 560034',
        digiPin: 'DL-2024-002',
        urgent: false,
        partner: {
          name: 'Sneha Reddy',
          avatar: '/api/placeholder/40/40',
          avatarAlt: 'Delivery partner',
          rating: 4.6,
          vehicle: 'TVS Jupiter'
        },
        etaMinutes: 15
      },
      {
        id: deliveryIds[2],
        status: 'assigned',
        createdAt: '2024-01-30 15:45',
        customerName: 'Vikram Singh',
        customerPhone: '+91 76543 21098',
        address: '789 Commercial Street, Whitefield, Bangalore - 560066',
        digiPin: 'DL-2024-003',
        urgent: false,
        partner: {
          name: 'Arjun Mehta',
          avatar: '/api/placeholder/40/40',
          avatarAlt: 'Delivery partner',
          rating: 4.9,
          vehicle: 'Hero Splendor'
        },
        etaMinutes: 30
      }
    ];
  }, []);

  const needsAttention = systemStatus !== "operational" || walletBalance < 5000;

  const handleTrackDelivery = (delivery) => {
    console.log('Track delivery:', delivery.id);
    navigate(`/store/deliveries/track/${delivery.id}`);
  };

  const handleViewDeliveryDetails = (delivery) => {
    console.log('View delivery details:', delivery.id);
    navigate(`/store/deliveries/${delivery.id}`);
  };

  const handleViewShiftDetails = (shift) => {
    console.log('View shift details:', shift.shiftId);
    navigate(`/store/shifts/${shift.shiftId}`);
  };

  const handleManageWorkers = (shift) => {
    console.log('Manage workers for shift:', shift.shiftId);
    navigate(`/store/shifts/${shift.shiftId}/workers`);
  };

  const getStatusColor = (status) => {
    const colors = {
      assigned: "bg-success/10 text-success",
      pending: "bg-warning/10 text-warning",
      unassigned: "bg-muted/10 text-muted-foreground",
      in_transit: "bg-primary/10 text-primary",
      picked_up: "bg-accent/10 text-accent",
    };
    return colors[status] || "bg-muted/10 text-muted-foreground";
  };

  const getDeliveryStatusText = (status) => {
    const texts = {
      in_transit: "In Transit",
      picked_up: "Picked Up",
      assigned: "Assigned",
    };
    return texts[status] || status;
  };

  return (
    <div className="space-y-6">

      {/* Document Upload Notification Section */}
      {showDocumentNotification && (
        <div className="rounded-lg border border-warning/20 bg-warning/10 p-4 mb-6">
          <div className="flex items-start gap-3">
            <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-warning mb-1">Complete Your Profile</h4>
              <p className="text-sm text-warning opacity-90 mb-3">
                Upload your business documents to get verified and unlock all features like creating shifts and deliveries.
              </p>
              
              {/* Progress Bar */}
              {documentProgress.percentage > 0 && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-warning">
                      Progress: {documentProgress.uploaded}/{documentProgress.total} documents
                    </span>
                    <span className="text-xs font-medium text-warning">
                      {documentProgress.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-black/10 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300 bg-warning opacity-20"
                      style={{ width: `${documentProgress.percentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Missing Documents List */}
              {missingDocuments.length > 0 && missingDocuments.length <= 3 && (
                <div className="mb-3">
                  <p className="text-xs font-medium text-warning mb-2">Still needed:</p>
                  <ul className="space-y-1">
                    {missingDocuments.map((doc) => (
                      <li key={doc.id} className="text-xs text-warning opacity-80 flex items-center gap-1">
                        <Icon name="FileText" size={12} />
                        {doc.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => navigate('/store/profile')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-warning/20 text-warning border border-warning/20 hover:opacity-80 transition-opacity"
              >
                <Icon name="Upload" size={16} />
                Upload Documents
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact Metrics Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Metrics Box - Full Width */}
        <div className=" sm:p-6">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Today's Overview
          </h3>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Today's Jobs */}
            <div className="rounded-lg border border-border bg-card p-4 text-left">
              <h1 className="text-sm text-muted-foreground mb-1">Today's Jobs</h1>
              <p className="text-2xl font-bold text-foreground">{todayJobs}</p>
              <p className="mt-1 text-xs text-emerald-600 flex items-center gap-1">
                ✓ All jobs assigned
              </p>
            </div>

            {/* Active Deliveries */}
            <div className="rounded-lg border border-border bg-card p-4 text-left">
              <h1 className="text-sm text-muted-foreground mb-1">
                Active Deliveries
              </h1>
              <p className="text-2xl font-bold text-foreground">
                {activeDeliveries}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Longest ETA: 35 min
              </p>
            </div>

            {/* Wallet Balance */}
            <div className="rounded-lg border border-border bg-card p-4 text-left">
              <h1 className="text-sm text-muted-foreground mb-1">
                Wallet Balance
              </h1>
              <p className="text-2xl font-bold text-foreground">
                ₹{walletBalance.toLocaleString()}
              </p>
              <p className="mt-1 text-xs text-emerald-600">
                Sufficient for today
              </p>
            </div>

            {/* System Status */}
            <div className="rounded-lg border border-border bg-card p-4 text-left">
              <h1 className="text-sm text-muted-foreground mb-1">
                System Status
              </h1>
              <p className="text-lg font-semibold text-emerald-700">
                Operational
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                No action required
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Needs Attention Strip (Conditional) */}
      {needsAttention && (
        <div className="rounded-lg border border-warning/20 bg-warning/5 p-4">
          <div className="flex items-center gap-3">
            <Icon name="AlertCircle" size={20} className="text-warning" />
            <div className="flex-1">
              <p className="text-sm font-medium text-warning">
                Needs Attention
              </p>
              <div className="mt-1 space-y-1">
                {walletBalance < 5000 && (
                  <p className="text-xs text-warning">
                    ⚠️ Wallet balance low - top up needed
                  </p>
                )}
                {systemStatus !== "operational" && (
                  <p className="text-xs text-warning">
                    ⚠️ System issues detected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-foreground">Recent Shifts</h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/store/shifts/create")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-success-foreground hover:bg-success/90 transition-colors text-sm font-medium"
              >
                <Icon name="Plus" size={16} />
                Create Shift
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {recentShifts.slice(0, 3).map((shift) => (
              <ShiftCard
                key={shift.shiftId}
                shift={shift}
                onViewDetails={handleViewShiftDetails}
                onManageWorkers={handleManageWorkers}
              />
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-semibold text-foreground">Active Deliveries</h3>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate("/store/deliveries/create")}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                <Icon name="Plus" size={16} />
                Create Delivery
              </button>
            </div>
          </div>
          <div className="space-y-4">
            {activeDeliveriesList.slice(0, 3).map((delivery) => (
              <DeliveryCard
                key={delivery.id}
                delivery={delivery}
                onTrack={handleTrackDelivery}
                onViewDetails={handleViewDeliveryDetails}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Clear System Copy */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Assignments are handled automatically by the system.
        </p>
      </div>
    </div>
  );
};

export default StoreOverview;

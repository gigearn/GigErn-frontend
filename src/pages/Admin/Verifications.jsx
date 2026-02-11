import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import { useAdminData } from '../../hooks/useAdminData';

const AdminVerifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pendingStoreVerifications, pendingGigVerifications } = useAdminData();
  const [activeTab, setActiveTab] = useState(
    location.pathname.includes('stores') ? 'stores' : 'gigs'
  );

  const tabs = [
    {
      id: 'stores',
      label: 'Store Verifications',
      path: '/admin/verifications/stores',
      icon: 'Store'
    },
    {
      id: 'gigs',
      label: 'Gig Verifications',
      path: '/admin/verifications/gigs',
      icon: 'Users'
    }
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Verifications</h1>
          <p className="text-muted-foreground">Review and approve user document submissions</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Pending Items</p>
          <p className="text-2xl font-bold text-warning">{pendingStoreVerifications.length + pendingGigVerifications.length}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon name={tab.icon} size={18} />
                <span>{tab.label}</span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminVerifications;

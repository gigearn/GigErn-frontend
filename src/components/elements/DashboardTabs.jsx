import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from './Icon';

const DashboardTabs = ({ userRole = 'store', onTabChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');

  const storeTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'shifts', label: 'Shifts', icon: 'Calendar', badge: 3 },
    { id: 'deliveries', label: 'Deliveries', icon: 'Truck', badge: 5 },
    { id: 'wallet', label: 'Wallet', icon: 'Wallet' },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const workerTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'opportunities', label: 'Opportunities', icon: 'Briefcase', badge: 12 },
    { id: 'my-shifts', label: 'My Shifts', icon: 'Calendar' },
    { id: 'earnings', label: 'Earnings', icon: 'DollarSign' },
    { id: 'documents', label: 'Documents', icon: 'FileText', badge: 1 },
    { id: 'profile', label: 'Profile', icon: 'User' },
  ];

  const tabs = userRole === 'store' ? storeTabs : workerTabs;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params?.get('tab');
    if (tabParam && tabs?.some(tab => tab?.id === tabParam)) {
      setActiveTab(tabParam);
      onTabChange?.(tabParam);
    }
  }, [location?.search, tabs, onTabChange]);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
    const basePath = userRole === 'store' ? '/store' : '/worker-dashboard';
    navigate(`${basePath}/${tabId}`);
  };

  return (
    <div className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <nav className="flex space-x-1 md:space-x-8 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => handleTabClick(tab?.id)}
              className={`flex items-center gap-1 md:gap-2 py-3 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm relative whitespace-nowrap transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} className="flex-shrink-0" />
              <span className="hidden sm:inline">{tab?.label}</span>
              <span className="sm:hidden text-xs">{tab?.label.substring(0, 3)}</span>
              {tab?.badge && (
                <span className="flex h-4 w-4 min-w-[16px] md:h-5 md:min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-xs font-medium text-accent-foreground">
                  {tab?.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardTabs;
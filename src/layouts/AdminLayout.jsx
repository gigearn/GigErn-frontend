import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/elements/Icon';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarItems = [
    { id: 'overview', path: '/admin/overview', icon: 'LayoutDashboard', label: 'Overview' },
    { id: 'verifications-overview', path: '/admin/verifications/overview', icon: 'TrendingUp', label: 'Verification Oversight' },
    { id: 'verifiers', path: '/admin/verifiers', icon: 'Users', label: 'Verifier Management' },
    { id: 'all-users', path: '/admin/all-users', icon: 'Users', label: 'All Users' },
    { id: 'verifications', path: '/admin/verifications', icon: 'ShieldCheck', label: 'Direct Verifications' },
    { id: 'gig-users', path: '/admin/users/gigs', icon: 'User', label: 'Gig Oversight' },
    { id: 'store-users', path: '/admin/users/stores', icon: 'Store', label: 'Store Oversight' },
    { id: 'jobs', path: '/admin/jobs', icon: 'AlertTriangle', label: 'Jobs' },
    { id: 'payments', path: '/admin/payments', icon: 'CreditCard', label: 'Payments' },
    { id: 'reports', path: '/admin/reports', icon: 'FileText', label: 'Reports' },
    { id: 'settings', path: '/admin/settings', icon: 'Settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
              <Icon name="Shield" size={20} color="var(--color-destructive)" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">System Control</p>
            </div>
          </div>

          {/* Admin Status */}
          <div className="mb-4 lg:mb-6 p-3 rounded-lg bg-muted/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Admin Access</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Active</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Full system control</p>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path || 
                             (item.id === 'verifications' && location.pathname.startsWith('/admin/verifications'));
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-destructive px-1.5 text-xs font-medium text-destructive-foreground">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Menu */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground">
              <Icon name="Shield" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name || 'Super Admin'}</p>
              <p className="text-xs text-muted-foreground truncate">Super Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded transition-colors"
          >
            <Icon name="LogOut" size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-card border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <Icon name="Menu" size={20} />
            </button>
            <h1 className="text-lg font-semibold text-foreground">Admin Panel</h1>
            <div className="w-9"></div>
          </div>
        </div>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

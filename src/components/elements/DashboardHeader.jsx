import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';


const DashboardHeader = ({ userRole = 'store', userName = 'John Doe' }) => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    navigate('/login');
  };

  const handleSettings = () => {
    const basePath = userRole === 'store' ? '/store' : '/worker-dashboard';
    navigate(`${basePath}/profile`);
    setShowUserMenu(false);
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="header-container">
      <div className="header-content max-w-full">
        <div className="header-logo cursor-pointer" onClick={() => navigate(userRole === 'store' ? '/store/overview' : '/worker-dashboard')}>
          <div className="header-logo-icon">
            <Icon name="Users" size={24} color="var(--color-primary)" />
          </div>
          <span className="header-logo-text">GigEarn</span>
        </div>

        <div className="header-nav">
          <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors duration-250 hover:bg-muted hover:text-foreground">
            <Icon name="Bell" size={20} />
            <span className="hidden sm:inline">Notifications</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-accent-foreground">
              3
            </span>
          </button>

          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-250 hover:bg-muted"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon name="User" size={18} />
              </div>
              <span className="hidden md:inline text-foreground">{userName}</span>
              <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-[150]"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full z-[200] mt-2 w-56 rounded-lg border border-border bg-popover shadow-elevation-lg">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">{userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {userRole === 'store' ? 'Store Owner' : 'Worker'}
                    </p>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={handleSettings}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-popover-foreground transition-colors duration-250 hover:bg-muted"
                    >
                      <Icon name="Settings" size={18} />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors duration-250 hover:bg-destructive/10"
                    >
                      <Icon name="LogOut" size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

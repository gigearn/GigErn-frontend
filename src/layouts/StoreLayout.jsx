import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Icon from "../components/elements/Icon";
import { useAuth } from "../hooks/useAuth";
import verifiedBadge from "../assets/image.png";

const StoreLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    {
      id: "overview",
      label: "Overview",
      icon: "LayoutDashboard",
      path: "/store/overview",
    },
    {
      id: "shifts",
      label: "Shifts",
      icon: "Calendar",
      path: "/store/shifts",
    },
    {
      id: "deliveries",
      label: "Deliveries",
      icon: "Truck",
      path: "/store/deliveries",
    },
    {
      id: "wallet",
      label: "Wallet",
      icon: "Wallet",
      path: "/store/wallet",
    },
    {
      id: "profile",
      label: "Profile",
      icon: "User",
      path: "/store/profile",
    },
  ];

  const handleLogout = () => {
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 lg:p-6">
          <div className="flex items-center gap-3 mb-6 lg:mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Users" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">GigErn</h1>
              <p className="text-xs text-muted-foreground">Store Portal</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon name="User" size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-sm font-medium text-foreground truncate">
                  {user?.name || "Store User"}
                </p>
                {user?.verificationStatus === 'verified' && (
                  <img 
                    src={verifiedBadge} 
                    alt="Verified" 
                    className="w-3.5 h-3.5 flex-shrink-0"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {user?.storeName || "Store"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg transition-colors"
          >
            <Icon name="LogOut" size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      <div className="lg:ml-64">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="Menu" size={20} />
            </button>

            <div>
                <h2 className="text-lg font-semibold text-foreground">
                {sidebarItems.find(item => item.path === location.pathname)?.label || 'Store Portal'}
                </h2>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Manage your store operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-4">
            <button className="flex items-center gap-2 rounded-lg px-2 lg:px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <Icon name="Bell" size={18} />
              <span className="hidden sm:inline">Notifications</span>
              <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-accent px-1.5 text-xs font-medium text-accent-foreground">
                3
              </span>
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;

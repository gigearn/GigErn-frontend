import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/elements/Icon';
import { useAuth } from '../contexts/AuthContext';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = (e) => {
    e.preventDefault();
    setError('');
    
    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    if (phone === '9241272626') {
      setShowOTP(true);
    } else {
      setError('Admin access not authorized for this number');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Mock super admin authentication
      const superAdminUser = {
        id: 'super_admin_001',
        name: 'Super Admin',
        email: 'admin@gigearn.com',
        role: 'super_admin',
        phone: phone,
      };

      const authData = {
        token: 'mock_super_admin_token_' + Date.now(),
        expiresIn: '24h',
      };

      login(superAdminUser, authData);
      navigate('/admin/overview');
    } catch (error) {
      setError('Login failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleBack = () => {
    setShowOTP(false);
    setOtp('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Admin Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/10 rounded-full mb-4">
            <Icon name="Shield" size={32} className="text-destructive" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-muted-foreground">System Administrator Login</p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-6">
          {!showOTP ? (
            /* Phone Number Form */
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Admin Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Phone" size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit phone number"
                    className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Send OTP
              </button>
            </form>
          ) : (
            /* OTP Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-foreground mb-2">
                  One-Time Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon name="Lock" size={20} className="text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-3 py-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-center text-lg font-mono"
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  OTP sent to {phone}
                </p>
              </div>

              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Verifying...' : 'Login'}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full py-3 px-4 border border-border text-foreground rounded-lg hover:bg-muted transition-colors font-medium"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Demo Credentials */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo Credentials:</strong><br />
              Phone: 9241272626<br />
              OTP: 123456
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            This is a restricted area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

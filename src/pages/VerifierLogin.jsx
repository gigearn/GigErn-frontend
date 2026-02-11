import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/elements/Icon';
import { useAuth } from '../contexts/AuthContext';

const VerifierLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock verifier authentication
      // In production, this would be an API call
      const mockVerifiers = [
        {
          id: 'verifier_001',
          name: 'Rahul Kumar',
          email: 'rahul@gigearn.com',
          role: 'verifier',
          phone: '9876543210',
        },
        {
          id: 'verifier_002',
          name: 'Priya Sharma',
          email: 'priya@gigearn.com',
          role: 'verifier',
          phone: '9876543211',
        },
      ];

      const verifier = mockVerifiers.find(v => 
        v.email === formData.email && 
        formData.password === 'verifier123' // Mock password
      );

      if (verifier) {
        const authData = {
          token: 'mock_verifier_token_' + Date.now(),
          expiresIn: '24h',
        };

        login(verifier, authData);
        navigate('/verify/queue');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={32} className="text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Verification Portal
          </h1>
          <p className="text-muted-foreground">
            Sign in to access verification dashboard
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card border border-border rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Icon name="Mail" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Icon name="Lock" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Demo Accounts:</p>
            <div className="space-y-2 text-xs">
              <div className="bg-muted/50 p-2 rounded">
                <p className="font-medium">Rahul Kumar</p>
                <p className="text-muted-foreground">Email: rahul@gigearn.com</p>
                <p className="text-muted-foreground">Password: verifier123</p>
              </div>
              <div className="bg-muted/50 p-2 rounded">
                <p className="font-medium">Priya Sharma</p>
                <p className="text-muted-foreground">Email: priya@gigearn.com</p>
                <p className="text-muted-foreground">Password: verifier123</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            This is a secure verification portal for authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifierLogin;

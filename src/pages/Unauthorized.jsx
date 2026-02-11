import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/elements/Button';
import Icon from '@/components/elements/Icon';

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
            <Icon name="ShieldX" size={32} color="var(--color-error)" />
          </div>
        </div>

        <h1 className="text-2xl font-medium text-foreground mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Please contact your administrator or sign in with the correct account.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            iconName="LogIn"
            iconPosition="left"
            onClick={handleLogin}
          >
            Sign In
          </Button>

          <Button
            variant="outline"
            iconName="Home"
            iconPosition="left"
            onClick={handleGoHome}
          >
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/elements/Button';
import Icon from '@/components/elements/Icon';

const PendingVerification = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleContact = () => {
    navigate('/contact');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-warning/10">
            <Icon name="Clock" size={32} color="var(--color-warning)" />
          </div>
        </div>

        <h1 className="text-2xl font-medium text-foreground mb-2">Verification Pending</h1>
        <p className="text-muted-foreground mb-8">
          Your store account is currently under verification. This process typically takes 24-48 hours. 
          You'll receive an email once verification is complete.
        </p>

        <div className="bg-muted/30 rounded-lg p-4 mb-8">
          <h3 className="text-sm font-medium text-foreground mb-2">What happens next?</h3>
          <ul className="text-xs text-muted-foreground space-y-1 text-left">
            <li>• Our team will review your submitted documents</li>
            <li>• You may be contacted for additional information</li>
            <li>• Once approved, you'll have full access to store features</li>
            <li>• You can check your verification status anytime</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            iconName="MessageSquare"
            iconPosition="left"
            onClick={handleContact}
          >
            Contact Support
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

export default PendingVerification;

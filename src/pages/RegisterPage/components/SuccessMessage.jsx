import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/elements/Button';
import Icon from '../../../components/elements/Icon';

const SuccessMessage = ({ userType, userName }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      handleContinue();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (userType === 'worker') {
      navigate('/worker-dashboard');
    } else if (userType === 'gig') {
      navigate('/gig/overview');
    } else if (userType === 'store') {
      navigate('/store/overview');
    } else {
      navigate('/worker-dashboard'); // Default to worker dashboard for delivery
    }
  };

  const getSuccessMessage = () => {
    switch (userType) {
      case 'worker':
        return {
          title: 'Worker Registration Successful!',
          description: 'Your worker account has been created and documents are under verification. You can start browsing available shifts immediately.',
          icon: 'Users',
          features: [
            'Browse nearby shifts',
            'Accept opportunities',
            'Build reliability score',
            'Track your earnings',
            'Get priority access with high reliability'
          ]
        };
      case 'store':
        return {
          title: 'Store Registration Successful!',
          description: 'Your store account has been created and documents are under verification. You can start posting shifts once verification is complete.',
          icon: 'Store',
          features: [
            'Post shift requirements',
            'Manage deliveries',
            'Track worker reliability',
            'Access prepaid wallet'
          ]
        };
      case 'delivery':
        return {
          title: 'Delivery Partner Registration Successful!',
          description: 'Your delivery partner account has been created and documents are under verification. You can start accepting deliveries once verification is complete.',
          icon: 'Truck',
          features: [
            'Accept delivery requests',
            'Navigate with GPS',
            'Earn per delivery',
            'Build reliability score'
          ]
        };
      default:
        return {};
    }
  };

  const successData = getSuccessMessage();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 md:space-y-8 py-8 md:py-12">
      <div className="flex h-20 w-20 md:h-24 md:w-24 items-center justify-center rounded-full bg-success/10 animate-pulse">
        <Icon name="CheckCircle2" size={48} color="var(--color-success)" />
      </div>
      
      <div className="text-center space-y-3 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
          {successData?.title}
        </h2>
        <p className="text-sm md:text-base text-muted-foreground px-4">
          {successData?.description}
        </p>
      </div>
      
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-6 md:p-8 space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon name={successData?.icon} size={20} color="var(--color-primary)" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Welcome,</p>
            <p className="text-base font-semibold text-foreground">{userName}</p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">What you can do next:</p>
          <ul className="space-y-2">
            {successData?.features?.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-foreground">
                <Icon name="CheckCircle2" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 space-y-3">
          <div className="flex items-center gap-2 rounded-lg bg-warning/10 p-3">
            <Icon name="Clock" size={18} className="text-warning flex-shrink-0" />
            <p className="text-xs text-foreground">
              Document verification typically takes 24-48 hours. You'll be notified once approved.
            </p>
          </div>

          <Button
            variant="default"
            size="lg"
            onClick={handleContinue}
            fullWidth
            iconName="ArrowRight"
            iconPosition="right"
          >
            Go to Dashboard
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Redirecting automatically in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;

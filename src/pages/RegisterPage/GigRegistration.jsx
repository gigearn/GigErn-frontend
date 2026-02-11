import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import SuccessMessage from './components/SuccessMessage';
import { useUserManager } from '../../hooks/useUserManager';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const GigRegistration = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [selectedUserType] = useState('worker');
  const [registrationData, setRegistrationData] = useState(null);
  const { registerUser } = useUserManager();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = (data) => {
    setRegistrationData(data);
    setCurrentStep('otp');
  };

  const handleOTPVerify = (otp) => {
    // Register user and store in localStorage
    const userData = registerUser({
      role: 'gig',
      name: registrationData.fullName,
      email: registrationData.email,
      phone: registrationData.phoneNumber,
      city: registrationData.city,
      pincode: registrationData.pincode,
      vehicleNumber: registrationData.vehicleNumber,
      verificationStatus: 'pending' // Set to pending to appear in verification queue
    });
    
    // Login and redirect to overview
    login(userData, 'mock-token-gig');
    
    // Update last login
    setTimeout(() => {
      navigate('/gig/overview');
    }, 100);
  };

  const handleOTPResend = () => {
    console.log('OTP resent to', registrationData?.phoneNumber);
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {currentStep === 'form' && (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-elevation-sm">
          <RegistrationForm
            userType={selectedUserType}
            onSubmit={handleFormSubmit}
            onBack={() => window.history.back()}
          />
        </div>
      )}

      {currentStep === 'otp' && (
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-elevation-sm">
            <OTPVerification
              phoneNumber={registrationData?.phoneNumber}
              onVerify={handleOTPVerify}
              onResend={handleOTPResend}
              onBack={handleBackToForm}
            />
          </div>
        </div>
      )}

      {currentStep === 'success' && (
        <div className="max-w-4xl mx-auto">
          <SuccessMessage
            userType={selectedUserType}
            userName={registrationData?.fullName}
          />
        </div>
      )}
    </div>
  );
};

export default GigRegistration;

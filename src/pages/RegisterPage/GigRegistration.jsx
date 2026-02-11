import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import SuccessMessage from './components/SuccessMessage';

const GigRegistration = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [selectedUserType] = useState('worker');
  const [registrationData, setRegistrationData] = useState(null);

  const handleFormSubmit = (data) => {
    setRegistrationData(data);
    setCurrentStep('otp');
  };

  const handleOTPVerify = (otp) => {
    setCurrentStep('success');
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

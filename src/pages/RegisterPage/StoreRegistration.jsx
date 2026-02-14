import { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import OTPVerification from './components/OTPVerification';
import SuccessMessage from './components/SuccessMessage';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/authAPI';

const StoreRegistration = () => {
  const [currentStep, setCurrentStep] = useState('form');
  const [selectedUserType] = useState('store');
  const [registrationData, setRegistrationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (data) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Call backend registration API
      const registrationPayload = {
        ...data,
        userType: 'store'
      };
      
      const response = await authAPI.register(registrationPayload);
      setRegistrationData(data);
      setCurrentStep('otp');
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerify = async (otp) => {
    setIsLoading(true);
    setError('');
    
    try {
      // Verify OTP and login
      const response = await authAPI.verifyOTP(registrationData.phoneNumber, otp);
      
      // Login with the token received from backend
      login(response.data.user, response.data.token);
      
      // Navigate to store overview
      navigate('/store/overview');
    } catch (error) {
      setError(error.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPResend = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await authAPI.sendOTP(registrationData.phoneNumber);
    } catch (error) {
      setError(error.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-12">
      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}
      
      {currentStep === 'form' && (
        <div className="rounded-xl border border-border bg-card p-6 md:p-8 shadow-elevation-sm">
          <RegistrationForm
            userType={selectedUserType}
            onSubmit={handleFormSubmit}
            onBack={() => window.history.back()}
            isSubmitting={isLoading}
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
              isLoading={isLoading}
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

export default StoreRegistration;

import React, { useState, useEffect, useRef } from 'react';
import Button from '../../../components/elements/Button';
import Icon from '../../../components/elements/Icon';

const OTPVerification = ({ phoneNumber, onVerify, onResend, onBack }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value?.slice(-1);
    setOtp(newOtp);
    setError('');

    if (value && index < 5) {
      inputRefs?.current?.[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      inputRefs?.current?.[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e?.preventDefault();
    const pastedData = e?.clipboardData?.getData('text')?.slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData?.split('')?.forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);
    setError('');

    const lastFilledIndex = Math.min(pastedData?.length - 1, 5);
    inputRefs?.current?.[lastFilledIndex]?.focus();
  };

  const handleVerify = () => {
    const otpValue = otp?.join('');
    if (otpValue?.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      return;
    }

    if (otpValue !== '123456') {
      setError('Invalid OTP. Please try again or use 123456 for demo');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      onVerify(otpValue);
    }, 1500);
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setError('');
    setResendTimer(30);
    setCanResend(false);
    onResend();
    inputRefs?.current?.[0]?.focus();
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b border-border">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <Icon name="ArrowLeft" size={20} />
        </Button>
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">Verify Phone Number</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the 6-digit code sent to {phoneNumber}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center space-y-6 py-4">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary/10">
          <Icon name="Smartphone" size={32} color="var(--color-primary)" />
        </div>

        <div className="w-full max-w-md space-y-4">
          <div className="flex justify-center gap-2 md:gap-3">
            {otp?.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e?.target?.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className={`h-12 w-12 md:h-14 md:w-14 rounded-lg border-2 text-center text-lg md:text-xl font-semibold transition-all duration-250 ${
                  error
                    ? 'border-error bg-error/5 text-error'
                    : digit
                    ? 'border-primary bg-primary/5 text-foreground'
                    : 'border-border bg-background text-foreground hover:border-primary/50'
                } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
              />
            ))}
          </div>

          {error && (
            <div className="flex items-center justify-center gap-2 text-sm text-error">
              <Icon name="AlertCircle" size={16} />
              <span>{error}</span>
            </div>
          )}

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Demo OTP: <span className="font-mono font-semibold text-foreground">123456</span>
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-sm font-medium text-primary hover:underline"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend OTP in {resendTimer}s
              </p>
            )}
          </div>
        </div>

        <Button
          variant="default"
          size="lg"
          onClick={handleVerify}
          loading={isVerifying}
          disabled={otp?.join('')?.length !== 6}
          fullWidth
          className="max-w-md"
        >
          {isVerifying ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </div>
    </div>
  );
};

export default OTPVerification;

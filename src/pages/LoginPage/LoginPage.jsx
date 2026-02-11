import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/elements/Button";
import Input from "../../components/elements/Input";
import Icon from "../../components/elements/Icon";
import CountryCodeSelector from "./components/CountryCodeSelector";
import OTPInput from "./components/OTPInput";
import loginImage from "../../assets/login-page.png";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState("phone");
  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  const mockCredentials = {
    store: { phone: "1234567890", otp: "123456", role: "store" },
    gig: { phone: "9876543210", otp: "123456", role: "gig" },
    worker: { phone: "1111111111", otp: "123456", role: "worker" }
  };

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const validatePhoneNumber = (number) => {
    const cleaned = number?.replace(/\D/g, "");
    return cleaned?.length >= 10 && cleaned?.length <= 15;
  };

  const handlePhoneSubmit = (e) => {
    e?.preventDefault();
    setError("");

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number (10-15 digits)");
      return;
    }

    const cleanedPhone = phoneNumber?.replace(/\D/g, "");
    const isValidCredential = Object.values(mockCredentials)?.some(
      (cred) => cred?.phone === cleanedPhone,
    );

    if (!isValidCredential) {
      setError(
        `Invalid phone number. Use ${mockCredentials?.store?.phone} (Store) or ${mockCredentials?.worker?.phone} (Worker)`,
      );
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
      setResendTimer(60);
    }, 1500);
  };

  const handleOTPSubmit = (e) => {
    e?.preventDefault();
    setError("");

    if (otp?.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    const cleanedPhone = phoneNumber?.replace(/\D/g, "");
    
    const matchedCredential = Object.values(mockCredentials)?.find(
      (cred) => cred?.phone === cleanedPhone,
    );

    if (!matchedCredential || matchedCredential?.otp !== otp) {
      setError("Invalid OTP. Please check and try again");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (matchedCredential?.role === "store") {
        // Store user data in localStorage for ProtectedRoute
        const userData = {
          role: 'store',
          name: 'Store User',
          storeName: 'FreshMart Grocery',
          email: 'store@gigearn.com',
          phone: countryCode + phoneNumber,
          verificationStatus: 'verified'
        };
        login(userData, 'mock-token-store');
        navigate("/store/overview");
      } else if (matchedCredential?.role === "gig") {
        const userData = {
          role: 'gig',
          name: 'Gig Worker',
          email: 'gig@gigearn.com',
          phone: countryCode + phoneNumber,
          verificationStatus: 'verified'
        };
        login(userData, 'mock-token-gig');
        navigate("/gig/overview");
      } else {
        const userData = {
          role: 'worker',
          name: 'Worker User',
          email: 'worker@gigearn.com',
          phone: countryCode + phoneNumber
        };
        login(userData, 'mock-token-worker');
        navigate("/worker-dashboard");
      }
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer > 0) return;

    setError("");
    setOtp("");
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setResendTimer(60);
    }, 1000);
  };

  const handleBackToPhone = () => {
    setStep("phone");
    setOtp("");
    setError("");
    setResendTimer(0);
  };

  const formatPhoneDisplay = (number) => {
    const cleaned = number?.replace(/\D/g, "");
    if (cleaned?.length <= 3) return cleaned;
    if (cleaned?.length <= 6)
      return `(${cleaned?.slice(0, 3)}) ${cleaned?.slice(3)}`;
    return `(${cleaned?.slice(0, 3)}) ${cleaned?.slice(3, 6)}-${cleaned?.slice(6, 10)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="min-h-[calc(100vh-64px)] px-4 py-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="mb-6 lg:mb-8">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                    {step === "phone" ? "Welcome Back" : "Verify OTP"}
                  </h1>
                  <p className="text-muted-foreground">
                    {step === "phone"
                      ? "Log in to manage gigs, payments, and clients."
                      : `We sent a 6-digit code to ${countryCode} ${formatPhoneDisplay(phoneNumber)}`}
                  </p>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-elevation-md">
                  {/* Google Sign In Button */}
                  <div className="mb-6">
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-card text-gray-500">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {step === "phone" ? (
                    <form onSubmit={handlePhoneSubmit} className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-3">
                          Phone Number <span className="text-error">*</span>
                        </label>

                        <div className="flex gap-3">
                          <CountryCodeSelector
                            value={countryCode}
                            onChange={setCountryCode}
                            disabled={isLoading}
                          />
                          <Input
                            type="tel"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => {
                              setPhoneNumber(e.target.value.replace(/\D/g, ""));
                              setError("");
                            }}
                            disabled={isLoading}
                            error={error}
                          />
                        </div>

                        {error && (
                          <p className="mt-2 text-sm text-error flex items-center gap-2">
                            <Icon name="AlertCircle" size={16} />
                            {error}
                          </p>
                        )}
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        disabled={!phoneNumber || isLoading}
                      >
                        Continue
                      </Button>

                      <p className="text-sm text-center text-muted-foreground">
                        Don’t have an account?{" "}
                        <button
                          type="button"
                          onClick={() => navigate("/register")}
                          className="text-primary font-medium hover:underline"
                        >
                          Register now
                        </button>
                      </p>
                    </form>
                  ) : (
                    <form onSubmit={handleOTPSubmit} className="space-y-6">
                      <OTPInput
                        length={6}
                        value={otp}
                        onChange={(val) => {
                          setOtp(val);
                          setError("");
                        }}
                        disabled={isLoading}
                        error={!!error}
                      />

                      {error && (
                        <p className="text-sm text-error flex items-center justify-center gap-2">
                          <Icon name="AlertCircle" size={16} />
                          {error}
                        </p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        disabled={otp.length !== 6 || isLoading}
                      >
                        Verify & Sign In
                      </Button>

                      <button
                        type="button"
                        onClick={handleBackToPhone}
                        className="w-full text-sm text-primary hover:underline"
                      >
                        Change phone number
                      </button>
                    </form>
                  )}
                </div>

                <p className="mt-6 text-xs text-center text-muted-foreground">
                  By signing in, you agree to our{" "}
                  <button className="text-primary hover:underline">
                    Terms of Service
                  </button>{" "}
                  and{" "}
                  <button className="text-primary hover:underline">
                    Privacy Policy
                  </button>
                </p>
              </div>
            </div>

            {/* RIGHT: ILLUSTRATION */}
            <div className="hidden lg:flex flex-col items-center">
              <img
                src={loginImage}
                alt="GigErn platform illustration"
                className="w-full max-w-xl"
              />

              <div className="mt-8 space-y-4 text-left max-w-md">
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span className="text-foreground">Find gigs easily</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span className="text-foreground">Get paid quickly</span>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="CheckCircle" size={20} className="text-primary" />
                  <span className="text-foreground">
                    Trusted by freelancers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Demo Credentials */}
      <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg p-4 max-w-xs">
        <h4 className="text-sm font-semibold text-foreground mb-2">Demo Credentials</h4>
        <div className="space-y-2 text-xs">
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-medium">Store Owner</p>
            <p className="text-muted-foreground">Phone: 1234567890</p>
            <p className="text-muted-foreground">OTP: 123456</p>
          </div>
          <div className="bg-muted/50 p-2 rounded">
            <p className="font-medium">Gig Worker</p>
            <p className="text-muted-foreground">Phone: 9876543210</p>
            <p className="text-muted-foreground">OTP: 123456</p>
          </div>
        </div>
      </div>

      {/* Admin Access Link */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => navigate('/admin/login')}
          className="flex items-center gap-2 px-3 py-2 bg-muted/80 backdrop-blur-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors text-sm"
        >
          <Icon name="Shield" size={16} />
          Admin Access
        </button>
      </div>
    </div>
  );
};

export default Login;

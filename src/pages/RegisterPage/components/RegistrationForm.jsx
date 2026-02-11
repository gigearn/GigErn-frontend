import { useState } from 'react';
import Input from '../../../components/elements/Input';
import Button from '../../../components/elements/Button';
import DocumentUpload from '../../../components/elements/DocumentsUpload';
import Icon from '../../../components/elements/Icon';

const RegistrationForm = ({ userType, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    aadhaarNumber: '',
    panNumber: '',
    gstNumber: '',
    shopLicense: '',
    licenseNumber: '',
    vehicleNumber: ''
  });

  const [documents, setDocuments] = useState({
    aadhaarDocument: null,
    panDocument: null,
    gstDocument: null,
    shopLicenseDocument: null,
    drivingLicenseDocument: null,
    vehicleDocument: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDocumentUpload = (documentType, file) => {
    setDocuments(prev => ({ ...prev, [documentType]: file }));
    if (errors?.[documentType]) {
      setErrors(prev => ({ ...prev, [documentType]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation for all user types
    if (!formData?.fullName?.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData?.phoneNumber?.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData?.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Worker-specific validation
    if (userType === 'worker') {
      if (!formData?.aadhaarNumber?.trim()) {
        newErrors.aadhaarNumber = 'Aadhaar number is required';
      } else if (!/^\d{12}$/.test(formData?.aadhaarNumber)) {
        newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
      }
      
      if (!formData?.panNumber?.trim()) {
        newErrors.panNumber = 'PAN number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData?.panNumber?.toUpperCase())) {
        newErrors.panNumber = 'Please enter a valid PAN number';
      }
      
      if (!documents?.aadhaarDocument) {
        newErrors.aadhaarDocument = 'Aadhaar document is required';
      }
      
      if (!documents?.panDocument) {
        newErrors.panDocument = 'PAN document is required';
      }
    }

    // Store-specific validation
    if (userType === 'store') {
      if (!formData?.gstNumber?.trim()) {
        newErrors.gstNumber = 'GST number is required';
      }
      if (!documents?.gstDocument) {
        newErrors.gstDocument = 'GST certificate is required';
      }
      if (!documents?.shopLicenseDocument) {
        newErrors.shopLicenseDocument = 'Shop & Establishment License is required';
      }
    }

    // Delivery-specific validation
    if (userType === 'delivery') {
      if (!formData?.aadhaarNumber?.trim()) {
        newErrors.aadhaarNumber = 'Aadhaar number is required';
      } else if (!/^\d{12}$/.test(formData?.aadhaarNumber)) {
        newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
      }
      
      if (!formData?.panNumber?.trim()) {
        newErrors.panNumber = 'PAN number is required';
      } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData?.panNumber?.toUpperCase())) {
        newErrors.panNumber = 'Please enter a valid PAN number';
      }
      
      if (!formData?.licenseNumber?.trim()) {
        newErrors.licenseNumber = 'Driving license number is required';
      }
      
      if (!formData?.vehicleNumber?.trim()) {
        newErrors.vehicleNumber = 'Vehicle registration number is required';
      }
      
      if (!documents?.aadhaarDocument) {
        newErrors.aadhaarDocument = 'Aadhaar document is required';
      }
      
      if (!documents?.panDocument) {
        newErrors.panDocument = 'PAN document is required';
      }
      
      if (!documents?.drivingLicenseDocument) {
        newErrors.drivingLicenseDocument = 'Driving license is required';
      }
      
      if (!documents?.vehicleDocument) {
        newErrors.vehicleDocument = 'Vehicle registration document is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        onSubmit({ ...formData, documents });
      }, 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
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
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            {userType === 'worker' ? 'Worker' : userType === 'store' ? 'Store Owner' : 'Delivery Partner'} Registration
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete your profile to start finding opportunities
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic Information - Common for all user types */}
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-medium text-foreground">Personal Information</h3>
          
          <Input
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData?.fullName}
            onChange={handleInputChange}
            error={errors?.fullName}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            name="phoneNumber"
            placeholder="Enter 10-digit phone number"
            value={formData?.phoneNumber}
            onChange={handleInputChange}
            error={errors?.phoneNumber}
            description="We'll send an OTP to verify your number"
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            description="For important notifications and updates"
            required
          />
        </div>

        {/* Worker-specific Identity Verification */}
        {(userType === 'worker' || userType === 'delivery') && (
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-medium text-foreground">Identity Verification</h3>
            
            <Input
              label="Aadhaar Number"
              type="text"
              name="aadhaarNumber"
              placeholder="Enter 12-digit Aadhaar number"
              value={formData?.aadhaarNumber}
              onChange={handleInputChange}
              error={errors?.aadhaarNumber}
              description="Format: XXXX XXXX XXXX"
              required
            />

            <DocumentUpload
              label="Aadhaar Card"
              description="Upload front and back of your Aadhaar card"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.aadhaarDocument}
              onUpload={(file) => handleDocumentUpload('aadhaarDocument', file)}
              documentType="aadhaar"
            />

            <Input
              label="PAN Number"
              type="text"
              name="panNumber"
              placeholder="Enter PAN number"
              value={formData?.panNumber}
              onChange={handleInputChange}
              error={errors?.panNumber}
              description="Format: ABCDE1234F"
              required
            />

            <DocumentUpload
              label="PAN Card"
              description="Upload your PAN card"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.panDocument}
              onUpload={(file) => handleDocumentUpload('panDocument', file)}
              documentType="pan"
            />
          </div>
        )}

        {/* Store-specific Business Verification */}
        {userType === 'store' && (
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-medium text-foreground">Business Verification</h3>
            
            <Input
              label="GST Number"
              type="text"
              name="gstNumber"
              placeholder="Enter 15-digit GST number"
              value={formData?.gstNumber}
              onChange={handleInputChange}
              error={errors?.gstNumber}
              description="Format: 22AAAAA0000A1Z5"
              required
            />

            <DocumentUpload
              label="GST Certificate"
              description="Upload your GST registration certificate"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.gstDocument}
              onUpload={(file) => handleDocumentUpload('gstDocument', file)}
              documentType="gst"
            />

            <DocumentUpload
              label="Shop & Establishment License"
              description="Upload your Shop & Establishment License"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.shopLicenseDocument}
              onUpload={(file) => handleDocumentUpload('shopLicenseDocument', file)}
              documentType="shop-license"
            />
          </div>
        )}

        {/* Delivery-specific Vehicle Details */}
        {userType === 'delivery' && (
          <div className="space-y-4">
            <h3 className="text-base md:text-lg font-medium text-foreground">Vehicle & License Details</h3>
            
            <Input
              label="Driving License Number"
              type="text"
              name="licenseNumber"
              placeholder="Enter driving license number"
              value={formData?.licenseNumber}
              onChange={handleInputChange}
              error={errors?.licenseNumber}
              required
            />

            <DocumentUpload
              label="Driving License"
              description="Upload front and back of your driving license"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.drivingLicenseDocument}
              onUpload={(file) => handleDocumentUpload('drivingLicenseDocument', file)}
              documentType="driving-license"
            />

            <Input
              label="Vehicle Registration Number"
              type="text"
              name="vehicleNumber"
              placeholder="Enter vehicle registration number"
              value={formData?.vehicleNumber}
              onChange={handleInputChange}
              error={errors?.vehicleNumber}
              description="Format: XX00XX0000"
              required
            />

            <DocumentUpload
              label="Vehicle Registration Certificate"
              description="Upload your vehicle RC"
              acceptedFormats=".pdf,.jpg,.jpeg,.png"
              maxSize={5}
              required
              error={errors?.vehicleDocument}
              onUpload={(file) => handleDocumentUpload('vehicleDocument', file)}
              documentType="vehicle-rc"
            />
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          fullWidth
          className="sm:w-auto"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={isSubmitting}
          fullWidth
          className="sm:flex-1"
        >
          {isSubmitting ? 'Submitting...' : 'Continue to Verification'}
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;

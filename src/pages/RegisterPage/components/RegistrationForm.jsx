import { useState } from 'react';
import Input from '../../../components/elements/Input';
import Button from '../../../components/elements/Button';
import Icon from '../../../components/elements/Icon';

const RegistrationForm = ({ userType, onSubmit, onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    storeName: '',
    address: '',
    pincode: '',
    city: '',
    vehicleNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Store-specific validations
    if (userType === 'store') {
      if (!formData.storeName.trim()) {
        newErrors.storeName = 'Store name is required';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Please enter a valid 6-digit pincode';
      }
    }

    // Gig-specific validations
    if (userType === 'gig') {
      if (!formData.city.trim()) {
        newErrors.city = 'City is required';
      }
      if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required';
      } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Please enter a valid 6-digit pincode';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStoreFields = () => (
    <>
      <div className="space-y-2">
        <label htmlFor="storeName" className="text-sm font-medium text-foreground">
          Store Name *
        </label>
        <Input
          id="storeName"
          name="storeName"
          type="text"
          placeholder="Enter your store name"
          value={formData.storeName}
          onChange={handleInputChange}
          error={errors.storeName}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium text-foreground">
          Address *
        </label>
        <Input
          id="address"
          name="address"
          type="text"
          placeholder="Enter your store address"
          value={formData.address}
          onChange={handleInputChange}
          error={errors.address}
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="pincode" className="text-sm font-medium text-foreground">
            Pincode *
          </label>
          <Input
            id="pincode"
            name="pincode"
            type="text"
            placeholder="6-digit pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            error={errors.pincode}
            disabled={isSubmitting}
            maxLength={6}
          />
        </div>
      </div>
    </>
  );

  const renderGigFields = () => (
    <>
      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-medium text-foreground">
          City *
        </label>
        <Input
          id="city"
          name="city"
          type="text"
          placeholder="Enter your city"
          value={formData.city}
          onChange={handleInputChange}
          error={errors.city}
          disabled={isSubmitting}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="pincode" className="text-sm font-medium text-foreground">
          Pincode *
        </label>
        <Input
          id="pincode"
          name="pincode"
          type="text"
          placeholder="6-digit pincode"
          value={formData.pincode}
          onChange={handleInputChange}
          error={errors.pincode}
          disabled={isSubmitting}
          maxLength={6}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="vehicleNumber" className="text-sm font-medium text-foreground">
          Vehicle Number (Optional)
        </label>
        <Input
          id="vehicleNumber"
          name="vehicleNumber"
          type="text"
          placeholder="e.g., KA-01-AB-1234"
          value={formData.vehicleNumber}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>
    </>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Common Fields */}
        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-foreground">
            Full Name *
          </label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
            disabled={isSubmitting}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
            Phone Number *
          </label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="Enter 10-digit phone number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            error={errors.phoneNumber}
            disabled={isSubmitting}
            maxLength={10}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            disabled={isSubmitting}
          />
        </div>

        {/* Role-specific Fields */}
        {userType === 'store' ? renderStoreFields() : renderGigFields()}
      </div>

      {/* Submit Button */}
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating Account...
            </>
          ) : (
            <>
              Create {userType === 'store' ? 'Store' : 'Worker'} Account
            </>
          )}
        </Button>

        {onBack && (
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={isSubmitting}
            className="w-full"
          >
            Back
          </Button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;

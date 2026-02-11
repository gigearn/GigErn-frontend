import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';
import Button from '../../components/elements/Button';
import Select from '../../components/elements/Select';

const StoreCreateShift = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    date: '',
    time: '',
    workersNeeded: 1,
    pay: '',
    location: ''
  });

  const [errors, setErrors] = useState({});

  const roleOptions = [
    { value: 'delivery-partner', label: 'Delivery Partner' },
    { value: 'warehouse-staff', label: 'Warehouse Staff' },
    { value: 'customer-service', label: 'Customer Service' },
    { value: 'stock-associate', label: 'Stock Associate' }
  ];

  const workerCountOptions = [
    { value: 1, label: '1 Worker' },
    { value: 2, label: '2 Workers' },
    { value: 3, label: '3 Workers' },
    { value: 4, label: '4 Workers' },
    { value: 5, label: '5 Workers' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
    if (!formData.workersNeeded) newErrors.workersNeeded = 'Number of workers is required';
    if (!formData.pay || formData.pay <= 0) newErrors.pay = 'Valid pay amount is required';
    if (!formData.location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In real app, this would call an API
      console.log('Creating shift:', formData);
      
      // Show success and redirect
      setTimeout(() => {
        navigate('/store/shifts');
      }, 1000);
    }
  };

  const handleCancel = () => {
    navigate('/store/shifts');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Create Shift</h1>
        <p className="text-muted-foreground">Define shift requirements for the system</p>
      </div>

      {/* Form */}
      <div className="rounded-xl border border-border bg-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role Required *
            </label>
            <Select
              value={formData.role}
              onChange={(value) => handleInputChange('role', value)}
              options={roleOptions}
              placeholder="Select a role"
              error={errors.role}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              The system will find suitable workers for this role
            </p>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Date *
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.date ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                required
              />
              {errors.date && (
                <p className="text-xs text-error mt-1">{errors.date}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Time *
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.time ? 'border-error' : 'border-border'
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
                required
              />
              {errors.time && (
                <p className="text-xs text-error mt-1">{errors.time}</p>
              )}
            </div>
          </div>

          {/* Workers Needed */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Workers Needed *
            </label>
            <Select
              value={formData.workersNeeded}
              onChange={(value) => handleInputChange('workersNeeded', value)}
              options={workerCountOptions}
              placeholder="Select number of workers"
              error={errors.workersNeeded}
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              The system will assign this many qualified workers
            </p>
          </div>

          {/* Pay Rate */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pay per Worker (₹) *
            </label>
            <input
              type="number"
              value={formData.pay}
              onChange={(e) => handleInputChange('pay', e.target.value)}
              placeholder="Enter amount in INR"
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.pay ? 'border-error' : 'border-border'
              } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20`}
              required
            />
            {errors.pay && (
              <p className="text-xs text-error mt-1">{errors.pay}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Amount each worker will receive for completing this shift
            </p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Work Location *
            </label>
            <textarea
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              placeholder="Enter the complete work address"
              rows={3}
              className={`w-full px-3 py-2 rounded-lg border ${
                errors.location ? 'border-error' : 'border-border'
              } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none`}
              required
            />
            {errors.location && (
              <p className="text-xs text-error mt-1">{errors.location}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Workers will be assigned based on proximity to this location
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <Button
              type="submit"
              variant="default"
              iconName="Check"
              iconPosition="left"
            >
              Create Shift Requirement
            </Button>
            <Button
              type="button"
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">System Assignment Process</p>
            <p className="text-xs text-muted-foreground">
              After creating this shift requirement, the system will automatically find and assign suitable workers 
              based on their availability, reliability scores, skills, and proximity to the work location. 
              You cannot manually select or contact workers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreCreateShift;

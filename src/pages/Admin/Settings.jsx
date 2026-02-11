import React, { useState, useEffect } from 'react';
import Icon from '../../components/elements/Icon';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    reliabilityThresholds: {
      newcomer: 60,
      regular: 75,
      pro: 90,
      elite: 95
    },
    lockTimes: {
      jobAcceptance: 30,
      jobCompletion: 120,
      paymentProcessing: 300
    },
    jobLimits: {
      maxActiveJobsPerGig: 3,
      maxJobsPerStore: 50,
      jobTimeoutMinutes: 60
    },
    paymentSettings: {
      platformFeePercent: 10,
      minWithdrawalAmount: 500,
      payoutDelayHours: 24
    }
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    // Load settings from localStorage or use defaults
    const stored = localStorage.getItem('gigEarn_adminSettings');
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  };

  const saveSettings = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      localStorage.setItem('gigEarn_adminSettings', JSON.stringify(settings));
      setHasChanges(false);
      setIsLoading(false);
      setShowConfirmModal(false);
      
      // Log the change (in production, this would be server-side)
      const changeLog = {
        timestamp: new Date().toISOString(),
        admin: 'System Administrator',
        changes: settings
      };
      console.log('Settings updated:', changeLog);
    }, 1000);
  };

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
    setHasChanges(true);
  };

  const resetToDefaults = () => {
    const defaultSettings = {
      reliabilityThresholds: {
        newcomer: 60,
        regular: 75,
        pro: 90,
        elite: 95
      },
      lockTimes: {
        jobAcceptance: 30,
        jobCompletion: 120,
        paymentProcessing: 300
      },
      jobLimits: {
        maxActiveJobsPerGig: 3,
        maxJobsPerStore: 50,
        jobTimeoutMinutes: 60
      },
      paymentSettings: {
        platformFeePercent: 10,
        minWithdrawalAmount: 500,
        payoutDelayHours: 24
      }
    };
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Platform Rules</h1>
          <p className="text-muted-foreground">Configure global system constants (DANGEROUS AREA)</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={resetToDefaults}
            className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            disabled={!hasChanges || isLoading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Icon name="AlertTriangle" size={20} className="text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">⚠️ DANGER ZONE</h3>
            <p className="text-sm text-destructive/80">
              Changes to these settings affect the entire platform. All changes are logged and require confirmation.
            </p>
          </div>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reliability Thresholds */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Reliability Thresholds</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Newcomer Layer (Score ≥ {settings.reliabilityThresholds.newcomer})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.reliabilityThresholds.newcomer}
                onChange={(e) => handleSettingChange('reliabilityThresholds', 'newcomer', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{settings.reliabilityThresholds.newcomer}</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Regular Layer (Score ≥ {settings.reliabilityThresholds.regular})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.reliabilityThresholds.regular}
                onChange={(e) => handleSettingChange('reliabilityThresholds', 'regular', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{settings.reliabilityThresholds.regular}</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Pro Layer (Score ≥ {settings.reliabilityThresholds.pro})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.reliabilityThresholds.pro}
                onChange={(e) => handleSettingChange('reliabilityThresholds', 'pro', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{settings.reliabilityThresholds.pro}</span>
                <span>100</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Elite Layer (Score ≥ {settings.reliabilityThresholds.elite})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.reliabilityThresholds.elite}
                onChange={(e) => handleSettingChange('reliabilityThresholds', 'elite', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>{settings.reliabilityThresholds.elite}</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lock Times */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Lock Times (seconds)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Acceptance Lock ({settings.lockTimes.jobAcceptance}s)
              </label>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={settings.lockTimes.jobAcceptance}
                onChange={(e) => handleSettingChange('lockTimes', 'jobAcceptance', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10s</span>
                <span>{settings.lockTimes.jobAcceptance}s</span>
                <span>5min</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Completion Lock ({settings.lockTimes.jobCompletion}s)
              </label>
              <input
                type="range"
                min="60"
                max="600"
                step="30"
                value={settings.lockTimes.jobCompletion}
                onChange={(e) => handleSettingChange('lockTimes', 'jobCompletion', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1min</span>
                <span>{Math.round(settings.lockTimes.jobCompletion / 60)}min</span>
                <span>10min</span>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payment Processing Lock ({settings.lockTimes.paymentProcessing}s)
              </label>
              <input
                type="range"
                min="60"
                max="1800"
                step="60"
                value={settings.lockTimes.paymentProcessing}
                onChange={(e) => handleSettingChange('lockTimes', 'paymentProcessing', parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1min</span>
                <span>{Math.round(settings.lockTimes.paymentProcessing / 60)}min</span>
                <span>30min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Limits */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Job Limits</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Active Jobs per Gig Worker
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={settings.jobLimits.maxActiveJobsPerGig}
                onChange={(e) => handleSettingChange('jobLimits', 'maxActiveJobsPerGig', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Max Jobs per Store (per day)
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={settings.jobLimits.maxJobsPerStore}
                onChange={(e) => handleSettingChange('jobLimits', 'maxJobsPerStore', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Timeout (minutes)
              </label>
              <input
                type="number"
                min="15"
                max="240"
                value={settings.jobLimits.jobTimeoutMinutes}
                onChange={(e) => handleSettingChange('jobLimits', 'jobTimeoutMinutes', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Payment Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Platform Fee (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                step="0.5"
                value={settings.paymentSettings.platformFeePercent}
                onChange={(e) => handleSettingChange('paymentSettings', 'platformFeePercent', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum Withdrawal Amount (₹)
              </label>
              <input
                type="number"
                min="100"
                max="10000"
                step="100"
                value={settings.paymentSettings.minWithdrawalAmount}
                onChange={(e) => handleSettingChange('paymentSettings', 'minWithdrawalAmount', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Payout Delay (hours)
              </label>
              <input
                type="number"
                min="1"
                max="168"
                value={settings.paymentSettings.payoutDelayHours}
                onChange={(e) => handleSettingChange('paymentSettings', 'payoutDelayHours', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Change Log */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Changes</h3>
        <div className="text-center py-8">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent changes</p>
          <p className="text-sm text-muted-foreground mt-2">All setting changes are logged with timestamps and admin details</p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Confirm Settings Changes</h3>
            <p className="text-sm text-muted-foreground mb-4">
              You are about to change platform-wide settings. This will affect all users and cannot be easily undone.
            </p>
            <div className="bg-muted/20 rounded-lg p-3 mb-4">
              <p className="text-xs text-muted-foreground">
                <strong>Changes will be logged:</strong><br />
                Admin: System Administrator<br />
                Time: {new Date().toLocaleString()}<br />
                Impact: Platform-wide
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveSettings}
                className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
              >
                Confirm Changes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;

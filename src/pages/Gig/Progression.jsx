import React from 'react';
import MetricCard from '../../components/elements/MetricCard';
import Icon from '../../components/elements/Icon';

const GigProgression = () => {
  // Mock data - in real app, this would come from hooks/API
  const progressionData = {
    currentLayer: 'Associated',
    reliabilityScore: 92,
    completedJobs: 47,
    noShows: 1,
    timeActive: '156 hours',
    jobsToNextLayer: 8,
    nextLayer: 'Preferred'
  };

  const layers = [
    {
      name: 'Newcomer',
      description: 'Starting your gig journey',
      requirements: {
        completedJobs: 0,
        reliabilityScore: 70,
        timeActive: '0 hours'
      },
      benefits: [
        'Basic job access',
        'Standard pay rates',
        'Limited job types'
      ],
      isUnlocked: true,
      isCurrent: false
    },
    {
      name: 'Associated',
      description: 'Building your reputation',
      requirements: {
        completedJobs: 25,
        reliabilityScore: 85,
        timeActive: '100 hours'
      },
      benefits: [
        'Priority job access',
        'Higher pay rates (+15%)',
        'More job types',
        'Customer ratings visible'
      ],
      isUnlocked: true,
      isCurrent: true
    },
    {
      name: 'Preferred',
      description: 'Top-tier gig worker',
      requirements: {
        completedJobs: 100,
        reliabilityScore: 90,
        timeActive: '300 hours'
      },
      benefits: [
        'Premium job access',
        'Highest pay rates (+25%)',
        'All job types',
        'Customer choice preference',
        'Bonus opportunities'
      ],
      isUnlocked: false,
      isCurrent: false
    },
    {
      name: 'Elite',
      description: 'Elite gig professional',
      requirements: {
        completedJobs: 500,
        reliabilityScore: 95,
        timeActive: '1000 hours'
      },
      benefits: [
        'Exclusive premium jobs',
        'Maximum pay rates (+40%)',
        'VIP customer access',
        'Mentorship opportunities',
        'Performance bonuses'
      ],
      isUnlocked: false,
      isCurrent: false
    }
  ];

  const getLayerStatus = (layer) => {
    if (layer.isCurrent) return { color: 'text-primary', badge: 'bg-primary/10 text-primary' };
    if (layer.isUnlocked) return { color: 'text-success', badge: 'bg-success/10 text-success' };
    return { color: 'text-muted-foreground', badge: 'bg-muted/10 text-muted-foreground' };
  };

  const getProgressPercentage = (current, required) => {
    return Math.min(100, (current / required) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground mb-2">Progression</h1>
        <p className="text-muted-foreground">Your career growth and layer advancement</p>
      </div>

      {/* Current Status */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Current Layer</h2>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary`}>
                {progressionData.currentLayer}
              </span>
              <p className="text-sm text-muted-foreground">
                {progressionData.jobsToNextLayer} jobs to next level
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{progressionData.reliabilityScore}</p>
            <p className="text-sm text-muted-foreground">Reliability Score</p>
          </div>
        </div>

        {/* Progress to Next Layer */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Progress to {progressionData.nextLayer}</span>
            <span className="text-sm text-muted-foreground">
              {progressionData.jobsToNextLayer} jobs remaining
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage(47 - 25, 100 - 25)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
        <MetricCard
          title="Completed Jobs"
          value={progressionData.completedJobs}
          icon="CheckCircle"
          trend="up"
          trendValue="+5"
        />
        <MetricCard
          title="No-Shows"
          value={progressionData.noShows}
          icon="XCircle"
          trend="down"
          trendValue="0"
        />
        <MetricCard
          title="Time Active"
          value={progressionData.timeActive}
          icon="Clock"
          trend="up"
          trendValue="+12h"
        />
        <MetricCard
          title="Jobs to Next Level"
          value={progressionData.jobsToNextLayer}
          icon="TrendingUp"
          trend="down"
          trendValue="-8"
        />
      </div>

      {/* Layer Progression */}
      <div className="rounded-xl border border-border bg-card">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Layer Progression</h3>
          <p className="text-sm text-muted-foreground">Your career path and benefits</p>
        </div>
        
        <div className="divide-y divide-border">
          {layers.map((layer, index) => {
            const status = getLayerStatus(layer);
            const isNextLayer = layer.name === progressionData.nextLayer;
            
            return (
              <div key={layer.name} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      layer.isCurrent ? 'bg-primary/10' : 'bg-muted/10'
                    }`}>
                      <Icon 
                        name="Award" 
                        size={20} 
                        className={status.color}
                      />
                    </div>
                    <div>
                      <h4 className={`text-lg font-semibold ${status.color}`}>
                        {layer.name}
                        {layer.isCurrent && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{layer.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {layer.isUnlocked ? (
                      <Icon name="CheckCircle" size={20} className="text-success" />
                    ) : (
                      <Icon name="Lock" size={20} className="text-muted-foreground" />
                    )}
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-foreground mb-3">Requirements</h5>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Completed Jobs</p>
                      <p className="text-sm font-medium text-foreground">
                        {progressionData.completedJobs} / {layer.requirements.completedJobs}
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            progressionData.completedJobs >= layer.requirements.completedJobs
                              ? 'bg-success' 
                              : 'bg-primary'
                          }`}
                          style={{ 
                            width: `${getProgressPercentage(
                              progressionData.completedJobs, 
                              layer.requirements.completedJobs
                            )}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Reliability Score</p>
                      <p className="text-sm font-medium text-foreground">
                        {progressionData.reliabilityScore} / {layer.requirements.reliabilityScore}
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            progressionData.reliabilityScore >= layer.requirements.reliabilityScore
                              ? 'bg-success' 
                              : 'bg-primary'
                          }`}
                          style={{ 
                            width: `${getProgressPercentage(
                              progressionData.reliabilityScore, 
                              layer.requirements.reliabilityScore
                            )}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Time Active</p>
                      <p className="text-sm font-medium text-foreground">
                        {progressionData.timeActive} / {layer.requirements.timeActive}
                      </p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            parseInt(progressionData.timeActive) >= parseInt(layer.requirements.timeActive)
                              ? 'bg-success' 
                              : 'bg-primary'
                          }`}
                          style={{ 
                            width: `${getProgressPercentage(
                              parseInt(progressionData.timeActive), 
                              parseInt(layer.requirements.timeActive)
                            )}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-3">
                    Benefits {layer.isUnlocked ? '✅' : '🔒'}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {layer.benefits.map((benefit, benefitIndex) => (
                      <div 
                        key={benefitIndex}
                        className={`flex items-center gap-2 text-sm ${
                          layer.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}
                      >
                        <Icon 
                          name={layer.isUnlocked ? 'Check' : 'Lock'} 
                          size={14} 
                          className={layer.isUnlocked ? 'text-success' : 'text-muted-foreground'}
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Layer Info */}
                {isNextLayer && (
                  <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2">
                      <Icon name="Info" size={16} className="text-primary" />
                      <p className="text-sm text-primary">
                        Complete {progressionData.jobsToNextLayer} more jobs to unlock {layer.name} benefits
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Note */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex items-start gap-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">How Progression Works</p>
            <p className="text-xs text-muted-foreground">
              Your progression is based on completed jobs, reliability score, and active time. 
              Higher layers unlock better pay rates, premium jobs, and exclusive benefits. 
              Maintain high reliability to progress faster through the layers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GigProgression;

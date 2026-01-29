import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/elements/Icon';

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-semibold text-foreground mb-4">
          Join GigErn
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose your path to success. Whether you're looking for reliable staff or seeking flexible work opportunities, GigErn has you covered.
        </p>
      </div>

      {/* Registration Options */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Store Registration */}
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/register/store')}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Store" size={40} color="var(--color-primary)" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Register as Store
            </h2>
            <p className="text-muted-foreground">
              For retail businesses looking for reliable staffing solutions
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Pre-verified workers</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">95% show rate guarantee</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">24/7 support</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Flexible scheduling</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Quick replacement</span>
            </div>
          </div>

          <button className="w-full mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Register as Store
          </button>
        </div>

        {/* Gig Registration */}
        <div className="bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/register/gig')}>
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Truck" size={40} color="var(--color-accent)" />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Register as Gig Worker
            </h2>
            <p className="text-muted-foreground">
              For individuals seeking flexible work opportunities
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Flexible hours</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Multiple gig options</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Quick payments</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Skill development</span>
            </div>
            <div className="flex items-center gap-3">
              <Icon name="CheckCircle" size={20} className="text-primary" />
              <span className="text-foreground">Rating system</span>
            </div>
          </div>

          <button className="w-full mt-6 px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors">
            Register as Gig Worker
          </button>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12 text-center">
        <div className="bg-card border border-border rounded-xl p-8">
          <h3 className="text-xl font-semibold text-foreground mb-4">
            Why Choose GigErn?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-medium text-foreground mb-2">Reliability</h4>
              <p className="text-muted-foreground text-sm">
                Our pre-verification process ensures 95% show rate, eliminating staffing uncertainties.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Flexibility</h4>
              <p className="text-muted-foreground text-sm">
                Work when you want, hire when you need. Complete control over your schedule.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Support</h4>
              <p className="text-muted-foreground text-sm">
                24/7 customer support and quick issue resolution for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground mb-4">
          Already have an account?
        </p>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Register;

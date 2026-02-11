import React from 'react';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            About GigErn
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering businesses with reliable, pre-confirmed staffing solutions through technology and operational excellence.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To revolutionize the retail staffing industry by providing businesses with pre-confirmed, reliable workers who actually show up, eliminating the uncertainty and operational challenges of traditional temporary staffing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We believe that every retail store deserves access to quality staff without the hassle of last-minute cancellations and no-shows that disrupt business operations.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Our Story</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">The Problem We Solve</h3>
              <p className="text-muted-foreground leading-relaxed">
                Retail businesses face daily challenges with staffing reliability. Traditional staffing agencies often provide workers who cancel last minute or don't show up at all, leaving store managers scrambling to cover shifts. This not only impacts customer service but also creates significant operational stress and financial losses.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">Our Solution</h3>
              <p className="text-muted-foreground leading-relaxed">
                GigErn was founded to solve this fundamental problem. Through our advanced planning system, worker verification process, and operational discipline, we ensure that businesses get the staff they need, when they need them. Our platform connects retail stores with pre-screened, reliable workers who are committed to showing up and performing their duties professionally.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">Reliability</h3>
              <p className="text-muted-foreground">
                We stand by our commitment to provide workers who show up on time and perform their duties professionally.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">Transparency</h3>
              <p className="text-muted-foreground">
                Clear communication and honest relationships with both businesses and workers are fundamental to our operations.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We continuously improve our processes and technology to deliver exceptional staffing solutions.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-medium text-foreground mb-3">Partnership</h3>
              <p className="text-muted-foreground">
                We view our relationships with businesses and workers as long-term partnerships built on trust and mutual success.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <div className="text-muted-foreground">Worker Show Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-muted-foreground">Verified Workers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Partner Stores</div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Sarah Johnson</h3>
              <p className="text-muted-foreground mb-2">Chief Executive Officer</p>
              <p className="text-sm text-muted-foreground">
                15+ years in retail operations and workforce management
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Michael Chen</h3>
              <p className="text-muted-foreground mb-2">Chief Technology Officer</p>
              <p className="text-sm text-muted-foreground">
                Former senior engineer at leading tech companies
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-6 text-center">
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-medium text-foreground mb-2">Emily Rodriguez</h3>
              <p className="text-muted-foreground mb-2">Head of Operations</p>
              <p className="text-sm text-muted-foreground">
                Expert in workforce planning and retail logistics
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Staffing?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join hundreds of retail stores that have already discovered the GigErn difference. Experience reliable staffing that actually works.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/register" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/contact" 
                className="px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
};

export default AboutUs;

import React from 'react';
import { Link } from 'react-router-dom';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 29, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to GigErn. These Terms and Conditions govern your use of our staffing platform and services. By accessing or using GigErn, you agree to be bound by these terms. Please read them carefully before using our services.
            </p>
          </div>
        </section>

        {/* Acceptance of Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using GigErn, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              GigErn reserves the right to modify these terms at any time. Your continued use of the service following any changes constitutes acceptance of those changes.
            </p>
          </div>
        </section>

        {/* Services Description */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. Services Description</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              GigErn is a staffing platform that connects retail businesses with pre-verified workers for temporary and permanent positions. Our services include:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Worker verification and background screening</li>
              <li>Shift scheduling and management</li>
              <li>Payment processing and payroll services</li>
              <li>Performance tracking and rating system</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </section>

        {/* User Responsibilities */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">For Businesses</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate information about your business and staffing needs</li>
                <li>Pay workers promptly for completed shifts</li>
                <li>Maintain a safe working environment</li>
                <li>Provide clear job descriptions and expectations</li>
                <li>Rate workers fairly and honestly after completed shifts</li>
                <li>Comply with all applicable labor laws and regulations</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">For Workers</h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Provide accurate personal and professional information</li>
                <li>Arrive on time for scheduled shifts</li>
                <li>Perform duties professionally and to the best of your ability</li>
                <li>Maintain professional conduct at all times</li>
                <li>Communicate promptly about any schedule changes or issues</li>
                <li>Comply with client workplace policies and procedures</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Payment Terms */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              GigErn facilitates payments between businesses and workers through our secure payment system. The following terms apply:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Businesses agree to pay GigErn the service fee as outlined in their subscription plan</li>
              <li>Workers receive payment for completed shifts within 48 hours of client confirmation</li>
              <li>GigErn charges a processing fee of 3% on all transactions</li>
              <li>All payments are processed through secure payment gateways</li>
              <li>Refunds are subject to our refund policy and dispute resolution process</li>
            </ul>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Cancellation Policy</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We understand that plans change. Our cancellation policy is as follows:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>24+ hours notice:</strong> No cancellation fee</li>
              <li><strong>12-24 hours notice:</strong> 25% cancellation fee</li>
              <li><strong>6-12 hours notice:</strong> 50% cancellation fee</li>
              <li><strong>Less than 6 hours:</strong> 100% cancellation fee</li>
              <li>Worker no-shows are subject to full payment and may affect account standing</li>
            </ul>
          </div>
        </section>

        {/* Intellectual Property */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Intellectual Property</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              All content, trademarks, service marks, logos, trade names, and other intellectual property displayed on the GigErn platform are the property of GigErn or its licensors. You may not use, copy, reproduce, republish, upload, post, transmit, distribute, or modify any such content without our express written permission.
            </p>
          </div>
        </section>

        {/* Privacy and Data Protection */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Privacy and Data Protection</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which forms part of these Terms and Conditions. By using GigErn, you consent to the collection and use of your information as described in our Privacy Policy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </div>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              GigErn shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our total liability to you for all claims arising from the use of the service shall not exceed the amount paid by you to GigErn in the three months preceding the claim.
            </p>
          </div>
        </section>

        {/* Termination */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              GigErn reserves the right to terminate or suspend your account and bar access to the service at our sole discretion, without prior notice or liability, under any circumstances, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Breach of these Terms and Conditions</li>
              <li>Violation of applicable laws or regulations</li>
              <li>Fraudulent or illegal activities</li>
              <li>Repeated complaints from other users</li>
              <li>Failure to pay outstanding fees</li>
            </ul>
          </div>
        </section>

        {/* Dispute Resolution */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. Dispute Resolution</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Any disputes arising from or relating to these Terms or the service shall be resolved through good faith negotiations. If a resolution cannot be reached, the dispute shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each party shall bear its own costs and attorneys' fees in any arbitration proceeding.
            </p>
          </div>
        </section>

        {/* Governing Law */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Governing Law</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Email:</strong> legal@GigErn.com</p>
              <p><strong>Phone:</strong> 1-800-GigErn</p>
              <p><strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-6">
              Join thousands of businesses and workers who trust GigErn for reliable staffing solutions.
            </p>
            <Link 
              to="/register" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Sign Up Now
            </Link>
          </div>
        </section>
    </div>
  );
};

export default TermsConditions;

import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 29, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              At GigErn, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our staffing platform and services.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect personal information that you provide when registering for our services, including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Full name, email address, and phone number</li>
                <li>Physical address and location data</li>
                <li>Date of birth and government-issued identification</li>
                <li>Bank account information for payment processing</li>
                <li>Work history and professional qualifications</li>
                <li>Emergency contact information</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">Employment Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For workers, we collect additional employment-related information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Resume and work experience</li>
                <li>Skills and certifications</li>
                <li>Availability and scheduling preferences</li>
                <li>Performance ratings and reviews</li>
                <li>Background check results</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-xl font-medium text-foreground mb-3">Business Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For businesses, we collect company-related information:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Company name and registration details</li>
                <li>Business address and locations</li>
                <li>Industry and business type</li>
                <li>Staffing requirements and job postings</li>
                <li>Payment method and billing information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use your information for the following purposes:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Service Provision:</strong> To provide staffing services and connect workers with businesses</li>
              <li><strong>Verification:</strong> To verify identity, qualifications, and background information</li>
              <li><strong>Payment Processing:</strong> To process payments and manage financial transactions</li>
              <li><strong>Communication:</strong> To communicate with you about your account and services</li>
              <li><strong>Matching:</strong> To match workers with suitable job opportunities</li>
              <li><strong>Analytics:</strong> To improve our services and develop new features</li>
              <li><strong>Legal Compliance:</strong> To comply with legal obligations and regulatory requirements</li>
              <li><strong>Safety:</strong> To ensure the safety and security of all platform users</li>
            </ul>
          </div>
        </section>

        {/* Information Sharing */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>With Other Users:</strong> We share relevant information between businesses and workers to facilitate staffing arrangements</li>
              <li><strong>Service Providers:</strong> With third-party service providers who assist in operating our platform</li>
              <li><strong>Background Check Companies:</strong> With authorized background check providers for verification purposes</li>
              <li><strong>Payment Processors:</strong> With payment processing companies to handle transactions</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In connection with mergers, acquisitions, or sales of business assets</li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>SSL encryption for all data transmissions</li>
              <li>Secure servers with firewalls and intrusion detection</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Employee background checks and confidentiality agreements</li>
              <li>Access controls and authentication systems</li>
              <li>Data backup and disaster recovery procedures</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>
        </section>

        {/* Data Retention */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">5. Data Retention</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When you close your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information for legal, regulatory, or fraud prevention purposes.
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">6. Your Rights</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Portability:</strong> Request transfer of your information to another service</li>
              <li><strong>Restriction:</strong> Request restriction of processing your information</li>
              <li><strong>Objection:</strong> Object to processing of your information</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@GigErn.com.
            </p>
          </div>
        </section>

        {/* Cookies and Tracking */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">7. Cookies and Tracking</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
              <li><strong>Performance Cookies:</strong> Help us understand how our website is used</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              You can control cookie settings through your browser preferences.
            </p>
          </div>
        </section>

        {/* Third-Party Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">8. Third-Party Links</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
            </p>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">9. Children's Privacy</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              GigErn is not intended for individuals under 18 years of age. We do not knowingly collect personal information from children under 18. If we become aware that we have collected information from a child under 18, we will take steps to delete such information immediately.
            </p>
          </div>
        </section>

        {/* International Data Transfers */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">10. International Data Transfers</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>
          </div>
        </section>

        {/* Changes to This Policy */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to This Policy</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of our services after any changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Information</h2>
          <div className="bg-card border border-border rounded-xl p-8">
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Email:</strong> privacy@GigErn.com</p>
              <p><strong>Phone:</strong> 1-800-GigErn</p>
              <p><strong>Address:</strong> 123 Business Ave, Suite 100, San Francisco, CA 94105</p>
              <p><strong>Privacy Officer:</strong> privacy.officer@GigErn.com</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Questions About Your Privacy?
            </h2>
            <p className="text-muted-foreground mb-6">
              We're here to help. Contact our privacy team with any concerns.
            </p>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Privacy Team
            </Link>
          </div>
        </section>
    </div>
  );
};

export default PrivacyPolicy;

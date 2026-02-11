import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/elements/Button';
import Input from '../../components/elements/Input';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    userType: 'business'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for contacting us. We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        userType: 'business'
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions about GigErn? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    I am a
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="userType"
                        value="business"
                        checked={formData.userType === 'business'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="text-foreground">Business Owner</span>
                    </label>
                    <label className="flex items-center p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                      <input
                        type="radio"
                        name="userType"
                        value="worker"
                        checked={formData.userType === 'worker'}
                        onChange={handleInputChange}
                        className="mr-3"
                      />
                      <span className="text-foreground">Worker</span>
                    </label>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Company */}
                {formData.userType === 'business' && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    required
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  loading={isSubmitting}
                  disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Success Message */}
                {submitMessage && (
                  <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                    <p className="text-success text-sm">{submitMessage}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">support@GigErn.com</p>
                  <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">1-800-GigErn</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Office</h3>
                  <p className="text-muted-foreground">123 Business Ave, Suite 100</p>
                  <p className="text-muted-foreground">San Francisco, CA 94105</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Support Hours
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="text-foreground">9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="text-foreground">10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-foreground">Closed</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Emergency Support:</strong> For urgent staffing issues, call our 24/7 hotline at 1-800-URGENT.
                </p>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Find quick answers to common questions about our services, pricing, and platform features.
              </p>
              
              <Link 
                to="/faq" 
                className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
              >
                View FAQ
                <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Social Media */}
            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Follow Us
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Stay updated with the latest news and updates from GigErn.
              </p>
              
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Twitter
                </a>
                <a 
                  href="#" 
                  className="px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-16">
          <div className="bg-card border border-border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Ready to Transform Your Staffing?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of businesses and workers who trust GigErn for reliable staffing solutions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                to="/register" 
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                to="/about" 
                className="px-6 py-3 border border-border bg-card text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
    </div>
  );
};

export default ContactUs;

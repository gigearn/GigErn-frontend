import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./elements/Icon";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();
  const footerLinks = {
    platform: [
      { label: "For Stores", path: "/register/store" },
      { label: "For Gigs", path: "/register/gig" },
      { label: "For Delivery Partners", path: "/register/gig" },
      { label: "How It Works", path: "/" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Careers", path: "/register" },
      { label: "Blog", path: "/" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
      { label: "Cookie Policy", path: "/" },
      { label: "Refund Policy", path: "/" },
    ],
    support: [
      { label: "Help Center", path: "/contact" },
      { label: "Safety Guidelines", path: "/" },
      { label: "Document Requirements", path: "/" },
      { label: "FAQs", path: "/contact" },
    ],
  };
  const socialLinks = [
    { icon: "Facebook", label: "Facebook", url: "#" },
    { icon: "Twitter", label: "Twitter", url: "#" },
    { icon: "Linkedin", label: "LinkedIn", url: "#" },
    { icon: "Instagram", label: "Instagram", url: "#" },
  ];

  return (
    <footer className="border-t border-border bg-card px-4 py-12 md:px-6 md:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon name="Users" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                GigErn
              </span>
            </div>
            <p className="mb-6 text-sm text-muted-foreground md:text-base">
              Enterprise-grade staffing platform for retail stores through
              advance planning and verification.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social, idx) => (
                <a
                  key={idx}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/30 transition-all duration-250 hover:border-primary hover:bg-primary/10"
                  aria-label={social?.label}
                >
                  <Icon
                    name={social?.icon}
                    size={18}
                    color="var(--color-muted-foreground)"
                  />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground md:text-base">
              Platform
            </h3>
            <ul className="space-y-3">
              {footerLinks?.platform?.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm text-muted-foreground transition-colors duration-250 hover:text-primary"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground md:text-base">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks?.company?.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm text-muted-foreground transition-colors duration-250 hover:text-primary"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground md:text-base">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks?.legal?.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm text-muted-foreground transition-colors duration-250 hover:text-primary"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground md:text-base">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks?.support?.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm text-muted-foreground transition-colors duration-250 hover:text-primary"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} GigErn. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-xs text-muted-foreground md:text-sm">
                  SSL Secured
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon
                  name="CheckCircle2"
                  size={16}
                  color="var(--color-success)"
                />
                <span className="text-xs text-muted-foreground md:text-sm">
                  Verified Platform
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={16} color="var(--color-success)" />
                <span className="text-xs text-muted-foreground md:text-sm">
                  Reliability Driven
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

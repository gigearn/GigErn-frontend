import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/elements/Icon";
import Button from "../../../components/elements/Button";

const CTASection = () => {
  const navigate = useNavigate();
  const features = [
    { icon: "Shield", label: "Document Verified" },
    { icon: "CheckCircle2", label: "98.5% Show-up Rate" },
    { icon: "Clock", label: "48h Advance Planning" },
    { icon: "Award", label: "Reliability Scored" },
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-2xl border border-primary/20 bg-card p-8 shadow-elevation-xl md:p-12 lg:p-16">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 md:h-20 md:w-20">
              <Icon name="Users" size={32} color="var(--color-primary)" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground md:text-3xl lg:text-4xl">
              Ready to Build Your Reliable Workforce?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              Join GigErn today and experience the difference of pre-confirmed,
              verified staff.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Icon
                    name={feature?.icon}
                    size={18}
                    color="var(--color-success)"
                  />
                  <span className="text-sm font-medium text-foreground md:text-base">
                    {feature?.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="right"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                Register as Store
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Briefcase"
                iconPosition="right"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                Register as Gig
              </Button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-medium text-primary transition-colors duration-250 hover:text-primary/80"
              >
                Sign in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

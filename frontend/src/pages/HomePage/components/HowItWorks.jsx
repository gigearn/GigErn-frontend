import React from "react";
import Icon from "../../../components/elements/Icon";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      number: "01",
      icon: "UserPlus",
      title: "Register & Verify",
      description: "Complete registration with document verification.",
      timeline: "5-10 minutes",
      color: "primary",
    },
    {
      id: 2,
      number: "02",
      icon: "Calendar",
      title: "Plan Ahead",
      description: "Stores create shifts 48+ hours in advance.",
      timeline: "48+ hours advance",
      color: "secondary",
    },
    {
      id: 3,
      number: "03",
      icon: "CheckCircle2",
      title: "Double Confirmation",
      description: "Workers confirm shifts twice - 24h and 6h before.",
      timeline: "24h & 6h before",
      color: "success",
    },
    {
      id: 4,
      number: "04",
      icon: "QrCode",
      title: "Check-In & Work",
      description: "QR code check-in with GPS tracking for deliveries.",
      timeline: "On shift day",
      color: "accent",
    },
  ];

  const colorMap = {
    primary: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
    },
    secondary: {
      bg: "bg-secondary/10",
      text: "text-secondary",
      border: "border-secondary/20",
    },
    success: {
      bg: "bg-success/10",
      text: "text-success",
      border: "border-success/20",
    },
    accent: {
      bg: "bg-accent/10",
      text: "text-accent",
      border: "border-accent/20",
    },
  };

  return (
    <section className="bg-muted/30 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 text-2xl font-semibold text-foreground md:text-3xl lg:text-4xl">
            How GigErn Works
          </h2>
          <p className="mx-auto max-w-3xl text-base text-muted-foreground md:text-lg">
            Four simple steps to reliable, pre-confirmed staffing.
          </p>
        </div>
        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {steps?.map((step, index) => {
            const colors = colorMap?.[step?.color];
            return (
              <div
                key={step?.id}
                className="group relative rounded-xl border border-border bg-card p-6 shadow-elevation-sm transition-all duration-250 hover:shadow-elevation-md md:p-8"
              >
                <div className="mb-6 flex items-start justify-between">
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl ${colors?.bg} transition-transform duration-250 group-hover:scale-110 md:h-20 md:w-20`}
                  >
                    <Icon
                      name={step?.icon}
                      size={32}
                      color={`var(--color-${step?.color})`}
                    />
                  </div>
                  <div
                    className={`rounded-lg border-2 ${colors?.border} ${colors?.bg} px-3 py-1 md:px-4 md:py-2`}
                  >
                    <span
                      className={`text-xl font-bold ${colors?.text} md:text-2xl`}
                    >
                      {step?.number}
                    </span>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
                  {step?.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {step?.description}
                </p>
                <div className="flex items-center gap-2">
                  <Icon
                    name="Clock"
                    size={16}
                    color="var(--color-muted-foreground)"
                  />
                  <span className="text-sm font-medium text-muted-foreground">
                    {step?.timeline}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/elements/Icon";
import Button from "../../../components/elements/Button";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-teal-50 px-4 py-16 md:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary md:text-base">
              <Icon name="Shield" size={18} />
              <span>Reliability-Driven Staffing Platform</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
              Pre-Confirmed Staff Who Actually Show Up
            </h1>
            <p className="text-base text-muted-foreground md:text-lg lg:text-xl">
              Enterprise-grade staffing solutions for retail stores through
              advance planning, verification, and operational discipline.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                variant="default"
                size="lg"
                iconName="UserPlus"
                iconPosition="right"
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto"
              >
                Get Started Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="PlayCircle"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Watch Demo
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 md:gap-8">
              <div className="flex items-center gap-2">
                <Icon
                  name="CheckCircle2"
                  size={20}
                  color="var(--color-success)"
                />
                <span className="text-sm text-muted-foreground md:text-base">
                  Document Verified
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={20} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground md:text-base">
                  SSL Secured
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Award" size={20} color="var(--color-success)" />
                <span className="text-sm text-muted-foreground md:text-base">
                  Reliability Scored
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/src/assets/hero-section.png"
              alt="GigErn Staffing Platform"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

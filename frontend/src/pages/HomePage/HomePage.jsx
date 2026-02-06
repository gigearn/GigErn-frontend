import React from "react";
import HeroSection from "./components/HeroSection";
import ValuePropositionSection from "./components/ValueProposition";
import HowItWorksSection from "./components/HowItWorks";
import SocialProofSection from "./components/SocialProof";
import CTASection from "./components/CTASection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection />
        <ValuePropositionSection />
        <HowItWorksSection />
        <SocialProofSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePage;

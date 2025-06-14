import React from "react";
import { ContentSection } from "./sections/ContentSection";
import { FAQSection } from "./sections/FAQSection";
import { HeroSection } from "./sections/HeroSection";
import { PartnershipSection } from "./sections/PartnershipSection";
import { StatisticsSection } from "./sections/StatisticsSection";
import { AudioPlayerSection } from "./sections/AudioPlayerSection";
import { InvestorCTASection } from "./sections/InvestorCTASection";
import { InteractiveDemo } from "@/components/InteractiveDemo";
import { MarketVisualization } from "@/components/MarketVisualization";
import { TechShowcase } from "@/components/TechShowcase";
import { CompetitiveAdvantage } from "@/components/CompetitiveAdvantage";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const Font = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1920px] relative">
        <Navigation />
        <div className="pt-16">
          <HeroSection />
          <div id="demo">
            <AudioPlayerSection />
          </div>
          <div id="interactive-demo">
            <InteractiveDemo />
          </div>
          <div id="teknologi">
            <TechShowcase />
          </div>
          <div id="marked">
            <MarketVisualization />
          </div>
          <div id="konkurransefortrinn">
            <CompetitiveAdvantage />
          </div>
          <StatisticsSection />
          <PartnershipSection />
          <div id="faq">
            <ContentSection />
          </div>
          <div id="investor">
            <InvestorCTASection />
          </div>
          <FAQSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

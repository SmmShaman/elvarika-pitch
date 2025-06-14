import React from "react";
import { ContentSection } from "./sections/ContentSection";
import { FAQSection } from "./sections/FAQSection";
import { HeroSection } from "./sections/HeroSection";
import { PartnershipSection } from "./sections/PartnershipSection";
import { StatisticsSection } from "./sections/StatisticsSection";

export const Font = (): JSX.Element => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full max-w-[1920px] relative">
        <HeroSection />
        <ContentSection />
        <PartnershipSection />
        <StatisticsSection />
        <FAQSection />
      </div>
    </div>
  );
};

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";

export const InvestorCTASection = (): JSX.Element => {
  const { translations } = useLanguage();
  
  return (
    <section className="w-full bg-[#defff0] py-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-[800px] mx-auto bg-white border-none shadow-lg">
          <CardContent className="p-12 text-center">
            <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
              <span className="font-medium">{translations.investorCTA.title.part1}</span>
              <span className="tracking-[-0.53px]">{translations.investorCTA.title.part2}</span>
              <span className="font-medium">{translations.investorCTA.title.part3}</span>
            </h2>
            
            <p className="text-lg text-[#022f36] leading-[25.2px] mb-8 max-w-[600px] mx-auto">
              {translations.investorCTA.subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#022f36] mb-2">$75.09B</div>
                <div className="text-sm text-gray-600">{translations.investorCTA.stats.market}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#022f36] mb-2">30.20%</div>
                <div className="text-sm text-gray-600">{translations.investorCTA.stats.growth}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#022f36] mb-2">1B+</div>
                <div className="text-sm text-gray-600">{translations.investorCTA.stats.users}</div>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="h-[50px] px-8 rounded-[999px] bg-[#022f36] text-white font-medium text-base hover:bg-[#033944] w-full md:w-auto"
              >
                {translations.investorCTA.cta}
              </Button>
              <div className="text-sm text-gray-600">
                {translations.investorCTA.description}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
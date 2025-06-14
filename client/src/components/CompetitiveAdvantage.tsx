import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface CompetitorFeature {
  feature: string;
  us: boolean;
  competitor1: boolean;
  competitor2: boolean;
  competitor3: boolean;
}

export const CompetitiveAdvantage: React.FC = () => {
  const { translations } = useLanguage();
  
  const competitorData: CompetitorFeature[] = [
    {
      feature: translations.competitive.features.hyperrealistic,
      us: true,
      competitor1: false,
      competitor2: true,
      competitor3: false
    },
    {
      feature: translations.competitive.features.personalLibrary,
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: translations.competitive.features.playlist,
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: translations.competitive.features.norwegianOptimized,
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: true
    },
    {
      feature: translations.competitive.features.gdprCompliant,
      us: true,
      competitor1: true,
      competitor2: false,
      competitor3: true
    },
    {
      feature: translations.competitive.features.offline,
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: translations.competitive.features.realtime,
      us: true,
      competitor1: false,
      competitor2: true,
      competitor3: false
    },
    {
      feature: translations.competitive.features.accessibilityFocus,
      us: true,
      competitor1: true,
      competitor2: false,
      competitor3: false
    }
  ];

  const FeatureIcon: React.FC<{ hasFeature: boolean }> = ({ hasFeature }) => (
    hasFeature ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <X className="h-5 w-5 text-gray-400" />
    )
  );

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium">{translations.competitive.title.part1}</span>
            <span className="tracking-[-0.53px]">{translations.competitive.title.part2}</span>
            <span className="font-medium">{translations.competitive.title.part3}</span>
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[700px] mx-auto">
            {translations.competitive.subtitle}
          </p>
        </div>

        <div className="max-w-[1000px] mx-auto">
          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#022f36] text-white">
                      <th className="text-left p-6 font-medium">Funksjoner</th>
                      <th className="text-center p-6 font-medium bg-[#defff0] text-[#022f36]">
                        {translations.competitive.competitors.us}
                      </th>
                      <th className="text-center p-6 font-medium">{translations.competitive.competitors.naturalReader}</th>
                      <th className="text-center p-6 font-medium">{translations.competitive.competitors.speechify}</th>
                      <th className="text-center p-6 font-medium">{translations.competitive.competitors.voiceDream}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {competitorData.map((row, index) => (
                      <tr 
                        key={index} 
                        className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="p-6 font-medium text-[#022f36]">
                          {row.feature}
                        </td>
                        <td className="p-6 text-center bg-[#defff0]/30">
                          <FeatureIcon hasFeature={row.us} />
                        </td>
                        <td className="p-6 text-center">
                          <FeatureIcon hasFeature={row.competitor1} />
                        </td>
                        <td className="p-6 text-center">
                          <FeatureIcon hasFeature={row.competitor2} />
                        </td>
                        <td className="p-6 text-center">
                          <FeatureIcon hasFeature={row.competitor3} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-[#7afcd0] to-[#5ef4c4] border-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#022f36] mb-2">{translations.competitive.stats.fullFeatures.value}</div>
                <div className="text-[#022f36] font-medium">{translations.competitive.stats.fullFeatures.label}</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  {translations.competitive.stats.fullFeatures.description}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#ffb8d1] to-[#ff9cc5] border-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#022f36] mb-2">{translations.competitive.stats.comprehensive.value}</div>
                <div className="text-[#022f36] font-medium">{translations.competitive.stats.comprehensive.label}</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  {translations.competitive.stats.comprehensive.description}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#cdbcff] to-[#b8a6ff] border-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#022f36] mb-2">{translations.competitive.stats.first.value}</div>
                <div className="text-[#022f36] font-medium">{translations.competitive.stats.first.label}</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  {translations.competitive.stats.first.description}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
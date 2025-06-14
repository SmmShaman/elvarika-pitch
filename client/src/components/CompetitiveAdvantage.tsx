import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, X } from "lucide-react";

interface CompetitorFeature {
  feature: string;
  us: boolean;
  competitor1: boolean;
  competitor2: boolean;
  competitor3: boolean;
}

export const CompetitiveAdvantage: React.FC = () => {
  const competitorData: CompetitorFeature[] = [
    {
      feature: "Hyperrealistiske AI-stemmer",
      us: true,
      competitor1: false,
      competitor2: true,
      competitor3: false
    },
    {
      feature: "Personlig lydbibliotek",
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: "Spilleliste-funksjonalitet",
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: "Norsk språkoptimalisering",
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: true
    },
    {
      feature: "GDPR-kompatibel",
      us: true,
      competitor1: true,
      competitor2: false,
      competitor3: true
    },
    {
      feature: "Offline-funksjonalitet",
      us: true,
      competitor1: false,
      competitor2: false,
      competitor3: false
    },
    {
      feature: "Sanntids prosessering",
      us: true,
      competitor1: false,
      competitor2: true,
      competitor3: false
    },
    {
      feature: "Tilgjengelighetsfokus",
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
            <span className="font-medium">Konkurransefortrinn</span>
            <span className="tracking-[-0.53px]"> som </span>
            <span className="font-medium">definerer markedsledelse</span>
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[700px] mx-auto">
            Mens konkurrentene fokuserer på enkeltfunksjoner, leverer vi en helhetlig 
            lydopplevelse som setter ny standard i bransjen.
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
                        Lydordbok i Lomma
                      </th>
                      <th className="text-center p-6 font-medium">NaturalReader</th>
                      <th className="text-center p-6 font-medium">Speechify</th>
                      <th className="text-center p-6 font-medium">Voice Dream</th>
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
                <div className="text-3xl font-bold text-[#022f36] mb-2">8/8</div>
                <div className="text-[#022f36] font-medium">Fulle funksjoner</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  Som eneste løsning med alle nøkkelfunksjoner
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#ffb8d1] to-[#ff9cc5] border-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#022f36] mb-2">3x</div>
                <div className="text-[#022f36] font-medium">Mer omfattende</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  Enn nærmeste konkurrent i funksjonalitet
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#cdbcff] to-[#b8a6ff] border-none">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-[#022f36] mb-2">1st</div>
                <div className="text-[#022f36] font-medium">Lydbibliotek-konsept</div>
                <div className="text-sm text-[#022f36]/70 mt-2">
                  Første til å introdusere spilleliste-funksjon
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Brain, Zap, Shield } from "lucide-react";

interface TechFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  details: string;
  color: string;
}

export const TechShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const techFeatures: TechFeature[] = [
    {
      icon: <Brain className="h-8 w-8 text-white" />,
      title: "Neural TTS Teknologi",
      description: "Hyperrealistiske AI-stemmer som låter naturlige",
      details: "Våre avanserte nevrale nettverk produserer tale som er nesten umulig å skille fra ekte menneskestemmer. Med emosjonell resonans og naturlig intonasjon.",
      color: "bg-gradient-to-br from-[#7afcd0] to-[#5ef4c4]"
    },
    {
      icon: <Zap className="h-8 w-8 text-white" />,
      title: "Sanntids Konvertering",
      description: "Øyeblikkelig tekst-til-tale prosessering",
      details: "Avansert prosessering som konverterer store tekstmengder til høykvalitets lyd på sekunder, ikke minutter.",
      color: "bg-gradient-to-br from-[#ffb8d1] to-[#ff9cc5]"
    },
    {
      icon: <Mic className="h-8 w-8 text-white" />,
      title: "Flerspråklig Støtte",
      description: "Støtter norsk og andre nordiske språk",
      details: "Spesialisert på nordiske språk med kulturell nøyaktighet og riktig uttale av lokale navn og uttrykk.",
      color: "bg-gradient-to-br from-[#cdbcff] to-[#b8a6ff]"
    },
    {
      icon: <Shield className="h-8 w-8 text-white" />,
      title: "Personvern & Sikkerhet",
      description: "GDPR-kompatibel med lokal prosessering",
      details: "All tekstbehandling skjer sikkert med full kontroll over dine data. Ingen tekst lagres unødvendig eller deles med tredjeparter.",
      color: "bg-gradient-to-br from-[#f8ff9b] to-[#f0ff7a]"
    }
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium">Banebrytende</span>
            <span className="tracking-[-0.53px]"> teknologi som </span>
            <span className="font-medium">definerer fremtiden</span>
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[600px] mx-auto">
            Våre teknologiske innovasjoner setter ny standard for text-til-tale kvalitet og brukeropplevelse.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Feature List */}
            <div className="space-y-4">
              {techFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    activeFeature === index
                      ? "border-[#022f36] shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setActiveFeature(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${feature.color}`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-[#022f36] text-lg mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-[#022f36]/70 text-sm">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Active Feature Detail */}
            <div className="lg:pl-8">
              <Card className={`${techFeatures[activeFeature].color} border-none h-[400px] relative overflow-hidden`}>
                <CardContent className="p-8 h-full flex flex-col justify-center">
                  <div className="mb-6">
                    <div className="p-4 bg-white/20 rounded-full w-fit mb-4">
                      {techFeatures[activeFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold text-[#022f36] mb-4">
                      {techFeatures[activeFeature].title}
                    </h3>
                  </div>
                  
                  <p className="text-[#022f36] text-lg leading-relaxed mb-6">
                    {techFeatures[activeFeature].details}
                  </p>

                  <div className="mt-auto">
                    <Button
                      variant="outline"
                      className="bg-white/20 border-white/30 text-[#022f36] hover:bg-white/30"
                    >
                      Lær mer om teknologien
                    </Button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/20 rounded-full"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Tech Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[800px] mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#022f36] mb-2">99.9%</div>
            <div className="text-sm text-gray-600">Oppetid</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#022f36] mb-2">&lt;2s</div>
            <div className="text-sm text-gray-600">Prosesseringstid</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#022f36] mb-2">15+</div>
            <div className="text-sm text-gray-600">Stemmetyper</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#022f36] mb-2">5★</div>
            <div className="text-sm text-gray-600">Kvalitetsvurdering</div>
          </div>
        </div>
      </div>
    </section>
  );
};
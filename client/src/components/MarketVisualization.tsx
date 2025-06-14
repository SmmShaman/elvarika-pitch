import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Headphones, Globe } from "lucide-react";

interface MarketTrendProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  growth: string;
  color: string;
}

const MarketTrend: React.FC<MarketTrendProps> = ({ icon, title, value, description, growth, color }) => (
  <Card className={`${color} border-none relative overflow-hidden group hover:scale-105 transition-transform duration-300`}>
    <CardContent className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-full bg-white/20`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-[#022f36]">{value}</div>
          <div className="text-sm text-[#022f36]/70">{growth}</div>
        </div>
      </div>
      <h3 className="font-semibold text-[#022f36] mb-2">{title}</h3>
      <p className="text-sm text-[#022f36]/80 leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export const MarketVisualization: React.FC = () => {
  const marketTrends = [
    {
      icon: <TrendingUp className="h-6 w-6 text-[#022f36]" />,
      title: "Text-to-Speech Marked",
      value: "$75.09B",
      description: "Forventet markedsstørrelse innen 2032 drevet av AI-fremskritt og økende etterspørsel",
      growth: "+30.20% CAGR",
      color: "bg-gradient-to-br from-[#7afcd0] to-[#5ef4c4]"
    },
    {
      icon: <Users className="h-6 w-6 text-[#022f36]" />,
      title: "Tilgjengelighetsbehov",
      value: "1B+",
      description: "Mennesker med funksjonshemming som mangler tilgjengelige digitale løsninger",
      growth: "Underservert",
      color: "bg-gradient-to-br from-[#ffb8d1] to-[#ff9cc5]"
    },
    {
      icon: <Headphones className="h-6 w-6 text-[#022f36]" />,
      title: "Lydbok Revolusjon",
      value: "$67.58B",
      description: "Lydbokmarkedet vokser eksplosivt med endrede forbrukervaner mot lyd-først innhold",
      growth: "+26.5% CAGR",
      color: "bg-gradient-to-br from-[#cdbcff] to-[#b8a6ff]"
    },
    {
      icon: <Globe className="h-6 w-6 text-[#022f36]" />,
      title: "Digital Utilgjengelighet",
      value: "96%",
      description: "Av verdens nettsider oppfyller ikke grunnleggende tilgjengelighetsstandarder",
      growth: "Markedsmulighet",
      color: "bg-gradient-to-br from-[#f8ff9b] to-[#f0ff7a]"
    }
  ];

  return (
    <section className="w-full py-16 bg-gradient-to-b from-white to-[#defff0]/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium">Markedets</span>
            <span className="tracking-[-0.53px]"> konvergens skaper </span>
            <span className="font-medium">unik mulighet</span>
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[700px] mx-auto">
            Tre kraftige markedstrender møtes og skaper en perfekt storm for "Lydordbok i Lomma" 
            sin posisjonering i et multi-milliard dollar marked.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {marketTrends.map((trend, index) => (
            <MarketTrend key={index} {...trend} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#7afcd0] rounded-full"></div>
              <span className="text-sm text-[#022f36]">TTS Teknologi</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#ffb8d1] rounded-full"></div>
              <span className="text-sm text-[#022f36]">Tilgjengelighet</span>
            </div>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#cdbcff] rounded-full"></div>
              <span className="text-sm text-[#022f36]">Audio-First</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
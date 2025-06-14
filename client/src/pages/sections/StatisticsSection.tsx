import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const StatisticsSection = (): JSX.Element => {
  // Data for statistics cards
  const statisticsCards = [
    {
      percentage: "+35%",
      title: "Gjenkjøpsrate.",
      description:
        "Øk brukerlojaliteten med en bedre opplevelse etter første leksjon.",
      bgColor: "bg-[#7afcd0]",
      iconUrl: "/figmaAssets/640b1d792e2b160ac3040afa-reveni-icon-user-svg.svg",
    },
    {
      percentage: "+81%",
      title: "Raskere gjentakende bruk.",
      description:
        "Gjør det enkelt for brukerne å fortsette læringen – uten friksjon.",
      bgColor: "bg-[#ffb8d1]",
      iconUrl: "/figmaAssets/640b1d6d85f0c063d98b8709-reveni-icon-coin-svg.svg",
    },
    {
      percentage: "+71%",
      title: "Leksjoner per bruker.",
      description:
        "Oppmuntre til gjentatte øvelser og bygg en lojal brukerbase for plattformen din.",
      bgColor: "bg-[#cdbcff]",
      iconUrl:
        "/figmaAssets/640b1d87ba6752598dda8f62-reveni-icon-thunder-svg.svg",
    },
    {
      percentage: "+29%",
      title: "Økt gjennomsnittsverdi per bruker.",
      description:
        "Tilpass læringsopplevelsen etter brukernes preferanser under",
      bgColor: "bg-[#f8ff9b]",
      isImage: true,
      imageUrl: "/figmaAssets/clip-path-group-1.png",
    },
  ];

  return (
    <section className="w-full max-w-[1024px] mx-auto py-16">
      <div className="w-full max-w-[768px] mx-auto mb-16">
        <div className="text-center">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium tracking-[-0.53px]">
              Plattformen lar deg{" "}
            </span>
            <span className="tracking-[-0.53px]">
              lære språk enkelt og effektivt ved
            </span>
            <span className="font-medium tracking-[-0.53px]">
              {" "}
              å samle alt – kurs, øving og{" "}
            </span>
            <span className="tracking-[-0.53px]">
              fremdrift – i én løsning.
            </span>
          </h2>
          <p className="text-base text-[#022f36] leading-[22.4px]">
            Flere separate verktøy fører til tidkrevende og lite effektive
            læringsprosesser. Det er på tide å samle alt i én løsning som
            effektiviserer læringen, sparer tid og gir bedre resultater.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[713px] mx-auto">
        {statisticsCards.map((card, index) => (
          <Card
            key={index}
            className={`${card.bgColor} border-none rounded-[10px] relative overflow-hidden ${index >= 2 ? "h-[246px]" : "h-[218px]"}`}
          >
            <CardContent className="p-6 pt-[18px]">
              <h3 className="text-[42px] font-medium text-[#022f36] tracking-[-1.26px] leading-[50.4px]">
                {card.percentage}
              </h3>
              <div className="mt-[15px] text-xl text-[#022f36] leading-7">
                <span className="font-medium">{card.title} </span>
                <span>{card.description}</span>
              </div>

              {card.isImage ? (
                <img
                  className="absolute w-[103px] h-[103px] -top-8 right-6"
                  alt="Icon"
                  src={card.imageUrl}
                />
              ) : (
                <div
                  className="absolute w-[104px] h-[104px] -top-8 right-6 bg-[100%_100%]"
                  style={{ backgroundImage: `url(${card.iconUrl})` }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

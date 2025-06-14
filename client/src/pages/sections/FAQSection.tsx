import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const FAQSection = (): JSX.Element => {
  // Feature data for mapping
  const features = [
    {
      id: 1,
      iconBg: "#f8ff9b",
      iconUrl: "/figmaAssets/642d42d16a4956ab6be579f8-vector-svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
    {
      id: 2,
      iconBg: "#cdbcff",
      iconUrl: "/figmaAssets/6409f043d836975f8150ef54-vector-20-7--svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
    {
      id: 3,
      iconBg: "#ffb8d1",
      iconUrl: "/figmaAssets/6409f0597fd405072bf55d31-vector-20-8--svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
    {
      id: 4,
      iconBg: "#7afcd0",
      iconImgSrc: "/figmaAssets/6409f096fe9497abc373bcb7-vector-20-10--svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
    {
      id: 5,
      iconBg: "#cdbcff",
      iconUrl: "/figmaAssets/63f87f44e202f2d0c08bd1cc-icon-smileywink-svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
    {
      id: 6,
      iconBg: "#f8ff9b",
      iconUrl: "/figmaAssets/63f87f4459c17824c39ab93b-icon-coathanger-svg.svg",
      title: "En plattform. Alle dine språklæringsbehov.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac scelerisque mauris. Sed vehicula orci ut nibh tempus,",
    },
  ];

  return (
    <section className="w-full py-24 bg-[#022f36]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-5xl font-normal text-white tracking-[-1.44px] leading-[57.6px] font-['Inter',Helvetica]">
              Why Elverika
            </h2>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature) => (
                <Card key={feature.id} className="bg-transparent border-0">
                  <CardContent className="p-0">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: feature.iconBg }}
                      >
                        {feature.iconUrl ? (
                          <div
                            className="w-6 h-6"
                            style={{
                              backgroundImage: `url(${feature.iconUrl})`,
                              backgroundSize: "100% 100%",
                            }}
                          />
                        ) : feature.iconImgSrc ? (
                          <div className="relative w-6 h-6 flex items-center justify-center">
                            <img
                              className="w-6 h-3.5"
                              alt="Feature icon"
                              src={feature.iconImgSrc}
                            />
                          </div>
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <h3 className="font-medium text-white text-xl leading-7 font-['Inter',Helvetica] mb-4">
                          {feature.title}
                        </h3>
                        <p className="font-normal text-white text-base leading-[22.4px] font-['Inter',Helvetica]">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

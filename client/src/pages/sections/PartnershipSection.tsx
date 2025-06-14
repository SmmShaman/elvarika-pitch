import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const PartnershipSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#cdbcff] py-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Left side with image */}
        <div className="relative w-full lg:w-1/2 h-[654px]">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/figmaAssets/6411dc7a7e7a9318f08f7e8d-group-2025934-png.png)",
            }}
          />
        </div>

        {/* Right side with content */}
        <div className="relative w-full lg:w-1/2 flex flex-col">
          <div className="relative overflow-hidden">
            <div className="relative bg-[url(/figmaAssets/vector.svg)] bg-no-repeat">
              <h2 className="text-5xl text-[#022f36] tracking-[-1.44px] leading-[57.6px] font-normal mb-12 max-w-[410px]">
                <span className="tracking-[-0.69px]">
                  Vi jobber i hånd i hånd med de beste{" "}
                </span>
                <span className="font-medium tracking-[-0.69px]">
                  partnerne
                </span>
                <span className="tracking-[-0.69px]">
                  {" "}
                  for å gi deg den beste opplevelsen
                </span>
              </h2>
            </div>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="p-0">
              <p className="text-base text-[#022f36] leading-[22.4px] mb-8 max-w-[428px]">
                Vi integrerer sømløst med de viktigste leverandørene i<br />
                bransjen, slik at returer og bytter blir
                <br />
                muligheter. Så enkelt er det.
              </p>

              <Button
                variant="outline"
                className="rounded-full border-[#022f36] bg-white text-[#022f36] font-medium h-[52px] w-[123px]"
              >
                Les mer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

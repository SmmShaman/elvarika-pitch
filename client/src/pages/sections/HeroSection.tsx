import React from "react";
import { Button } from "@/components/ui/button";

// Define partner logos data for the carousel
const partnerLogos = [
  {
    src: "/figmaAssets/65f4ebbc4acc8a860cea64ab-jigsaw-logo-1024x563-p-500-png.png",
    width: "115px",
    height: "63px",
    top: "18px",
    left: "30px",
  },
  {
    src: "/figmaAssets/6718f018c73e457382cba7ec-loavies-logo-p-500-png.png",
    width: "115px",
    height: "12px",
    top: "44px",
    left: "205px",
  },
  {
    src: "/figmaAssets/671901103f99ab6c61855fc9-me--2b-em-logo-webp.png",
    width: "115px",
    height: "66px",
    top: "17px",
    left: "380px",
  },
  {
    src: "/figmaAssets/64b9419e944f52bfc0fb491d-nudeproject-p-500-png.png",
    width: "115px",
    height: "12px",
    top: "44px",
    left: "555px",
  },
  {
    src: "/figmaAssets/65f4ea0e2419a8d81cbb4fdb-logo-pandaco-p-500-png.png",
    width: "115px",
    height: "23px",
    top: "38px",
    left: "730px",
  },
  {
    src: "/figmaAssets/layer-1-2.png",
    width: "115px",
    height: "13px",
    top: "43px",
    left: "905px",
  },
  {
    src: "/figmaAssets/group.png",
    width: "115px",
    height: "16px",
    top: "42px",
    left: "1080px",
    isGroup: true,
  },
  {
    src: "/figmaAssets/65f4ecc40401bc4c0843a316-logo-silbon-p-500-webp.png",
    width: "115px",
    height: "48px",
    top: "26px",
    left: "1255px",
  },
  {
    src: "/figmaAssets/66b9cf188689b891a27c2604-siksilk-logo-b41d10194a-seeklogo-com-pn.png",
    width: "60px",
    height: "47px",
    top: "27px",
    left: "1458px",
  },
  {
    src: "/figmaAssets/65f4ebf6544bd21f10bd3508-flabelus-p-500-png.png",
    width: "115px",
    height: "36px",
    top: "32px",
    left: "1605px",
  },
  {
    src: "/figmaAssets/65f4eac0544bd21f10bc32fc-polin-et-moi-p-500-png.png",
    width: "115px",
    height: "35px",
    top: "33px",
    left: "1780px",
  },
  {
    src: "/figmaAssets/64b9417d5cb3bb2c7fdbab82-hurley-p-500-png.png",
    width: "104px",
    height: "25px",
    top: "38px",
    left: "1960px",
  },
  {
    src: "/figmaAssets/65c5668dca3af1fbf38fcc6e-logo-born-png.png",
    width: "104px",
    height: "13px",
    top: "44px",
    left: "2136px",
  },
  {
    src: "/figmaAssets/63f87f44e202f26e0d8bd1db-logo-lagaam-png.png",
    width: "115px",
    height: "34px",
    top: "33px",
    left: "2305px",
  },
  {
    src: "/figmaAssets/64b940fbf9bafe3cc2a11d4c-renatta-p-500-png.png",
    width: "104px",
    height: "20px",
    top: "40px",
    left: "2486px",
  },
  {
    src: "/figmaAssets/65f4eb054e092775d8aff38f-logo-sepiia-png.png",
    width: "104px",
    height: "38px",
    top: "31px",
    left: "2660px",
  },
  {
    src: "/figmaAssets/63f87f4508c46dd5e2582665-logo-pompeii-png.png",
    width: "115px",
    height: "24px",
    top: "38px",
    left: "2830px",
  },
  {
    src: "/figmaAssets/65f4ee0aba094aade833bf8b-scuffers-png.png",
    width: "80px",
    height: "54px",
    top: "23px",
    left: "3022px",
  },
  {
    src: "/figmaAssets/63f87f45a4d6a735c2bab22b-logo-bimani-png.png",
    width: "115px",
    height: "36px",
    top: "32px",
    left: "3180px",
  },
  {
    src: "/figmaAssets/65c56d9787363f38acf24f51-logo-akala-p-500-png.png",
    width: "90px",
    height: "32px",
    top: "34px",
    left: "3368px",
  },
];

export const HeroSection = (): JSX.Element => {
  return (
    <section className="relative w-full bg-[#defff0] py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="w-full md:w-1/2 max-w-[691px]">
            <h1 className="font-normal text-[#022f36] text-[50px] leading-[60px] tracking-[-2.00px] mb-6">
              <span className="tracking-[-1.00px]">Din </span>
              <span className="font-medium tracking-[-1.00px]">
                lydordbok
              </span>
              <span className="tracking-[-1.00px]"> i </span>
              <span className="font-medium tracking-[-1.00px]">lomma</span>
              <span className="tracking-[-1.00px]"> - fremtidens måte å </span>
              <span className="font-medium tracking-[-1.00px]">lytte</span>
              <span className="tracking-[-1.00px]"> til informasjon</span>
            </h1>

            <p className="text-[#022f36] text-base leading-[22.4px] mb-8 max-w-[449px]">
              Bygg ditt personlige lydbibliotek fra enhver tekst. Med AI-stemmer som låter naturlige, 
              kan du nå lytte til artikler, dokumenter og e-post mens du er på farten.
            </p>

            <Button
              variant="outline"
              className="h-[46px] px-6 rounded-[999px] border border-solid border-[#022f36] bg-white text-[#022f36] font-medium text-sm"
            >
              Se investormulighet
            </Button>
          </div>

          <div className="w-full md:w-1/2 max-w-[507px]">
            <div className="h-[376px] bg-[url(/figmaAssets/clip-path-group.png)] bg-[100%_100%]" />
          </div>
        </div>
      </div>

      {/* Partner logos carousel */}
      <div className="w-full h-[100px] mt-16 overflow-hidden">
        <div className="relative w-[4900px] h-[100px]">
          {partnerLogos.map((logo, index) =>
            logo.isGroup ? (
              <div
                key={index}
                className="absolute opacity-50"
                style={{
                  width: logo.width,
                  height: logo.height,
                  top: logo.top,
                  left: logo.left,
                }}
              >
                <div className="h-4 overflow-hidden">
                  <div className="relative w-[115px] h-4">
                    <img
                      className="absolute w-[115px] h-3.5 top-px left-0"
                      alt="Partner logo"
                      src={logo.src}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="absolute opacity-50 bg-cover bg-[50%_50%]"
                style={{
                  width: logo.width,
                  height: logo.height,
                  top: logo.top,
                  left: logo.left,
                  backgroundImage: `url(${logo.src})`,
                }}
              />
            ),
          )}
        </div>
      </div>
    </section>
  );
};

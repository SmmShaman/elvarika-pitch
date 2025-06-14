import React from "react";
import { AudioPlayer } from "@/components/AudioPlayer";

export const AudioPlayerSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium tracking-[-0.53px]">
              Se hvordan{" "}
            </span>
            <span className="tracking-[-0.53px]">
              "Lydordbok i Lomma"
            </span>
            <span className="font-medium tracking-[-0.53px]">
              {" "}
              fungerer{" "}
            </span>
            <span className="tracking-[-0.53px]">
              i praksis
            </span>
          </h2>
          <p className="text-base text-[#022f36] leading-[22.4px] max-w-[600px] mx-auto">
            Bygg ditt personlige lydbibliotek fra enhver tekst. Last opp dokumenter, 
            artikler eller e-post og få dem omgjort til høykvalitets lyd med naturlige AI-stemmer.
          </p>
        </div>
        
        <AudioPlayer />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Klikk play</span> for å høre kvaliteten på våre AI-stemmer
          </p>
        </div>
      </div>
    </section>
  );
};
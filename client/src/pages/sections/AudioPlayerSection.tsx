import React from "react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { useLanguage } from "@/hooks/useLanguage";

export const AudioPlayerSection = (): JSX.Element => {
  const { translations } = useLanguage();
  
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium tracking-[-0.53px]">
              {translations.audioPlayer.title}{" "}
            </span>
            <span className="tracking-[-0.53px]">
              "Elvarika"
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
            {translations.audioPlayer.subtitle}
          </p>
        </div>
        
        <AudioPlayer />
        
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            {translations.audioPlayer.clickToPlay}
          </p>
        </div>
      </div>
    </section>
  );
};
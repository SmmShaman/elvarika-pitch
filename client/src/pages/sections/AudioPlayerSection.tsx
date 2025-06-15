import React from "react";
import { BilingualAudioPlayer } from "@/components/BilingualAudioPlayer";

export const AudioPlayerSection = (): JSX.Element => {
  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4">
        <BilingualAudioPlayer />
      </div>
    </section>
  );
};
import React from 'react';
import { DynamicGradientBackground } from '@/components/DynamicGradientBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export const GradientGenerator: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-16">
        <section className="py-16 bg-gradient-to-br from-[#f8fffe] to-[#f0fff4]">
          <DynamicGradientBackground />
        </section>
      </div>
      <Footer />
    </div>
  );
};
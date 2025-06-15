import React from 'react';
import { PronunciationGuide } from '@/components/PronunciationGuide';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useLanguage } from '@/hooks/useLanguage';

export const PronunciationPage: React.FC = () => {
  const { language } = useLanguage();

  const pageTitle = language === 'no' ? 'Uttale-veiledning - Elvarika' :
                    language === 'uk' ? 'Керівництво з вимови - Elvarika' :
                    'Pronunciation Guide - Elvarika';

  const description = language === 'no' ? 'Lær riktig norsk uttale med interaktiv lydveiledning og visualisering' :
                      language === 'uk' ? 'Вивчайте правильну норвезьку вимову з інтерактивним аудіокерівництвом та візуалізацією' :
                      'Learn proper Norwegian pronunciation with interactive audio guidance and visualization';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#defff0] to-[#f0fff4]">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#022f36] mb-6">
              {language === 'no' ? 'Uttale-veiledning' :
               language === 'uk' ? 'Керівництво з вимови' :
               'Pronunciation Guide'}
            </h1>
            <p className="text-xl text-[#022f36] max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <PronunciationGuide />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PronunciationPage;
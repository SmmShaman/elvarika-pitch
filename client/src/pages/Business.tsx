import React, { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { 
  Truck,
  HardHat,
  Coffee,
  Tractor
} from 'lucide-react';
import { CompactAnimatedDemo } from '@/components/CompactAnimatedDemo';
import { FullScreenScrolling } from '@/components/FullScreenScrolling';
import { DemoAccessForm } from '@/components/DemoAccessForm';

interface BusinessTranslations {
  nav: {
    demo: string;
    pricing: string;
    useCase: string;
    about: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
}

const businessTranslations: Record<string, BusinessTranslations> = {
  uk: {
    nav: {
      demo: "Демо",
      pricing: "Тарифи", 
      useCase: "Застосування",
      about: "Про нас"
    },
    hero: {
      title: "Підвищте безпеку та продуктивність. Миттєво.",
      subtitle: "Elvarika перетворює ваші робочі інструкції, документи та процедури на ефективні аудіоуроки для вашої команди. Співробітники навчаються специфічній лексиці будь-де та будь-коли, навіть не відриваючись від роботи.",
      ctaPrimary: "Замовити демо для бізнесу",
      ctaSecondary: "Спробувати безкоштовно"
    }
  },
  no: {
    nav: {
      demo: "Demo",
      pricing: "Priser",
      useCase: "Bruksområder",
      about: "Om oss"
    },
    hero: {
      title: "Øk sikkerhet og produktivitet. Øyeblikkelig.",
      subtitle: "Elvarika forvandler dine arbeidsinstruksjoner, dokumenter og prosedyrer til effektive lydleksjoner for teamet ditt. Ansatte lærer fagspesifikt vokabular hvor som helst og når som helst, uten å avbryte arbeidsflyten.",
      ctaPrimary: "Bestill business demo",
      ctaSecondary: "Prøv gratis"
    }
  },
  en: {
    nav: {
      demo: "Demo",
      pricing: "Pricing",
      useCase: "Use Cases",
      about: "About"
    },
    hero: {
      title: "Increase safety and productivity. Instantly.",
      subtitle: "Elvarika transforms your work instructions, documents and procedures into effective audio lessons for your team. Employees learn specialized vocabulary anywhere and anytime, without interrupting their workflow.",
      ctaPrimary: "Book business demo",
      ctaSecondary: "Try for free"
    }
  }
};

export const Business: React.FC = () => {
  const { language, changeLanguage } = useLanguage();
  const t = businessTranslations[language] || businessTranslations['en'];
  const [showDemo, setShowDemo] = useState(false);
  const [demoTranslationTarget, setDemoTranslationTarget] = useState<'uk' | 'en'>('uk');
  const [hasAccessToDemo, setHasAccessToDemo] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const handleDemoAccess = () => {
    setHasAccessToDemo(true);
    setShowDemo(true);
  };

  const sections = [
    // Hero Section
    <section key="hero" className="h-screen flex items-center justify-center bg-gradient-to-br from-[#defff0] to-[#f0fff4] relative">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-[#022f36] mb-6 leading-tight">
          {t.hero.title}
        </h1>
        <p className="text-xl text-[#022f36] max-w-4xl mx-auto mb-8 leading-relaxed">
          {t.hero.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => setShowDemo(true)}
            variant="outline" 
            className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white px-8 py-3 text-lg"
          >
            {language === 'no' ? 'Se hvordan det fungerer' :
             language === 'uk' ? 'Подивитися, як це працює' :
             'See how it works'}
          </Button>
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <LanguageSwitcher currentLanguage={language} onLanguageChange={changeLanguage} />
      </div>
    </section>,

    // Use Cases Section
    <section key="usecases" className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-16 overflow-y-auto">
      <div className="container mx-auto px-4 max-w-5xl w-full">
        <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
          {language === 'no' ? 'Bruksområder for ulike bransjer' :
           language === 'uk' ? 'Варіанти використання для різних галузей' :
           'Use Cases for Different Industries'}
        </h2>
        
        <Tabs defaultValue="logistics" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <Truck className="h-4 w-4" />
              {language === 'no' ? 'Logistikk' :
               language === 'uk' ? 'Логістика' :
               'Logistics'}
            </TabsTrigger>
            <TabsTrigger value="construction" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <HardHat className="h-4 w-4" />
              {language === 'no' ? 'Bygg & Anlegg' :
               language === 'uk' ? 'Будівництво' :
               'Construction'}
            </TabsTrigger>
            <TabsTrigger value="horeca" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <Coffee className="h-4 w-4" />
              {language === 'no' ? 'HoReCa' :
               language === 'uk' ? 'HoReCa' :
               'HoReCa'}
            </TabsTrigger>
            <TabsTrigger value="agriculture" className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <Tractor className="h-4 w-4" />
              {language === 'no' ? 'Landbruk' :
               language === 'uk' ? 'Сільське господарство' :
               'Agriculture'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="logistics">
            <Card className="border-l-4 border-blue-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  {language === 'no' ? 'Logistikk og lagerhold' :
                   language === 'uk' ? 'Логістика та складське господарство' :
                   'Logistics and Warehousing'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ? 
                    'Jan leder en stor logistikkterminal i Oslo med 60% utenlandske arbeidere. Språkbarrierer fører til skadet last og 50 000 kroner i erstatningskrav fra en misforstått instruksjon om temperaturkritisk håndtering.' :
                   language === 'uk' ?
                    'Ян керує великим логістичним терміналом в Осло з 60% іноземних працівників. Мовні бар\'єри призводять до пошкодженого вантажу та 50 000 крон компенсаційних позовів через неправильно зрозуміну інструкцію.' :
                    'Jan manages a large logistics terminal in Oslo with 60% foreign workers. Language barriers lead to damaged cargo and 50,000 kroner in compensation claims from misunderstood temperature-critical handling instructions.'}
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'no' ?
                      'PDF instruksjoner blir til personaliserte lydleksjoner på 5 minutter. Nye arbeidere hører på ukrainsk: "Temperaturfølsom last må holdes mellom 2-8 grader."' :
                     language === 'uk' ?
                      'PDF інструкції перетворюються на персоналізовані аудіоуроки за 5 хвилин. Нові працівники чують українською: "Температурочутливий вантаж повинен зберігатися при 2-8 градусах."' :
                      'PDF instructions become personalized audio lessons in 5 minutes. New workers hear in Ukrainian: "Temperature-sensitive cargo must be kept between 2-8 degrees."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="construction">
            <Card className="border-l-4 border-orange-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  {language === 'no' ? 'Bygg og anlegg' :
                   language === 'uk' ? 'Будівництво' :
                   'Construction'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'Anna, HSE-manager, håndterer et multinasjonalt byggeprosjekt. En litauisk arbeider misforsto trykkluftprosedyrer, noe som resulterte i 150 000 kroner i bøter og tre dagers prosjektstopp.' :
                   language === 'uk' ?
                    'Анна, HSE-менеджер, керує багатонаціональним будівельним проектом. Литовський робітник неправильно зрозумів процедури пневматики, що призвело до 150 000 крон штрафів та трьох днів зупинки проекту.' :
                    'Anna, HSE manager, handles a multinational construction project. A Lithuanian worker misunderstood pneumatic procedures, resulting in 150,000 kroner in fines and three days of project shutdown.'}
                </p>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-orange-700 text-sm">
                    {language === 'no' ?
                      'Sikkerhetsinstruksjoner blir til målrettede lydguider. Arbeidere hører: "Sjekk at trykket ikke overstiger 6 bar. Bruk alltid sikkerhetsutstyr."' :
                     language === 'uk' ?
                      'Інструкції безпеки стають цільовими аудіогідами. Робітники чують: "Перевірте, що тиск не перевищує 6 бар. Завжди використовуйте засоби захисту."' :
                      'Safety instructions become targeted audio guides. Workers hear: "Check that pressure does not exceed 6 bar. Always use safety equipment."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horeca">
            <Card className="border-l-4 border-purple-500">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  HoReCa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'David eier en hotellkjede. En servitør misforsto glutenallergi-forespørsel, noe som førte til alvorlig allergisk reaksjon og negativ medieomtale.' :
                   language === 'uk' ?
                    'Давід володіє готельною мережею. Офіціантка неправильно зрозуміла запит про алергію на глютен, що призвело до серйозної алергічної реакції та негативної реклами в ЗМІ.' :
                    'David owns a hotel chain. A waitress misunderstood a gluten allergy request, leading to a serious allergic reaction and negative media coverage.'}
                </p>
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-purple-700 text-sm">
                    {language === 'no' ?
                      'Menyer og allergenlister blir til kontekstuelle lydguider. Ansatte lærer: "Kunden spør om gluten. Sjekk ingredienslisten. Informer kjøkkenet."' :
                     language === 'uk' ?
                      'Меню та списки алергенів стають контекстуальними аудіогідами. Співробітники вивчають: "Клієнт питає про глютен. Перевірте інгредієнти. Повідомте кухню."' :
                      'Menus and allergen lists become contextual audio guides. Staff learn: "Customer asks about gluten. Check ingredients. Inform kitchen."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="agriculture">
            <Card className="border-l-4 border-green-600">
              <CardHeader>
                <CardTitle className="text-2xl text-[#022f36] flex items-center gap-3">
                  <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                  {language === 'no' ? 'Landbruk' :
                   language === 'uk' ? 'Сільське господарство' :
                   'Agriculture'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  {language === 'no' ?
                    'Lars leder en fiskeprosesseringsfabrikk. En polsk arbeider misforsto temperaturkontroll for laks, som resulterte i ødeleggelse av 2 tonn fisk til en verdi av 400 000 kroner.' :
                   language === 'uk' ?
                    'Ларс керує рибопереробною фабрикою. Польський робітник неправильно зрозумів температурний контроль лосося, що призвело до знищення 2 тонн риби вартістю 400 000 крон.' :
                    'Lars manages a fish processing factory. A Polish worker misunderstood salmon temperature control, resulting in destruction of 2 tons of fish worth 400,000 kroner.'}
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-sm">
                    {language === 'no' ?
                      'Daglige instruksjoner fra 2-minutters talemelding. Arbeidere hører: "Fersk laks må holdes konstant mellom 0-2 grader. Sjekk temperatur hver time."' :
                     language === 'uk' ?
                      'Денні інструкції з 2-хвилинного голосового повідомлення. Робітники чують: "Свіжий лосось повинен зберігатися при 0-2 градусах. Перевіряйте температуру щогодини."' :
                      'Daily instructions from 2-minute voice message. Workers hear: "Fresh salmon must be kept constantly between 0-2 degrees. Check temperature every hour."'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  ];

  if (showDemo && !hasAccessToDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#defff0] to-[#f0fff4] flex items-center justify-center">
        <div className="w-full max-w-lg mx-auto px-4">
          <DemoAccessForm onAccessGranted={handleDemoAccess} language={language} />
        </div>
      </div>
    );
  }

  if (showDemo && hasAccessToDemo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#defff0] to-[#f0fff4]">
        <div className="p-6">
          <Button 
            onClick={() => {
              setShowDemo(false);
              setHasAccessToDemo(false);
            }}
            variant="outline" 
            className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white"
          >
            {language === 'no' ? '← Tilbake til hovedside' :
             language === 'uk' ? '← Назад до головної' :
             '← Back to main'}
          </Button>
        </div>
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-3xl font-bold text-[#022f36] mb-8 text-center">
            {language === 'no' ? 'Se hvordan Elvarika fungerer' : 
             language === 'uk' ? 'Подивіться, як працює Elvarika' : 
             'See how Elvarika works'}
          </h1>
          <CompactAnimatedDemo translationTarget={demoTranslationTarget} />
        </div>
      </div>
    );
  }

  return (
    <FullScreenScrolling onSectionChange={setCurrentSection}>
      {sections}
    </FullScreenScrolling>
  );
};

export default Business;
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
  Tractor,
  Shield,
  TrendingUp,
  Target,
  BarChart3
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
                <p className="text-gray-600 leading-relaxed text-sm">
                  {language === 'no' ? 
                    'Jan leder stor logistikkterminal i Oslo. 60% utenlandske arbeidere. Språkbarrierer fører til skadet last - 50 000 kroner erstatning fra misforstått temperaturhåndtering.' :
                   language === 'uk' ?
                    'Ян керує логістичним терміналом в Осло. 60% іноземних працівників. Мовні бар\'єри - пошкоджений вантаж і 50 000 крон компенсацій.' :
                    'Jan manages logistics terminal in Oslo. 60% foreign workers. Language barriers cause damaged cargo - 50,000 kroner compensation claims.'}
                </p>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-blue-800 mb-2 text-sm">
                    {language === 'no' ? 'Typiske utfordringer:' :
                     language === 'uk' ? 'Типові виклики:' :
                     'Typical challenges:'}
                  </h5>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• {language === 'no' ? 'Gaffeltruck sikkerhet og manøvrering' : language === 'uk' ? 'Безпека та маневрування навантажувачів' : 'Forklift safety and maneuvering'}</li>
                    <li>• {language === 'no' ? 'Lagrings- og temperaturkrav' : language === 'uk' ? 'Вимоги до зберігання та температури' : 'Storage and temperature requirements'}</li>
                    <li>• {language === 'no' ? 'Håndtering av farlig gods' : language === 'uk' ? 'Поводження з небезпечними вантажами' : 'Dangerous goods handling'}</li>
                    <li>• {language === 'no' ? 'Nødprosedyrer og evakuering' : language === 'uk' ? 'Аварійні процедури та евакуація' : 'Emergency procedures and evacuation'}</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-xs mb-2">
                    {language === 'no' ?
                      'PDF → 5-min lydleksjon. Arbeidere hører: "Temperaturfølsom last 2-8 grader."' :
                     language === 'uk' ?
                      'PDF → 5-хв аудіоурок. Працівники чують: "Температурочутливий вантаж 2-8 градусів."' :
                      'PDF → 5-min audio lesson. Workers hear: "Temperature-sensitive cargo 2-8 degrees."'}
                  </p>
                  <div className="text-green-600 text-xs">
                    <strong>{language === 'no' ? 'Resultat:' : language === 'uk' ? 'Результат:' : 'Result:'}</strong> {language === 'no' ? 'Redusert skade med 75%, bedre sikkerhet, raskere onboarding' : language === 'uk' ? 'Зменшення пошкоджень на 75%, покращена безпека, швидша адаптація' : 'Reduced damage by 75%, improved safety, faster onboarding'}
                  </div>
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
                <p className="text-gray-600 leading-relaxed text-sm">
                  {language === 'no' ?
                    'Anna, HSE-manager på byggeprosjekt. Litauisk arbeider misforsto trykkluftprosedyrer → 150 000 kr bøter + 3 dagers stopp.' :
                   language === 'uk' ?
                    'Анна, HSE-менеджер будівельного проекту. Литовський робітник неправильно зрозумів пневматику → 150 000 крон штрафів + 3 дні зупинки.' :
                    'Anna, HSE manager construction project. Lithuanian worker misunderstood pneumatics → 150,000 kroner fines + 3-day shutdown.'}
                </p>
                
                <div className="bg-orange-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-orange-800 mb-2 text-sm">
                    {language === 'no' ? 'Kritiske områder:' :
                     language === 'uk' ? 'Критичні області:' :
                     'Critical areas:'}
                  </h5>
                  <ul className="text-orange-700 text-xs space-y-1">
                    <li>• {language === 'no' ? 'Personlig verneutstyr (PVU) krav' : language === 'uk' ? 'Вимоги до засобів індивідуального захисту' : 'Personal protective equipment (PPE) requirements'}</li>
                    <li>• {language === 'no' ? 'Maskinbetjening og vedlikehold' : language === 'uk' ? 'Експлуатація та обслуговування техніки' : 'Equipment operation and maintenance'}</li>
                    <li>• {language === 'no' ? 'Arbeid i høyden prosedyrer' : language === 'uk' ? 'Процедури роботи на висоті' : 'Working at height procedures'}</li>
                    <li>• {language === 'no' ? 'Håndtering av farlige stoffer' : language === 'uk' ? 'Поводження з небезпечними речовинами' : 'Hazardous substances handling'}</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-orange-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-orange-700 text-sm mb-2">
                    {language === 'no' ?
                      'Sikkerhetsinstruksjoner blir til målrettede lydguider. Arbeidere hører: "Sjekk at trykket ikke overstiger 6 bar. Bruk alltid sikkerhetsutstyr."' :
                     language === 'uk' ?
                      'Інструкції безпеки стають цільовими аудіогідами. Робітники чують: "Перевірте, що тиск не перевищує 6 бар. Завжди використовуйте засоби захисту."' :
                      'Safety instructions become targeted audio guides. Workers hear: "Check that pressure does not exceed 6 bar. Always use safety equipment."'}
                  </p>
                  <div className="text-orange-600 text-xs">
                    <strong>{language === 'no' ? 'Resultat:' : language === 'uk' ? 'Результат:' : 'Result:'}</strong> {language === 'no' ? 'Null arbeidsulykker siste år, 90% færre HMS-brudd' : language === 'uk' ? 'Нуль виробничих травм останній рік, на 90% менше порушень безпеки' : 'Zero workplace injuries last year, 90% fewer safety violations'}
                  </div>
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
                
                <div className="bg-purple-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-purple-800 mb-2 text-sm">
                    {language === 'no' ? 'Kritiske kommunikasjonsområder:' :
                     language === 'uk' ? 'Критичні області комунікації:' :
                     'Critical communication areas:'}
                  </h5>
                  <ul className="text-purple-700 text-xs space-y-1">
                    <li>• {language === 'no' ? 'Allergeninformasjon og spesialkost' : language === 'uk' ? 'Інформація про алергени та спеціальне харчування' : 'Allergen information and special diets'}</li>
                    <li>• {language === 'no' ? 'Romservice og gjestehjelp' : language === 'uk' ? 'Обслуговування номерів та допомога гостям' : 'Room service and guest assistance'}</li>
                    <li>• {language === 'no' ? 'Oppgjør og betalingsprosedyrer' : language === 'uk' ? 'Розрахунки та процедури оплати' : 'Billing and payment procedures'}</li>
                    <li>• {language === 'no' ? 'Nødprosedyrer og sikkerhet' : language === 'uk' ? 'Аварійні процедури та безпека' : 'Emergency procedures and security'}</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                  <h4 className="font-semibold text-purple-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-purple-700 text-sm mb-2">
                    {language === 'no' ?
                      'Menyer og allergenlister blir til kontekstuelle lydguider. Ansatte lærer: "Kunden spør om gluten. Sjekk ingredienslisten. Informer kjøkkenet."' :
                     language === 'uk' ?
                      'Меню та списки алергенів стають контекстуальними аудіогідами. Співробітники вивчають: "Клієнт питає про глютен. Перевірте інгредієнти. Повідомте кухню."' :
                      'Menus and allergen lists become contextual audio guides. Staff learn: "Customer asks about gluten. Check ingredients. Inform kitchen."'}
                  </p>
                  <div className="text-purple-600 text-xs">
                    <strong>{language === 'no' ? 'Resultat:' : language === 'uk' ? 'Результат:' : 'Result:'}</strong> {language === 'no' ? 'Null allergenincidenter siste år, økt kundetilfredshet 40%' : language === 'uk' ? 'Нуль інцидентів з алергенами останній рік, підвищення задоволеності клієнтів на 40%' : 'Zero allergen incidents last year, 40% increase in customer satisfaction'}
                  </div>
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
                
                <div className="bg-green-50 p-3 rounded-lg">
                  <h5 className="font-semibold text-green-800 mb-2 text-sm">
                    {language === 'no' ? 'Nøkkelområder i landbruk:' :
                     language === 'uk' ? 'Ключові сфери в сільському господарстві:' :
                     'Key areas in agriculture:'}
                  </h5>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>• {language === 'no' ? 'Matvaresikkerhet og HACCP-prosedyrer' : language === 'uk' ? 'Безпека харчових продуктів та HACCP процедури' : 'Food safety and HACCP procedures'}</li>
                    <li>• {language === 'no' ? 'Maskindrift og vedlikehold' : language === 'uk' ? 'Експлуатація та обслуговування техніки' : 'Equipment operation and maintenance'}</li>
                    <li>• {language === 'no' ? 'Lagring og transport av produkter' : language === 'uk' ? 'Зберігання та транспортування продукції' : 'Product storage and transportation'}</li>
                    <li>• {language === 'no' ? 'Arbeidssikkerhet på gård' : language === 'uk' ? 'Безпека праці на фермі' : 'Farm workplace safety'}</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <h4 className="font-semibold text-green-800 mb-2">
                    {language === 'no' ? 'Elvarika-løsning:' :
                     language === 'uk' ? 'Рішення Elvarika:' :
                     'Elvarika Solution:'}
                  </h4>
                  <p className="text-green-700 text-sm mb-2">
                    {language === 'no' ?
                      'Daglige instruksjoner fra 2-minutters talemelding. Arbeidere hører: "Fersk laks må holdes konstant mellom 0-2 grader. Sjekk temperatur hver time."' :
                     language === 'uk' ?
                      'Денні інструкції з 2-хвилинного голосового повідомлення. Робітники чують: "Свіжий лосось повинен зберігатися при 0-2 градусах. Перевіряйте температуру щогодини."' :
                      'Daily instructions from 2-minute voice message. Workers hear: "Fresh salmon must be kept constantly between 0-2 degrees. Check temperature every hour."'}
                  </p>
                  <div className="text-green-600 text-xs">
                    <strong>{language === 'no' ? 'Resultat:' : language === 'uk' ? 'Результат:' : 'Result:'}</strong> {language === 'no' ? 'Redusert svinn med 85%, forbedret HACCP-overholdelse' : language === 'uk' ? 'Зменшення відходів на 85%, покращення дотримання HACCP' : 'Reduced waste by 85%, improved HACCP compliance'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>,

    // Problems Section
    <section key="problems" className="h-screen flex items-center justify-center bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12 max-w-4xl mx-auto">
          {language === 'no' ? 'Språkbarrierer er mer enn bare misforståelser. De er målbare forretningsrisikoer.' :
           language === 'uk' ? 'Мовний бар\'єр – це більше, ніж просто нерозуміння. Це вимірювані бізнес-ризики.' :
           'Language barriers are more than just misunderstandings. They are measurable business risks.'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="border-red-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-red-500" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'Sikkerhetsrisikoer' :
                 language === 'uk' ? 'Ризики для безпеки' :
                 'Safety risks'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Misforståelse av sikkerhetsinstruksjoner fører til arbeidsulykker, bøter og omdømmetap. Arbeidstilsynet peker på dette som en betydelig risikofaktor.' :
                 language === 'uk' ? 'Нерозуміння інструкцій з техніки безпеки призводить до виробничого травматизму, штрафів та репутаційних втрат. Норвезька інспекція праці вказує на це як на суттєвий фактор ризику.' :
                 'Misunderstanding safety instructions leads to workplace injuries, fines and reputational damage. The Norwegian Labour Inspection Authority points to this as a significant risk factor.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-orange-500 transform rotate-180" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'Redusert produktivitet' :
                 language === 'uk' ? 'Знижена продуктивність' :
                 'Reduced productivity'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Feil i oppgaveutførelse, skade på utstyr og forlenget onboarding av nye ansatte påvirker direkte den operasjonelle effektiviteten.' :
                 language === 'uk' ? 'Помилки у виконанні завдань, пошкодження обладнання та затягнуте адаптування нових співробітників безпосередньо впливають на операційну ефективність.' :
                 'Errors in task execution, equipment damage and prolonged onboarding of new employees directly impact operational efficiency.'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-yellow-500" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'Høye kostnader' :
                 language === 'uk' ? 'Високі витрати' :
                 'High costs'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Å sende hundrevis av arbeidere på generelle språkkurs er dyrt, tidkrevende og ineffektivt for å lære spesialisert arbeidsvokabular "her og nå".' :
                 language === 'uk' ? 'Відправляти сотні працівників на загальні мовні курси дорого, довго та неефективно для вивчення спеціалізованої робочої лексики "тут і зараз".' :
                 'Sending hundreds of workers to general language courses is expensive, time-consuming and ineffective for learning specialized work vocabulary "here and now".'}
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-purple-500 transform rotate-180" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'Tapt salg' :
                 language === 'uk' ? 'Втрачені продажі' :
                 'Lost sales'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'I kundeservice fører manglende evne til å forstå kundebehov til tapte salg og negative anmeldelser.' :
                 language === 'uk' ? 'У сфері обслуговування клієнтів нездатність зрозуміти потреби клієнтів призводить до втрачених продажів та негативних відгуків.' :
                 'In customer service, inability to understand customer needs leads to lost sales and negative reviews.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>,

    // Solution Section
    <section key="solution" className="h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fffe] to-[#f0fff4] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12">
          {language === 'no' ? 'Hvordan Elvarika fungerer: Din personlige språklige prosessor' :
           language === 'uk' ? 'Як працює Elvarika: Ваш персональний лінгвістичний процесор' :
           'How Elvarika works: Your personal linguistic processor'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="h-10 w-10 text-[#022f36] flex items-center justify-center font-bold text-xl">📄</div>
            </div>
            <h3 className="text-2xl font-semibold text-[#022f36] mb-4">
              1. {language === 'no' ? 'Last opp innhold' :
                   language === 'uk' ? 'Завантажте контент' :
                   'Upload content'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'no' ? 'Gi systemet et tekstdokument, bilde av instruksjoner eller til og med en talemelding.' :
               language === 'uk' ? 'Надайте системі текстовий документ, фото інструкцій або навіть голосове повідомлення.' :
               'Provide the system with a text document, photo of instructions or even a voice message.'}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="h-10 w-10 text-[#022f36] flex items-center justify-center font-bold text-xl">🧠</div>
            </div>
            <h3 className="text-2xl font-semibold text-[#022f36] mb-4">
              2. {language === 'no' ? 'Elvarika genererer lydleksjon' :
                   language === 'uk' ? 'Elvarika генерує аудіоурок' :
                   'Elvarika generates audio lesson'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'no' ? 'Vår unike pedagogiske motor identifiserer automatisk nøkkelterminologi, skaper "Anker Kontekst" fra dokumentet ditt for standardisert kunnskap, oversetter og produserer høykvalitets lyd.' :
               language === 'uk' ? 'Наша унікальна педагогічна система автоматично виявляє ключову термінологію, створює "Контекст-якір" з вашого документа для стандартизованих знань, перекладає та генерує якісне аудіо.' :
               'Our unique pedagogical engine automatically identifies key terminology, creates "Anchor Context" from your document for standardized knowledge, translates and produces high-quality audio.'}
            </p>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <div className="h-10 w-10 text-[#022f36] flex items-center justify-center font-bold text-xl">🎧</div>
            </div>
            <h3 className="text-2xl font-semibold text-[#022f36] mb-4">
              3. {language === 'no' ? 'Team lærer effektivt' :
                   language === 'uk' ? 'Команда вчиться ефективно' :
                   'Team learns effectively'}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {language === 'no' ? 'Ansatte hører på ferdige spillelister, mens den innebygde algoritmen for spaced repetition (SRS) sikrer langsiktig kunnskapsretensjon.' :
               language === 'uk' ? 'Співробітники слухають готові плейлисти, а вбудований алгоритм інтервального повторення (SRS) забезпечує довготривале засвоєння знань.' :
               'Employees listen to ready playlists, while the built-in spaced repetition algorithm (SRS) ensures long-term retention.'}
            </p>
          </div>
        </div>
      </div>
    </section>,

    // Features Section
    <section key="features" className="h-screen flex items-center justify-center bg-white py-16 overflow-y-auto">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#022f36] text-center mb-12 max-w-4xl mx-auto">
          {language === 'no' ? 'Funksjoner som skiller Elvarika fra tradisjonell språkopplæring' :
           language === 'uk' ? 'Функції, що відрізняють Elvarika від традиційного мовного навчання' :
           'Features that distinguish Elvarika from traditional language learning'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? '"Anker Kontekst"' :
                 language === 'uk' ? '"Контекст-якір"' :
                 '"Anchor Context"'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'I stedet for abstrakte ord bruker systemet setninger fra ditt originale dokument. Dette garanterer at hele teamet forstår kritisk informasjon enhetlig og utvetydig.' :
                 language === 'uk' ? 'Замість абстрактних слів система використовує речення з вашого оригінального документа. Це гарантує, що вся команда розуміє критичну інформацію однозначно та недвозначно.' :
                 'Instead of abstract words, the system uses sentences from your original document. This guarantees that the entire team understands critical information uniformly and unambiguously.'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-green-500 flex items-center justify-center font-bold">🔄</div>
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'Intelligent repetisjon (SRS)' :
                 language === 'uk' ? 'Розумне повторення (SRS)' :
                 'Intelligent repetition (SRS)'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Systemet lager automatisk nye setninger for repetisjon og vever inn ord som eleven begynner å glemme. Dette er en vitenskapelig bevist metode for maksimal læringseffektivitet.' :
                 language === 'uk' ? 'Система автоматично створює нові речення для повторення, вплітаючи слова, які учень починає забувати. Це науково доведений метод для максимальної ефективності навчання.' :
                 'The system automatically creates new sentences for repetition, weaving in words that the learner begins to forget. This is a scientifically proven method for maximum learning efficiency.'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-purple-500 flex items-center justify-center font-bold">👁️</div>
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? '"Skjermfri" læring' :
                 language === 'uk' ? 'Навчання "без екрана"' :
                 '"Screen-free" learning'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Passivt lydformat gjør det mulig å integrere læring i arbeidsprosesser eller daglige oppgaver uten tidstap. Perfekt for travle voksne.' :
                 language === 'uk' ? 'Пасивний аудіоформат дозволяє інтегрувати навчання в робочі процеси або щоденні завдання без втрати часу. Ідеально для зайнятих дорослих.' :
                 'Passive audio format allows integrating learning into work processes or daily tasks without time loss. Perfect for busy adults.'}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-orange-500" />
              </div>
              <CardTitle className="text-xl text-[#022f36]">
                {language === 'no' ? 'HR-analytikk' :
                 language === 'uk' ? 'HR-аналітика' :
                 'HR analytics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                {language === 'no' ? 'Administrasjonspanelet gir ledere data om teamets læringsfremgang. Evaluer investeringseffektivitet og overvåk kunnskapsoppbygging.' :
                 language === 'uk' ? 'Адміністративна панель надає менеджерам дані про прогрес навчання команди. Оцінюйте ефективність інвестицій та відстежуйте накопичення знань.' :
                 'The admin panel provides managers with data on team learning progress. Evaluate investment effectiveness and monitor knowledge acquisition.'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>,

    // Contact and Terms Section
    <section key="contact" className="h-screen flex items-center justify-center bg-gradient-to-br from-[#022f36] to-[#034a54] py-16 overflow-y-auto">
      <div className="container mx-auto px-4 max-w-6xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            {language === 'no' ? 'Kontakt oss og vilkår' :
             language === 'uk' ? 'Зв\'яжіться з нами та умови' :
             'Contact us and Terms'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {language === 'no' ? 'Klar til å transformere din organisasjons språkopplæring? La oss diskutere hvordan Elvarika kan løse dine spesifikke utfordringer.' :
             language === 'uk' ? 'Готові трансформувати мовне навчання вашої організації? Давайте обговоримо, як Elvarika може вирішити ваші специфічні виклики.' :
             'Ready to transform your organization\'s language learning? Let\'s discuss how Elvarika can solve your specific challenges.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {language === 'no' ? 'Kontaktinformasjon' :
               language === 'uk' ? 'Контактна інформація' :
               'Contact Information'}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">👨‍💼</div>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Vitalii Berbeha</h4>
                  <p className="text-gray-300 text-sm">
                    {language === 'no' ? 'Grunder og CEO' :
                     language === 'uk' ? 'Засновник та CEO' :
                     'Founder & CEO'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">📧</div>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email</h4>
                  <p className="text-gray-300 text-sm">info@vitalii.no</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">📱</div>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {language === 'no' ? 'Telefon' :
                     language === 'uk' ? 'Телефон' :
                     'Phone'}
                  </h4>
                  <p className="text-gray-300 text-sm">+47 925 64 334</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">🌐</div>
                </div>
                <div>
                  <h4 className="text-white font-semibold">Website</h4>
                  <p className="text-gray-300 text-sm">www.vitalii.no</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <div className="text-white text-xl">📍</div>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    {language === 'no' ? 'Adresse' :
                     language === 'uk' ? 'Адреса' :
                     'Address'}
                  </h4>
                  <p className="text-gray-300 text-sm">Hagegata 8, Lena, 2850, Norge</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-semibold text-white mb-6">
              {language === 'no' ? 'Vilkår og betingelser' :
               language === 'uk' ? 'Умови та положення' :
               'Terms and Conditions'}
            </h3>
            
            <div className="space-y-4 text-gray-300 text-sm">
              <div>
                <h4 className="text-white font-semibold mb-2">
                  {language === 'no' ? 'Datavern og personvern' :
                   language === 'uk' ? 'Захист даних та приватність' :
                   'Data Protection & Privacy'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'no' ? 'Elvarika følger GDPR og norsk personvernlov. Alle lydopptak og tekstdata behandles konfidensielt og lagres sikkert i Norge.' :
                   language === 'uk' ? 'Elvarika дотримується GDPR та норвезького законодавства про приватність. Всі аудіозаписи та текстові дані обробляються конфіденційно та зберігаються безпечно в Норвегії.' :
                   'Elvarika complies with GDPR and Norwegian privacy law. All audio recordings and text data are processed confidentially and stored securely in Norway.'}
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">
                  {language === 'no' ? 'Tjenesteavtale' :
                   language === 'uk' ? 'Угода про послуги' :
                   'Service Agreement'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'no' ? 'Månedsabonnement med 30 dagers oppsigelsesfrist. Inkluderer teknisk support, oppdateringer og ubegrenset bruk for registrerte brukere.' :
                   language === 'uk' ? 'Місячна підписка з 30-денним періодом скасування. Включає технічну підтримку, оновлення та необмежене використання для зареєстрованих користувачів.' :
                   'Monthly subscription with 30-day cancellation period. Includes technical support, updates, and unlimited use for registered users.'}
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">
                  {language === 'no' ? 'Sikkerhet' :
                   language === 'uk' ? 'Безпека' :
                   'Security'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'no' ? 'End-til-ende kryptering, regelmessige sikkerhetsmålinger og backup av alle data. ISO 27001 sertifisert infrastruktur.' :
                   language === 'uk' ? 'Наскрізне шифрування, регулярні аудити безпеки та резервне копіювання всіх даних. Інфраструктура сертифікована ISO 27001.' :
                   'End-to-end encryption, regular security audits, and backup of all data. ISO 27001 certified infrastructure.'}
                </p>
              </div>

              <div className="border-t border-white/20 pt-4 mt-6">
                <p className="text-xs text-gray-400">
                  {language === 'no' ? 'Ved å bruke Elvarika aksepterer du våre vilkår og betingelser. For fullstendig tekst, besøk vår nettside.' :
                   language === 'uk' ? 'Використовуючи Elvarika, ви приймаєте наші умови та положення. Для повного тексту відвідайте наш веб-сайт.' :
                   'By using Elvarika, you accept our terms and conditions. For full text, visit our website.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-white mb-4">
              {language === 'no' ? 'Klar til å starte?' :
               language === 'uk' ? 'Готові почати?' :
               'Ready to get started?'}
            </h3>
            <p className="text-gray-300 mb-6">
              {language === 'no' ? 'Book en gratis konsultasjon og se hvordan Elvarika kan transformere din organisasjon.' :
               language === 'uk' ? 'Забронюйте безкоштовну консультацію та подивіться, як Elvarika може трансформувати вашу організацію.' :
               'Book a free consultation and see how Elvarika can transform your organization.'}
            </p>
            <Button 
              onClick={() => window.open('mailto:info@vitalii.no?subject=Elvarika Business Inquiry', '_blank')}
              className="bg-white text-[#022f36] hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
            >
              {language === 'no' ? 'Book konsultasjon' :
               language === 'uk' ? 'Забронювати консультацію' :
               'Book Consultation'}
            </Button>
          </div>
        </div>
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
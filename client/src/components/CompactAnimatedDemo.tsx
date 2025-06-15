import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle, ArrowRight, Zap, Languages, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';

interface WordAnimation {
  word: string;
  translation: string;
  context: string;
  contextTranslation: string;
  id: string;
  isHighlighted: boolean;
  isExtracting: boolean;
  isInContext: boolean;
  isTranslating: boolean;
  isReady: boolean;
}

interface PlaylistItem {
  id: string;
  word: string;
  translation: string;
  context: string;
  contextTranslation: string;
  audioUrl: string;
  duration: string;
  isPlaying: boolean;
}

interface CompactDemoTranslations {
  title: string;
  subtitle: string;
  norwayUkraine: string;
  norwayEngland: string;
  tryDemo: string;
  steps: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  readyPlaylist: string;
  playAudio: string;
  generating: string;
  processing: string;
}

interface CompactAnimatedDemoProps {
  translationTarget?: 'uk' | 'en';
}

export const CompactAnimatedDemo: React.FC<CompactAnimatedDemoProps> = ({ 
  translationTarget = 'uk' 
}) => {
  const { language } = useLanguage();
  const currentLanguage = language;
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [words, setWords] = useState<WordAnimation[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  const sourceText = "Blendingsanordningen reduserer styrken på sollys. Arbeiderne må bruke vernebriller når de arbeider med UV-stråling. Sikkerhetsutstyr er obligatorisk på byggeplassen. Vernehansker beskytter mot kjemiske stoffer. Hørselsvern reduserer støynivået til sikre grenser. Arbeidsgiveren har ansvar for å sikre at alle ansatte har tilgang til riktig verneutstyr. Gassmålere brukes for å oppdage farlige gasser i luft. Fallsikring er nødvendig når man arbeider i høyder over to meter. Brannslukningsapparater må være lett tilgjengelige på alle arbeidsplasser. Første hjelp-utstyr skal alltid være tilgjengelig og oppdatert. Kjemikalier må merkes tydelig med faresymboler. Ventilasjonssystem sørger for ren luft i arbeidsområdet. Støvmaske beskytter lungene mot farlige partikler. Sikkerhetssko med ståltupp beskytter føttene mot tunge gjenstander. Refleksvest gjør arbeiderne synlige i dårlig lys. Arbeidstid begrenses for å unngå utmattelse og ulykker. Risikovurdering må gjennomføres før start på farlige arbeidsoppgaver. Nødutgang må alltid være merket og tilgjengelig. Varselskilt informerer om farer og sikkerhetstiltak. Sikkerhetsinstruks må gis til alle nye ansatte før arbeidsstart.";

  const keyWordsData = [
    {
      word: "blendingsanordning",
      translation_uk: "протисонячний пристрій",
      translation_en: "anti-glare device",
      context: "Blendingsanordningen reduserer styrken på sollys",
      contextTranslation_uk: "Протисонячний пристрій зменшує силу сонячного світла",
      contextTranslation_en: "The anti-glare device reduces the strength of sunlight"
    },
    {
      word: "vernebriller",
      translation_uk: "захисні окуляри",
      translation_en: "safety glasses",
      context: "Arbeiderne må bruke vernebriller når de arbeider med UV-stråling",
      contextTranslation_uk: "Працівники повинні використовувати захисні окуляри при роботі з УФ-випромінюванням",
      contextTranslation_en: "Workers must use safety glasses when working with UV radiation"
    },
    {
      word: "sikkerhetsutstyr",
      translation_uk: "обладнання безпеки",
      translation_en: "safety equipment",
      context: "Sikkerhetsutstyr er obligatorisk på byggeplassen",
      contextTranslation_uk: "Обладнання безпеки є обов'язковим на будівельному майданчику",
      contextTranslation_en: "Safety equipment is mandatory on the construction site"
    },
    {
      word: "vernehansker",
      translation_uk: "захисні рукавички",
      translation_en: "protective gloves",
      context: "Vernehansker beskytter mot kjemiske stoffer",
      contextTranslation_uk: "Захисні рукавички захищають від хімічних речовин",
      contextTranslation_en: "Protective gloves protect against chemical substances"
    },
    {
      word: "hørselsvern",
      translation_uk: "захист слуху",
      translation_en: "hearing protection",
      context: "Hørselsvern reduserer støynivået til sikre grenser",
      contextTranslation_uk: "Захист слуху зменшує рівень шуму до безпечних меж",
      contextTranslation_en: "Hearing protection reduces noise levels to safe limits"
    },
    {
      word: "verneutstyr",
      translation_uk: "захисне обладнання",
      translation_en: "protective equipment",
      context: "Arbeidsgiveren har ansvar for å sikre at alle ansatte har tilgang til riktig verneutstyr",
      contextTranslation_uk: "Роботодавець несе відповідальність за забезпечення всіх працівників правильним захисним обладнанням",
      contextTranslation_en: "The employer is responsible for ensuring all employees have access to proper protective equipment"
    },
    {
      word: "gassmålere",
      translation_uk: "газові детектори",
      translation_en: "gas detectors",
      context: "Gassmålere brukes for å oppdage farlige gasser i luft",
      contextTranslation_uk: "Газові детектори використовуються для виявлення небезпечних газів у повітрі",
      contextTranslation_en: "Gas detectors are used to detect dangerous gases in the air"
    },
    {
      word: "fallsikring",
      translation_uk: "страхування від падіння",
      translation_en: "fall protection",
      context: "Fallsikring er nødvendig når man arbeider i høyder over to meter",
      contextTranslation_uk: "Страхування від падіння необхідне при роботі на висоті понад два метри",
      contextTranslation_en: "Fall protection is necessary when working at heights above two meters"
    },
    {
      word: "brannslukningsapparater",
      translation_uk: "вогнегасники",
      translation_en: "fire extinguishers",
      context: "Brannslukningsapparater må være lett tilgjengelige på alle arbeidsplasser",
      contextTranslation_uk: "Вогнегасники повинні бути легко доступними на всіх робочих місцях",
      contextTranslation_en: "Fire extinguishers must be easily accessible at all workplaces"
    },
    {
      word: "førstehjelp",
      translation_uk: "перша допомога",
      translation_en: "first aid",
      context: "Første hjelp-utstyr skal alltid være tilgjengelig og oppdatert",
      contextTranslation_uk: "Обладнання для першої допомоги завжди має бути доступним та оновленим",
      contextTranslation_en: "First aid equipment should always be available and updated"
    },
    {
      word: "kjemikalier",
      translation_uk: "хімікати",
      translation_en: "chemicals",
      context: "Kjemikalier må merkes tydelig med faresymboler",
      contextTranslation_uk: "Хімікати повинні бути чітко позначені символами небезпеки",
      contextTranslation_en: "Chemicals must be clearly marked with hazard symbols"
    },
    {
      word: "ventilasjonssystem",
      translation_uk: "система вентиляції",
      translation_en: "ventilation system",
      context: "Ventilasjonssystem sørger for ren luft i arbeidsområdet",
      contextTranslation_uk: "Система вентиляції забезпечує чисте повітря в робочій зоні",
      contextTranslation_en: "Ventilation system ensures clean air in the work area"
    },
    {
      word: "støvmaske",
      translation_uk: "пилозахисна маска",
      translation_en: "dust mask",
      context: "Støvmaske beskytter lungene mot farlige partikler",
      contextTranslation_uk: "Пилозахисна маска захищає легені від небезпечних частинок",
      contextTranslation_en: "Dust mask protects lungs from dangerous particles"
    },
    {
      word: "sikkerhetssko",
      translation_uk: "захисне взуття",
      translation_en: "safety shoes",
      context: "Sikkerhetssko med ståltupp beskytter føttene mot tunge gjenstander",
      contextTranslation_uk: "Захисне взуття зі сталевим носком захищає ноги від важких предметів",
      contextTranslation_en: "Safety shoes with steel toe protect feet from heavy objects"
    },
    {
      word: "refleksvest",
      translation_uk: "світловідбивний жилет",
      translation_en: "reflective vest",
      context: "Refleksvest gjør arbeiderne synlige i dårlig lys",
      contextTranslation_uk: "Світловідбивний жилет робить працівників помітними в поганому освітленні",
      contextTranslation_en: "Reflective vest makes workers visible in poor lighting"
    },
    {
      word: "arbeidstid",
      translation_uk: "робочий час",
      translation_en: "working time",
      context: "Arbeidstid begrenses for å unngå utmattelse og ulykker",
      contextTranslation_uk: "Робочий час обмежується для запобігання втомі та нещасним випадкам",
      contextTranslation_en: "Working time is limited to avoid fatigue and accidents"
    },
    {
      word: "risikovurdering",
      translation_uk: "оцінка ризиків",
      translation_en: "risk assessment",
      context: "Risikovurdering må gjennomføres før start på farlige arbeidsoppgaver",
      contextTranslation_uk: "Оцінка ризиків повинна проводитися перед початком небезпечних робіт",
      contextTranslation_en: "Risk assessment must be conducted before starting dangerous work tasks"
    },
    {
      word: "nødutgang",
      translation_uk: "аварійний вихід",
      translation_en: "emergency exit",
      context: "Nødutgang må alltid være merket og tilgjengelig",
      contextTranslation_uk: "Аварійний вихід завжди повинен бути позначений та доступний",
      contextTranslation_en: "Emergency exit must always be marked and accessible"
    },
    {
      word: "varselskilt",
      translation_uk: "попереджувальні знаки",
      translation_en: "warning signs",
      context: "Varselskilt informerer om farer og sikkerhetstiltak",
      contextTranslation_uk: "Попереджувальні знаки інформують про небезпеки та заходи безпеки",
      contextTranslation_en: "Warning signs inform about dangers and safety measures"
    },
    {
      word: "sikkerhetsinstruks",
      translation_uk: "інструкції з безпеки",
      translation_en: "safety instructions",
      context: "Sikkerhetsinstruks må gis til alle nye ansatte før arbeidsstart",
      contextTranslation_uk: "Інструкції з безпеки повинні бути надані всім новим працівникам перед початком роботи",
      contextTranslation_en: "Safety instructions must be given to all new employees before starting work"
    },
    {
      word: "arbeidsgiveren",
      translation_uk: "роботодавець",
      translation_en: "employer",
      context: "Arbeidsgiveren har ansvar for å sikre at alle ansatte har tilgang til riktig verneutstyr",
      contextTranslation_uk: "Роботодавець несе відповідальність за забезпечення всіх працівників правильним захисним обладнанням",
      contextTranslation_en: "The employer is responsible for ensuring all employees have access to proper protective equipment"
    },
    {
      word: "arbeiderne",
      translation_uk: "працівники",
      translation_en: "workers",
      context: "Arbeiderne må bruke vernebriller når de arbeider med UV-stråling",
      contextTranslation_uk: "Працівники повинні використовувати захисні окуляри при роботі з УФ-випромінюванням",
      contextTranslation_en: "Workers must use safety glasses when working with UV radiation"
    },
    {
      word: "byggeplassen",
      translation_uk: "будівельний майданчик",
      translation_en: "construction site",
      context: "Sikkerhetsutstyr er obligatorisk på byggeplassen",
      contextTranslation_uk: "Обладнання безпеки є обов'язковим на будівельному майданчику",
      contextTranslation_en: "Safety equipment is mandatory on the construction site"
    },
    {
      word: "arbeidsplasser",
      translation_uk: "робочі місця",
      translation_en: "workplaces",
      context: "Brannslukningsapparater må være lett tilgjengelige på alle arbeidsplasser",
      contextTranslation_uk: "Вогнегасники повинні бути легко доступними на всіх робочих місцях",
      contextTranslation_en: "Fire extinguishers must be easily accessible at all workplaces"
    },
    {
      word: "faresymboler",
      translation_uk: "символи небезпеки",
      translation_en: "hazard symbols",
      context: "Kjemikalier må merkes tydelig med faresymboler",
      contextTranslation_uk: "Хімікати повинні бути чітко позначені символами небезпеки",
      contextTranslation_en: "Chemicals must be clearly marked with hazard symbols"
    }
  ];

  const translations: CompactDemoTranslations = {
    title: currentLanguage === 'no' ? 'Se hvordan Elvarika fungerer' : 
           currentLanguage === 'uk' ? 'Подивіться, як працює Elvarika' : 
           'See how Elvarika works',
    subtitle: currentLanguage === 'no' ? 'Fra norsk tekst til flerspråklig lydordbok på 30 sekunder' :
              currentLanguage === 'uk' ? 'З норвезького тексту до багатомовного аудіословника за 30 секунд' :
              'From Norwegian text to multilingual audio dictionary in 30 seconds',
    norwayUkraine: currentLanguage === 'no' ? 'Norsk → Ukrainsk' :
                   currentLanguage === 'uk' ? 'Норвезька → Українська' :
                   'Norwegian → Ukrainian',
    norwayEngland: currentLanguage === 'no' ? 'Norsk → Engelsk' :
                   currentLanguage === 'uk' ? 'Норвезька → Англійська' :
                   'Norwegian → English',
    tryDemo: currentLanguage === 'no' ? 'Prøv gratis demo' :
             currentLanguage === 'uk' ? 'Спробувати безкоштовну демо' :
             'Try free demo',
    steps: {
      step1: currentLanguage === 'no' ? 'Tekstinndata' : currentLanguage === 'uk' ? 'Введення тексту' : 'Text Input',
      step2: currentLanguage === 'no' ? 'Ordanalyse' : currentLanguage === 'uk' ? 'Аналіз слів' : 'Word Analysis', 
      step3: currentLanguage === 'no' ? 'Kontekstinnpakning' : currentLanguage === 'uk' ? 'Контекстна обробка' : 'Context Processing',
      step4: currentLanguage === 'no' ? 'Oversettelse' : currentLanguage === 'uk' ? 'Переклад' : 'Translation',
      step5: currentLanguage === 'no' ? 'Lydordbok klar' : currentLanguage === 'uk' ? 'Аудіословник готовий' : 'Audio Dictionary Ready'
    },
    readyPlaylist: currentLanguage === 'no' ? 'Klar lydordbok' :
                   currentLanguage === 'uk' ? 'Готовий аудіословник' :
                   'Ready Audio Dictionary',
    playAudio: currentLanguage === 'no' ? 'Spill av' : currentLanguage === 'uk' ? 'Відтворити' : 'Play',
    generating: currentLanguage === 'no' ? 'Genererer...' : currentLanguage === 'uk' ? 'Генерую...' : 'Generating...',
    processing: currentLanguage === 'no' ? 'Behandler...' : currentLanguage === 'uk' ? 'Обробляю...' : 'Processing...'
  };

  const stepExplanations = {
    step1: {
      title: currentLanguage === 'no' ? 'Første etappe - Tekstinndata' :
             currentLanguage === 'uk' ? 'Перший етап - Введення тексту' :
             'First Stage - Text Input',
      description: currentLanguage === 'no' ? 'Tekst lastes inn fra enhver format: kopiere og lime inn, skrive, diktere, fotografere eller laste opp dokumenter i ethvert format.' :
                   currentLanguage === 'uk' ? 'Текст завантажується з будь-якого формату: вставити, друкувати, диктувати, фотографувати або завантажувати документи в будь-якому форматі.' :
                   'Text is loaded from any format: paste, type, dictate, photograph, or upload documents in any format.'
    },
    step2: {
      title: currentLanguage === 'no' ? 'Andre etappe - Ordanalyse' :
             currentLanguage === 'uk' ? 'Другий етап - Аналіз слів' :
             'Second Stage - Word Analysis',
      description: currentLanguage === 'no' ? 'På denne etappen skjer utvelgelse av nødvendige ord for å arbeide videre med dem. Systemet identifiserer komplekse ord som krever læring.' :
                   currentLanguage === 'uk' ? 'На цьому етапі відбувається вибір потрібних слів для того, щоб саме з ними працювати далі. Система ідентифікує складні слова, які потребують вивчення.' :
                   'At this stage, the selection of necessary words takes place to work with them further. The system identifies complex words that require learning.'
    },
    step3: {
      title: currentLanguage === 'no' ? 'Tredje etappe - Kontekstinnpakning' :
             currentLanguage === 'uk' ? 'Третій етап - Контекстна обробка' :
             'Third Stage - Context Processing',
      description: currentLanguage === 'no' ? 'Hvert ord pakkes inn i sin naturlige kontekst fra originalteksten for bedre forståelse og hukommelse.' :
                   currentLanguage === 'uk' ? 'Кожне слово загортається у свій природний контекст з оригінального тексту для кращого розуміння та запам\'ятовування.' :
                   'Each word is wrapped in its natural context from the original text for better understanding and memorization.'
    },
    step4: {
      title: currentLanguage === 'no' ? 'Fjerde etappe - Oversettelse' :
             currentLanguage === 'uk' ? 'Четвертий етап - Переклад' :
             'Fourth Stage - Translation',
      description: currentLanguage === 'no' ? 'Ordene oversettes til ønsket språk med sine kontekstuelle setninger for å bevare betydningen.' :
                   currentLanguage === 'uk' ? 'Слова перекладаються на потрібну мову разом зі своїми контекстуальними реченнями для збереження значення.' :
                   'Words are translated to the desired language along with their contextual sentences to preserve meaning.'
    },
    step5: {
      title: currentLanguage === 'no' ? 'Femte etappe - Lydordbok klar' :
             currentLanguage === 'uk' ? 'П\'ятий етап - Аудіословник готовий' :
             'Fifth Stage - Audio Dictionary Ready',
      description: currentLanguage === 'no' ? 'Den ferdige lydordboken er klar med alle ord, oversettelser og lydopptak for effektiv læring.' :
                   currentLanguage === 'uk' ? 'Готовий аудіословник з усіма словами, перекладами та аудіозаписами для ефективного вивчення.' :
                   'The finished audio dictionary is ready with all words, translations, and audio recordings for effective learning.'
    }
  };

  const clearAllTimeouts = () => {
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
  };

  const startDemo = () => {
    clearAllTimeouts();
    setIsAnimating(true);
    setIsPaused(false);
    setStep(1);
    
    const newTimeouts: NodeJS.Timeout[] = [];
    
    // Step 2: Highlight words (5 seconds)
    const step2Timeout = setTimeout(() => {
      if (!isPaused) {
        setStep(2);
        const initialWords: WordAnimation[] = keyWordsData.map((item, index) => ({
          ...item,
          translation: translationTarget === 'uk' ? item.translation_uk : item.translation_en,
          contextTranslation: translationTarget === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
          id: `word-${index}`,
          isHighlighted: false,
          isExtracting: false,
          isInContext: false,
          isTranslating: false,
          isReady: false
        }));
        setWords(initialWords);
        
        // Highlight words one by one
        initialWords.forEach((_, index) => {
          const highlightTimeout = setTimeout(() => {
            if (!isPaused) {
              setWords(prev => prev.map((word, i) => 
                i === index ? { ...word, isHighlighted: true } : word
              ));
            }
          }, index * 300);
          newTimeouts.push(highlightTimeout);
        });
      }
    }, 5000);
    newTimeouts.push(step2Timeout);

    // Step 3: Context wrapping (10 seconds)
    const step3Timeout = setTimeout(() => {
      if (!isPaused) {
        setStep(3);
        keyWordsData.forEach((_, index) => {
          const contextTimeout = setTimeout(() => {
            if (!isPaused) {
              setWords(prev => prev.map((word, i) => 
                i === index ? { ...word, isExtracting: true, isInContext: true } : word
              ));
            }
          }, index * 200);
          newTimeouts.push(contextTimeout);
        });
      }
    }, 10000);
    newTimeouts.push(step3Timeout);

    // Step 4: Translation (15 seconds)  
    const step4Timeout = setTimeout(() => {
      if (!isPaused) {
        setStep(4);
        keyWordsData.forEach((_, index) => {
          const translateTimeout = setTimeout(() => {
            if (!isPaused) {
              setWords(prev => prev.map((word, i) => 
                i === index ? { ...word, isExtracting: false, isTranslating: true } : word
              ));
              
              const readyTimeout = setTimeout(() => {
                if (!isPaused) {
                  setWords(prev => prev.map((word, i) => 
                    i === index ? { ...word, isTranslating: false, isReady: true } : word
                  ));
                }
              }, 800);
              newTimeouts.push(readyTimeout);
            }
          }, index * 300);
          newTimeouts.push(translateTimeout);
        });
      }
    }, 15000);
    newTimeouts.push(step4Timeout);

    // Step 5: Final playlist (20 seconds)
    const step5Timeout = setTimeout(() => {
      if (!isPaused) {
        setStep(5);
        const finalPlaylist: PlaylistItem[] = keyWordsData.map((item, index) => ({
          id: `playlist-${index}`,
          word: item.word,
          translation: translationTarget === 'uk' ? item.translation_uk : item.translation_en,
          context: item.context,
          contextTranslation: translationTarget === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
          audioUrl: `/demo-audio/${item.word}.mp3`,
          duration: "0:03",
          isPlaying: false
        }));
        setPlaylist(finalPlaylist);
        setIsAnimating(false);
      }
    }, 20000);
    newTimeouts.push(step5Timeout);
    
    setTimeouts(newTimeouts);
  };

  const pauseDemo = () => {
    setIsPaused(true);
    setIsAnimating(false);
    clearAllTimeouts();
  };

  const resumeDemo = () => {
    setIsPaused(false);
    setIsAnimating(true);
    
    // Continue from current step with appropriate timing
    const newTimeouts: NodeJS.Timeout[] = [];
    
    if (step === 1) {
      // Continue to step 2 immediately
      const step2Timeout = setTimeout(() => {
        setStep(2);
        const initialWords: WordAnimation[] = keyWordsData.map((item, index) => ({
          ...item,
          translation: translationTarget === 'uk' ? item.translation_uk : item.translation_en,
          contextTranslation: translationTarget === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
          id: `word-${index}`,
          isHighlighted: false,
          isExtracting: false,
          isInContext: false,
          isTranslating: false,
          isReady: false
        }));
        setWords(initialWords);
        
        initialWords.forEach((_, index) => {
          const highlightTimeout = setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isHighlighted: true } : word
            ));
          }, index * 300);
          newTimeouts.push(highlightTimeout);
        });
      }, 3000);
      newTimeouts.push(step2Timeout);
    } else if (step === 2) {
      // Continue to step 3
      const step3Timeout = setTimeout(() => {
        setStep(3);
        keyWordsData.forEach((_, index) => {
          const contextTimeout = setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isExtracting: true, isInContext: true } : word
            ));
          }, index * 200);
          newTimeouts.push(contextTimeout);
        });
      }, 3000);
      newTimeouts.push(step3Timeout);
    } else if (step === 3) {
      // Continue to step 4
      const step4Timeout = setTimeout(() => {
        setStep(4);
        keyWordsData.forEach((_, index) => {
          const translateTimeout = setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isExtracting: false, isTranslating: true } : word
            ));
            
            const readyTimeout = setTimeout(() => {
              setWords(prev => prev.map((word, i) => 
                i === index ? { ...word, isTranslating: false, isReady: true } : word
              ));
            }, 800);
            newTimeouts.push(readyTimeout);
          }, index * 300);
          newTimeouts.push(translateTimeout);
        });
      }, 3000);
      newTimeouts.push(step4Timeout);
    } else if (step === 4) {
      // Continue to step 5
      const step5Timeout = setTimeout(() => {
        setStep(5);
        const finalPlaylist: PlaylistItem[] = keyWordsData.map((item, index) => ({
          id: `playlist-${index}`,
          word: item.word,
          translation: translationTarget === 'uk' ? item.translation_uk : item.translation_en,
          context: item.context,
          contextTranslation: translationTarget === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
          audioUrl: `/demo-audio/${item.word}.mp3`,
          duration: "0:03",
          isPlaying: false
        }));
        setPlaylist(finalPlaylist);
        setIsAnimating(false);
      }, 3000);
      newTimeouts.push(step5Timeout);
    }
    
    setTimeouts(newTimeouts);
  };

  const togglePlayback = (itemId: string) => {
    setPlaylist(prev => prev.map(item => ({
      ...item,
      isPlaying: item.id === itemId ? !item.isPlaying : false
    })));
    
    if (playingItem !== itemId) {
      setPlayingItem(itemId);
      setTimeout(() => {
        setPlayingItem(null);
        setPlaylist(prev => prev.map(item => ({ ...item, isPlaying: false })));
      }, 3000);
    } else {
      setPlayingItem(null);
    }
  };

  const resetDemo = () => {
    setStep(0);
    setIsAnimating(false);
    setWords([]);
    setPlaylist([]);
    setPlayingItem(null);
  };

  return (
    <div className="h-full min-h-[650px] w-full bg-gradient-to-br from-[#0066cc]/5 to-[#00a1e6]/5 rounded-2xl border border-[#0066cc]/10 overflow-hidden flex flex-col">
      {/* Header with integrated controls and progress */}
      <div className="p-4 border-b border-gray-100 bg-white/50 flex-shrink-0">
        <div className="flex items-center justify-between">
          {/* Left side - Progress Steps with Current Step Info */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <button
                  onClick={() => {
                    // Allow going to previous steps only when paused and the step is completed
                    if (isPaused && stepNum <= step) {
                      setStep(stepNum);
                    }
                  }}
                  disabled={!isPaused || stepNum > step}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    step >= stepNum ? 'bg-[#022f36] text-white' : 'bg-gray-200 text-gray-600'
                  } ${
                    isPaused && stepNum <= step 
                      ? 'hover:bg-[#033d46] cursor-pointer' 
                      : isPaused && stepNum > step 
                        ? 'cursor-not-allowed opacity-50' 
                        : 'cursor-default'
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="h-3 w-3" /> : stepNum}
                </button>
                {stepNum < 5 && <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />}
              </div>
            ))}
            
            {/* Current Step Info */}
            {step > 0 && step <= 5 && (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-300">
                <div className="flex flex-col">
                  <motion.div 
                    key={`title-${step}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm font-bold text-[#022f36] whitespace-nowrap"
                  >
                    {stepExplanations[`step${step}` as keyof typeof stepExplanations].title}
                  </motion.div>
                  <motion.div 
                    key={`desc-${step}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xs text-gray-600 max-w-md"
                  >
                    {stepExplanations[`step${step}` as keyof typeof stepExplanations].description}
                  </motion.div>
                </div>
                
                {/* Step-specific indicators */}
                {step === 1 && (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-green-50 px-2 py-1 rounded text-center border border-green-200"
                    >
                      <div className="text-xs font-medium text-green-700">📄 Завантажений текст</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-blue-50 px-2 py-1 rounded text-center border border-blue-200"
                    >
                      <div className="text-xs font-medium text-blue-700">📝 Вставити</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-purple-50 px-2 py-1 rounded text-center border border-purple-200"
                    >
                      <div className="text-xs font-medium text-purple-700">🎤 Диктувати</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="bg-orange-50 px-2 py-1 rounded text-center border border-orange-200"
                    >
                      <div className="text-xs font-medium text-orange-700">📸 Фото</div>
                    </motion.div>
                  </div>
                )}
                
                {step === 2 && (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-yellow-50 px-2 py-1 rounded text-center border border-yellow-200"
                    >
                      <div className="text-xs font-medium text-yellow-700">📋 Аналіз тексту</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-red-50 px-2 py-1 rounded text-center border border-red-200"
                    >
                      <div className="text-xs font-medium text-red-700">⚡ Складні</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-green-50 px-2 py-1 rounded text-center border border-green-200"
                    >
                      <div className="text-xs font-medium text-green-700">✨ Виділення</div>
                    </motion.div>
                  </div>
                )}
                
                {step === 3 && (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-blue-50 px-2 py-1 rounded text-center border border-blue-200"
                    >
                      <div className="text-xs font-medium text-blue-700">🔍 Контекстуальний аналіз</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-indigo-50 px-2 py-1 rounded text-center border border-indigo-200"
                    >
                      <div className="text-xs font-medium text-indigo-700">🔗 Контекст</div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-cyan-50 px-2 py-1 rounded text-center border border-cyan-200"
                    >
                      <div className="text-xs font-medium text-cyan-700">💡 Розуміння</div>
                    </motion.div>
                  </div>
                )}
                
                {step === 4 && (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-purple-50 px-2 py-1 rounded text-center border border-purple-200"
                    >
                      <div className="text-xs font-medium text-purple-700">
                        🔄 {currentLanguage === 'no' ? 'Oversettelse' : currentLanguage === 'uk' ? 'Переклад' : 'Translation'}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-pink-50 px-2 py-1 rounded text-center border border-pink-200"
                    >
                      <div className="text-xs font-medium text-pink-700">
                        📝 {currentLanguage === 'no' ? 'Betydning' : currentLanguage === 'uk' ? 'Значення' : 'Meaning'}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-emerald-50 px-2 py-1 rounded text-center border border-emerald-200"
                    >
                      <div className="text-xs font-medium text-emerald-700">
                        ✅ {currentLanguage === 'no' ? 'Ferdig' : currentLanguage === 'uk' ? 'Готово' : 'Ready'}
                      </div>
                    </motion.div>
                  </div>
                )}
                
                {step === 5 && (
                  <div className="flex items-center gap-2">
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1 }}
                      className="bg-green-50 px-2 py-1 rounded text-center border border-green-200"
                    >
                      <div className="text-xs font-medium text-green-700">
                        🎯 {currentLanguage === 'no' ? '25 ord' : currentLanguage === 'uk' ? '25 слів' : '25 words'}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="bg-blue-50 px-2 py-1 rounded text-center border border-blue-200"
                    >
                      <div className="text-xs font-medium text-blue-700">
                        🔊 {currentLanguage === 'no' ? 'Lyd' : currentLanguage === 'uk' ? 'Аудіо' : 'Audio'}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.4 }}
                      className="bg-purple-50 px-2 py-1 rounded text-center border border-purple-200"
                    >
                      <div className="text-xs font-medium text-purple-700">
                        📚 {currentLanguage === 'no' ? 'Kontekst' : currentLanguage === 'uk' ? 'Контекст' : 'Context'}
                      </div>
                    </motion.div>
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1.6 }}
                      className="bg-yellow-50 px-2 py-1 rounded text-center border border-yellow-200"
                    >
                      <div className="text-xs font-medium text-yellow-700">
                        ✨ {currentLanguage === 'no' ? 'Ferdig' : currentLanguage === 'uk' ? 'Готово' : 'Ready'}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Right side - Controls */}
          <div className="flex items-center gap-3">
            {/* Pause/Play Controls */}
            {(isAnimating || isPaused) && step > 0 && step < 5 && (
              <Button
                size="sm"
                variant="outline"
                onClick={isPaused ? resumeDemo : pauseDemo}
                className="h-8 px-3"
              >
                {isPaused ? <Play size={14} /> : <Pause size={14} />}
                <span className="ml-1 text-xs">
                  {isPaused ? 
                    (currentLanguage === 'no' ? 'Fortsett' : currentLanguage === 'uk' ? 'Продовжити' : 'Continue') : 
                    (currentLanguage === 'no' ? 'Pause' : currentLanguage === 'uk' ? 'Пауза' : 'Pause')
                  }
                </span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 overflow-hidden min-h-[450px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600 max-w-[300px]">{translations.subtitle}</p>
                <Button 
                  onClick={startDemo}
                  className="bg-[#022f36] hover:bg-[#033d46] text-white px-6 py-2"
                  disabled={isAnimating}
                >
                  {translations.tryDemo}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
                {/* Maximum space for text display - removed header to increase text area */}
                <div className="bg-gray-50 rounded-lg p-2 border-2 border-gray-200 h-full">
                  <div className="text-lg leading-relaxed text-gray-700 h-full overflow-y-auto bg-white p-8 rounded border text-justify">
                    {sourceText}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
                {/* Maximum space for analyzed text - removed header to increase content area */}
                <div className="bg-gray-50 rounded-lg p-2 border-2 border-gray-200 h-full">
                  <div className="text-lg leading-relaxed h-full overflow-y-auto bg-white p-8 rounded border text-justify">
                    {sourceText.split(' ').map((word, index) => {
                      const cleanWord = word.replace(/[.,:;!?()]/g, '').toLowerCase();
                      const keyWord = keyWordsData.find(keyData => {
                        const keyWordLower = keyData.word.toLowerCase();
                        return keyWordLower === cleanWord || 
                               cleanWord.startsWith(keyWordLower) ||
                               keyWordLower.startsWith(cleanWord);
                      });
                      
                      const foundWord = words.find(w => w.word.toLowerCase() === (keyWord?.word.toLowerCase() || ''));
                      const isHighlighted = foundWord?.isHighlighted && keyWord;

                      return (
                        <motion.span
                          key={index}
                          className={`transition-all duration-300 ${
                            isHighlighted ? 'bg-yellow-300 text-black px-1 rounded font-medium' : 'text-gray-800'
                          }`}
                        >
                          {word}{' '}
                        </motion.span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
                {/* Maximum space for context processing - removed header to increase content area */}
                <div className="bg-gray-50 rounded-lg p-2 border-2 border-gray-200 h-full">
                  <div className="space-y-3 h-full overflow-y-auto p-6">
                    {words.filter(w => w.isInContext).slice(0, 12).map((word) => (
                      <motion.div
                        key={word.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                      >
                        <div className="font-bold text-blue-800 text-lg mb-2">{word.word}</div>
                        <div className="text-blue-600 leading-relaxed">
                          <div className="mb-2 font-medium text-base bg-white p-2 rounded">"{word.context}"</div>
                          <div className="text-green-700 italic text-base bg-green-50 p-2 rounded">"{word.contextTranslation}"</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-4 h-full overflow-y-auto">
                {/* Compact translation comparison - combined format */}
                <div className="bg-gray-50 rounded-lg p-2 border-2 border-gray-200 h-full">
                  <div className="space-y-2 h-full overflow-y-auto p-4">
                    {words.filter(w => w.isTranslating || w.isReady).slice(0, 12).map((word) => (
                      <motion.div
                        key={word.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-3 bg-white rounded-lg border shadow-sm"
                      >
                        {/* Word pair with flags */}
                        <div className="flex items-start gap-3 mb-2">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-3 h-2 bg-red-500 rounded"></div>
                            <div className="w-3 h-2 bg-white border border-gray-300 rounded"></div>
                            <div className="w-3 h-2 bg-blue-600 rounded"></div>
                            <span className="font-bold text-blue-800 text-sm">{word.word}</span>
                          </div>
                          <span className="text-gray-400 text-sm">→</span>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-3 h-2 bg-blue-400 rounded"></div>
                            <div className="w-3 h-2 bg-yellow-400 rounded"></div>
                            <span className="font-bold text-green-800 text-sm">{word.translation}</span>
                          </div>
                        </div>
                        
                        {/* Context comparison */}
                        <div className="text-xs leading-relaxed">
                          <div className="mb-1">
                            <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              "{word.context}"
                            </span>
                          </div>
                          <div>
                            <span className="text-green-600 bg-green-50 px-2 py-1 rounded">
                              "{word.contextTranslation}"
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <div className="bg-white rounded-lg p-8 h-full overflow-hidden flex flex-col">
                {/* Playlist header with controls */}
                <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-6 w-6 text-[#022f36]" />
                    <div>
                      <div className="text-lg font-bold text-[#022f36]">{translations.readyPlaylist}</div>
                      <div className="text-sm text-gray-600">25 слів • 12 хвилин</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => {
                        // Toggle play all playlist
                        const allPlaying = playlist.every(item => item.isPlaying);
                        setPlaylist(prev => prev.map(item => ({
                          ...item,
                          isPlaying: !allPlaying
                        })));
                      }}
                      className="bg-[#022f36] hover:bg-[#033d46] text-white px-6 py-2 flex items-center gap-2"
                    >
                      {playlist.some(item => item.isPlaying) ? (
                        <>
                          <Pause className="h-4 w-4" />
                          {currentLanguage === 'no' ? 'Pause alle' : 
                           currentLanguage === 'uk' ? 'Пауза всіх' : 
                           'Pause all'}
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          {currentLanguage === 'no' ? 'Spill alle' : 
                           currentLanguage === 'uk' ? 'Грати всі' : 
                           'Play all'}
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        // Download playlist functionality
                        const playlistData = {
                          name: "Elvarika Workplace Safety Dictionary",
                          language: translationTarget === 'uk' ? 'Ukrainian' : 'English',
                          words: playlist.map(item => ({
                            word: item.word,
                            translation: item.translation,
                            context: item.context,
                            contextTranslation: item.contextTranslation,
                            audioUrl: item.audioUrl
                          }))
                        };
                        const blob = new Blob([JSON.stringify(playlistData, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'elvarika-dictionary.json';
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      variant="outline"
                      className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white px-6 py-2 flex items-center gap-2"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {currentLanguage === 'no' ? 'Last ned' : 
                       currentLanguage === 'uk' ? 'Скачати' : 
                       'Download'}
                    </Button>
                  </div>
                </div>
                
                {/* Playlist content */}
                <div className="flex-1 overflow-y-auto">
                  <div className="grid grid-cols-5 gap-1 text-xs">
                    {playlist.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className={`p-1.5 rounded border transition-colors ${
                          item.isPlaying ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <button
                          onClick={() => togglePlayback(item.id)}
                          className={`w-4 h-4 rounded-full flex items-center justify-center mb-1 transition-colors ${
                            item.isPlaying ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                          }`}
                        >
                          {item.isPlaying ? <Pause size={6} /> : <Play size={6} />}
                        </button>
                        <div className="space-y-0.5">
                          <div className="font-medium text-gray-800 text-xs leading-tight truncate">{item.word}</div>
                          <div className="text-gray-600 text-xs leading-tight truncate">{item.translation}</div>
                          <div className="text-gray-400 text-xs">{item.duration}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <Button 
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-6"
                  >
                    {currentLanguage === 'no' ? 'Start på nytt' : 
                     currentLanguage === 'uk' ? 'Почати знову' : 
                     'Start over'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
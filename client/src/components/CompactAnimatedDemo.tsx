import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle, ArrowRight, Zap, Languages, Volume2, RotateCcw } from 'lucide-react';
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

  const sourceText = "Døren skal aldri blokkeres helt. Porten må være bred nok. Nødutgangen må være godt synlig. Nødbelysning er viktig ved strømbrudd. Sterkt lys kan gi blending. Godt syn krever riktig belysning. Døren må ha et sikkerhetssystem. Utilsiktet lukking utgjør fare. Hver arbeidsplass trenger dagslys. Arbeidslokalet må være opplyst. Vi trenger dagslys i spiserom. Godt utsyn forebygger ulykker. Belysning skal ikke gi blending. Fluktveier må holdes åpne. Vi monterte en blendingsanordning i vinduet. Vinduer må ikke gi refleks. Reflekslys gjør skjermen uleselig. Kontrasten må ikke være skadelig. Svingporter skal hindre kollisjon. Utforming skal unngå farlige situasjoner. Maskiner må ha tydelig merking. Nødstoppmekanisme skal være lett tilgjengelig. Dørene må ha god merking. Arbeidstilsynet kontrollerer rømningsveier. Førstehjelp kan redde liv på arbeidsplassen.";

  const keyWordsData = [
    {
      word: "dør",
      translation_uk: "двері",
      translation_en: "door",
      context: "Døren skal aldri blokkeres helt",
      contextTranslation_uk: "Двері ніколи не повинні бути повністю заблоковані",
      contextTranslation_en: "The door should never be completely blocked"
    },
    {
      word: "port",
      translation_uk: "ворота",
      translation_en: "gate",
      context: "Porten må være bred nok",
      contextTranslation_uk: "Ворота повинні бути достатньо широкими",
      contextTranslation_en: "The gate must be wide enough"
    },
    {
      word: "nødutgang",
      translation_uk: "аварійний вихід",
      translation_en: "emergency exit",
      context: "Nødutgangen må være godt synlig",
      contextTranslation_uk: "Аварійний вихід повинен бути добре помітним",
      contextTranslation_en: "The emergency exit must be clearly visible"
    },
    {
      word: "nødbelysning",
      translation_uk: "аварійне освітлення",
      translation_en: "emergency lighting",
      context: "Nødbelysning er viktig ved strømbrudd",
      contextTranslation_uk: "Аварійне освітлення важливе під час відключення електроенергії",
      contextTranslation_en: "Emergency lighting is important during power outages"
    },
    {
      word: "lys",
      translation_uk: "світло",
      translation_en: "light",
      context: "Sterkt lys kan gi blending",
      contextTranslation_uk: "Яскраве світло може спричинити відблиски",
      contextTranslation_en: "Bright light can cause glare"
    },
    {
      word: "syn",
      translation_uk: "зір",
      translation_en: "vision",
      context: "Godt syn krever riktig belysning",
      contextTranslation_uk: "Добрий зір вимагає правильного освітлення",
      contextTranslation_en: "Good vision requires proper lighting"
    },
    {
      word: "sikkerhet",
      translation_uk: "безпека",
      translation_en: "safety",
      context: "Døren må ha et sikkerhetssystem",
      contextTranslation_uk: "Двері повинні мати систему безпеки",
      contextTranslation_en: "The door must have a safety system"
    },
    {
      word: "fare",
      translation_uk: "небезпека",
      translation_en: "danger",
      context: "Utilsiktet lukking utgjør fare",
      contextTranslation_uk: "Ненавмисне закриття становить небезпеку",
      contextTranslation_en: "Accidental closing poses a danger"
    },
    {
      word: "arbeidsplass",
      translation_uk: "робоче місце",
      translation_en: "workplace",
      context: "Hver arbeidsplass trenger dagslys",
      contextTranslation_uk: "Кожне робоче місце потребує денного світла",
      contextTranslation_en: "Every workplace needs daylight"
    },
    {
      word: "arbeidslokale",
      translation_uk: "робоче приміщення",
      translation_en: "work premises",
      context: "Arbeidslokalet må være opplyst",
      contextTranslation_uk: "Робоче приміщення повинно бути освітленим",
      contextTranslation_en: "The work premises must be illuminated"
    },
    {
      word: "dagslys",
      translation_uk: "денне світло",
      translation_en: "daylight",
      context: "Vi trenger dagslys i spiserom",
      contextTranslation_uk: "Нам потрібне денне світло в їдальні",
      contextTranslation_en: "We need daylight in the dining room"
    },
    {
      word: "utsyn",
      translation_uk: "огляд",
      translation_en: "view",
      context: "Godt utsyn forebygger ulykker",
      contextTranslation_uk: "Добрий огляд запобігає нещасним випадкам",
      contextTranslation_en: "Good visibility prevents accidents"
    },
    {
      word: "belysning",
      translation_uk: "освітлення",
      translation_en: "lighting",
      context: "Belysning skal ikke gi blending",
      contextTranslation_uk: "Освітлення не повинно створювати відблисків",
      contextTranslation_en: "Lighting should not cause glare"
    },
    {
      word: "fluktvei",
      translation_uk: "шлях евакуації",
      translation_en: "escape route",
      context: "Fluktveier må holdes åpne",
      contextTranslation_uk: "Шляхи евакуації повинні бути вільними",
      contextTranslation_en: "Escape routes must be kept open"
    },
    {
      word: "blendingsanordning",
      translation_uk: "пристрій проти відблисків",
      translation_en: "anti-glare device",
      context: "Vi monterte en blendingsanordning i vinduet",
      contextTranslation_uk: "Ми встановили пристрій проти відблисків на вікні",
      contextTranslation_en: "We installed an anti-glare device on the window"
    },
    {
      word: "vinduer",
      translation_uk: "вікна",
      translation_en: "windows",
      context: "Vinduer må ikke gi refleks",
      contextTranslation_uk: "Вікна не повинні створювати віддзеркалень",
      contextTranslation_en: "Windows must not create reflections"
    },
    {
      word: "reflekslys",
      translation_uk: "відбите світло",
      translation_en: "reflected light",
      context: "Reflekslys gjør skjermen uleselig",
      contextTranslation_uk: "Відбите світло робить екран нечитабельним",
      contextTranslation_en: "Reflected light makes the screen unreadable"
    },
    {
      word: "kontrast",
      translation_uk: "контраст",
      translation_en: "contrast",
      context: "Kontrasten må ikke være skadelig",
      contextTranslation_uk: "Контраст не повинен бути шкідливим",
      contextTranslation_en: "The contrast must not be harmful"
    },
    {
      word: "kollisjon",
      translation_uk: "зіткнення",
      translation_en: "collision",
      context: "Svingporter skal hindre kollisjon",
      contextTranslation_uk: "Орні ворота повинні запобігати зіткненню",
      contextTranslation_en: "Swing gates should prevent collision"
    },
    {
      word: "utforming",
      translation_uk: "конструкція",
      translation_en: "design",
      context: "Utforming skal unngå farlige situasjoner",
      contextTranslation_uk: "Конструкція повинна уникати небезпечних ситуацій",
      contextTranslation_en: "Design should avoid dangerous situations"
    },
    {
      word: "maskin",
      translation_uk: "машина",
      translation_en: "machine",
      context: "Maskiner må ha tydelig merking",
      contextTranslation_uk: "Машини повинні мати чітке маркування",
      contextTranslation_en: "Machines must have clear marking"
    },
    {
      word: "nødstoppmekanisme",
      translation_uk: "механізм аварійної зупинки",
      translation_en: "emergency stop mechanism",
      context: "Nødstoppmekanisme skal være lett tilgjengelig",
      contextTranslation_uk: "Механізм аварійної зупинки повинен бути легкодоступним",
      contextTranslation_en: "Emergency stop mechanism should be easily accessible"
    },
    {
      word: "merking",
      translation_uk: "маркування",
      translation_en: "marking",
      context: "Dørene må ha god merking",
      contextTranslation_uk: "Двері повинні мати добре маркування",
      contextTranslation_en: "Doors must have good marking"
    },
    {
      word: "arbeidstilsynet",
      translation_uk: "інспекція праці",
      translation_en: "labor inspection",
      context: "Arbeidstilsynet kontrollerer rømningsveier",
      contextTranslation_uk: "Інспекція праці перевіряє шляхи евакуації",
      contextTranslation_en: "Labor inspection checks escape routes"
    },
    {
      word: "førstehjelp",
      translation_uk: "перша допомога",
      translation_en: "first aid",
      context: "Førstehjelp kan redde liv på arbeidsplassen",
      contextTranslation_uk: "Перша допомога може врятувати життя на робочому місці",
      contextTranslation_en: "First aid can save lives in the workplace"
    }
  ];

  const translations: CompactDemoTranslations = {
    title: currentLanguage === 'no' ? 'Se hvordan Elvarika fungerer' : 
           currentLanguage === 'uk' ? 'Подивіться, як працює Elvarika' : 
           'See how Elvarika works',
    subtitle: currentLanguage === 'no' ? 'Fra tekst til flerspråklig lydbok på sekunder' :
              currentLanguage === 'uk' ? 'Від тексту до багатомовної аудіокниги за секунди' :
              'From text to multilingual audiobook in seconds',
    norwayUkraine: currentLanguage === 'no' ? 'Norsk → Ukrainsk' :
                   currentLanguage === 'uk' ? 'Норвезька → Українська' :
                   'Norwegian → Ukrainian',
    norwayEngland: currentLanguage === 'no' ? 'Norsk → Engelsk' :
                   currentLanguage === 'uk' ? 'Норвезька → Англійська' :
                   'Norwegian → English',
    tryDemo: currentLanguage === 'no' ? 'Prøv demo' :
             currentLanguage === 'uk' ? 'Спробувати демо' :
             'Try demo',
    steps: {
      step1: currentLanguage === 'no' ? 'Tekst lastes' :
             currentLanguage === 'uk' ? 'Завантаження тексту' :
             'Loading text',
      step2: currentLanguage === 'no' ? 'Ord identifiseres' :
             currentLanguage === 'uk' ? 'Розпізнавання слів' :
             'Identifying words',
      step3: currentLanguage === 'no' ? 'Kontekst analyseres' :
             currentLanguage === 'uk' ? 'Аналіз контексту' :
             'Analyzing context',
      step4: currentLanguage === 'no' ? 'Oversettelse' :
             currentLanguage === 'uk' ? 'Переклад' :
             'Translation',
      step5: currentLanguage === 'no' ? 'Spilleliste klar' :
             currentLanguage === 'uk' ? 'Плейлист готовий' :
             'Playlist ready'
    },
    readyPlaylist: currentLanguage === 'no' ? 'Spilleliste er klar!' :
                   currentLanguage === 'uk' ? 'Плейлист готовий!' :
                   'Playlist is ready!',
    playAudio: currentLanguage === 'no' ? 'Spill av lyd' :
               currentLanguage === 'uk' ? 'Відтворити аудіо' :
               'Play audio',
    generating: currentLanguage === 'no' ? 'Genererer...' :
                currentLanguage === 'uk' ? 'Генерація...' :
                'Generating...',
    processing: currentLanguage === 'no' ? 'Behandler...' :
                currentLanguage === 'uk' ? 'Обробка...' :
                'Processing...'
  };

  const startAnimation = () => {
    if (isAnimating && !isPaused) return;
    
    setIsAnimating(true);
    setIsPaused(false);
    setStep(0);
    setWords([]);
    setPlaylist([]);
    setPlayingItem(null);
    
    // Clear existing timeouts
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);

    const newTimeouts: NodeJS.Timeout[] = [];

    // Step 1: Load text (2 seconds)
    newTimeouts.push(setTimeout(() => {
      setStep(1);
    }, 2000));

    // Step 2: Identify words (4 seconds)
    newTimeouts.push(setTimeout(() => {
      setStep(2);
      keyWordsData.slice(0, 8).forEach((_, index) => {
        newTimeouts.push(setTimeout(() => {
          setWords(prev => [...prev, {
            word: keyWordsData[index].word,
            translation: translationTarget === 'uk' ? keyWordsData[index].translation_uk : keyWordsData[index].translation_en,
            context: keyWordsData[index].context,
            contextTranslation: translationTarget === 'uk' ? keyWordsData[index].contextTranslation_uk : keyWordsData[index].contextTranslation_en,
            id: `word-${index}`,
            isHighlighted: true,
            isExtracting: false,
            isInContext: false,
            isTranslating: false,
            isReady: false
          }]);
        }, index * 300));
      });
    }, 4000));

    // Step 3: Analyze context (8 seconds)
    newTimeouts.push(setTimeout(() => {
      setStep(3);
      setWords(prev => prev.map(word => ({ ...word, isInContext: true })));
    }, 8000));

    // Step 4: Translation (10 seconds)
    newTimeouts.push(setTimeout(() => {
      setStep(4);
      keyWordsData.slice(0, 8).forEach((item, index) => {
        newTimeouts.push(setTimeout(() => {
          const audioUrl = `/attached_assets/audio/${item.word}.mp3`;
          const duration = "0:03";
          
          const playlistItem: PlaylistItem = {
            id: `playlist-${index}`,
            word: item.word,
            translation: translationTarget === 'uk' ? item.translation_uk : item.translation_en,
            context: item.context,
            contextTranslation: translationTarget === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
            audioUrl,
            duration,
            isPlaying: false
          };
          
          setPlaylist(prev => [...prev, playlistItem]);
        }, index * 400));
      });
    }, 10000));

    // Step 5: Playlist ready (14 seconds)
    newTimeouts.push(setTimeout(() => {
      setStep(5);
      setIsAnimating(false);
    }, 14000));

    setTimeouts(newTimeouts);
  };

  const pauseAnimation = () => {
    setIsPaused(true);
    setIsAnimating(false);
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
  };

  const resumeAnimation = () => {
    // Resume functionality can be added here if needed
    setIsPaused(false);
  };

  const toggleAudio = (itemId: string) => {
    const item = playlist.find(p => p.id === itemId);
    if (!item) return;

    if (playingItem === itemId) {
      setPlayingItem(null);
      setPlaylist(prev => prev.map(item => ({ ...item, isPlaying: false })));
    } else {
      const audio = new Audio(item.audioUrl);
      audio.oncanplaythrough = () => {
        setPlayingItem(itemId);
        setPlaylist(prev => prev.map(item => ({ 
          ...item, 
          isPlaying: item.id === itemId 
        })));
        audio.play().catch(error => {
          console.log('Audio playback failed:', error);
          setPlayingItem(null);
          setPlaylist(prev => prev.map(item => ({ ...item, isPlaying: false })));
        });
      };
      audio.onended = () => {
        setPlayingItem(null);
        setPlaylist(prev => prev.map(item => ({ ...item, isPlaying: false })));
      };
      audio.onerror = () => {
        console.log('Audio loading failed for:', item.audioUrl);
        setPlayingItem(null);
        setPlaylist(prev => prev.map(item => ({ ...item, isPlaying: false })));
      };
      audio.load();
    }
  };

  const resetDemo = () => {
    setStep(0);
    setIsAnimating(false);
    setIsPaused(false);
    setWords([]);
    setPlaylist([]);
    setPlayingItem(null);
    timeouts.forEach(timeout => clearTimeout(timeout));
    setTimeouts([]);
  };

  const goToStep = (targetStep: number) => {
    if (isAnimating || targetStep > step) return;
    setStep(targetStep);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {translations.title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {translations.subtitle}
        </p>
        
        {/* Language Toggle */}
        <Tabs value={translationTarget} className="inline-flex">
          <TabsList className="grid w-fit grid-cols-2">
            <TabsTrigger value="uk" className="flex items-center gap-2">
              🇺🇦 {translations.norwayUkraine}
            </TabsTrigger>
            <TabsTrigger value="en" className="flex items-center gap-2">
              🇬🇧 {translations.norwayEngland}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        {[1, 2, 3, 4, 5].map((stepNum) => (
          <div key={stepNum} className="flex flex-col items-center space-y-2">
            <motion.div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-all ${
                step >= stepNum
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
              }`}
              whileHover={{ scale: step >= stepNum ? 1.1 : 1 }}
              onClick={() => goToStep(stepNum)}
            >
              {step > stepNum ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                stepNum
              )}
            </motion.div>
            <span className="text-xs text-center max-w-20 text-gray-600 dark:text-gray-400">
              {stepNum === 1 && translations.steps.step1}
              {stepNum === 2 && translations.steps.step2}
              {stepNum === 3 && translations.steps.step3}
              {stepNum === 4 && translations.steps.step4}
              {stepNum === 5 && translations.steps.step5}
            </span>
          </div>
        ))}
      </div>

      {/* Demo Controls */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          onClick={startAnimation}
          disabled={isAnimating}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3"
        >
          {isAnimating ? (
            <>
              <Zap className="w-4 h-4 mr-2 animate-pulse" />
              {translations.processing}
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              {translations.tryDemo}
            </>
          )}
        </Button>
        
        <Button
          onClick={resetDemo}
          variant="outline"
          className="px-6 py-3"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Text Analysis */}
        <Card className="h-[400px]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Languages className="w-5 h-5" />
              {step === 1 ? translations.steps.step1 :
               step === 2 ? translations.steps.step2 :
               step === 3 ? translations.steps.step3 :
               step >= 4 ? translations.steps.step4 : 'Text Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 overflow-y-auto max-h-[320px]">
            {step >= 1 && (
              <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {sourceText.split(' ').map((word, index) => {
                  const cleanWord = word.replace(/[.,!?]/g, '');
                  const isKeyword = words.some(w => w.word === cleanWord);
                  
                  return (
                    <motion.span
                      key={index}
                      className={`${
                        isKeyword && step >= 2
                          ? 'bg-yellow-200 dark:bg-yellow-800 px-1 rounded font-medium'
                          : ''
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {word}{' '}
                    </motion.span>
                  );
                })}
              </div>
            )}
            
            {step >= 2 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Identified Keywords ({words.length}):
                </h4>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {words.map((word, index) => (
                      <motion.div
                        key={word.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          step >= 4
                            ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300'
                            : step >= 3
                            ? 'bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300'
                            : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300'
                        }`}
                      >
                        {word.word}
                        {step >= 4 && (
                          <span className="ml-2 text-xs opacity-75">
                            → {word.translation}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: Playlist */}
        <Card className="h-[400px]">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Volume2 className="w-5 h-5" />
              {step >= 5 ? translations.readyPlaylist : 'Audio Playlist'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 overflow-y-auto max-h-[320px]">
            {step < 4 && (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <Languages className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Audio playlist will appear here...</p>
                </div>
              </div>
            )}
            
            <AnimatePresence>
              {playlist.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.isPlaying
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <Button
                        size="sm"
                        variant={item.isPlaying ? "default" : "outline"}
                        onClick={() => toggleAudio(item.id)}
                        className="flex-shrink-0"
                      >
                        {item.isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {item.word} → {item.translation}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {item.context}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500 truncate">
                          {item.contextTranslation}
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {item.duration}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
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

export const CompactAnimatedDemo: React.FC = () => {
  const { language } = useLanguage();
  const currentLanguage = language;
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'uk' | 'en'>('uk');
  const [words, setWords] = useState<WordAnimation[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const sourceText = "Blendingsanordningen reduserer styrken på sollys. Arbeiderne må bruke vernebriller når de arbeider med UV-stråling. Sikkerhetsutstyr er obligatorisk på byggeplassen. Vernehansker beskytter mot kjemiske stoffer. Hørselsvern reduserer støynivået til sikre grenser.";

  const keyWordsData = [
    {
      word: "blendingsanordning",
      translation_uk: "протисонячний пристрій",
      translation_en: "anti-glare device",
      context: "Beskytter øynene mot sterkt lys",
      contextTranslation_uk: "Захищає очі від яскравого світла",
      contextTranslation_en: "Protects eyes from bright light"
    },
    {
      word: "vernebriller",
      translation_uk: "захисні окуляри",
      translation_en: "safety glasses",
      context: "Personlig verneutstyr for øynene",
      contextTranslation_uk: "Особисті засоби захисту для очей",
      contextTranslation_en: "Personal protective equipment for eyes"
    },
    {
      word: "sikkerhetsutstyr",
      translation_uk: "обладнання безпеки",
      translation_en: "safety equipment",
      context: "Alt utstyr som beskytter arbeiderne",
      contextTranslation_uk: "Все обладнання, що захищає працівників",
      contextTranslation_en: "All equipment that protects workers"
    },
    {
      word: "vernehansker",
      translation_uk: "захисні рукавички",
      translation_en: "protective gloves",
      context: "Beskytter hendene mot farlige stoffer",
      contextTranslation_uk: "Захищають руки від небезпечних речовин",
      contextTranslation_en: "Protect hands from hazardous substances"
    },
    {
      word: "hørselsvern",
      translation_uk: "захист слуху",
      translation_en: "hearing protection",
      context: "Reduserer skadelig støy",
      contextTranslation_uk: "Зменшує шкідливий шум",
      contextTranslation_en: "Reduces harmful noise"
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
      step1: currentLanguage === 'no' ? 'Tekst' : currentLanguage === 'uk' ? 'Текст' : 'Text',
      step2: currentLanguage === 'no' ? 'Analyse' : currentLanguage === 'uk' ? 'Аналіз' : 'Analysis', 
      step3: currentLanguage === 'no' ? 'Kontekst' : currentLanguage === 'uk' ? 'Контекст' : 'Context',
      step4: currentLanguage === 'no' ? 'Oversettelse' : currentLanguage === 'uk' ? 'Переклад' : 'Translation',
      step5: currentLanguage === 'no' ? 'Lydordbok' : currentLanguage === 'uk' ? 'Аудіословник' : 'Audio Dictionary'
    },
    readyPlaylist: currentLanguage === 'no' ? 'Klar lydordbok' :
                   currentLanguage === 'uk' ? 'Готовий аудіословник' :
                   'Ready Audio Dictionary',
    playAudio: currentLanguage === 'no' ? 'Spill av' : currentLanguage === 'uk' ? 'Відтворити' : 'Play',
    generating: currentLanguage === 'no' ? 'Genererer...' : currentLanguage === 'uk' ? 'Генерую...' : 'Generating...',
    processing: currentLanguage === 'no' ? 'Behandler...' : currentLanguage === 'uk' ? 'Обробляю...' : 'Processing...'
  };

  const startDemo = () => {
    setIsAnimating(true);
    setStep(1);
    
    // Step 2: Highlight words (2 seconds)
    setTimeout(() => {
      setStep(2);
      const initialWords: WordAnimation[] = keyWordsData.map((item, index) => ({
        ...item,
        translation: activeTab === 'uk' ? item.translation_uk : item.translation_en,
        contextTranslation: activeTab === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
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
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isHighlighted: true } : word
          ));
        }, index * 200);
      });
    }, 2000);

    // Step 3: Context wrapping (4 seconds)
    setTimeout(() => {
      setStep(3);
      words.forEach((_, index) => {
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isExtracting: true, isInContext: true } : word
          ));
        }, index * 150);
      });
    }, 4000);

    // Step 4: Translation (6 seconds)  
    setTimeout(() => {
      setStep(4);
      words.forEach((_, index) => {
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isExtracting: false, isTranslating: true } : word
          ));
          
          setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isTranslating: false, isReady: true } : word
            ));
          }, 500);
        }, index * 200);
      });
    }, 6000);

    // Step 5: Final playlist (8 seconds)
    setTimeout(() => {
      setStep(5);
      const finalPlaylist: PlaylistItem[] = keyWordsData.map((item, index) => ({
        id: `playlist-${index}`,
        word: item.word,
        translation: activeTab === 'uk' ? item.translation_uk : item.translation_en,
        context: item.context,
        contextTranslation: activeTab === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
        audioUrl: `/demo-audio/${item.word}.mp3`,
        duration: "0:03",
        isPlaying: false
      }));
      setPlaylist(finalPlaylist);
      setIsAnimating(false);
    }, 8000);
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
    <div className="h-[500px] w-full bg-gradient-to-br from-[#0066cc]/5 to-[#00a1e6]/5 rounded-2xl border border-[#0066cc]/10 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-white/50">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#022f36]">{translations.title}</h3>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'uk' | 'en')} className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2 h-8">
              <TabsTrigger value="uk" className="text-xs">🇺🇦</TabsTrigger>
              <TabsTrigger value="en" className="text-xs">🇬🇧</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Progress Steps */}
        <div className="flex justify-center mt-3">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                  step >= stepNum ? 'bg-[#022f36] text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-3 w-3" /> : stepNum}
                </div>
                {stepNum < 5 && <ArrowRight className="h-3 w-3 mx-1 text-gray-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-4 overflow-hidden">
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
              <div className="bg-white rounded-lg p-3 h-full overflow-y-auto">
                <h4 className="text-sm font-semibold text-[#022f36] mb-2 flex items-center gap-2">
                  <Languages className="h-4 w-4" />
                  {translations.steps.step1}
                </h4>
                <div className="text-xs leading-relaxed text-gray-800">
                  {sourceText}
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
              <div className="bg-white rounded-lg p-3 h-full overflow-y-auto">
                <h4 className="text-sm font-semibold text-[#022f36] mb-2 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  {translations.steps.step2}
                </h4>
                <div className="text-xs leading-relaxed">
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
                          isHighlighted ? 'bg-yellow-300 text-black px-0.5 rounded' : 'text-gray-800'
                        }`}
                      >
                        {word}{' '}
                      </motion.span>
                    );
                  })}
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
              <div className="bg-white rounded-lg p-3 h-full overflow-y-auto">
                <h4 className="text-sm font-semibold text-[#022f36] mb-2">{translations.steps.step3}</h4>
                <div className="space-y-1">
                  {words.filter(w => w.isInContext).map((word) => (
                    <motion.div
                      key={word.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2 bg-blue-50 rounded text-xs border-l-2 border-blue-400"
                    >
                      <div className="font-medium text-blue-800">{word.word}</div>
                      <div className="text-blue-600 text-xs mt-0.5">{word.context}</div>
                    </motion.div>
                  ))}
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
              <div className="grid grid-cols-2 gap-2 h-full">
                <div className="bg-white rounded-lg p-3 overflow-y-auto">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-1.5 bg-red-500"></div>
                    <div className="w-2 h-1.5 bg-white border"></div>
                    <div className="w-2 h-1.5 bg-blue-600"></div>
                    <span className="text-xs font-semibold">Norsk</span>
                  </div>
                  <div className="space-y-1">
                    {words.filter(w => w.isTranslating || w.isReady).map((word) => (
                      <div key={word.id} className="p-2 bg-blue-50 rounded text-xs">
                        <div className="font-medium text-blue-800">{word.word}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 overflow-y-auto">
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-2 h-1.5 bg-blue-400"></div>
                    <div className="w-2 h-1.5 bg-yellow-400"></div>
                    <span className="text-xs font-semibold">
                      {activeTab === 'uk' ? 'Українська' : 'English'}
                    </span>
                  </div>
                  <div className="space-y-1">
                    {words.filter(w => w.isTranslating || w.isReady).map((word) => (
                      <motion.div
                        key={word.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-2 bg-green-50 rounded text-xs"
                      >
                        <div className="font-medium text-green-800">{word.translation}</div>
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
              <div className="bg-white rounded-lg p-3 h-full overflow-y-auto">
                <h4 className="text-sm font-semibold text-[#022f36] mb-2 flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  {translations.readyPlaylist}
                </h4>
                <div className="space-y-1">
                  {playlist.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center gap-2 p-2 rounded text-xs transition-colors ${
                        item.isPlaying ? 'bg-blue-50' : 'bg-gray-50'
                      }`}
                    >
                      <button
                        onClick={() => togglePlayback(item.id)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                          item.isPlaying ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                        }`}
                      >
                        {item.isPlaying ? <Pause size={8} /> : <Play size={8} />}
                      </button>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{item.word}</div>
                        <div className="text-gray-600 truncate">{item.translation}</div>
                      </div>
                      <div className="text-gray-500 text-xs">{item.duration}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <Button 
                    onClick={resetDemo}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs"
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
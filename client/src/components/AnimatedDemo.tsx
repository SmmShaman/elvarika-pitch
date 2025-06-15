import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause,
  Volume2,
  CheckCircle,
  Zap
} from 'lucide-react';

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

interface DemoTranslations {
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

const demoTranslations: Record<string, DemoTranslations> = {
  uk: {
    title: "Інтерактивна демонстрація Elvarika",
    subtitle: "Спостерігайте, як текст перетворюється на двомовний аудіоплейлист у режимі реального часу",
    norwayUkraine: "Норвезька → Українська",
    norwayEngland: "Норвезька → Англійська", 
    tryDemo: "Спробувати безкоштовно",
    steps: {
      step1: "Відображення тексту",
      step2: "Виділення ключових слів",
      step3: "Контекстне обгортання",
      step4: "Переклад та озвучування",
      step5: "Готовий плейлист"
    },
    readyPlaylist: "Готовий плейлист для прослуховування",
    playAudio: "Відтворити аудіо",
    generating: "Генерування...",
    processing: "Обробка..."
  },
  no: {
    title: "Interaktiv Elvarika-demonstrasjon",
    subtitle: "Se hvordan tekst transformeres til en tospråklig lydspilleliste i sanntid",
    norwayUkraine: "Norsk → Ukrainsk",
    norwayEngland: "Norsk → Engelsk",
    tryDemo: "Prøv gratis",
    steps: {
      step1: "Viser tekst",
      step2: "Uthever nøkkelord",
      step3: "Kontekstuell innpakning",
      step4: "Oversettelse og lydproduksjon",
      step5: "Ferdig spilleliste"
    },
    readyPlaylist: "Ferdig spilleliste for lytting",
    playAudio: "Spill av lyd",
    generating: "Genererer...",
    processing: "Behandler..."
  },
  en: {
    title: "Interactive Elvarika Demonstration",
    subtitle: "Watch text transform into a bilingual audio playlist in real-time",
    norwayUkraine: "Norwegian → Ukrainian",
    norwayEngland: "Norwegian → English",
    tryDemo: "Try for free",
    steps: {
      step1: "Display text",
      step2: "Highlight key words",
      step3: "Contextual wrapping", 
      step4: "Translation and voice generation",
      step5: "Ready playlist"
    },
    readyPlaylist: "Ready playlist for listening",
    playAudio: "Play audio",
    generating: "Generating...",
    processing: "Processing..."
  }
};

const sourceText = `Blendingsanordningen reduserer styrken på sollys. Døren skal aldri blokkeres helt. Nødstoppmekanismen er nær døren til høyre. Porten må være bred nok. Skyvedører er plassert ved siden av porten. Nødutgangen må være godt synlig. Nødbelysning lyser opp nødutgangen automatisk. Sterkt lys kan gi blending. Lyskilder bør plasseres riktig for sikkerhet.`;

const keyWordsData = [
  {
    word: "blendingsanordning",
    translation_uk: "пристрій проти відблисків",
    translation_en: "anti-glare device",
    context: "Vi monterte en blendingsanordning i vinduet.",
    contextTranslation_uk: "Ми встановили пристрій проти відблисків на вікні.",
    contextTranslation_en: "We installed an anti-glare device on the window."
  },
  {
    word: "dør",
    translation_uk: "двері",
    translation_en: "door",
    context: "Døren skal aldri blokkeres helt.",
    contextTranslation_uk: "Двері ніколи не повинні бути повністю заблоковані.",
    contextTranslation_en: "The door should never be completely blocked."
  },
  {
    word: "nødstoppmekanisme",
    translation_uk: "механізм аварійної зупинки",
    translation_en: "emergency stop mechanism",
    context: "Nødstoppmekanisme skal være lett tilgjengelig.",
    contextTranslation_uk: "Механізм аварійної зупинки повинен бути легкодоступним.",
    contextTranslation_en: "The emergency stop mechanism must be easily accessible."
  },
  {
    word: "port",
    translation_uk: "ворота",
    translation_en: "gate",
    context: "Porten må være bred nok.",
    contextTranslation_uk: "Ворота повинні бути достатньо широкими.",
    contextTranslation_en: "The gate must be wide enough."
  },
  {
    word: "nødutgang",
    translation_uk: "аварійний вихід",
    translation_en: "emergency exit",
    context: "Nødutgangen må være godt synlig.",
    contextTranslation_uk: "Аварійний вихід повинен бути добре помітним.",
    contextTranslation_en: "The emergency exit must be clearly visible."
  },
  {
    word: "nødbelysning",
    translation_uk: "аварійне освітлення",
    translation_en: "emergency lighting",
    context: "Nødbelysning er viktig ved strømbrudd.",
    contextTranslation_uk: "Аварійне освітлення важливе під час відключення електроенергії.",
    contextTranslation_en: "Emergency lighting is important during a power outage."
  },
  {
    word: "lys",
    translation_uk: "світло",
    translation_en: "light",
    context: "Sterkt lys kan gi blending.",
    contextTranslation_uk: "Яскраве світло може спричинити відблиски.",
    contextTranslation_en: "Strong light can cause glare."
  },
  {
    word: "sikkerhet",
    translation_uk: "безпека",
    translation_en: "safety",
    context: "Lyskilder bør plasseres riktig for sikkerhet.",
    contextTranslation_uk: "Джерела світла слід розміщувати правильно для безпеки.",
    contextTranslation_en: "Light sources should be placed correctly for safety."
  }
];

export const AnimatedDemo: React.FC = () => {
  const { language } = useLanguage();
  const t = demoTranslations[language] || demoTranslations['en'];

  const [activeTab, setActiveTab] = useState<'uk' | 'en'>('uk');
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [words, setWords] = useState<WordAnimation[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playingItem, setPlayingItem] = useState<string | null>(null);

  const startDemo = () => {
    setIsAnimating(true);
    setCurrentStep(1);
    setWords([]);
    setPlaylist([]);
    
    // Step 1: Show full text (2 seconds)
    setTimeout(() => {
      setCurrentStep(2);
      
      // Step 2: Highlight key words (3 seconds)
      const initialWords = keyWordsData.map((item, index) => ({
        word: item.word,
        translation: activeTab === 'uk' ? item.translation_uk : item.translation_en,
        context: item.context,
        contextTranslation: activeTab === 'uk' ? item.contextTranslation_uk : item.contextTranslation_en,
        id: `word-${index}`,
        isHighlighted: false,
        isExtracting: false,
        isInContext: false,
        isTranslating: false,
        isReady: false
      }));
      
      setWords(initialWords);
      
      // Animate highlighting of words
      initialWords.forEach((_, index) => {
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isHighlighted: true } : word
          ));
        }, index * 200);
      });
      
    }, 2000);

    // Step 3: Extract and move to context section (4 seconds)
    setTimeout(() => {
      setCurrentStep(3);
      
      words.forEach((_, index) => {
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isExtracting: true } : word
          ));
          
          setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isExtracting: false, isInContext: true } : word
            ));
          }, 500);
        }, index * 300);
      });
      
    }, 5000);

    // Step 4: Translation and voice generation (6 seconds)
    setTimeout(() => {
      setCurrentStep(4);
      
      words.forEach((_, index) => {
        setTimeout(() => {
          setWords(prev => prev.map((word, i) => 
            i === index ? { ...word, isTranslating: true } : word
          ));
          
          setTimeout(() => {
            setWords(prev => prev.map((word, i) => 
              i === index ? { ...word, isTranslating: false, isReady: true } : word
            ));
          }, 1000);
        }, index * 400);
      });
      
    }, 8000);

    // Step 5: Create final playlist (10 seconds)
    setTimeout(() => {
      setCurrentStep(5);
      
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
      
    }, 12000);
  };

  const playAudio = (itemId: string) => {
    if (playingItem === itemId) {
      setPlayingItem(null);
    } else {
      setPlayingItem(itemId);
      // Simulate audio playback
      setTimeout(() => {
        setPlayingItem(null);
      }, 3000);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsAnimating(false);
    setWords([]);
    setPlaylist([]);
    setPlayingItem(null);
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#defff0] to-[#f0fff4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6 font-medium">
            {t.title}
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[800px] mx-auto mb-8">
            {t.subtitle}
          </p>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'uk' | 'en')} className="mb-8">
            <TabsList className="grid w-full max-w-[400px] mx-auto grid-cols-2">
              <TabsTrigger value="uk" className="flex items-center gap-2">
                🇺🇦 {t.norwayUkraine}
              </TabsTrigger>
              <TabsTrigger value="en" className="flex items-center gap-2">
                🇬🇧 {t.norwayEngland}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="max-w-[1400px] mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    currentStep >= step ? 'bg-[#022f36] text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <CheckCircle className="h-5 w-5" /> : step}
                  </div>
                  {step < 5 && (
                    <ArrowRight className={`h-4 w-4 mx-2 transition-colors ${
                      currentStep > step ? 'text-[#022f36]' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-5 gap-4 mb-8 text-center">
            <div className="text-sm text-gray-600">{t.steps.step1}</div>
            <div className="text-sm text-gray-600">{t.steps.step2}</div>
            <div className="text-sm text-gray-600">{t.steps.step3}</div>
            <div className="text-sm text-gray-600">{t.steps.step4}</div>
            <div className="text-sm text-gray-600">{t.steps.step5}</div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Source Text and Processing */}
            <div className="space-y-6">
              {/* Source Text */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Norsk tekst om sikkerhet</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative p-4 bg-gray-50 rounded-lg min-h-[200px]">
                    <div className="text-sm leading-relaxed">
                      {sourceText.split(' ').map((word, index) => {
                        const cleanWord = word.replace(/[.,]/g, '');
                        const foundWord = words.find(w => w.word === cleanWord);
                        const isHighlighted = foundWord?.isHighlighted;
                        const isExtracting = foundWord?.isExtracting;
                        
                        return (
                          <span
                            key={index}
                            className={`inline-block transition-all duration-500 ${
                              isHighlighted ? 'bg-yellow-200 font-medium' : ''
                            } ${
                              isExtracting ? 'transform scale-110 bg-blue-200 animate-pulse' : ''
                            }`}
                          >
                            {word}{' '}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contextual Wrapping */}
              {currentStep >= 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      Kontekstuel innpakning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {words.filter(w => w.isInContext).map((word) => (
                        <div 
                          key={word.id}
                          className={`p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400 transition-all duration-500 ${
                            word.isTranslating ? 'animate-pulse bg-purple-50 border-purple-400' : ''
                          }`}
                        >
                          <div className="font-medium text-[#022f36]">{word.word}</div>
                          <div className="text-sm text-gray-600 mt-1">{word.context}</div>
                          {word.isReady && (
                            <div className="text-sm text-green-600 mt-2 flex items-center gap-1">
                              <CheckCircle className="h-4 w-4" />
                              Ferdig for oversettelse
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">
              {/* Control Button */}
              <div className="text-center">
                {currentStep === 0 && (
                  <Button
                    onClick={startDemo}
                    className="bg-[#022f36] text-white hover:bg-[#033944] h-12 px-8"
                    disabled={isAnimating}
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    {t.tryDemo}
                  </Button>
                )}
                
                {isAnimating && (
                  <div className="flex items-center justify-center gap-2 text-[#022f36]">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#022f36]"></div>
                    {t.processing}
                  </div>
                )}

                {currentStep === 5 && !isAnimating && (
                  <Button
                    onClick={resetDemo}
                    variant="outline"
                    className="border-[#022f36] text-[#022f36] hover:bg-[#022f36] hover:text-white"
                  >
                    Start på nytt
                  </Button>
                )}
              </div>

              {/* Final Playlist */}
              {currentStep === 5 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Volume2 className="h-5 w-5 text-green-500" />
                      {t.readyPlaylist}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {playlist.map((item, index) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg border hover:shadow-md transition-shadow"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-[#022f36]">
                              {item.word} → {item.translation}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {item.contextTranslation}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{item.duration}</Badge>
                            <Button
                              size="sm"
                              onClick={() => playAudio(item.id)}
                              className={`${
                                playingItem === item.id
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-[#022f36] hover:bg-[#033944]'
                              } text-white`}
                            >
                              {playingItem === item.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
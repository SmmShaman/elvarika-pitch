import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface PlaylistItem {
  id: string;
  originalText: string;
  translatedText: string;
  duration: string;
  audioUrl: string;
  isPlaying: boolean;
}

export const InteractiveDemo: React.FC = () => {
  const { translations } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [highlightedSentences, setHighlightedSentences] = useState<string[]>([]);
  const [translatedSentences, setTranslatedSentences] = useState<{original: string, translated: string}[]>([]);
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const sampleText = {
    'no': "Kunstig intelligens revolusjonerer måten vi jobber på. Maskinlæring gjør det mulig for datamaskiner å lære av data uten eksplisitt programmering. Nevrale nettverk etterligner hjernens struktur for å løse komplekse problemer. Automatisering reduserer behovet for manuell arbeid og øker effektiviteten.",
    'en': "Artificial intelligence is revolutionizing the way we work. Machine learning enables computers to learn from data without explicit programming. Neural networks mimic the brain's structure to solve complex problems. Automation reduces the need for manual labor and increases efficiency.",
    'uk': "Штучний інтелект революціонізує спосіб нашої роботи. Машинне навчання дозволяє комп'ютерам вчитися з даних без явного програмування. Нейронні мережі імітують структуру мозку для вирішення складних проблем. Автоматизація зменшує потребу в ручній праці та підвищує ефективність."
  };

  const targetLanguages = {
    'no': 'Spansk',
    'en': 'Spanish', 
    'uk': 'Іспанська'
  };

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: translations.techShowcase.features.neural.title,
      description: "AI analyzes and extracts key sentences",
      isActive: currentStep === 1,
      isCompleted: currentStep > 1
    },
    {
      id: 2,
      title: translations.techShowcase.features.multilingual.title,
      description: "Instant translation to target language",
      isActive: currentStep === 2,
      isCompleted: currentStep > 2
    },
    {
      id: 3,
      title: "Audio Playlist",
      description: "Generated audio files organized as playlist",
      isActive: currentStep === 3,
      isCompleted: currentStep > 3
    },
    {
      id: 4,
      title: translations.techShowcase.features.realtime.title,
      description: "High-quality natural voice synthesis",
      isActive: currentStep === 4,
      isCompleted: currentStep > 4
    }
  ];

  const handleStartDemo = async () => {
    setIsProcessing(true);
    setCurrentStep(1);
    
    // Step 1: Extract key sentences with animation
    setTimeout(() => {
      const sentences = [
        "Artificial intelligence is revolutionizing the way we work.",
        "Machine learning enables computers to learn from data.",
        "Neural networks mimic the brain's structure.",
        "Automation reduces manual labor and increases efficiency."
      ];
      setHighlightedSentences(sentences);
      setCurrentStep(2);
    }, 2000);

    // Step 2: Show translations
    setTimeout(() => {
      const translated = [
        { original: "Artificial intelligence is revolutionizing the way we work.", translated: "La inteligencia artificial está revolucionando la forma en que trabajamos." },
        { original: "Machine learning enables computers to learn from data.", translated: "El aprendizaje automático permite a las computadoras aprender de los datos." },
        { original: "Neural networks mimic the brain's structure.", translated: "Las redes neuronales imitan la estructura del cerebro." },
        { original: "Automation reduces manual labor and increases efficiency.", translated: "La automatización reduce el trabajo manual y aumenta la eficiencia." }
      ];
      setTranslatedSentences(translated);
      setCurrentStep(3);
    }, 4000);

    // Step 3: Create playlist
    setTimeout(() => {
      const playlistItems: PlaylistItem[] = [
        {
          id: "1",
          originalText: "Artificial intelligence is revolutionizing the way we work.",
          translatedText: "La inteligencia artificial está revolucionando la forma en que trabajamos.",
          duration: "0:04",
          audioUrl: "/demo-audio/sentence1.mp3",
          isPlaying: false
        },
        {
          id: "2", 
          originalText: "Machine learning enables computers to learn from data.",
          translatedText: "El aprendizaje automático permite a las computadoras aprender de los datos.",
          duration: "0:05",
          audioUrl: "/demo-audio/sentence2.mp3",
          isPlaying: false
        },
        {
          id: "3",
          originalText: "Neural networks mimic the brain's structure.",
          translatedText: "Las redes neuronales imitan la estructura del cerebro.",
          duration: "0:03",
          audioUrl: "/demo-audio/sentence3.mp3", 
          isPlaying: false
        },
        {
          id: "4",
          originalText: "Automation reduces manual labor and increases efficiency.",
          translatedText: "La automatización reduce el trabajo manual y aumenta la eficiencia.",
          duration: "0:04",
          audioUrl: "/demo-audio/sentence4.mp3",
          isPlaying: false
        }
      ];
      setPlaylist(playlistItems);
      setCurrentStep(4);
      setIsProcessing(false);
    }, 6000);
  };

  const handlePlayAudio = (itemId: string) => {
    if (playingItem === itemId) {
      setPlayingItem(null);
      if (audioRef.current) {
        audioRef.current.pause();
      }
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
    setHighlightedSentences([]);
    setTranslatedSentences([]);
    setPlaylist([]);
    setPlayingItem(null);
    setIsProcessing(false);
  };

  return (
    <section className="w-full py-16 bg-gradient-to-br from-[#defff0] to-[#f0fff4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[42px] text-[#022f36] leading-[50.4px] tracking-[-1.26px] mb-6">
            <span className="font-medium">Interactive Demo</span>
            <span className="tracking-[-0.53px]"> - See </span>
            <span className="font-medium">Elvarika in Action</span>
          </h2>
          <p className="text-lg text-[#022f36] leading-[25.2px] max-w-[700px] mx-auto">
            Experience our 4-step transformation process: From text to organized audio playlist in seconds.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Panel - Input and Process */}
            <div className="space-y-6">
              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Sample Text</h3>
                  <div className="relative">
                    <textarea
                      className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none"
                      value="Artificial intelligence is revolutionizing the way we work. Machine learning enables computers to learn from data without explicit programming. Neural networks mimic the brain's structure to solve complex problems. Automation reduces the need for manual labor and increases efficiency."
                      readOnly
                    />
                    {highlightedSentences.length > 0 && (
                      <div className="absolute inset-0 p-4 pointer-events-none">
                        {highlightedSentences.map((sentence, index) => (
                          <div 
                            key={index}
                            className="inline bg-yellow-200 bg-opacity-70 rounded px-1 animate-pulse"
                            style={{ animationDelay: `${index * 0.5}s` }}
                          >
                            {sentence}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex items-center gap-4">
                    <span className="text-sm text-gray-600">Translate to:</span>
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option>Spanish</option>
                    </select>
                  </div>

                  {currentStep === 0 && (
                    <Button
                      onClick={handleStartDemo}
                      className="w-full mt-6 bg-[#022f36] text-white hover:bg-[#033944] h-12"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Start Interactive Demo
                    </Button>
                  )}

                  {isProcessing && (
                    <Button
                      disabled
                      className="w-full mt-6 bg-gray-400 text-white h-12"
                    >
                      Processing... {currentStep}/4
                    </Button>
                  )}

                  {currentStep > 0 && !isProcessing && (
                    <Button
                      onClick={resetDemo}
                      variant="outline"
                      className="w-full mt-6 h-12"
                    >
                      Reset Demo
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Progress Steps */}
              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Process Steps</h3>
                  <div className="space-y-4">
                    {demoSteps.map((step) => (
                      <div key={step.id} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.isCompleted ? 'bg-green-500 text-white' :
                          step.isActive ? 'bg-[#022f36] text-white' :
                          'bg-gray-200 text-gray-500'
                        }`}>
                          {step.isCompleted ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            step.id
                          )}
                        </div>
                        <div className="flex-1">
                          <div className={`font-medium ${
                            step.isActive || step.isCompleted ? 'text-[#022f36]' : 'text-gray-500'
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-sm text-gray-600">{step.description}</div>
                        </div>
                        {step.isActive && (
                          <div className="w-2 h-2 bg-[#7afcd0] rounded-full animate-pulse"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Extracted Context */}
              {translatedSentences.length > 0 && (
                <Card className="bg-white border-none shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Extracted & Translated</h3>
                    <div className="space-y-3">
                      {translatedSentences.map((item, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm text-gray-600 mb-1">{item.original}</div>
                          <div className="text-[#022f36] font-medium">{item.translated}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Panel - Playlist Result */}
            <div>
              <Card className="bg-white border-none shadow-lg h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Generated Audio Playlist</h3>
                  
                  {playlist.length === 0 ? (
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">🎵</div>
                        <div className="text-gray-500">Your audio playlist will appear here</div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {playlist.map((item, index) => (
                        <div 
                          key={item.id} 
                          className={`p-4 border rounded-lg transition-all duration-300 ${
                            playingItem === item.id ? 'border-[#7afcd0] bg-[#defff0]' : 'border-gray-200'
                          }`}
                          style={{ 
                            animation: `slideInRight 0.5s ease-out ${index * 0.2}s both`
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handlePlayAudio(item.id)}
                              className="w-10 h-10 rounded-full border border-[#022f36] hover:bg-[#022f36] hover:text-white"
                            >
                              {playingItem === item.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <div className="flex-1">
                              <div className="text-sm font-medium text-[#022f36]">
                                {item.translatedText}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                Track {parseInt(item.id)} • {item.duration}
                              </div>
                            </div>
                          </div>
                          {playingItem === item.id && (
                            <div className="mt-2 flex items-center gap-2">
                              <div className="w-full bg-gray-200 rounded-full h-1">
                                <div className="bg-[#7afcd0] h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {currentStep >= 4 && (
                        <div className="mt-6 p-4 bg-gradient-to-r from-[#defff0] to-[#7afcd0] rounded-lg">
                          <div className="text-center">
                            <div className="text-[#022f36] font-semibold mb-2">Demo Complete!</div>
                            <div className="text-sm text-[#022f36] mb-4">
                              Ready to create your own audio library?
                            </div>
                            <Button className="bg-[#022f36] text-white hover:bg-[#033944]">
                              Start Free Trial
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </section>
  );
};
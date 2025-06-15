import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, RotateCcw, Mic, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { useLanguage } from '@/hooks/useLanguage';

interface WordPronunciation {
  id: string;
  word: string;
  phonetic: string;
  translation_uk: string;
  translation_en: string;
  audioUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  syllables: string[];
  tips: {
    no: string;
    uk: string;
    en: string;
  };
}

interface PronunciationGuideProps {
  words?: WordPronunciation[];
}

export const PronunciationGuide: React.FC<PronunciationGuideProps> = ({ words }) => {
  const { language } = useLanguage();
  const [selectedWord, setSelectedWord] = useState<WordPronunciation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [userRecording, setUserRecording] = useState<Blob | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Sample pronunciation data
  const defaultWords: WordPronunciation[] = [
    {
      id: '1',
      word: 'blendingsanordning',
      phonetic: '/ˈblɛndɪŋsanˌɔrtnɪŋ/',
      translation_uk: 'протисонячний пристрій',
      translation_en: 'anti-glare device',
      audioUrl: '/audio/blendingsanordning.mp3',
      difficulty: 'hard',
      syllables: ['blen', 'dings', 'an', 'ord', 'ning'],
      tips: {
        no: 'Trykk på første stavelse "blen" og siste "ning"',
        uk: 'Наголос на першому складі "бlen" та останньому "ning"',
        en: 'Stress on first syllable "blen" and last "ning"'
      }
    },
    {
      id: '2',
      word: 'vernebriller',
      phonetic: '/ˈvæːɳəˌbrɪlər/',
      translation_uk: 'захисні окуляри',
      translation_en: 'safety glasses',
      audioUrl: '/audio/vernebriller.mp3',
      difficulty: 'medium',
      syllables: ['ver', 'ne', 'bril', 'ler'],
      tips: {
        no: 'Lang "æ" lyd i "vær-" og rullende "r"',
        uk: 'Довгий звук "æ" у "vær-" та вібруючий "r"',
        en: 'Long "æ" sound in "vær-" and rolling "r"'
      }
    },
    {
      id: '3',
      word: 'sikkerhetsutstyr',
      phonetic: '/ˈsɪkərheːtsˌʉtstyr/',
      translation_uk: 'обладнання безпеки',
      translation_en: 'safety equipment',
      audioUrl: '/audio/sikkerhetsutstyr.mp3',
      difficulty: 'hard',
      syllables: ['sik', 'ker', 'hets', 'ut', 'styr'],
      tips: {
        no: 'Dobbel "k" lyd og lang "e" i "hets"',
        uk: 'Подвійний звук "k" та довгий "e" у "hets"',
        en: 'Double "k" sound and long "e" in "hets"'
      }
    },
    {
      id: '4',
      word: 'vernehansker',
      phonetic: '/ˈvæːɳəˌhanskər/',
      translation_uk: 'захисні рукавички',
      translation_en: 'protective gloves',
      audioUrl: '/audio/vernehansker.mp3',
      difficulty: 'medium',
      syllables: ['ver', 'ne', 'hans', 'ker'],
      tips: {
        no: 'Tydelig "hans" som i navnet Hans',
        uk: 'Чіткий "hans" як у імені Ганс',
        en: 'Clear "hans" like the name Hans'
      }
    },
    {
      id: '5',
      word: 'hørselsvern',
      phonetic: '/ˈhøːʂəlsˌværn/',
      translation_uk: 'захист слуху',
      translation_en: 'hearing protection',
      audioUrl: '/audio/horselsvern.mp3',
      difficulty: 'medium',
      syllables: ['hør', 'sels', 'vern'],
      tips: {
        no: 'Rundet "ø" lyd og skarp "s"',
        uk: 'Округлий звук "ø" та різкий "s"',
        en: 'Rounded "ø" sound and sharp "s"'
      }
    }
  ];

  const pronunciationWords = words || defaultWords;

  const translations = {
    title: language === 'no' ? 'Uttale-veiledning' :
           language === 'uk' ? 'Керівництво з вимови' :
           'Pronunciation Guide',
    selectWord: language === 'no' ? 'Velg ord for uttale:' :
                language === 'uk' ? 'Виберіть слово для вимови:' :
                'Select word to practice:',
    phonetic: language === 'no' ? 'Fonetisk:' :
              language === 'uk' ? 'Фонетично:' :
              'Phonetic:',
    difficulty: language === 'no' ? 'Vanskelighetsgrad:' :
                language === 'uk' ? 'Складність:' :
                'Difficulty:',
    tips: language === 'no' ? 'Uttale-tips:' :
          language === 'uk' ? 'Поради з вимови:' :
          'Pronunciation tips:',
    playbackSpeed: language === 'no' ? 'Avspillingshastighet:' :
                   language === 'uk' ? 'Швидкість відтворення:' :
                   'Playback speed:',
    record: language === 'no' ? 'Ta opp din uttale' :
            language === 'uk' ? 'Записати вашу вимову' :
            'Record your pronunciation',
    stopRecording: language === 'no' ? 'Stopp opptak' :
                   language === 'uk' ? 'Зупинити запис' :
                   'Stop recording',
    playRecording: language === 'no' ? 'Spill av opptak' :
                   language === 'uk' ? 'Відтворити запис' :
                   'Play recording',
    syllables: language === 'no' ? 'Stavelser:' :
               language === 'uk' ? 'Склади:' :
               'Syllables:'
  };

  // Generate mock waveform data
  useEffect(() => {
    const generateWaveform = () => {
      const points = 50;
      const wave = Array.from({ length: points }, (_, i) => {
        return Math.sin(i * 0.3) * 0.5 + Math.random() * 0.3 + 0.2;
      });
      setWaveform(wave);
    };
    generateWaveform();
  }, [selectedWord]);

  // Audio visualization
  useEffect(() => {
    if (isPlaying && canvasRef.current && waveform.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const animate = () => {
        try {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          
          // Draw waveform
          const barWidth = canvas.width / waveform.length;
          waveform.forEach((amplitude, i) => {
            const x = i * barWidth;
            const height = Math.max(amplitude * canvas.height * 0.8, 2);
            const y = (canvas.height - height) / 2;
            
            // Animate based on current time
            const progress = duration > 0 ? (currentTime / duration) * waveform.length : 0;
            const opacity = i < progress ? 1 : 0.3;
            
            ctx.globalAlpha = opacity;
            ctx.fillStyle = `rgba(0, 102, 204, ${opacity})`;
            ctx.fillRect(x, y, Math.max(barWidth - 1, 1), height);
          });
          
          if (isPlaying && !isNaN(currentTime) && !isNaN(duration)) {
            animationRef.current = requestAnimationFrame(animate);
          }
        } catch (error) {
          console.warn('Canvas animation error:', error);
        }
      };
      
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, currentTime, duration, waveform]);

  const handlePlayPause = () => {
    if (!audioRef.current || !selectedWord) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSpeedChange = (value: number[]) => {
    const speed = value[0];
    setPlaybackSpeed(speed);
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
  };

  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        console.warn('Media devices not supported');
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setUserRecording(blob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.warn('Microphone access denied or not available:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playUserRecording = () => {
    if (userRecording) {
      const url = URL.createObjectURL(userRecording);
      const audio = new Audio(url);
      audio.play();
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5" />
            {translations.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">{translations.selectWord}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {pronunciationWords.map((word) => (
                  <Button
                    key={word.id}
                    variant={selectedWord?.id === word.id ? "default" : "outline"}
                    className="justify-start text-left h-auto p-3"
                    onClick={() => setSelectedWord(word)}
                  >
                    <div>
                      <div className="font-medium">{word.word}</div>
                      <div className="text-xs opacity-70">
                        {language === 'uk' ? word.translation_uk : word.translation_en}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {selectedWord && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {/* Word Details */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-[#022f36] mb-2">
                            {selectedWord.word}
                          </h3>
                          <p className="text-lg text-gray-600 mb-2">
                            {language === 'uk' ? selectedWord.translation_uk : selectedWord.translation_en}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            <strong>{translations.phonetic}</strong> {selectedWord.phonetic}
                          </p>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium">{translations.difficulty}</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(selectedWord.difficulty)}`}>
                              {selectedWord.difficulty}
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium mb-2">{translations.syllables}</p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {selectedWord.syllables.map((syllable, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium"
                              >
                                {syllable}
                              </span>
                            ))}
                          </div>
                          
                          <p className="text-sm">
                            <strong>{translations.tips}</strong>
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {language === 'no' ? selectedWord.tips.no :
                             language === 'uk' ? selectedWord.tips.uk :
                             selectedWord.tips.en}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audio Controls */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Waveform Visualization */}
                        <div className="bg-gray-50 rounded-lg p-4">
                          <canvas
                            ref={canvasRef}
                            width={400}
                            height={80}
                            className="w-full h-20 bg-white rounded"
                          />
                        </div>

                        {/* Playback Controls */}
                        <div className="flex items-center gap-4">
                          <Button
                            onClick={handlePlayPause}
                            className="flex items-center gap-2"
                          >
                            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                            {isPlaying ? 'Pause' : 'Play'}
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => {
                              if (audioRef.current) {
                                audioRef.current.currentTime = 0;
                                setCurrentTime(0);
                              }
                            }}
                          >
                            <RotateCcw size={16} />
                          </Button>
                        </div>

                        {/* Speed Control */}
                        <div className="space-y-2">
                          <label className="text-sm font-medium">{translations.playbackSpeed}</label>
                          <div className="flex items-center gap-4">
                            <span className="text-sm">0.5x</span>
                            <Slider
                              value={[playbackSpeed]}
                              onValueChange={handleSpeedChange}
                              min={0.5}
                              max={2}
                              step={0.1}
                              className="flex-1"
                            />
                            <span className="text-sm">2x</span>
                          </div>
                          <p className="text-xs text-gray-500">
                            Current: {playbackSpeed}x
                          </p>
                        </div>

                        {/* Recording Controls */}
                        <div className="border-t pt-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant={isRecording ? "destructive" : "outline"}
                              onClick={isRecording ? stopRecording : startRecording}
                              className="flex items-center gap-2"
                            >
                              {isRecording ? <Square size={16} /> : <Mic size={16} />}
                              {isRecording ? translations.stopRecording : translations.record}
                            </Button>
                            
                            {userRecording && (
                              <Button
                                variant="outline"
                                onClick={playUserRecording}
                                className="flex items-center gap-2"
                              >
                                <Play size={16} />
                                {translations.playRecording}
                              </Button>
                            )}
                          </div>
                          
                          {isRecording && (
                            <div className="flex items-center gap-2 text-red-600">
                              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                              <span className="text-sm">Recording...</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Hidden audio element */}
                      <audio
                        ref={audioRef}
                        src={selectedWord.audioUrl}
                        onTimeUpdate={() => {
                          if (audioRef.current) {
                            setCurrentTime(audioRef.current.currentTime);
                          }
                        }}
                        onLoadedMetadata={() => {
                          if (audioRef.current) {
                            setDuration(audioRef.current.duration);
                          }
                        }}
                        onEnded={() => setIsPlaying(false)}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
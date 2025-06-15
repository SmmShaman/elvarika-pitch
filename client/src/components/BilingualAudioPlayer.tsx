import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, FileText, Mail, Globe, Book, Volume2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface BilingualDocument {
  id: string;
  title: string;
  source: string;
  type: "pdf" | "article" | "email" | "document";
  ukrainian: {
    youtubeUrl: string;
    duration: string;
  };
  norwegian: {
    youtubeUrl: string;
    duration: string;
  };
}

// Real documents with actual YouTube URLs (to be provided by user)
const documentsLibrary: BilingualDocument[] = [
  {
    id: "1",
    title: "Q3 Markedsanalyse.pdf",
    source: "PDF Dokument", 
    type: "pdf",
    ukrainian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "12:34"
    },
    norwegian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "12:34"
    }
  },
  {
    id: "2",
    title: "Fremtidens AI-teknologi",
    source: "Nettartikkel",
    type: "article",
    ukrainian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "8:45"
    },
    norwegian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "8:45"
    }
  },
  {
    id: "3",
    title: "E-post fra CEO",
    source: "E-post",
    type: "email", 
    ukrainian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "3:21"
    },
    norwegian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "3:21"
    }
  },
  {
    id: "4",
    title: "Kapittel 5: Mikroøkonomi",
    source: "Lærebok",
    type: "document",
    ukrainian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "15:12"
    },
    norwegian: {
      youtubeUrl: "", // User will provide actual URL
      duration: "15:12"
    }
  }
];

export const BilingualAudioPlayer: React.FC = () => {
  const { translations } = useLanguage();
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<'ukrainian' | 'norwegian'>('norwegian');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState("1.0x");
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentDocument = documentsLibrary[currentTrack];
  const currentAudio = currentDocument[currentLanguage];

  // Extract YouTube video ID for embedding
  const getYouTubeVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf": return <FileText className="h-4 w-4" />;
      case "article": return <Globe className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "document": return <Book className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % documentsLibrary.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const previousTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + documentsLibrary.length) % documentsLibrary.length);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const selectTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const switchLanguage = (language: 'ukrainian' | 'norwegian') => {
    setCurrentLanguage(language);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Parse duration string to seconds
  const parseDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return minutes * 60 + seconds;
  };

  const totalDuration = parseDuration(currentAudio.duration);
  const progressPercentage = (currentTime / totalDuration) * 100;

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  const handleProgressChange = (value: number[]) => {
    const newTime = (value[0] / 100) * totalDuration;
    setCurrentTime(newTime);
  };

  return (
    <div className="w-full max-w-5xl mx-auto relative">
      {/* Glass container with flower-inspired design */}
      <div className="relative bg-white/20 backdrop-blur-xl rounded-[2rem] border border-white/30 shadow-2xl overflow-hidden">
        {/* Decorative flower elements */}
        <div className="absolute top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-pink-300 to-pink-400 opacity-60 blur-sm"></div>
        <div className="absolute top-8 right-12 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-300 to-orange-300 opacity-50 blur-sm"></div>
        <div className="absolute bottom-12 left-12 w-10 h-10 rounded-full bg-gradient-to-r from-white to-blue-100 opacity-40 blur-sm"></div>
        <div className="absolute bottom-6 right-8 w-7 h-7 rounded-full bg-gradient-to-r from-orange-300 to-yellow-400 opacity-45 blur-sm"></div>
        
        {/* Floating flower decorations */}
        <div className="absolute top-12 left-1/4 text-pink-400 opacity-60 text-2xl animate-pulse">🌸</div>
        <div className="absolute top-20 right-1/4 text-yellow-400 opacity-50 text-xl animate-pulse" style={{animationDelay: '1s'}}>🌼</div>
        <div className="absolute bottom-20 left-1/3 text-white opacity-40 text-lg animate-pulse" style={{animationDelay: '2s'}}>🌺</div>
        <div className="absolute bottom-16 right-1/3 text-orange-400 opacity-55 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>🌻</div>

        <div className="relative bg-gradient-to-br from-blue-50/90 via-white/95 to-green-50/90 backdrop-blur-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Se hvordan "Elvarika" fungerer i praksis
            </h2>
            <p className="text-slate-700 opacity-90 text-lg">
              Bygg ditt personlige lydbibliotek fra enhver tekst. Hvert dokument er tilgjengelig på både ukrainsk og norsk.
            </p>
          </div>

          {/* Language Selector with glass effect */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => switchLanguage('norwegian')}
              className={`px-6 py-3 rounded-full backdrop-blur-lg border transition-all duration-300 ${
                currentLanguage === 'norwegian' 
                  ? 'bg-gradient-to-r from-blue-500/80 to-blue-600/80 text-white border-blue-300/50 shadow-lg shadow-blue-500/25' 
                  : 'bg-white/40 text-slate-700 border-white/50 hover:bg-white/60 hover:shadow-lg'
              }`}
            >
              🇳🇴 Norsk
            </Button>
            <Button
              onClick={() => switchLanguage('ukrainian')}
              className={`px-6 py-3 rounded-full backdrop-blur-lg border transition-all duration-300 ${
                currentLanguage === 'ukrainian' 
                  ? 'bg-gradient-to-r from-yellow-500/80 to-blue-500/80 text-white border-yellow-300/50 shadow-lg shadow-yellow-500/25' 
                  : 'bg-white/40 text-slate-700 border-white/50 hover:bg-white/60 hover:shadow-lg'
              }`}
            >
              🇺🇦 Українська
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Current Playing Section */}
          <div className="space-y-6">
            <Card className="bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl">
              <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-emerald-400/20 to-blue-400/20 backdrop-blur-sm">
                  {getTypeIcon(currentDocument.type)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{currentDocument.title}</h3>
                  <p className="text-slate-600 opacity-80">{currentDocument.source}</p>
                </div>
              </div>

              {/* YouTube Embed or Message */}
              {currentAudio.youtubeUrl ? (
                <div className="mb-6">
                  <div className="relative overflow-hidden rounded-2xl border border-white/30 shadow-lg">
                    <iframe
                      width="100%"
                      height="220"
                      src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentAudio.youtubeUrl)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-2xl"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-8 bg-white/30 backdrop-blur-sm rounded-2xl text-center border border-white/40">
                  <div className="relative">
                    <Volume2 className="h-12 w-12 text-slate-400 mx-auto mb-3 opacity-60" />
                    <div className="absolute -top-2 -right-2 text-2xl">🌸</div>
                  </div>
                  <p className="text-slate-700 font-medium mb-2">
                    YouTube URL mangler for {currentLanguage === 'ukrainian' ? 'ukrainsk' : 'norsk'} versjon
                  </p>
                  <p className="text-slate-600 opacity-80">
                    Legg til YouTube-lenke for å spille av dette dokumentet
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-3 mb-6">
                <div className="relative">
                  <Slider
                    value={[progressPercentage]}
                    onValueChange={handleProgressChange}
                    max={100}
                    step={1}
                    className="w-full [&>span]:bg-gradient-to-r [&>span]:from-pink-400 [&>span]:to-orange-400 [&>span]:shadow-lg [&>span]:shadow-pink-500/25"
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-600 font-medium">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentAudio.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-6">
                <Button
                  onClick={previousTrack}
                  className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 text-slate-700 hover:bg-white/60 hover:shadow-lg transition-all duration-300"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  disabled={!currentAudio.youtubeUrl}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white rounded-full w-16 h-16 shadow-xl shadow-emerald-500/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7" />}
                </Button>
                
                <Button
                  onClick={nextTrack}
                  className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/30 text-slate-700 hover:bg-white/60 hover:shadow-lg transition-all duration-300"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Speed Control */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <span className="text-sm text-slate-600 font-medium">Hastighet:</span>
                <select 
                  value={speed} 
                  onChange={(e) => setSpeed(e.target.value)}
                  className="px-4 py-2 bg-white/50 backdrop-blur-sm border border-white/40 rounded-full text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
                >
                  <option value="0.5x">0.5x</option>
                  <option value="0.75x">0.75x</option>
                  <option value="1.0x">1.0x</option>
                  <option value="1.25x">1.25x</option>
                  <option value="1.5x">1.5x</option>
                  <option value="2.0x">2.0x</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Playlist Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span>🌸</span> Ditt lydbibliotek
            </h3>
            <div className="space-y-4">
              {documentsLibrary.map((doc, index) => (
                <Card 
                  key={doc.id}
                  className={`cursor-pointer transition-all duration-300 rounded-2xl border backdrop-blur-lg ${
                    currentTrack === index 
                      ? 'border-emerald-400/50 bg-gradient-to-r from-emerald-50/80 to-blue-50/80 shadow-lg shadow-emerald-500/10' 
                      : 'border-white/30 bg-white/30 hover:bg-white/50 hover:border-white/50 hover:shadow-lg'
                  }`}
                  onClick={() => selectTrack(index)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full backdrop-blur-sm ${
                        currentTrack === index 
                          ? 'bg-gradient-to-r from-emerald-400/30 to-blue-400/30' 
                          : 'bg-white/40'
                      }`}>
                        {getTypeIcon(doc.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800">{doc.title}</h4>
                        <p className="text-sm text-slate-600 opacity-80">{doc.source}</p>
                        <div className="flex gap-4 mt-2">
                          <span className="text-xs text-slate-600 bg-white/40 px-2 py-1 rounded-full">
                            🇳🇴 {doc.norwegian.duration}
                            {!doc.norwegian.youtubeUrl && ' (URL mangler)'}
                          </span>
                          <span className="text-xs text-slate-600 bg-white/40 px-2 py-1 rounded-full">
                            🇺🇦 {doc.ukrainian.duration}
                            {!doc.ukrainian.youtubeUrl && ' (URL mangler)'}
                          </span>
                        </div>
                      </div>
                      {currentTrack === index && isPlaying && (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-gradient-to-t from-emerald-400 to-pink-400 rounded-full animate-pulse"></div>
                          <div className="w-1 h-3 bg-gradient-to-t from-blue-400 to-orange-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                          <div className="w-1 h-5 bg-gradient-to-t from-purple-400 to-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions for adding URLs */}
        <div className="mt-8 p-6 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-2xl">🌻</span>
            <h4 className="font-bold text-slate-800">Legg til dine YouTube-lenker</h4>
          </div>
          <p className="text-slate-700 opacity-90">
            For å aktivere avspilling, legg til YouTube-lenker for hvert dokument i både norsk og ukrainsk versjon.
          </p>
        </div>
      </div>
    </div>
  );
};
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
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-[#defff0] to-[#7afcd0] p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-[#022f36] mb-2">
            Se hvordan "Elvarika" fungerer i praksis
          </h2>
          <p className="text-[#022f36] opacity-80">
            Bygg ditt personlige lydbibliotek fra enhver tekst. Hvert dokument er tilgjengelig på både ukrainsk og norsk.
          </p>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center gap-4 mb-6">
          <Button
            onClick={() => switchLanguage('norwegian')}
            variant={currentLanguage === 'norwegian' ? 'default' : 'outline'}
            className={currentLanguage === 'norwegian' ? 'bg-[#022f36] text-white' : 'border-[#022f36] text-[#022f36]'}
          >
            🇳🇴 Norsk
          </Button>
          <Button
            onClick={() => switchLanguage('ukrainian')}
            variant={currentLanguage === 'ukrainian' ? 'default' : 'outline'}
            className={currentLanguage === 'ukrainian' ? 'bg-[#022f36] text-white' : 'border-[#022f36] text-[#022f36]'}
          >
            🇺🇦 Українська
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Current Playing Section */}
        <div className="space-y-6">
          <Card className="border-[#defff0] border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                {getTypeIcon(currentDocument.type)}
                <div>
                  <h3 className="font-semibold text-[#022f36]">{currentDocument.title}</h3>
                  <p className="text-sm text-gray-600">{currentDocument.source}</p>
                </div>
              </div>

              {/* YouTube Embed or Message */}
              {currentAudio.youtubeUrl ? (
                <div className="mb-4">
                  <iframe
                    width="100%"
                    height="200"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentAudio.youtubeUrl)}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              ) : (
                <div className="mb-4 p-6 bg-gray-50 rounded-lg text-center">
                  <Volume2 className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">
                    YouTube URL mangler for {currentLanguage === 'ukrainian' ? 'ukrainsk' : 'norsk'} versjon
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Legg til YouTube-lenke for å spille av dette dokumentet
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              <div className="space-y-2">
                <Slider
                  value={[progressPercentage]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{formatTime(currentTime)}</span>
                  <span>{currentAudio.duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={previousTrack}
                  className="text-[#022f36]"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                
                <Button
                  onClick={togglePlayPause}
                  disabled={!currentAudio.youtubeUrl}
                  className="bg-[#022f36] hover:bg-[#033944] text-white rounded-full w-12 h-12"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextTrack}
                  className="text-[#022f36]"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>

              {/* Speed Control */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="text-sm text-gray-600">Hastighet:</span>
                <select 
                  value={speed} 
                  onChange={(e) => setSpeed(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded text-sm"
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
          <h3 className="text-xl font-semibold text-[#022f36] mb-4">Ditt lydbibliotek</h3>
          <div className="space-y-3">
            {documentsLibrary.map((doc, index) => (
              <Card 
                key={doc.id}
                className={`cursor-pointer transition-all ${
                  currentTrack === index 
                    ? 'border-[#7afcd0] bg-[#defff0]' 
                    : 'border-gray-200 hover:border-[#7afcd0]'
                }`}
                onClick={() => selectTrack(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(doc.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-[#022f36]">{doc.title}</h4>
                      <p className="text-sm text-gray-600">{doc.source}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-xs text-gray-500">
                          🇳🇴 {doc.norwegian.duration}
                          {!doc.norwegian.youtubeUrl && ' (URL mangler)'}
                        </span>
                        <span className="text-xs text-gray-500">
                          🇺🇦 {doc.ukrainian.duration}
                          {!doc.ukrainian.youtubeUrl && ' (URL mangler)'}
                        </span>
                      </div>
                    </div>
                    {currentTrack === index && isPlaying && (
                      <div className="w-2 h-2 bg-[#7afcd0] rounded-full animate-pulse"></div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Instructions for adding URLs */}
      <div className="bg-gray-50 p-6 border-t">
        <div className="text-center">
          <h4 className="font-semibold text-[#022f36] mb-2">Legg til dine YouTube-lenker</h4>
          <p className="text-sm text-gray-600">
            For å aktivere avspilling, legg til YouTube-lenker for hvert dokument i både norsk og ukrainsk versjon.
          </p>
        </div>
      </div>
    </div>
  );
};
import React, { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";
import { Translations } from "@/lib/translations";

interface PlaylistItem {
  id: string;
  title: string;
  source: string;
  duration: string;
  type: "pdf" | "article" | "email" | "document";
}

const createSamplePlaylist = (translations: Translations): PlaylistItem[] => [
  {
    id: "1",
    title: translations.playlist.items.analysis,
    source: translations.playlist.sources.pdf,
    duration: "12:34",
    type: "pdf"
  },
  {
    id: "2",
    title: translations.playlist.items.article,
    source: translations.playlist.sources.webArticle,
    duration: "8:45",
    type: "article"
  },
  {
    id: "3",
    title: translations.playlist.items.email,
    source: translations.playlist.sources.email,
    duration: "3:21",
    type: "email"
  },
  {
    id: "4",
    title: translations.playlist.items.chapter,
    source: translations.playlist.sources.textbook,
    duration: "15:12",
    type: "document"
  }
];

export const AudioPlayer: React.FC = () => {
  const { translations } = useLanguage();
  const samplePlaylist = createSamplePlaylist(translations);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(samplePlaylist[0]);
  const [progress, setProgress] = useState([25]);
  const [volume, setVolume] = useState([75]);
  const [playbackSpeed, setPlaybackSpeed] = useState("1.0");
  const [isDemo, setIsDemo] = useState(false);

  const handlePlay = () => {
    if (!isPlaying) {
      setIsDemo(true);
      setIsPlaying(true);
      // Simulate playback progress
      const interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev[0] + 2;
          if (newProgress >= 100) {
            setIsPlaying(false);
            setIsDemo(false);
            clearInterval(interval);
            return [0];
          }
          return [newProgress];
        });
      }, 200);
    } else {
      setIsPlaying(false);
      setIsDemo(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "article":
        return "📰";
      case "email":
        return "📧";
      case "document":
        return "📚";
      default:
        return "🎵";
    }
  };

  return (
    <div className="w-full max-w-[900px] mx-auto bg-white rounded-[20px] border border-[#e5e5e5] shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Spilleliste */}
        <div className="w-full md:w-1/2 p-6 border-r border-[#e5e5e5]">
          <h3 className="text-lg font-medium text-[#022f36] mb-4">{translations.audioPlayer.library}</h3>
          <div className="space-y-3">
            {samplePlaylist.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentTrack.id === item.id
                    ? "bg-[#defff0] border border-[#022f36]"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentTrack(item)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getTypeIcon(item.type)}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#022f36] text-sm truncate">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">{item.source}</p>
                  </div>
                  <span className="text-xs text-gray-500">{item.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Avspiller */}
        <div className="w-full md:w-1/2 p-6">
          <div className="space-y-6">
            {/* Nå spiller */}
            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">{translations.audioPlayer.nowPlaying}</h4>
              <h3 className="text-lg font-medium text-[#022f36] mb-1">
                {currentTrack.title}
              </h3>
              <p className="text-sm text-gray-600">{currentTrack.source}</p>
            </div>

            {/* Fremdriftslinje */}
            <div className="space-y-2">
              <Slider
                value={progress}
                onValueChange={setProgress}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>3:21</span>
                <span>{currentTrack.duration}</span>
              </div>
            </div>

            {/* Avspillerkontroller */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="sm">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`w-12 h-12 rounded-full transition-all ${
                  isDemo ? "bg-[#022f36] text-white border-[#022f36] animate-pulse" : ""
                }`}
                onClick={handlePlay}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="sm">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>

            {/* Avanserte kontroller */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16">{translations.audioPlayer.speed}</span>
                <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="0.75">0.75x</SelectItem>
                    <SelectItem value="1.0">1.0x</SelectItem>
                    <SelectItem value="1.25">1.25x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2.0">2.0x</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 w-16">{translations.audioPlayer.voice}</span>
                <Select defaultValue="ava">
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ava">Ava (Neural)</SelectItem>
                    <SelectItem value="erik">Erik (Neural)</SelectItem>
                    <SelectItem value="ingrid">Ingrid (Neural)</SelectItem>
                    <SelectItem value="kari">Kari (Neural)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3">
                <Volume2 className="h-4 w-4 text-gray-600" />
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
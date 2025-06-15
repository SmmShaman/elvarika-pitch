import React, { useState, useEffect } from "react";

// Dynamic images representing Elvarika concept
const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=400&fit=crop&crop=face",
    alt: "Person listening to audio content",
    caption: "Personal audio library"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=400&fit=crop",
    alt: "Modern workspace with documents",
    caption: "Transform any text"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=500&h=400&fit=crop&crop=face",
    alt: "Professional woman with headphones",
    caption: "Natural AI voices"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=400&fit=crop",
    alt: "Multiple languages concept",
    caption: "Multilingual support"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1553028826-f4804151e2bd?w=500&h=400&fit=crop",
    alt: "Audio waveforms visualization",
    caption: "High-quality audio"
  }
];

export const DynamicImageCarousel: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = heroImages[currentImageIndex];

  return (
    <div className="relative h-[376px] rounded-2xl overflow-hidden group">
      {/* Glass overlay with flower decorations */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-50/30 backdrop-blur-[1px] z-10">
        {/* Floating flower decorations */}
        <div className="absolute top-4 left-4 text-pink-400 opacity-60 text-xl animate-pulse">🌸</div>
        <div className="absolute top-8 right-6 text-yellow-400 opacity-50 text-lg animate-pulse" style={{animationDelay: '1s'}}>🌼</div>
        <div className="absolute bottom-8 left-6 text-purple-400 opacity-40 text-lg animate-pulse" style={{animationDelay: '2s'}}>🌺</div>
        <div className="absolute bottom-4 right-4 text-orange-400 opacity-55 text-xl animate-pulse" style={{animationDelay: '0.5s'}}>🌻</div>
      </div>

      {/* Main image */}
      <div className={`relative w-full h-full transition-all duration-500 ${isTransitioning ? 'scale-105 opacity-70' : 'scale-100 opacity-100'}`}>
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Caption */}
        <div className="absolute bottom-4 left-4 text-white z-20">
          <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-medium">{currentImage.caption}</span>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setIsTransitioning(false);
              }, 150);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentImageIndex === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-emerald-400/20 to-transparent rounded-br-full z-10"></div>
      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-blue-400/20 to-transparent rounded-tl-full z-10"></div>
    </div>
  );
};
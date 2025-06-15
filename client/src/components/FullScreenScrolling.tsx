import { useEffect, useState, useRef } from 'react';

interface FullScreenScrollingProps {
  children: React.ReactNode[];
  onSectionChange?: (index: number) => void;
}

export function FullScreenScrolling({ children, onSectionChange }: FullScreenScrollingProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  const scrollToSection = (index: number) => {
    if (isScrolling || index < 0 || index >= children.length) return;
    
    setIsScrolling(true);
    setCurrentSection(index);
    onSectionChange?.(index);
    
    if (containerRef.current) {
      containerRef.current.style.transform = `translateY(-${index * 100}vh)`;
    }
    
    setTimeout(() => setIsScrolling(false), 800);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling) return;

      if (e.deltaY > 0 && currentSection < children.length - 1) {
        scrollToSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        scrollToSection(currentSection - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          if (currentSection < children.length - 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(children.length - 1);
          break;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < children.length - 1) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, children.length, isScrolling]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        ref={containerRef}
        className="transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          height: `${children.length * 100}vh`,
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="h-screen w-full flex flex-col"
            style={{ minHeight: '100vh' }}
          >
            {child}
          </div>
        ))}
      </div>
      
      {/* Navigation dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {children.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSection
                ? 'bg-[#022f36] border-[#022f36] scale-125'
                : 'bg-transparent border-gray-400 hover:border-[#022f36]'
            }`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
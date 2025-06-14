import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-xl font-bold text-[#022f36]">
              Lydordbok i Lomma
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('demo')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              Demo
            </button>
            <button
              onClick={() => scrollToSection('teknologi')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              Teknologi
            </button>
            <button
              onClick={() => scrollToSection('marked')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              Marked
            </button>
            <button
              onClick={() => scrollToSection('konkurransefortrinn')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              Fortrinn
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              FAQ
            </button>
            <Button
              onClick={() => scrollToSection('investor')}
              className="bg-[#022f36] text-white hover:bg-[#033944]"
            >
              Investormulighet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('demo')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection('teknologi')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                Teknologi
              </button>
              <button
                onClick={() => scrollToSection('marked')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                Marked
              </button>
              <button
                onClick={() => scrollToSection('konkurransefortrinn')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                Fortrinn
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                FAQ
              </button>
              <Button
                onClick={() => scrollToSection('investor')}
                className="bg-[#022f36] text-white hover:bg-[#033944] w-fit"
              >
                Investormulighet
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
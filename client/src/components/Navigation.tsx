import React from "react";
import { Link } from "wouter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

export const Navigation: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const scrollToTop = () => {
    const element = document.querySelector('[data-section="0"]') || document.querySelector('section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={scrollToTop}
              className="text-xl font-bold text-[#022f36] hover:text-[#033944] transition-colors"
            >
              Elvarika
            </button>
          </div>

          {/* Language Switcher - Desktop */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
          </div>

          {/* Language Switcher - Mobile */}
          <div className="md:hidden">
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
          </div>
        </div>
      </div>
    </nav>
  );
};
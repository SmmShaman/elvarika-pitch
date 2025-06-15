import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { useBlog } from "@/hooks/useBlog";

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const { language, translations, changeLanguage } = useLanguage();
  const { openBlog } = useBlog();

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
              {translations.nav.logo}
            </div>
          </div>

          {/* Version Selector */}
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <Link href="/" className={`px-3 py-1 rounded-md transition-colors ${location === '/' ? 'bg-[#022f36] text-white' : 'text-[#022f36] hover:bg-gray-100'}`}>
              Investor
            </Link>
            <Link href="/business" className={`px-3 py-1 rounded-md transition-colors ${location === '/business' ? 'bg-[#022f36] text-white' : 'text-[#022f36] hover:bg-gray-100'}`}>
              Business
            </Link>
            <Link href="/pronunciation" className={`px-3 py-1 rounded-md transition-colors ${location === '/pronunciation' ? 'bg-[#022f36] text-white' : 'text-[#022f36] hover:bg-gray-100'}`}>
              Pronunciation
            </Link>
            <Link href="/gradient" className={`px-3 py-1 rounded-md transition-colors ${location === '/gradient' ? 'bg-[#022f36] text-white' : 'text-[#022f36] hover:bg-gray-100'}`}>
              Gradient
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('demo')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.demo}
            </button>
            <button
              onClick={() => scrollToSection('teknologi')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.technology}
            </button>
            <button
              onClick={() => scrollToSection('marked')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.market}
            </button>
            <button
              onClick={() => scrollToSection('konkurransefortrinn')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.advantages}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.faq}
            </button>
            <button
              onClick={openBlog}
              className="text-[#022f36] hover:text-[#033944] transition-colors"
            >
              {translations.nav.blog}
            </button>
            <Button
              onClick={() => scrollToSection('investor')}
              className="bg-[#022f36] text-white hover:bg-[#033944]"
            >
              {translations.nav.investor}
            </Button>
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
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
                {translations.nav.demo}
              </button>
              <button
                onClick={() => scrollToSection('teknologi')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                {translations.nav.technology}
              </button>
              <button
                onClick={() => scrollToSection('marked')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                {translations.nav.market}
              </button>
              <button
                onClick={() => scrollToSection('konkurransefortrinn')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                {translations.nav.advantages}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                {translations.nav.faq}
              </button>
              <button
                onClick={openBlog}
                className="text-left text-[#022f36] hover:text-[#033944] transition-colors"
              >
                {translations.nav.blog}
              </button>
              <Button
                onClick={() => scrollToSection('investor')}
                className="bg-[#022f36] text-white hover:bg-[#033944] w-fit"
              >
                {translations.nav.investor}
              </Button>
              <div className="pt-2">
                <LanguageSwitcher 
                  currentLanguage={language} 
                  onLanguageChange={changeLanguage} 
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
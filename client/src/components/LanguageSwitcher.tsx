import React from "react";
import { Button } from "@/components/ui/button";
import { Language } from "@/lib/translations";

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const languages = [
    { code: 'no' as Language, name: 'NO', flag: '🇳🇴' },
    { code: 'en' as Language, name: 'EN', flag: '🇺🇸' },
    { code: 'uk' as Language, name: 'UA', flag: '🇺🇦' }
  ];

  return (
    <div className="flex items-center gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "ghost"}
          size="sm"
          onClick={() => onLanguageChange(lang.code)}
          className={`h-8 px-3 transition-all ${
            currentLanguage === lang.code
              ? "bg-[#022f36] text-white"
              : "text-[#022f36] hover:bg-[#defff0]"
          }`}
        >
          <span className="mr-1">{lang.flag}</span>
          <span className="text-xs font-medium">{lang.name}</span>
        </Button>
      ))}
    </div>
  );
};
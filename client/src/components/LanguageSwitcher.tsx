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
        <div
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`cursor-pointer px-2 py-1 rounded transition-all ${
            currentLanguage === lang.code
              ? "bg-[#022f36] text-white"
              : "text-[#022f36] hover:bg-[#defff0]"
          }`}
        >
          <span className="text-lg">{lang.flag}</span>
        </div>
      ))}
    </div>
  );
};
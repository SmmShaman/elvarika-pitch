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
    </div>
  );
};
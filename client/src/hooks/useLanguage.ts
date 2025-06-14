import { useState, useEffect } from 'react';
import { Language, getTranslation, Translations } from '@/lib/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get language from localStorage or default to Norwegian
    const saved = localStorage.getItem('elvarika-language') as Language;
    return saved && ['no', 'en', 'uk'].includes(saved) ? saved : 'no';
  });

  const [translations, setTranslations] = useState<Translations>(() => 
    getTranslation(language)
  );

  useEffect(() => {
    // Update translations when language changes
    setTranslations(getTranslation(language));
    // Save to localStorage
    localStorage.setItem('elvarika-language', language);
  }, [language]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return {
    language,
    translations,
    changeLanguage
  };
};
import { useState, useEffect } from 'react';
import { Language, Translations } from '@/lib/translations';
import { languageStore } from '@/lib/languageStore';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(languageStore.getLanguage());
  const [translations, setTranslations] = useState<Translations>(languageStore.getTranslations());

  useEffect(() => {
    // Subscribe to language changes
    const unsubscribe = languageStore.subscribe((newLanguage, newTranslations) => {
      setLanguage(newLanguage);
      setTranslations(newTranslations);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    languageStore.changeLanguage(newLanguage);
  };

  return {
    language,
    translations,
    changeLanguage
  };
};
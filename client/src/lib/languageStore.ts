import { Language, getTranslation, Translations } from './translations';

type LanguageListener = (language: Language, translations: Translations) => void;

class LanguageStore {
  private language: Language;
  private translations: Translations;
  private listeners: LanguageListener[] = [];

  constructor() {
    // Get language from localStorage or default to Norwegian
    const saved = localStorage.getItem('elvarika-language') as Language;
    this.language = saved && ['no', 'en', 'uk'].includes(saved) ? saved : 'no';
    this.translations = getTranslation(this.language);
  }

  getLanguage(): Language {
    return this.language;
  }

  getTranslations(): Translations {
    return this.translations;
  }

  changeLanguage(newLanguage: Language) {
    if (this.language !== newLanguage) {
      this.language = newLanguage;
      this.translations = getTranslation(newLanguage);
      localStorage.setItem('elvarika-language', newLanguage);
      
      // Notify all listeners
      this.listeners.forEach(listener => {
        listener(this.language, this.translations);
      });
    }
  }

  subscribe(listener: LanguageListener): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

export const languageStore = new LanguageStore();
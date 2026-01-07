import { create } from 'zustand';
import { initializeLanguage, saveLanguage as saveLanguageToStorage } from '@/services/';
import { ui } from '@i18n/config';

type Language = 'es' | 'en' | 'pt' | 'fr' | 'it';
type TranslationKey = keyof typeof ui.es;

declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: Language;
  }
}

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

function getInitialLanguage(): Language {
  return 'es';
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: getInitialLanguage(),

  setLanguage: (language) => {
    set({ language });
    saveLanguageToStorage(language);
  },

  t: (key: TranslationKey) => {
    const { language } = get();
    return ui[language][key] || ui.es[key] || key;
  },
}));

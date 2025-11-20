import { create } from 'zustand';
import { initializeLanguage, saveLanguage as saveLanguageToStorage } from '@/services/';
import { ui } from '@i18n/config';

type Language = 'es' | 'en' | 'pt' | 'fr' | 'it';
type TranslationKey = keyof typeof ui.es;

// Extend Window interface to include our global variable
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

// Get initial language from global variable set in <head> or fall back to initialization
function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    return window.__INITIAL_LANGUAGE__ || initializeLanguage();
  }
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

// Initialize language on client with early-loaded value
if (typeof window !== 'undefined') {
  const language = getInitialLanguage();
  useLanguageStore.setState({ language });
}

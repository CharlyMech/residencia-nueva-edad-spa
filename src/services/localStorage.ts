type Language = 'es' | 'en' | 'pt' | 'fr' | 'it';

const STORAGE_KEY = 'language';

// ============ LANGUAGE ============ //

/**
 * Get the language saved in localStorage
 * @returns Language | null
 */
export function getStoredLanguage(): Language | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['es', 'en', 'pt', 'fr', 'it'].includes(stored)) {
      return stored as Language;
    }
    return null;
  } catch (error) {
    console.error('Error reading language from localStorage:', error);
    return null;
  }
}

/**
 * Saves the language to localStorage
 * @param language - Language to save
 */
export function saveLanguage(language: Language): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error('Error saving language to localStorage:', error);
  }
}

/**
 * Get the browser language
 * @returns Language
 */
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'es';

  const browserLang = navigator.language.split('-')[0];
  const supportedLangs: Language[] = ['es', 'en', 'pt', 'fr', 'it'];

  return supportedLangs.includes(browserLang as Language) ? (browserLang as Language) : 'es';
}

/**
 * Initialize the language
 * Priority: localStorage > browser > "es"
 * @returns Language applied
 */
export function initializeLanguage(): Language {
  const stored = getStoredLanguage();
  return stored || getBrowserLanguage();
}


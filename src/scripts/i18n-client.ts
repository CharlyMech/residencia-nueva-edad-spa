import { useTranslations } from '@/i18n/utils';

declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: 'es' | 'en' | 'pt' | 'fr' | 'it';
  }
}

export function initializeClientI18n() {
  const lang = window.__INITIAL_LANGUAGE__ || 'es';
  const t = useTranslations(lang);

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.getAttribute('data-i18n');
    if (key) {
      const translation = t(key as any);
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        (element as HTMLInputElement).placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  const langDisplays = document.querySelectorAll('[data-lang-display]');
  langDisplays.forEach((display) => {
    display.textContent = lang.toUpperCase();
  });

  document.documentElement.lang = lang;
  document.documentElement.classList.remove('loading-i18n');
  document.documentElement.classList.add('i18n-ready');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClientI18n);
} else {
  initializeClientI18n();
}

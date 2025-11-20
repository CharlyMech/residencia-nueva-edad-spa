/**
 * Client-side i18n handler for Astro components
 * This script updates all translatable content when the page loads
 * based on the language stored in localStorage
 */

import { useTranslations } from '@/i18n/utils';

// Extend Window interface to include our global variable
declare global {
  interface Window {
    __INITIAL_LANGUAGE__?: 'es' | 'en' | 'pt' | 'fr' | 'it';
  }
}

export function initializeClientI18n() {
  // Get current language from global variable set in <head>
  const lang = window.__INITIAL_LANGUAGE__ || 'es';
  const t = useTranslations(lang);

  // Update all elements with data-i18n attribute
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

  // Update language display in header
  const langDisplays = document.querySelectorAll('[data-lang-display]');
  langDisplays.forEach((display) => {
    display.textContent = lang.toUpperCase();
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Show content now that translations are applied
  document.documentElement.classList.remove('loading-i18n');
  document.documentElement.classList.add('i18n-ready');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClientI18n);
} else {
  initializeClientI18n();
}

import { ui, defaultLang } from "./config";
import { getStoredLanguage } from "@/services/localStorage";

/**
 * Get current language from localStorage
 * Returns default language if not found
 */
export function getCurrentLanguage(): keyof typeof ui {
	const stored = getStoredLanguage();
	return stored || defaultLang;
}

/**
 * Get translations for a specific language
 */
export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

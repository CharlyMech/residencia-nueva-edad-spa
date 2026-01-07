import { useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import { initializeLanguage } from '@/services/';

export default function LanguageSync() {
	useEffect(() => {
		const clientLang = window.__INITIAL_LANGUAGE__ || initializeLanguage();
		const currentLang = useLanguageStore.getState().language;

		if (clientLang !== 'es' && currentLang === 'es') {
			useLanguageStore.setState({ language: clientLang });
		}
	}, []);

	return null;
}

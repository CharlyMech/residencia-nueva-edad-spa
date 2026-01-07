import { useEffect } from 'react';

const GA_MEASUREMENT_ID = 'G-MEASUREMENT_ID'; // Placeholder

declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

export default function GoogleAnalytics() {
	useEffect(() => {
		// Function to load GA
		const loadGA = () => {
			// Avoid double loading
			if (document.getElementById('ga-script')) return;

			const script = document.createElement('script');
			script.id = 'ga-script';
			script.async = true;
			script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
			document.head.appendChild(script);

			window.dataLayer = window.dataLayer || [];
			function gtag(...args: any[]) {
				window.dataLayer.push(args);
			}
			window.gtag = gtag;
			gtag('js', new Date());
			gtag('config', GA_MEASUREMENT_ID);
		};

		// Check existing consent
		const consent = localStorage.getItem('site_cookies_accepted');
		if (consent === 'true') {
			loadGA();
		}

		// Listen for consent update
		const handleConsentUpdate = (event: CustomEvent) => {
			if (event.detail === 'granted') {
				loadGA();
			}
		};

		window.addEventListener('cookie-consent-updated', handleConsentUpdate as EventListener);

		return () => {
			window.removeEventListener('cookie-consent-updated', handleConsentUpdate as EventListener);
		};
	}, []);

	return null;
}

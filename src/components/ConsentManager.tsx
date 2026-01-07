import { useState, useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';
import { CookiePolicyModal, PrivacyPolicyModal } from './PolicyModals';

export default function ConsentManager() {
	const [isVisible, setIsVisible] = useState(false);
	const [showCookiePolicy, setShowCookiePolicy] = useState(false);
	const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
	const t = useLanguageStore((state) => state.t);

	useEffect(() => {
		const accepted = localStorage.getItem('site_cookies_accepted');
		if (accepted !== 'true' && accepted !== 'essential') {
			setIsVisible(true);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem('site_cookies_accepted', 'true');
		setIsVisible(false);
		window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: 'granted' }));
	};

	const acceptEssential = () => {
		localStorage.setItem('site_cookies_accepted', 'essential');
		setIsVisible(false);
		window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: 'denied' }));
	};

	if (!isVisible) return null;

	return (
		<>
			<div className="fixed z-[100] bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm transition-all duration-500 ease-in-out animate-slide-up">
				<div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl p-6 border border-neutral-100 dark:border-neutral-800 relative overflow-hidden">
					<div className="absolute -top-4 -right-4 text-8xl opacity-10 rotate-12 pointer-events-none select-none">
						🍪
					</div>

					<div className="relative z-10">
						<h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
							🍪 Cookies
						</h2>

						<p className="text-sm text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
							{t('cookies.description')}
						</p>

						<div className="flex flex-col gap-3">
							<button
								onClick={acceptCookies}
								className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 active:scale-[0.98] text-white font-medium rounded-xl transition-all shadow-md shadow-primary-600/20"
							>
								{t('cookies.accept')}
							</button>
							<button
								onClick={acceptEssential}
								className="w-full py-3 px-4 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-[0.98] text-neutral-700 dark:text-neutral-300 font-medium rounded-xl transition-all"
							>
								{t('cookies.essential')}
							</button>
						</div>

						<div className="mt-4 flex justify-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
							<button onClick={() => setShowPrivacyPolicy(true)} className="hover:underline">
								{t('cookies.privacy')}
							</button>
							<span>•</span>
							<button onClick={() => setShowCookiePolicy(true)} className="hover:underline">
								{t('cookies.policy')}
							</button>
						</div>
					</div>
				</div>
			</div>

			<CookiePolicyModal isOpen={showCookiePolicy} onClose={() => setShowCookiePolicy(false)} />
			<PrivacyPolicyModal isOpen={showPrivacyPolicy} onClose={() => setShowPrivacyPolicy(false)} />
		</>
	);
}

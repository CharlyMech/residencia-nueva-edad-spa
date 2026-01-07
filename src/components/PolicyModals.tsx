
import { useLanguageStore } from '@/stores/languageStore';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	content: React.ReactNode;
	closeText: string;
}

function Modal({ isOpen, onClose, title, content, closeText }: ModalProps) {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
			<div className="bg-white dark:bg-neutral-900 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
				<div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center">
					<h3 className="text-xl font-bold text-neutral-900 dark:text-white">{title}</h3>
					<button onClick={onClose} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
						✕
					</button>
				</div>
				<div className="p-6 overflow-y-auto custom-scrollbar text-neutral-600 dark:text-neutral-300 space-y-4">
					{content}
				</div>
				<div className="p-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-end">
					<button onClick={onClose} className="btn-primary px-6 py-2 rounded-lg text-white">
						{closeText}
					</button>
				</div>
			</div>
		</div>
	);
}

export function CookiePolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const t = useLanguageStore((state) => state.t);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t('policy.cookies.title')}
			closeText={t('common.close')}
			content={
				<div className="space-y-4 text-sm">
					<p>{t('policy.cookies.intro')}</p>
					<h4 className="font-bold text-neutral-800 dark:text-white">{t('policy.cookies.what.title')}</h4>
					<p>{t('policy.cookies.what.desc')}</p>
					<h4 className="font-bold text-neutral-800 dark:text-white">{t('policy.cookies.how.title')}</h4>
					<p>{t('policy.cookies.how.desc')}</p>
					<ul className="list-disc pl-5 space-y-2">
						<li>{t('policy.cookies.essential')}</li>
						<li>{t('policy.cookies.analytics')}</li>
					</ul>
				</div>
			}
		/>
	);
}

export function PrivacyPolicyModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const t = useLanguageStore((state) => state.t);

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title={t('policy.privacy.title')}
			closeText={t('common.close')}
			content={
				<div className="space-y-4 text-sm">
					<p>{t('policy.privacy.intro')}</p>
					<h4 className="font-bold text-neutral-800 dark:text-white">{t('policy.privacy.data.title')}</h4>
					<p>{t('policy.privacy.data.desc')}</p>
					<h4 className="font-bold text-neutral-800 dark:text-white">{t('policy.privacy.usage.title')}</h4>
					<p>{t('policy.privacy.usage.desc')}</p>
					<h4 className="font-bold text-neutral-800 dark:text-white">{t('policy.privacy.rights.title')}</h4>
					<p>{t('policy.privacy.rights.desc')}</p>
				</div>
			}
		/>
	);
}

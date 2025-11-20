import { useState } from 'react';
import { useLanguageStore } from '@/stores/languageStore';

interface AccordionItem {
	id: string;
	title: string;
	content: string;
}

interface AccordionProps {
	items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
	const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
	const { t } = useLanguageStore();

	const toggleItem = (id: string) => {
		setOpenId(openId === id ? null : id);
	};

	return (
		<div className="space-y-4">
			{items.map((item) => (
				<div
					key={item.id}
					className="card overflow-hidden"
				>
					<button
						onClick={() => toggleItem(item.id)}
						className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
					>
						<h3 className="text-lg md:text-xl font-semibold text-neutral-800 dark:text-text-900">
							{t(item.title as any)}
						</h3>
						<svg
							className={`w-6 h-6 text-primary-500 transition-transform duration-300 ${openId === item.id ? 'rotate-180' : ''
								}`}
							fill="none"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path d="M19 9l-7 7-7-7" />
						</svg>
					</button>
					<div
						className={`transition-all duration-300 ease-in-out ${openId === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
							} overflow-hidden`}
					>
						<div className="px-6 pb-6 text-neutral-600 dark:text-neutral-300">
							{t(item.content as any)}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
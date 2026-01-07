import { useState } from 'react';
import { ContactFormSchema, type ContactForm } from '@/types/';
import { useLanguageStore } from '@/stores/languageStore';

export default function ContactFormComponent() {
	const t = useLanguageStore((state) => state.t);
	const [formData, setFormData] = useState<ContactForm>({
		name: '',
		email: '',
		phone: '',
		message: '',
	});
	const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

	const maxMessageLength = 500;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		// Limit message length
		if (name === 'message' && value.length > maxMessageLength) {
			return;
		}
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error for this field
		if (errors[name as keyof ContactForm]) {
			setErrors((prev) => ({ ...prev, [name]: undefined }));
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setErrors({});

		// Validate form
		const result = ContactFormSchema.safeParse(formData);
		if (!result.success) {
			const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
			result.error.issues.forEach((issue) => {
				if (issue.path[0]) {
					fieldErrors[issue.path[0] as keyof ContactForm] = issue.message;
				}
			});
			setErrors(fieldErrors);
			setIsSubmitting(false);
			return;
		}

		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			setSubmitStatus('success');
			setFormData({ name: '', email: '', phone: '', message: '' });
			setTimeout(() => setSubmitStatus('idle'), 3000);
		} catch (error) {
			setSubmitStatus('error');
			setTimeout(() => setSubmitStatus('idle'), 3000);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Honeypot field - hidden from users */}
			<div className="hidden" aria-hidden="true">
				<input
					type="text"
					name="_confirm"
					tabIndex={-1}
					autoComplete="off"
					onChange={(e) => setFormData((prev: any) => ({ ...prev, _confirm: e.target.value }))}
				/>
			</div>

			<div>
				<label htmlFor="name" className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
					{t('contact.name')}
				</label>
				<input
					id="name"
					type="text"
					name="name"
					placeholder={t('contact.name')}
					value={formData.name}
					onChange={handleChange}
					className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 ${errors.name ? 'border-red-500' : 'border-transparent'
						} focus:border-primary-500 focus:outline-none transition-colors`}
				/>
				{errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
			</div>

			<div>
				<label htmlFor="email" className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
					{t('contact.email')}
				</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder={t('contact.email')}
					value={formData.email}
					onChange={handleChange}
					className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 ${errors.email ? 'border-red-500' : 'border-transparent'
						} focus:border-primary-500 focus:outline-none transition-colors`}
				/>
				{errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
			</div>

			<div>
				<label htmlFor="phone" className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
					{t('contact.phone.label')}
				</label>
				<input
					id="phone"
					type="tel"
					name="phone"
					placeholder={t('contact.phone')}
					value={formData.phone}
					onChange={handleChange}
					className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 ${errors.phone ? 'border-red-500' : 'border-transparent'
						} focus:border-primary-500 focus:outline-none transition-colors`}
				/>
				{errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
			</div>

			<div>
				<label htmlFor="message" className="mb-2 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
					{t('contact.message')}
				</label>
				<textarea
					id="message"
					name="message"
					placeholder={t('contact.message')}
					rows={5}
					value={formData.message}
					onChange={handleChange}
					maxLength={maxMessageLength}
					className={`w-full px-4 py-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border-2 ${errors.message ? 'border-red-500' : 'border-transparent'
						} focus:border-primary-500 focus:outline-none transition-colors resize-none`}
				/>
				<div className="mt-1 flex items-center justify-between">
					<div>
						{errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
					</div>
					<p className={`text-xs ${formData.message.length >= maxMessageLength ? 'text-red-500 font-semibold' : 'text-neutral-500 dark:text-neutral-400'}`}>
						{formData.message.length}/{maxMessageLength}
					</p>
				</div>
			</div>

			<button
				type="submit"
				disabled={isSubmitting}
				className="w-full btn-primary text-text-50 disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isSubmitting ? t('contact.sending') : t('contact.submit')}
			</button>

			{submitStatus === 'success' && (
				<p className="text-center text-secondary-600 dark:text-secondary-400">
					{t('contact.success')}
				</p>
			)}
			{submitStatus === 'error' && (
				<p className="text-center text-red-500">
					{t('contact.error')}
				</p>
			)}
		</form>
	);
}

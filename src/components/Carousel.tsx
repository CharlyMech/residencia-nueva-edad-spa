import { useState, useEffect, useCallback } from 'react';
import { useDataStore } from '@/stores/dataStore';
import { useLanguageStore } from '@/stores/languageStore';

interface CarouselItem {
	id: string;
	content: React.ReactNode;
}

interface CarouselProps {
	autoPlay?: boolean;
	interval?: number;
}

export default function Carousel({ autoPlay = true, interval = 5000 }: CarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { testimonials, isLoading, error, loadTestimonials } = useDataStore();
	const { t } = useLanguageStore();

	// Load testimonials on mount
	useEffect(() => {
		loadTestimonials();
	}, [loadTestimonials]);

	// Convert testimonials to carousel items with translations
	const items: CarouselItem[] = testimonials.map((testimonial) => ({
		id: testimonial.id,
		content: (
			<div className="bg-white dark:bg-neutral-800 p-8 md:p-12 rounded-2xl shadow-lg min-h-[300px] flex flex-col justify-center">
				<div className="flex flex-col md:flex-row gap-6 items-center">
					<img
						src={testimonial.image}
						alt={t(testimonial.name as any)}
						className="w-24 h-24 rounded-full object-cover shadow-md"
					/>
					<div className="flex-1 text-center md:text-left">
						<p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 mb-4 italic">
							"{t(testimonial.content as any)}"
						</p>
						<div>
							<p className="font-semibold text-neutral-900 dark:text-text-900">
								{t(testimonial.name as any)}
							</p>
							<p className="text-sm text-neutral-600 dark:text-neutral-400">
								{t(testimonial.role as any)} • {testimonial.year}
							</p>
						</div>
					</div>
				</div>
			</div>
		),
	}));

	const goToNext = useCallback(() => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
	}, [items.length]);

	const goToSlide = (index: number) => {
		setCurrentIndex(index);
	};

	// Reset autoplay timer when user manually changes slides
	useEffect(() => {
		if (!autoPlay || items.length === 0) return;

		const timer = setInterval(goToNext, interval);
		return () => clearInterval(timer);
	}, [autoPlay, interval, goToNext, currentIndex]);

	// Show loading state
	if (isLoading) {
		return (
			<div className="relative w-full min-h-[300px] flex items-center justify-center">
				<div className="text-center">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
					<p className="text-neutral-600 dark:text-neutral-400">Loading testimonials...</p>
				</div>
			</div>
		);
	}

	// Show error state
	if (error) {
		return (
			<div className="relative w-full min-h-[300px] flex items-center justify-center">
				<div className="text-center bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl">
					<p className="text-red-600 dark:text-red-400">Failed to load testimonials</p>
					<p className="text-sm text-red-500 dark:text-red-300 mt-2">{error}</p>
				</div>
			</div>
		);
	}

	// Show empty state
	if (items.length === 0) {
		return (
			<div className="relative w-full min-h-[300px] flex items-center justify-center">
				<p className="text-neutral-600 dark:text-neutral-400">No testimonials available</p>
			</div>
		);
	}

	return (
		<div className="relative w-full min-h-[300px]">
			{/* Slides */}
			<div className="relative w-full">
				{items.map((item, index) => (
					<div
						key={item.id}
						className={`absolute inset-0 transition-all duration-500 ease-in-out ${index === currentIndex
								? 'opacity-100 translate-x-0 z-10'
								: index < currentIndex
									? 'opacity-0 -translate-x-full z-0'
									: 'opacity-0 translate-x-full z-0'
							}`}
					>
						{item.content}
					</div>
				))}
			</div>

			{/* Dots Indicator */}
			{items.length > 1 && (
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
					{items.map((_, index) => (
						<button
							key={index}
							onClick={() => goToSlide(index)}
							className={`h-3 rounded-full transition-all ${index === currentIndex
									? 'bg-primary-500 w-8'
									: 'bg-neutral-400 dark:bg-neutral-500 w-3 hover:bg-neutral-500 dark:hover:bg-neutral-400'
								}`}
							aria-label={`Go to slide ${index + 1}`}
						/>
					))}
				</div>
			)}
		</div>
	);
}
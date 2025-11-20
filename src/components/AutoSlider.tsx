import React, { useState, useEffect } from 'react';
import { useLanguageStore } from '@/stores/languageStore';

interface SlideData {
	imageUrl: string;
	title: string;
	description: string;
}

interface SliderCardProps {
	slide: SlideData;
	isActive: boolean;
	onClick: () => void;
	direction: 'horizontal' | 'vertical';
}

interface AutoSliderProps {
	slides: SlideData[];
	autoRotateInterval?: number;
	direction?: 'horizontal' | 'vertical' | 'auto';
	className?: string;
}

const SliderCard: React.FC<SliderCardProps> = ({ slide, isActive, onClick, direction }) => {
	const isHorizontal = direction === 'horizontal';
	const { t } = useLanguageStore();

	return (
		<div
			className={`
        relative rounded-2xl md:rounded-3xl bg-cover bg-center cursor-pointer overflow-hidden
        transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] flex-shrink-0
        ${isHorizontal
					? isActive
						? 'w-[calc(100%-200px)] sm:w-[calc(100%-240px)] md:w-[calc(100%-340px)]'
						: 'w-[50px] sm:w-[60px] md:w-[80px] hover:-translate-y-1'
					: isActive
						? 'h-[calc(100%-200px)] sm:h-[calc(100%-240px)]'
						: 'h-[50px] sm:h-[60px] hover:-translate-x-1'
				}
        ${isActive ? '' : 'hover:shadow-large'}
      `}
			onClick={onClick}
			style={{ backgroundImage: `url(${slide.imageUrl})` }}
		>
			{/* Gradient overlay */}
			<div
				className={`
          absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/70
          transition-opacity duration-500
          ${isActive ? 'opacity-100' : 'opacity-60'}
        `}
			/>

			{/* Content - only visible when active */}
			{isActive && (
				<div className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-8 animate-slide-up">
					<div className="text-text-50 w-full">
						<h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">
							{t(slide.title as any)}
						</h3>
						<p className="text-sm sm:text-base opacity-95 leading-relaxed drop-shadow-md">
							{t(slide.description as any)}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

const AutoSlider: React.FC<AutoSliderProps> = ({
	slides,
	autoRotateInterval = 5000,
	direction = 'auto',
	className = ''
}) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(false);

	// Determine actual direction based on prop and screen size
	const actualDirection =
		direction === 'auto' ? (isMobile ? 'vertical' : 'horizontal') : direction;

	// Detect mobile viewport
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Auto-rotate
	useEffect(() => {
		const interval = setInterval(() => {
			setActiveIndex((current) => (current + 1) % slides.length);
		}, autoRotateInterval);

		return () => clearInterval(interval);
	}, [slides.length, autoRotateInterval]);

	const handleCardClick = (index: number) => {
		setActiveIndex(index);
	};

	const isHorizontal = actualDirection === 'horizontal';

	return (
		<div className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 ${className}`}>
			<div
				className={`
          flex gap-2 sm:gap-3 md:gap-4 overflow-hidden
          ${isHorizontal ? 'flex-row h-[280px] sm:h-[350px] md:h-[450px]' : 'flex-col w-full h-[500px] sm:h-[600px]'}
        `}
			>
				{slides.map((slide, index) => (
					<SliderCard
						key={index}
						slide={slide}
						isActive={index === activeIndex}
						onClick={() => handleCardClick(index)}
						direction={actualDirection}
					/>
				))}
			</div>
		</div>
	);
};

export default AutoSlider;
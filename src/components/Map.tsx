import { useEffect, useState } from 'react';

interface MapProps {
	latitude: number;
	longitude: number;
	zoom?: number;
	markerTitle?: string;
}

export default function Map({
	latitude,
	longitude,
	markerTitle = 'Location'
}: MapProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return (
			<div className="flex h-full min-h-[400px] items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
				<div className="text-neutral-600 dark:text-neutral-400">Loading map...</div>
			</div>
		);
	}

	const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2984.336673472854!2d-4.569835523123056!3d41.58359878380035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd471756cbc12c55%3A0xdec4b3a9d20d392!2sResidencia%20Nueva%20Edad!5e0!3m2!1sen!2ses!4v1766578113775!5m2!1sen!2ses";
	const googleMapsLink = "https://maps.app.goo.gl/CdQWrLYeJrTqsXbWA";

	return (
		<div className="relative h-full min-h-[400px] overflow-hidden rounded-lg shadow-md group">
			<iframe
				title={markerTitle}
				src={googleMapsEmbedUrl}
				className="h-full w-full border-0"
				style={{ minHeight: '400px' }}
				loading="lazy"
				allowFullScreen
				referrerPolicy="no-referrer-when-downgrade"
			/>

			<a
				href={googleMapsLink}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute bottom-4 right-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 opacity-90 hover:opacity-100"
			>
				Ver en Google Maps
			</a>
		</div>
	);
}
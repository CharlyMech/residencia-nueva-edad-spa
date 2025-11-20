// components/Map.tsx
import { useEffect, useRef, useState } from 'react';

interface MapProps {
	latitude: number;
	longitude: number;
	zoom?: number;
	markerTitle?: string;
}

/**
 * Simple map component using OpenStreetMap tiles
 * No external dependencies required - uses native browser APIs
 */
export default function Map({
	latitude,
	longitude,
	zoom = 15,
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

	// Generate OpenStreetMap URL
	const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

	// Generate Google Maps fallback URL
	const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

	return (
		<div className="relative h-full min-h-[400px] overflow-hidden rounded-lg shadow-md">
			{/* OpenStreetMap Embed */}
			<iframe
				title={markerTitle}
				src={osmUrl}
				className="h-full w-full border-0"
				style={{ minHeight: '400px' }}
				loading="lazy"
				allowFullScreen
			/>

			{/* Link to open in external map */}
			<a
				href={googleMapsUrl}
				target="_blank"
				rel="noopener noreferrer"
				className="absolute bottom-4 right-4 rounded-lg bg-white px-4 py-2 text-sm font-medium text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
			>
				View on Google Maps
			</a>
		</div>
	);
}
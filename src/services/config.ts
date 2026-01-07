// services/config.ts
export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  whatsapp?: string;
  address: string;
  phone: string;
  email: string;
  social?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  map: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

/**
 * Loads site configuration from environment variables
 * Provides fallback values for development
 */
export function getConfig(): SiteConfig {
  const config: SiteConfig = {
    siteName: import.meta.env.PUBLIC_SITE_NAME || 'Residencia Nueva Edad - Valdestillas',
    siteDescription: import.meta.env.PUBLIC_SITE_DESCRIPTION || 'Residencia de ancianos en Valdestillas, Valladolid. Cuidado integral, cariño y actividades para que te sientas como en casa.',
    whatsapp: import.meta.env.PUBLIC_WHATSAPP || undefined,
    address: import.meta.env.PUBLIC_ADDRESS || 'Calle Real 1, Valdestillas, Valladolid',
    phone: import.meta.env.PUBLIC_PHONE || '+34 983 00 00 00',
    email: import.meta.env.PUBLIC_EMAIL || 'info@residencianuevaedad.com',
    social: {
      facebook: import.meta.env.PUBLIC_FACEBOOK_URL,
      instagram: import.meta.env.PUBLIC_INSTAGRAM_URL,
      twitter: import.meta.env.PUBLIC_TWITTER_URL,
    },
    map: {
      latitude: parseFloat(import.meta.env.PUBLIC_MAP_LATITUDE || '41.58359878380035'),
      longitude: parseFloat(import.meta.env.PUBLIC_MAP_LONGITUDE || '-4.569835523123056'),
      zoom: parseInt(import.meta.env.PUBLIC_MAP_ZOOM || '15', 10),
    },
  };

  // Filter out undefined social media links
  config.social = config.social ? Object.fromEntries(
    Object.entries(config.social).filter(([_, value]) => value !== undefined)
  ) as SiteConfig['social'] : undefined;

  return config;
}

/**
 * Validates that required environment variables are present
 * Throws errors in production, logs warnings in development
 */
export function validateConfig(): void {
  const required = [
    'PUBLIC_SITE_NAME',
    'PUBLIC_SITE_DESCRIPTION',
    'PUBLIC_WHATSAPP',
    'PUBLIC_ADDRESS',
    'PUBLIC_PHONE',
    'PUBLIC_EMAIL',
    'PUBLIC_MAP_LATITUDE',
    'PUBLIC_MAP_LONGITUDE',
  ];

  const missing = required.filter((key) => !import.meta.env[key]);

  if (missing.length > 0) {
    const message = `Missing required environment variables: ${missing.join(', ')}`;

    if (import.meta.env.PROD) {
      throw new Error(message);
    } else {
      console.warn(`⚠️ ${message}. Using fallback values.`);
    }
  }
}

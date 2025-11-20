// services/config.ts
export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  whatsapp: string;
  address: string;
  phone: string;
  email: string;
  social: {
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
    siteName: import.meta.env.PUBLIC_SITE_NAME || 'Residence',
    siteDescription: import.meta.env.PUBLIC_SITE_DESCRIPTION || 'Senior living community',
    whatsapp: import.meta.env.PUBLIC_WHATSAPP || '+1234567890',
    address: import.meta.env.PUBLIC_ADDRESS || '123 Main Street, City, State',
    phone: import.meta.env.PUBLIC_PHONE || '+1 (555) 123-4567',
    email: import.meta.env.PUBLIC_EMAIL || 'info@residence.com',
    social: {
      facebook: import.meta.env.PUBLIC_FACEBOOK_URL,
      instagram: import.meta.env.PUBLIC_INSTAGRAM_URL,
      twitter: import.meta.env.PUBLIC_TWITTER_URL,
    },
    map: {
      latitude: parseFloat(import.meta.env.PUBLIC_MAP_LATITUDE || '40.7128'),
      longitude: parseFloat(import.meta.env.PUBLIC_MAP_LONGITUDE || '-74.0060'),
      zoom: parseInt(import.meta.env.PUBLIC_MAP_ZOOM || '15', 10),
    },
  };

  // Filter out undefined social media links
  config.social = Object.fromEntries(
    Object.entries(config.social).filter(([_, value]) => value !== undefined)
  ) as SiteConfig['social'];

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

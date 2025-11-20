// env.d.ts
/// <reference types="astro/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface ImportMetaEnv {
  // Site Configuration
  readonly PUBLIC_SITE_NAME: string;
  readonly PUBLIC_SITE_DESCRIPTION: string;

  // Contact Information
  readonly PUBLIC_WHATSAPP: string;
  readonly PUBLIC_ADDRESS: string;
  readonly PUBLIC_PHONE: string;
  readonly PUBLIC_EMAIL: string;

  // Social Media Links
  readonly PUBLIC_FACEBOOK_URL?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_TWITTER_URL?: string;

  // Map Configuration
  readonly PUBLIC_MAP_LATITUDE: string;
  readonly PUBLIC_MAP_LONGITUDE: string;
  readonly PUBLIC_MAP_ZOOM?: string;

  // Google Sheets Integration (optional)
  readonly PUBLIC_GOOGLE_TESTIMONIALS?: string;
  readonly PUBLIC_GOOGLE_CONFIG?: string;

  // Astro defaults
  readonly MODE: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

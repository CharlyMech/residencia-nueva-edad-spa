import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  // Real domain: https://www.residenciasnuevaedadvaldestillas.com/
  site: 'https://residencia-nueva-edad-spa.vercel.app/',

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],

  output: 'static',

  build: {
    inlineStylesheets: 'auto',
  },

  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  adapter: vercel(),
});
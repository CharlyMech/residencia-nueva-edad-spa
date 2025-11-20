import { fetchTestimonials } from './testimonials';

export { fetchTestimonials };

export {
  getStoredLanguage,
  saveLanguage,
  getBrowserLanguage,
  initializeLanguage,
} from './localStorage';

export { getConfig, validateConfig } from './config';
export type { SiteConfig } from './config';

export const testimonialsService = { getAll: fetchTestimonials };

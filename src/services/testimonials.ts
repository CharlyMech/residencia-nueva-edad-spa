import { TestimonialSchema, type Testimonial } from '../types/testimonial';

/**
 * Datos mock de testimoniales
 * Se usan cuando no hay URL de API configurada
 * Los valores de name, role y content son ahora claves de traducción
 */
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'testimonials.margaret.name',
    role: 'testimonials.margaret.role',
    year: '2021',
    content: 'testimonials.margaret.content',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
  },
  {
    id: '2',
    name: 'testimonials.john.name',
    role: 'testimonials.john.role',
    year: '2022',
    content: 'testimonials.john.content',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
  },
  {
    id: '3',
    name: 'testimonials.david.name',
    role: 'testimonials.david.role',
    year: '2022',
    content: 'testimonials.david.content',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
  },
  {
    id: '4',
    name: 'testimonials.emily.name',
    role: 'testimonials.emily.role',
    year: '2023',
    content: 'testimonials.emily.content',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  },
];

/**
 * Gets testimonials from external API or mock data
 *
 * @returns Promise<Testimonial[]> List of validated testimonials
 *
 * Flow:
 * 1. If PUBLIC_GOOGLE_TESTIMONIALS exists, fetch from API
 * 2. If it fails or doesn't exist, return mock data
 * 3. Validate all data with TestimonialSchema before returning
 */
export async function fetchTestimonials(): Promise<Testimonial[]> {
  const apiUrl = import.meta.env.PUBLIC_GOOGLE_TESTIMONIALS;

  // If no API URL is configured, use mock data
  if (!apiUrl) {
    console.info('📝 Using mock testimonials data (no API URL configured)');
    return MOCK_TESTIMONIALS;
  }

  try {
    console.info('🌐 Fetching testimonials from:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Validate each testimonial
    const validated = data
      .map((item: unknown) => {
        try {
          return TestimonialSchema.parse(item);
        } catch (error) {
          console.error('❌ Invalid testimonial data:', item, error);
          return null;
        }
      })
      .filter((item: any): item is Testimonial => item !== null);

    console.info(`✅ Loaded ${validated.length} testimonials from API`);
    return validated;
  } catch (error) {
    console.error('❌ Error fetching testimonials, using mock data:', error);
    return MOCK_TESTIMONIALS;
  }
}

/**
 * Gets testimonials synchronously
 * Useful for store initialization
 */
// export function getTestimonialsMock(): Testimonial[] {
//   return MOCK_TESTIMONIALS;
// }

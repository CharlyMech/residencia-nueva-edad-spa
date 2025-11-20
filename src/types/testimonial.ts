import { z } from 'zod';

/**
 * Testimonial validation schema
 * Used to validate data from external APIs or Google Sheets
 */
export const TestimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  year: z.string(),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  image: z.string().url('Invalid image URL'),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

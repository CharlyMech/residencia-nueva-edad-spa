import { z } from 'zod';

/**
 * Contact form validation schema
 */
export const ContactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export type ContactForm = z.infer<typeof ContactFormSchema>;

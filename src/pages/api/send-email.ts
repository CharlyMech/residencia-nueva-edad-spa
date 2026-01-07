import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { z } from 'zod';

export const prerender = false; // This is a server-side endpoint

// Initialize Resend with API key (should be in env vars)
// Ideally: const resend = new Resend(import.meta.env.RESEND_API_KEY);
// For now we will check if the key exists, otherwise log error.
const resendApiKey = import.meta.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Validation Schema
const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  message: z.string().min(10),
  // Honeypot field (should be empty)
  _confirm: z.string().max(0).optional(),
});

export const POST: APIRoute = async ({ request }) => {
  if (!resend) {
    console.error('RESEND_API_KEY is missing');
    return new Response(JSON.stringify({ message: 'Server configuration error' }), { status: 500 });
  }

  try {
    const data = await request.json();

    // 1. Honeypot check
    // If _confirm has value, it's a bot
    if (data._confirm) {
      // Return success to confuse the bot, but do nothing
      return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
    }

    // 2. Validate data
    const result = schema.safeParse(data);
    
    if (!result.success) {
      return new Response(JSON.stringify({ errors: result.error.flatten() }), { status: 400 });
    }

    const { name, email, phone, message } = result.data;

    // 3. Send email
    // To the residence owner
    await resend.emails.send({
      from: 'Residencia Contact <onboarding@resend.dev>', // Or verified domain
      to: ['carlos@tudela.com', 'info@residencianuevaedad.es'], // Placeholder, ideally from config/env
      subject: `Nuevo mensaje de contacto: ${name}`,
      html: `
        <h1>Nuevo mensaje de la web</h1>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
};

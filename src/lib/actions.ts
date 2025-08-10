'use server';

import { z } from 'zod';
import { addAppointment } from './appointment-data';
import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';

// --- APPOINTMENT ACTIONS ---

const appointmentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  date: z.string().min(1, { message: 'Please select a date.' }),
  message: z.string().optional(),
});

export async function bookAppointment(state: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    service: formData.get('service'),
    date: formData.get('date'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
    };
  }

  try {
    await addAppointment(validatedFields.data);
    return { type: 'success', message: 'Appointment booked successfully! We will be in touch soon.' };
  } catch (e) {
    return { type: 'error', message: 'Something went wrong. Please try again.' };
  }
}

// --- CONTACT FORM ACTION ---

const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
  
// src/lib/actions.ts (or whatever your actions file is named)

// Make sure you have the 'use server' directive if this file is a Server Action directly.
// If it's imported into a file that has 'use server', this isn't strictly necessary here,
// but it's good practice for clarity.
// 'use server';

// Define the shape of the form state for type safety with useActionState
// This interface should match what your ContactPage.tsx component expects from the action.
export interface FormState {
    type: 'idle' | 'success' | 'error';
    message: string;
    errors?: { // Optional 'errors' object for validation feedback specific to fields
        name?: string[];
        email?: string[];
        subject?: string[];
        message?: string[];
    };
}

// Access environment variables directly within the server action.
// These variables are loaded from your .env.local file during development
// or from your hosting provider's environment settings in production.
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Helper function for basic email validation
function isValidEmail(email: string): boolean {
    // A simple regex for basic email format validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Server Action to handle contact form submissions.
 * It performs server-side validation and sends the message to a Telegram bot.
 *
 * @param {FormState} prevState - The previous state of the form (provided by useActionState).
 * @param {FormData} formData - The form data submitted from the client.
 * @returns {Promise<FormState>} - The new state of the form after processing.
 */
export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
    // --- Server-Side Input Validation ---
    // Extract data from FormData object. Type casting to string is safe here.
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string; // Capturing the subject field
    const message = formData.get('message') as string;

    const errors: FormState['errors'] = {}; // Initialize an empty object to collect validation errors

    // Perform validation checks for each field
    if (!name || name.trim().length < 2) {
        errors.name = ['Full Name is required and must be at least 2 characters.'];
    }
    if (!email || !isValidEmail(email)) {
        errors.email = ['A valid email address is required.'];
    }
    if (!subject || subject.trim().length < 5) { // Assuming subject needs at least 5 characters
        errors.subject = ['Subject is required and must be at least 5 characters.'];
    }
    if (!message || message.trim().length < 10) { // Assuming message needs at least 10 characters
        errors.message = ['Message is required and must be at least 10 characters.'];
    }

    // If any validation errors exist, return an error state with the specific field errors
    if (Object.keys(errors).length > 0) {
        return {
            type: 'error',
            message: 'Please correct the errors in the form.',
            errors, // Return the detailed errors for client-side display
        };
    }

    // --- Telegram Integration Logic ---
    // Critical check: Ensure Telegram API credentials are properly loaded from environment variables.
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        // Log an error on the server for debugging purposes. This won't be visible to the user.
        console.error("SERVER ACTION ERROR: Telegram API credentials (TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID) are NOT SET.");
        console.error("Please ensure you have created a '.env.local' file in your project root with these variables, and have RESTARTED your Next.js development server.");
        return {
            type: 'error',
            message: 'Server configuration error. Please try again later.', // User-friendly message
        };
    }

    try {
        // Construct the message string to be sent to Telegram.
        // Using MarkdownV2 for formatting (bold, italics, newlines).
        // Be mindful of MarkdownV2 special characters in user input if not sanitized.
        
        // Helper function to escape MarkdownV2 special characters
        const escapeMarkdownV2 = (text: string) => {
            return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
        };

        const telegram_message = `
*New Contact Form Submission:*
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
*Name:* ${escapeMarkdownV2(name)}
*Email:* ${escapeMarkdownV2(email)}
*Subject:* ${escapeMarkdownV2(subject)}
*Message:*
${escapeMarkdownV2(message)}
`;

        // The Telegram Bot API endpoint for sending messages.
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        // Send the POST request to the Telegram Bot API.
        const response = await fetch(telegramApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID, // The ID of the chat/user to send the message to
                text: telegram_message,   // The message content
                parse_mode: 'MarkdownV2', // Instruct Telegram to parse the message as MarkdownV2
            }),
        });

        // Parse the JSON response from Telegram.
        const telegramResult = await response.json();

        // Check if the Telegram API call was successful.
        // 'response.ok' checks for HTTP status 2xx. 'telegramResult.ok' is Telegram's own success indicator.
        if (response.ok && telegramResult.ok) {
            console.log('Message successfully sent to Telegram:', telegramResult);
            return {
                type: 'success',
                message: 'Your message has been sent successfully to Telegram!',
            };
        } else {
            // Log Telegram's error response for debugging on the server.
            console.error('Telegram API Error Response:', telegramResult);
            console.error('HTTP Status:', response.status, response.statusText);
            return {
                type: 'error',
                message: 'Failed to send message via Telegram. Please check server logs for details.',
            };
        }
    } catch (error) {
        // Catch any unexpected exceptions during the fetch operation or JSON parsing.
        console.error('An unexpected error occurred during Telegram message sending:', error);
        return {
            type: 'error',
            message: 'An unexpected server error occurred while processing your request. Please try again.',
        };
    }
}
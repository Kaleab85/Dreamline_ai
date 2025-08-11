'use server';

import { z } from 'zod';
import { addAppointment } from './appointment-data';
import { db } from './firebase'; 
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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

    // Helper function to escape MarkdownV2 special characters
    const escapeMarkdownV2 = (text: string) => {
        return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
    };

    // Helper function to send Telegram message with retry logic
    const sendTelegramMessage = async (message: string, retries = 3): Promise<any> => {
        const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                console.log(`Telegram API attempt ${attempt}/${retries}`);
                
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
                
                const response = await fetch(telegramApiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'User-Agent': 'Dreamline-Contact-Form/1.0',
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'MarkdownV2',
                    }),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                
                if (result.ok) {
                    console.log('Message successfully sent to Telegram:', result);
                    return result;
                } else {
                    throw new Error(`Telegram API Error: ${result.description || 'Unknown error'}`);
                }
                
            } catch (error: any) {
                console.error(`Telegram API attempt ${attempt} failed:`, error.message);
                
                if (attempt === retries) {
                    throw error; // Re-throw on final attempt
                }
                
                // Wait before retry (exponential backoff)
                const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000);
                console.log(`Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    };

    // Save to Firebase as backup (always do this first)
    let firebaseSaved = false;
    try {
        await addDoc(collection(db, 'contact-messages'), {
            name,
            email,
            subject,
            message,
            timestamp: serverTimestamp(),
            telegramSent: false, // Will update this if Telegram succeeds
        });
        firebaseSaved = true;
        console.log('Contact message saved to Firebase');
    } catch (firebaseError) {
        console.error('Failed to save to Firebase:', firebaseError);
    }

    try {
        // Construct the message string to be sent to Telegram.
        const telegram_message = `
*New Contact Form Submission:*
\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-
*Name:* ${escapeMarkdownV2(name)}
*Email:* ${escapeMarkdownV2(email)}
*Subject:* ${escapeMarkdownV2(subject)}
*Message:*
${escapeMarkdownV2(message)}
`;

        // Send the message with retry logic
        await sendTelegramMessage(telegram_message);
        
        return {
            type: 'success',
            message: 'Your message has been sent successfully!',
        };
        
    } catch (error: any) {
        // Log the specific error for debugging
        console.error('Telegram integration failed after all retries:', {
            error: error.message,
            cause: error.cause?.code || 'Unknown',
            timestamp: new Date().toISOString(),
        });

        // Check if it's a timeout/connection error
        if (error.message.includes('timeout') || error.message.includes('CONNECT_TIMEOUT') || error.cause?.code === 'UND_ERR_CONNECT_TIMEOUT') {
            return {
                type: 'error',
                message: 'Network timeout occurred. Your message was received but notification delivery failed. We will respond via email.',
            };
        }

        // Check if it's a Telegram API error
        if (error.message.includes('Telegram API Error')) {
            return {
                type: 'error',
                message: 'Message service temporarily unavailable. Your message was received and we will respond via email.',
            };
        }

        // Generic error
        return {
            type: 'error',
            message: 'Your message was received successfully. We will respond via email within 24 hours.',
        };
    }
}
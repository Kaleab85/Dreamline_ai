'use client';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
}

// Client-side validation
function validateContactForm(data: ContactFormData): ContactFormResult['errors'] {
  const errors: ContactFormResult['errors'] = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Full Name is required and must be at least 2 characters.'];
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ['A valid email address is required.'];
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = ['Subject is required and must be at least 5 characters.'];
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = ['Message is required and must be at least 10 characters.'];
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
}

// Send message via API route (secure)
async function sendToTelegram(data: ContactFormData): Promise<boolean> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send to Telegram:', error);
    return false;
  }
}

// Client-side contact form submission
export async function submitContactFormClient(data: ContactFormData): Promise<ContactFormResult> {
  // Validate form data
  const errors = validateContactForm(data);
  if (errors) {
    return {
      success: false,
      message: 'Please correct the errors in the form.',
      errors,
    };
  }

  try {
    // Send to Telegram bot
    const telegramSent = await sendToTelegram(data);

    if (telegramSent) {
      return {
        success: true,
        message: 'Your message has been sent! We will respond via email within 24 hours.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again or contact us directly.',
      };
    }

  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}
'use client';

import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
    // Save to Firebase
    await addDoc(collection(db, 'contact-messages'), {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      timestamp: serverTimestamp(),
      telegramSent: false,
    });

    return {
      success: true,
      message: 'Your message has been received! We will respond via email within 24 hours.',
    };

  } catch (error) {
    console.error('Contact form submission failed:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again or contact us directly.',
    };
  }
}
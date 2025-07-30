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
  
export async function submitContactForm(state: any, formData: FormData) {
    const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please correct the form errors.',
        };
    }

    try {
        await addDoc(collection(db, "contacts"), validatedFields.data);

        return { type: 'success', message: 'Your message has been sent! We will get back to you shortly.' };
    } catch (e) {
        console.error(e);
        return { type: 'error', message: 'Failed to send message. Please try again later.' };
    }
}
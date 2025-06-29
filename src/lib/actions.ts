'use server';

import { z } from 'zod';
import { generateBlogPostTags } from '@/ai/flows/generate-blog-post-tags';
import { revalidatePath } from 'next/cache';
import { addAppointment } from './appointment-data';
import { createSession, deleteSession } from './auth';
import { redirect } from 'next/navigation';

// NOTE: In a real app, you would import and use your Firebase instance
// import { db } from './firebase'; 
// import { collection, addDoc } from 'firebase/firestore';

const appointmentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  date: z.string().min(1, { message: 'Please select a date.' }),
  message: z.string().optional(),
});

export async function bookAppointment(prevState: any, formData: FormData) {
  const validatedFields = appointmentSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors and try again.',
    };
  }

  try {
    // In a real app, you would save this to a real database
    addAppointment(validatedFields.data);
    
    // Revalidate the admin page to show the new appointment
    revalidatePath('/admin/appointments');
    
    return { type: 'success', message: 'Appointment booked successfully! We will be in touch soon.' };
  } catch (e) {
    console.error(e);
    return { type: 'error', message: 'Something went wrong. Please try again.' };
  }
}


const contactSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }),
    message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});
  
export async function submitContactForm(prevState: any, formData: FormData) {
    const validatedFields = contactSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please correct the form errors.',
        };
    }

    try {
        // In a real app, you would save this to Firebase
        console.log('Saving contact message to database:', validatedFields.data);
        // await addDoc(collection(db, "contacts"), validatedFields.data);

        return { type: 'success', message: 'Your message has been sent! We will get back to you shortly.' };
    } catch (e) {
        console.error(e);
        return { type: 'error', message: 'Failed to send message. Please try again later.' };
    }
}


const blogTagSchema = z.object({
    content: z.string().min(100, { message: 'Blog content must be at least 100 characters to generate tags.' }),
});

export async function generateTagsAction(prevState: any, formData: FormData) {
    const content = formData.get('content') as string;
    const validatedFields = blogTagSchema.safeParse({ content });

    if (!validatedFields.success) {
        return {
            type: 'error',
            errors: validatedFields.error.flatten().fieldErrors,
            tags: [],
        };
    }
    
    try {
        const result = await generateBlogPostTags({ blogPostContent: content });
        return {
            type: 'success',
            tags: result.tags,
            errors: null,
        };
    } catch (error) {
        console.error('Error generating tags:', error);
        return {
            type: 'error',
            message: 'Failed to generate tags. Please try again.',
            tags: [],
            errors: null,
        };
    }
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(prevState: any, formData: FormData) {
  const { email, password } = loginSchema.parse(Object.fromEntries(formData.entries()));

  // Hardcoded credentials for this example
  if (email === 'admin@example.com' && password === 'password') {
    await createSession(email);
    redirect('/admin/appointments');
  }

  return { message: 'Invalid email or password' };
}

export async function logoutAction() {
    await deleteSession();
}

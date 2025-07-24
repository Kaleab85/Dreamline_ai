
'use server';

import { z } from 'zod';
import { generateBlogPostTags } from '@/ai/flows/generate-blog-post-tags';
import { addAppointment, deleteAppointment } from './appointment-data';
import { redirect } from 'next/navigation';
import { addUser, getUserByEmail, getUsers } from './user-data';
import { db } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';
import type { SessionPayload } from './session';
import { decrypt } from './auth';

// --- SESSION ACTIONS ---

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key-that-is-long-enough';
const encodedKey = new TextEncoder().encode(secretKey);
const cookieName = 'session';

async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey);
}

export async function createSession(userId: string, role: 'superadmin' | 'admin') {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });

  cookies().set(cookieName, session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession() {
  const cookie = cookies().get(cookieName)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return null;
  }

  return session;
}

export async function deleteSession() {
  cookies().delete(cookieName);
  redirect('/login');
}


// --- APPOINTMENT ACTIONS ---

const appointmentSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  date: z.string().min(1, { message: 'Please select a date.' }),
  message: z.string().optional(),
});

export async function bookAppointment(prevState: any, formData: FormData) {
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

export async function deleteAppointmentAction(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session || !['admin', 'superadmin'].includes(session.role)) {
      return { type: 'error', message: 'Unauthorized' };
    }
  
    const id = formData.get('id') as string;
    if (!id) {
       return { type: 'error', message: 'Appointment ID is required' };
    }
  
    try {
      await deleteAppointment(id);
      return { type: 'success', message: 'Appointment deleted successfully.' };
    } catch (error) {
      console.error('Failed to delete appointment:', error);
      return { type: 'error', message: 'Failed to delete appointment.' };
    }
}


// --- CONTACT FORM ACTION ---

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
        await addDoc(collection(db, "contacts"), validatedFields.data);

        return { type: 'success', message: 'Your message has been sent! We will get back to you shortly.' };
    } catch (e) {
        console.error(e);
        return { type: 'error', message: 'Failed to send message. Please try again later.' };
    }
}

// --- AI ACTIONS ---

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

// --- AUTH/USER ACTIONS ---

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function loginAction(prevState: any, formData: FormData) {
  const { email, password } = loginSchema.parse(Object.fromEntries(formData.entries()));

  const user = await getUserByEmail(email);

  if (!user || user.password !== password) {
    return { message: 'Invalid email or password' };
  }
  
  await createSession(user.id, user.role);
  redirect('/admin/appointments');
}

export async function logoutAction() {
    await deleteSession();
}

const registerAdminSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
});

export async function registerAdminAction(prevState: any, formData: FormData) {
  const session = await getSession();
  if (session?.role !== 'superadmin') {
    return {
      type: 'error',
      message: 'Unauthorized: Only superadmins can register new users.',
    };
  }

  const validatedFields = registerAdminSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      type: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  const { email, password } = validatedFields.data;

  if (await getUserByEmail(email)) {
    return {
      type: 'error',
      errors: { email: ['An admin with this email already exists.'] },
    };
  }

  try {
    await addUser({ email, password, role: 'admin' });
    
    return {
      type: 'success',
      message: `Admin user ${email} registered successfully.`,
    };
  } catch (e) {
    console.error(e);
    return {
      type: 'error',
      message: 'Something went wrong during registration. Please try again.',
    };
  }
}

export async function setupSuperAdminAction(prevState: any, formData: FormData) {
    const users = await getUsers();
    if (users.length > 0) {
      return {
        type: 'error',
        message: 'A superadmin already exists.',
      };
    }
  
    const validatedFields = registerAdminSchema.safeParse(Object.fromEntries(formData.entries()));
  
    if (!validatedFields.success) {
      return {
        type: 'error',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
  
    const { email, password } = validatedFields.data;
  
    try {
      await addUser({ email, password, role: 'superadmin' });
      const newUser = await getUserByEmail(email);
      if (newUser) {
          await createSession(newUser.id, 'superadmin');
      }
      redirect('/admin/appointments');
    } catch (e) {
      console.error(e);
      return {
        type: 'error',
        message: 'Something went wrong during setup. Please try again.',
      };
    }
  }

'use client';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
}

export interface AppointmentFormResult {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    phone?: string[];
    service?: string[];
    date?: string[];
    message?: string[];
  };
}

// Client-side validation
function validateAppointmentForm(data: AppointmentFormData): AppointmentFormResult['errors'] {
  const errors: AppointmentFormResult['errors'] = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = ['Name must be at least 2 characters.'];
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = ['Please enter a valid email.'];
  }

  if (!data.phone || data.phone.trim().length < 10) {
    errors.phone = ['Please enter a valid phone number.'];
  }

  if (!data.service || data.service.trim().length < 1) {
    errors.service = ['Please select a service.'];
  }

  if (!data.date || data.date.trim().length < 1) {
    errors.date = ['Please select a date.'];
  }

  return Object.keys(errors).length > 0 ? errors : undefined;
}

// Send appointment via API route (secure)
async function sendAppointmentToTelegram(data: AppointmentFormData): Promise<boolean> {
  try {
    const response = await fetch('/api/appointment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send appointment to Telegram:', error);
    return false;
  }
}

// Client-side appointment booking
export async function bookAppointmentClient(data: AppointmentFormData): Promise<AppointmentFormResult> {
  // Validate form data
  const errors = validateAppointmentForm(data);
  if (errors) {
    return {
      success: false,
      message: 'Please correct the errors and try again.',
      errors,
    };
  }

  try {
    // Send to Telegram bot
    const telegramSent = await sendAppointmentToTelegram(data);

    if (telegramSent) {
      return {
        success: true,
        message: 'Appointment booked successfully! We will be in touch soon.',
      };
    } else {
      return {
        success: false,
        message: 'Failed to book appointment. Please try again or contact us directly.',
      };
    }

  } catch (error) {
    console.error('Appointment booking failed:', error);
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
}
import { NextRequest, NextResponse } from 'next/server';

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message?: string;
}

// Server-side Telegram function (secure)
async function sendAppointmentToTelegram(data: AppointmentFormData): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return false;
    }

    const message = `
📅 *New Appointment Booking*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📞 *Phone:* ${data.phone}
🔧 *Service:* ${data.service}
📆 *Preferred Date:* ${data.date}

💬 *Additional Message:*
${data.message || 'No additional message'}

⏰ *Booked at:* ${new Date().toLocaleString()}
    `.trim();

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send appointment to Telegram:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: AppointmentFormData = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.service || !data.date) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Send to Telegram
    const telegramSent = await sendAppointmentToTelegram(data);

    if (telegramSent) {
      return NextResponse.json({
        success: true,
        message: 'Appointment booked successfully! We will be in touch soon.',
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to book appointment. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Appointment API error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
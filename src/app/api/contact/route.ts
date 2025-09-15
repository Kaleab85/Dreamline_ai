import { NextRequest, NextResponse } from 'next/server';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Server-side Telegram function (secure)
async function sendToTelegram(data: ContactFormData): Promise<boolean> {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials not configured');
      return false;
    }

    const message = `
🔔 *New Contact Form Submission*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📝 *Subject:* ${data.subject}

💬 *Message:*
${data.message}

⏰ *Time:* ${new Date().toLocaleString()}
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
    console.error('Failed to send to Telegram:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    // Basic validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Send to Telegram
    const telegramSent = await sendToTelegram(data);

    if (telegramSent) {
      return NextResponse.json({
        success: true,
        message: 'Your message has been sent! We will respond via email within 24 hours.',
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to send message. Please try again.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
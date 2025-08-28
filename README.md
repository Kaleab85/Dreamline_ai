# Dreamline Consultancy

A Next.js application for educational consultancy services with appointment booking and contact forms.

## Features

- 📅 Appointment booking system
- 📧 Contact form with Telegram integration
- 🌟 Success stories and testimonials
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Direct Telegram bot integration

## Getting Started

### Prerequisites

- Node.js 18+

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your Telegram bot credentials in `.env`

4. Run the development server:
   ```bash
   npm run dev
   ```

### Telegram Bot Setup

1. Create a bot with @BotFather on Telegram
2. Get your bot token and chat ID
3. Add them to your environment variables

### Deployment

This project is configured for cPanel shared hosting with static export. The deployment is automated via Git integration.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Telegram Bot API
- Zod validation

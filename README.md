# Dreamline Consultancy

A Next.js application for educational consultancy services with appointment booking, contact forms, and blog functionality.

## Features

- 📅 Appointment booking system
- 📧 Contact form with Telegram integration
- 📝 Blog/CMS functionality
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 🔥 Firebase integration

## Getting Started

### Prerequisites

- Node.js 18+ 
- Firebase CLI (for deployment)

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Telegram bot credentials in `.env.local`

4. Run the development server:
   ```bash
   npm run dev
   ```

### Telegram Bot Setup

1. Create a bot with @BotFather on Telegram
2. Get your bot token and chat ID
3. Add them to your environment variables

### Deployment

This project is configured for Firebase App Hosting. Make sure to set environment variables in the Firebase console before deploying.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Firebase
- Zod validation

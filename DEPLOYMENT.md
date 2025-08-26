# cPanel Shared Hosting Deployment Guide

This guide will help you deploy your Next.js application to shared hosting with cPanel.

## Prerequisites

- Node.js installed on your local machine
- Access to cPanel hosting account
- Firebase project configured (for contact forms and appointments)

## Step 1: Build the Static Site

1. Install dependencies:
```bash
npm install
```

2. Build the static export:
```bash
npm run build
```

This will create an `out` folder with all static files.

## Step 2: Configure Environment Variables

1. In your cPanel, create a `.env` file in your domain's root directory (usually `public_html`)
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

## Step 3: Upload Files

1. Access your cPanel File Manager
2. Navigate to `public_html` (or your domain's document root)
3. Upload all contents from the `out` folder to your domain root
4. Make sure the `.htaccess` file is uploaded (it handles routing)

## Step 4: Configure Firebase

1. In Firebase Console, go to Project Settings
2. Add your domain to authorized domains
3. Configure Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /contact-messages/{document} {
      allow create: if true;
      allow read, write: if false;
    }
    match /appointments/{document} {
      allow create: if true;
      allow read, write: if false;
    }
  }
}
```

## Step 5: Test the Deployment

1. Visit your domain
2. Test the contact form
3. Test the appointment booking
4. Check that all pages load correctly

## Troubleshooting

### Common Issues:

1. **404 errors on page refresh**: Make sure `.htaccess` is uploaded and mod_rewrite is enabled
2. **Images not loading**: Check file paths and ensure images are in the correct directory
3. **Forms not working**: Verify Firebase configuration and environment variables
4. **Styling issues**: Ensure all CSS files are uploaded correctly

### File Structure After Upload:
```
public_html/
├── _next/
├── images/
├── .htaccess
├── index.html
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── book-appointment/
│   └── index.html
└── other static files...
```

## Performance Optimization

The site includes:
- Image optimization
- CSS/JS compression via .htaccess
- Browser caching headers
- Lazy loading for images

## Support

If you encounter issues:
1. Check cPanel error logs
2. Verify all files uploaded correctly
3. Test Firebase connection
4. Contact your hosting provider for server-specific issues

## Updates

To update the site:
1. Make changes locally
2. Run `npm run build`
3. Upload new files from `out` folder
4. Clear any caches if needed
# cPanel Deployment Checklist ✅

Your Next.js app is now ready for cPanel shared hosting deployment!

## ✅ What's Been Configured

### Static Export Setup
- ✅ `next.config.ts` configured with `output: 'export'`
- ✅ Images set to `unoptimized: true` for static hosting
- ✅ Trailing slashes enabled for better compatibility
- ✅ Client-side form handling implemented

### Forms & Functionality
- ✅ Contact form converted to client-side with Firebase
- ✅ Appointment booking converted to client-side with Firebase
- ✅ Form validation and error handling
- ✅ Toast notifications for user feedback

### Performance & SEO
- ✅ `.htaccess` file for URL rewriting and caching
- ✅ Compression and browser caching headers
- ✅ Security headers configured
- ✅ Static file optimization

### Build Process
- ✅ Build script tested and working
- ✅ Static files generated in `out` directory
- ✅ All pages exported successfully

## 🚀 Deployment Steps

### 1. Build the Site
```bash
npm run build
```

### 2. Upload Files to cPanel
1. Access cPanel File Manager
2. Navigate to `public_html` (or your domain folder)
3. Upload ALL contents from the `out` folder
4. Ensure `.htaccess` is uploaded

### 3. Configure Environment Variables
Create `.env` file in your domain root with:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Firebase Configuration
1. Add your domain to Firebase authorized domains
2. Deploy Firestore rules (see DEPLOYMENT.md)

## 📁 File Structure After Upload
```
public_html/
├── _next/                 (Next.js assets)
├── images/               (Your images)
├── about/
│   └── index.html
├── contact/
│   └── index.html
├── book-appointment/
│   └── index.html
├── services/
│   └── index.html
├── .htaccess            (URL rewriting)
├── index.html           (Homepage)
└── favicon.ico
```

## 🧪 Testing Checklist

After deployment, test:
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] About page displays properly
- [ ] Services page loads
- [ ] Contact form submits successfully
- [ ] Appointment booking works
- [ ] Images display correctly
- [ ] Page refresh doesn't show 404 errors
- [ ] Mobile responsiveness

## 🔧 Troubleshooting

### Common Issues:
1. **404 on page refresh**: Check `.htaccess` uploaded and mod_rewrite enabled
2. **Forms not working**: Verify Firebase config and environment variables
3. **Images not loading**: Check file paths and upload status
4. **Styling broken**: Ensure all `_next` folder contents uploaded

### Performance Check:
- Site should load quickly due to static generation
- Images should be optimized
- Caching headers should be active

## 📞 Support

If you need help:
1. Check cPanel error logs
2. Verify all files uploaded correctly
3. Test Firebase connection in browser console
4. Contact your hosting provider for server issues

## 🎉 You're Ready!

Your Dreamline Consultancy website is now configured for cPanel deployment with:
- Static site generation for fast loading
- Client-side forms with Firebase backend
- Professional contact and appointment booking
- SEO-friendly structure
- Mobile-responsive design

Just upload the `out` folder contents and you're live! 🚀
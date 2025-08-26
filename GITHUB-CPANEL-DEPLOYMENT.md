# GitHub to cPanel Deployment Guide

This guide shows you how to automatically deploy your Next.js site from GitHub to your cPanel shared hosting.

## 🚀 **Automated Deployment Setup**

### **Step 1: Get Your cPanel FTP Details**

From your hosting provider, get:
- **FTP Host**: Usually `ftp.yourdomain.com` or `yourdomain.com`
- **FTP Username**: Your cPanel username
- **FTP Password**: Your cPanel password
- **Directory**: Usually `/public_html/` (or `/public_html/yourdomain.com/`)

### **Step 2: Add GitHub Secrets**

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

```
Name: FTP_HOST
Value: ftp.yourdomain.com

Name: FTP_USERNAME  
Value: your_cpanel_username

Name: FTP_PASSWORD
Value: your_cpanel_password
```

### **Step 3: Push to GitHub**

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin master
```

### **Step 4: Watch It Deploy!**

- Go to **Actions** tab in your GitHub repo
- Watch the deployment process
- Your site will be automatically built and uploaded to cPanel!

## 🔄 **How It Works**

1. **You push code** to GitHub
2. **GitHub Actions triggers** automatically
3. **Builds your site** (`npm run build`)
4. **Uploads `out` folder** to your cPanel via FTP
5. **Your site is live!** 🎉

## 📋 **Alternative Methods**

### **Method 2: Manual Git Clone on cPanel**

If your cPanel supports SSH/Terminal:

1. **SSH into your cPanel**
2. **Navigate to public_html**:
   ```bash
   cd public_html
   ```
3. **Clone your repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo.git .
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Build the site**:
   ```bash
   npm run build
   ```
6. **Move files**:
   ```bash
   cp -r out/* ./
   rm -rf out src node_modules package.json
   ```

### **Method 3: Download & Upload**

1. **Go to your GitHub repo**
2. **Releases** → **Create a new release**
3. **Download the release ZIP**
4. **Extract and build locally**:
   ```bash
   npm install
   npm run build
   ```
5. **Upload `out` folder contents to cPanel**

## ⚙️ **Environment Variables Setup**

After deployment, create `.env` file in your cPanel public_html:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=dreamline-consultancy.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=dreamline-consultancy
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=dreamline-consultancy.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=97682561835
NEXT_PUBLIC_FIREBASE_APP_ID=1:97682561835:web:b51571c48176454b57c36e
```

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **FTP Connection Failed**
   - Check FTP credentials in GitHub secrets
   - Try using IP address instead of domain for FTP_HOST
   - Contact hosting provider for correct FTP details

2. **Build Fails**
   - Check Node.js version compatibility
   - Ensure all dependencies are in package.json
   - Check for any missing environment variables

3. **Files Not Uploading**
   - Verify server-dir path (might be `/public_html/yourdomain.com/`)
   - Check FTP permissions
   - Ensure cPanel has enough disk space

4. **Site Not Loading**
   - Check if .htaccess was uploaded
   - Verify all files are in correct directory
   - Check cPanel error logs

## 🎯 **Benefits of This Setup**

- ✅ **Automatic deployment** - Push to GitHub = Live site
- ✅ **Version control** - All changes tracked
- ✅ **Rollback capability** - Easy to revert changes
- ✅ **Team collaboration** - Multiple developers can contribute
- ✅ **Build optimization** - Automatic optimization on every deploy
- ✅ **No manual uploads** - Everything automated

## 📞 **Support**

If you need help:
1. Check GitHub Actions logs for deployment errors
2. Verify FTP credentials with your hosting provider
3. Test FTP connection manually using an FTP client
4. Contact hosting support for server-specific issues

## 🚀 **You're Ready!**

Once set up, your workflow will be:
1. **Make changes locally**
2. **Push to GitHub**
3. **Site automatically updates!**

No more manual file uploads! 🎉
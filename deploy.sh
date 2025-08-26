#!/bin/bash

# Deployment script for cPanel shared hosting
# This script builds the static site and prepares it for upload

echo "🚀 Starting deployment build..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf out

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the static site
echo "🔨 Building static site..."
npm run build

# Check if build was successful
if [ -d "out" ]; then
    echo "✅ Build successful!"
    echo ""
    echo "📁 Files ready for upload in 'out' directory:"
    ls -la out/
    echo ""
    echo "📋 Next steps:"
    echo "1. Upload all contents of 'out' folder to your cPanel public_html directory"
    echo "2. Make sure .htaccess file is uploaded"
    echo "3. Configure environment variables in cPanel"
    echo "4. Test your site"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi
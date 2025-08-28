#!/bin/bash

# cPanel Auto-Deploy Script for Next.js
echo "Starting Next.js deployment..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the Next.js static export
echo "Building Next.js app..."
NODE_ENV=production npm run build

# Copy built files to web root
echo "Deploying to web server..."
cp -r out/* /public_html/

# Copy .htaccess for proper routing
cp public/.htaccess /public_html/

# Set proper permissions
chmod -R 755 /public_html/

# Clean up build artifacts
echo "Cleaning up..."
rm -rf node_modules out

echo "✅ Next.js deployment complete!"
echo "🌐 Your site is now live!"
#!/bin/bash

# cPanel Auto-Deploy Script
echo "Starting deployment..."

# Install dependencies
npm ci

# Build the Next.js app
NODE_ENV=production npm run build

# Copy built files to web directory
cp -r out/* /public_html/

# Clean up
rm -rf node_modules

echo "Deployment complete!"
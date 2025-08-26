# Images Folder Structure

This folder contains all static images for the Dreamline Consultancy website.

## Folder Organization:

### `/public/images/` - Main images folder
- Put your images here and reference them as `/images/filename.jpg`

### Recommended subfolders:
- `/public/images/hero/` - Hero section images
- `/public/images/services/` - Service-related images  
- `/public/images/blog/` - Blog post images
- `/public/images/about/` - About page images
- `/public/images/icons/` - Icons and logos

## Usage in Code:
```jsx
import Image from 'next/image';

// Use images like this:
<Image 
  src="/images/hero/main-hero.jpg" 
  width={600} 
  height={400} 
  alt="Description" 
/>
```

## Image Optimization Tips:
- Use WebP or AVIF format when possible
- Optimize images before uploading (compress them)
- Use descriptive filenames
- Keep file sizes reasonable (< 1MB for web)
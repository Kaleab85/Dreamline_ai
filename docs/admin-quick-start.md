# Quick Admin Dashboard Setup

## Step 1: Create Admin App
```bash
# In a separate directory
npx create-next-app@latest dreamline-admin
cd dreamline-admin
```

## Step 2: Add Admin Dependencies
```bash
npm install next-auth prisma @prisma/client
npm install @types/bcryptjs bcryptjs
```

## Step 3: Basic Admin Structure
```
dreamline-admin/
├── src/app/
│   ├── admin/
│   │   ├── dashboard/page.tsx
│   │   ├── appointments/page.tsx
│   │   └── messages/page.tsx
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── appointments/route.ts
│   │   └── messages/route.ts
│   └── login/page.tsx
```

## Step 4: Deploy Admin
- Deploy to Vercel (free tier)
- Point admin.yourdomain.com to Vercel app
- Keep main site on cPanel

## Result:
- yourdomain.com → Fast static site (current setup)
- admin.yourdomain.com → Full-featured admin dashboard
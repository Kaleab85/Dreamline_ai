import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  // If there's no session and the user is trying to access a protected route, redirect to login
  if (!session && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If there is a session and the user is on the login page, redirect to admin
  if (session && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/admin/appointments', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

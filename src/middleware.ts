
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './lib/actions';
import { getUsers } from './lib/user-data';

export async function middleware(request: NextRequest) {
  const users = await getUsers();
  const isSetupRequired = users.length === 0;

  // If no users exist, redirect everything to the setup page
  if (isSetupRequired && !request.nextUrl.pathname.startsWith('/admin/setup')) {
    return NextResponse.redirect(new URL('/admin/setup', request.url));
  }
  
  // If setup is done, but user tries to access setup page, redirect to login
  if (!isSetupRequired && request.nextUrl.pathname.startsWith('/admin/setup')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to setup page if it's required
  if (request.nextUrl.pathname.startsWith('/admin/setup')) {
    return NextResponse.next();
  }

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

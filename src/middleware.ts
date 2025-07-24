
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './lib/actions';
import { getUsers } from './lib/user-data';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // This check MUST run without any authentication context, as no users may exist.
  // This requires Firestore rules to be configured to allow this specific query.
  // e.g. `allow list: if request.query.limit == 1;` on the users collection.
  const users = await getUsers({ limit: 1 });
  const isSetupRequired = users.length === 0;

  // If setup is required and user is not on the setup page, redirect them.
  if (isSetupRequired && pathname !== '/admin/setup') {
    return NextResponse.redirect(new URL('/admin/setup', request.url));
  }

  // If setup is complete and user tries to access the setup page, redirect away.
  if (!isSetupRequired && pathname === '/admin/setup') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Allow access to the setup page itself if it's required.
  if (pathname === '/admin/setup') {
    return NextResponse.next();
  }
  
  // For any other page, check for session.
  const session = await getSession();

  // Protect all other admin routes
  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (pathname === '/login' && session) {
    return NextResponse.redirect(new URL('/admin/appointments', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Match all admin routes and the login page
  matcher: ['/admin/:path*', '/login'],
};

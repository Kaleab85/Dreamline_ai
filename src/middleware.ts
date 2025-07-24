
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getSession } from './lib/actions';
import { getUsers } from './lib/user-data';

export async function middleware(request: NextRequest) {
  // Check if any user exists to determine if setup is needed.
  // We only need to check for one user.
  const users = await getUsers({ limit: 1 });
  const isSetupRequired = users.length === 0;
  const { pathname } = request.nextUrl;

  // If setup is required and the user is not on the setup page, redirect them.
  if (isSetupRequired && pathname !== '/admin/setup') {
    return NextResponse.redirect(new URL('/admin/setup', request.url));
  }

  // If setup is complete and the user tries to access the setup page, redirect to login.
  if (!isSetupRequired && pathname === '/admin/setup') {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // If the current path is the setup page, allow access.
  if (pathname === '/admin/setup') {
    return NextResponse.next();
  }
  
  // Protect all other admin routes
  if (pathname.startsWith('/admin')) {
    const session = await getSession();
    if (!session) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (pathname.startsWith('/login')) {
      const session = await getSession();
      if (session) {
          return NextResponse.redirect(new URL('/admin/appointments', request.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};

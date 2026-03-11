import { type NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes - always accessible
  const publicRoutes = ['/', '/auth/login', '/auth/register', '/pricing', '/horoscope', '/api/'];
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route));

  if (isPublicRoute) {
    return NextResponse.next();
  }

  // In demo mode, allow all routes (auth is handled client-side)
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
  if (isDemoMode) {
    return NextResponse.next();
  }

  // Protected routes - check for Supabase session
  const protectedRoutes = ['/dashboard', '/report', '/compatibility'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute) {
    // Check for auth cookie presence
    const hasAuthCookie = request.cookies.getAll().some(
      cookie => cookie.name.startsWith('sb-')
    );

    if (!hasAuthCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|public|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

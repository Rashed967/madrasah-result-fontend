import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // If trying to access /dashboard
  if (url.pathname === '/dashboard') {
    // Create new URL for redirect
    const redirectUrl = new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

// Update matcher to specifically include /dashboard
export const config = {
  matcher: ['/dashboard']
}; 
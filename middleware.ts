import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = crypto.randomUUID();  // Generating a unique nonce value

  // Set the nonce value in the response headers
  const response = NextResponse.next();
  response.headers.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com;
    connect-src 'self' https://www.google-analytics.com;
    img-src 'self' data: https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
    frame-src https://www.googletagmanager.com;
  `);

  // Add nonce to the response to use it in inline scripts
  response.headers.set('X-Nonce', nonce);

  return response;
}

export const config = {
  matcher: ['/'], // Apply middleware to all routes (adjust as needed)
};

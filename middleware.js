import { NextResponse } from 'next/server';

export function middleware(request) {
  const nonce = crypto.randomUUID(); // Generate a unique nonce
  const response = NextResponse.next();

  // Set Security Headers
  response.headers.set(
    'Content-Security-Policy',
    `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' https://www.googletagmanager.com;
      connect-src 'self' https://www.google-analytics.com;
      img-src 'self' data: https://www.google-analytics.com;
      style-src 'self' 'unsafe-inline';
      font-src 'self' https://fonts.googleapis.com https://fonts.gstatic.com;
      frame-src https://www.googletagmanager.com;
    `.replace(/\s{2,}/g, ' ').trim()
  );

  response.headers.set('X-Frame-Options', 'DENY'); // منع التضمين في iframe
  response.headers.set('X-Content-Type-Options', 'nosniff'); // منع تخمين نوع الملفات
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin'); // حماية الـ referrer
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  ); // منع صلاحيات اضافية

  // Set nonce to be used in the app
  response.headers.set('X-Nonce', nonce);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'], 
  // هنطبق الميدل وير على كل الصفحات، ونستثني الملفات الداخلية بتاعة Next.js
};

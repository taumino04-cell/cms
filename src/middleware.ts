import { NextRequest, NextResponse } from 'next/server';

const isProtectedRoute = (req: NextRequest) =>
  /^(?:\/dashboard)(?:\/.*)?$/.test(req.nextUrl.pathname);

export default function middleware(req: NextRequest) {
  if (isProtectedRoute(req)) {
    const hasAuth = req.cookies.get('fb_auth')?.value === '1';
    if (!hasAuth) {
      const url = new URL('/auth/sign-in', req.url);
      url.searchParams.set(
        'redirect_url',
        req.nextUrl.pathname + req.nextUrl.search
      );
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};

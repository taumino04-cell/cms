import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

const isProtectedRoute = (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  // Exclude /auth/sign-in and its subroutes
  if (path.startsWith('/auth/sign-in')) return false;
  // Protect everything else except Next.js internals/static (handled by matcher)
  return true;
};

const intlMiddleware = createMiddleware({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'never'
});

export default function middleware(req: NextRequest) {
  // First, run locale negotiation and cookie handling
  const intlResponse = intlMiddleware(req);

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
  // Continue with the response from next-intl
  return intlResponse;
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ]
};

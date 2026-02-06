import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const AUTH_PAGES = ['/login', '/register', '/forgot-password'];
const PROTECTED_PREFIX = '/dashboard';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameWithoutLocale = pathname.replace(/^\/(en|nb)/, '');

  const isProtectedRoute = pathnameWithoutLocale.startsWith(PROTECTED_PREFIX);
  const isAuthPage = AUTH_PAGES.some((page) =>
    pathnameWithoutLocale.startsWith(page)
  );

  const token = request.cookies.get('auth_token')?.value;

  if (isProtectedRoute && !token) {
    const locale = pathname.match(/^\/(en|nb)/)?.[1] ?? 'en';
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    const locale = pathname.match(/^\/(en|nb)/)?.[1] ?? 'en';
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard`, request.url)
    );
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

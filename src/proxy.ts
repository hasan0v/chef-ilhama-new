import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { detectPreferredLocale } from '@/lib/localeDetection';
import { getLocalizedHomePath, LOCALE_COOKIE_NAME } from '@/lib/localeRoutes';

const BOT_USER_AGENT = /(?:bot|crawler|spider|slurp|bingpreview|facebookexternalhit|whatsapp|telegrambot|discordbot|linkedinbot)/i;

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname !== '/' ||
    !['GET', 'HEAD'].includes(request.method) ||
    BOT_USER_AGENT.test(request.headers.get('user-agent') ?? '')
  ) {
    return NextResponse.next();
  }

  const locale = detectPreferredLocale({
    savedLocale: request.cookies.get(LOCALE_COOKIE_NAME)?.value ?? null,
    acceptLanguage: request.headers.get('accept-language'),
    // Cloudflare is the public-facing proxy, so its end-user country wins.
    country:
      request.headers.get('cf-ipcountry') ??
      request.headers.get('x-vercel-ip-country'),
  });

  if (locale === 'az') return NextResponse.next();

  const destination = request.nextUrl.clone();
  destination.pathname = getLocalizedHomePath(locale);

  const response = NextResponse.redirect(destination, 307);
  response.headers.set('Cache-Control', 'private, no-store');
  return response;
}

export const config = {
  matcher: ['/'],
};

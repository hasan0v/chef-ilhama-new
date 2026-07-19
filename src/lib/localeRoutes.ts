export const SITE_LOCALES = [
  'az',
  'en',
  'tr',
  'ru',
  'fr',
  'it',
  'ar',
  'zh',
  'hi',
  'es',
  'pt',
  'nl',
  'de',
  'ja',
  'id',
  'bn',
] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const LOCALE_COOKIE_NAME = 'chef_locale';

const siteLocaleSet = new Set<string>(SITE_LOCALES);

export function isSiteLocale(locale: string | null | undefined): locale is SiteLocale {
  return Boolean(locale && siteLocaleSet.has(locale));
}

export function normalizeSiteLocale(locale: string | null | undefined): SiteLocale {
  return isSiteLocale(locale) ? locale : 'az';
}

export function getSiteLocaleFromPathname(pathname: string | null | undefined): SiteLocale {
  const firstSegment = pathname?.split('/').filter(Boolean)[0];
  return normalizeSiteLocale(firstSegment);
}

function getLocalizedPath(locale: string, azerbaijaniPath: string, translatedPath: string): string {
  const normalizedLocale = normalizeSiteLocale(locale);
  return normalizedLocale === 'az' ? azerbaijaniPath : `/${normalizedLocale}${translatedPath}`;
}

export function getLocalizedHomePath(locale: string): string {
  return getLocalizedPath(locale, '/', '');
}

export function getLocalizedRecipesPath(locale: string): string {
  return getLocalizedPath(locale, '/reseptler', '/recipes');
}

export function getLocalizedRecipePath(locale: string, slug: string): string {
  return getLocalizedPath(locale, `/resept/${slug}`, `/recipe/${slug}`);
}

export function getLocalizedServicesPath(locale: string): string {
  return getLocalizedPath(locale, '/xidmetler', '/services');
}

export function getLocalizedAboutPath(locale: string): string {
  return getLocalizedPath(locale, '/haqqinda', '/about');
}

export function getLocalizedContactPath(locale: string): string {
  return getLocalizedPath(locale, '/elaqe', '/contact');
}

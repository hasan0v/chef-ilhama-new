import {
  LOCALE_COOKIE_NAME,
  normalizeSiteLocale,
  type SiteLocale,
} from '@/lib/localeRoutes';

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const LOCAL_STORAGE_KEY = 'user-selected-locale';

export function persistLocalePreference(locale: string): SiteLocale {
  const normalizedLocale = normalizeSiteLocale(locale);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, normalizedLocale);
  }

  if (typeof document !== 'undefined') {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${LOCALE_COOKIE_NAME}=${normalizedLocale}; Path=/; Max-Age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax${secure}`;
  }

  return normalizedLocale;
}

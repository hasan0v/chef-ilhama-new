import { isSiteLocale, type SiteLocale } from '@/lib/localeRoutes';

const COUNTRY_LOCALES: Readonly<Record<string, SiteLocale>> = {
  AE: 'ar',
  AT: 'de',
  AZ: 'az',
  BD: 'bn',
  BH: 'ar',
  BR: 'pt',
  CN: 'zh',
  DE: 'de',
  DZ: 'ar',
  EG: 'ar',
  ES: 'es',
  FR: 'fr',
  HK: 'zh',
  ID: 'id',
  IN: 'hi',
  IQ: 'ar',
  IT: 'it',
  JO: 'ar',
  JP: 'ja',
  KW: 'ar',
  LB: 'ar',
  LY: 'ar',
  MA: 'ar',
  MC: 'fr',
  NL: 'nl',
  OM: 'ar',
  PS: 'ar',
  PT: 'pt',
  QA: 'ar',
  RU: 'ru',
  SA: 'ar',
  SM: 'it',
  SY: 'ar',
  TN: 'ar',
  TR: 'tr',
  TW: 'zh',
  YE: 'ar',
};

interface WeightedLanguage {
  language: string;
  quality: number;
  order: number;
}

export function getLocaleFromAcceptLanguage(header: string | null): SiteLocale | null {
  if (!header) return null;

  const languages = header
    .split(',')
    .map((entry, order): WeightedLanguage | null => {
      const [rawLanguage, ...parameters] = entry.trim().split(';');
      if (!rawLanguage || rawLanguage === '*') return null;

      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
      const parsedQuality = qualityParameter
        ? Number.parseFloat(qualityParameter.trim().slice(2))
        : 1;

      return {
        language: rawLanguage.toLowerCase(),
        quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
        order,
      };
    })
    .filter((language): language is WeightedLanguage => Boolean(language && language.quality > 0))
    .sort((a, b) => b.quality - a.quality || a.order - b.order);

  for (const { language } of languages) {
    const baseLanguage = language.split('-')[0];
    if (isSiteLocale(baseLanguage)) return baseLanguage;
  }

  return null;
}

export function getLocaleFromCountry(country: string | null): SiteLocale | null {
  if (!country) return null;
  return COUNTRY_LOCALES[country.trim().toUpperCase()] ?? null;
}

export function detectPreferredLocale({
  savedLocale,
  acceptLanguage,
  country,
}: {
  savedLocale: string | null;
  acceptLanguage: string | null;
  country: string | null;
}): SiteLocale {
  if (isSiteLocale(savedLocale)) return savedLocale;

  return getLocaleFromAcceptLanguage(acceptLanguage) ?? getLocaleFromCountry(country) ?? 'az';
}

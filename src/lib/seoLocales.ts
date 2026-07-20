import type { Metadata } from 'next';
import {
  SITE_LOCALES,
  normalizeSiteLocale,
  type SiteLocale,
} from '@/lib/localeRoutes';
import { siteConfig } from '@/lib/site';

export type SeoPageKind =
  | 'home'
  | 'recipes'
  | 'services'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export const SEO_LOCALE_CONFIG: Record<SiteLocale, {
  ogLocale: string;
  recipeLabel: string;
  recipeDescription: (name: string, origin: string) => string;
  stepLabel: string;
}> = {
  az: { ogLocale: 'az_AZ', recipeLabel: 'Resepti', recipeDescription: (name, origin) => `${name}: ${origin} mətbəxindən addım-addım resept.`, stepLabel: 'Addım' },
  en: { ogLocale: 'en_US', recipeLabel: 'Recipe', recipeDescription: (name, origin) => `${name}: a step-by-step recipe from ${origin} cuisine.`, stepLabel: 'Step' },
  tr: { ogLocale: 'tr_TR', recipeLabel: 'Tarifi', recipeDescription: (name, origin) => `${name}: ${origin} mutfağından adım adım tarif.`, stepLabel: 'Adım' },
  ru: { ogLocale: 'ru_RU', recipeLabel: 'Рецепт', recipeDescription: (name, origin) => `${name}: пошаговый рецепт кухни региона ${origin}.`, stepLabel: 'Шаг' },
  fr: { ogLocale: 'fr_FR', recipeLabel: 'Recette', recipeDescription: (name, origin) => `${name} : recette pas à pas de la cuisine ${origin}.`, stepLabel: 'Étape' },
  it: { ogLocale: 'it_IT', recipeLabel: 'Ricetta', recipeDescription: (name, origin) => `${name}: ricetta passo passo della cucina ${origin}.`, stepLabel: 'Passaggio' },
  ar: { ogLocale: 'ar_SA', recipeLabel: 'وصفة', recipeDescription: (name, origin) => `${name}: وصفة خطوة بخطوة من مطبخ ${origin}.`, stepLabel: 'الخطوة' },
  zh: { ogLocale: 'zh_CN', recipeLabel: '食谱', recipeDescription: (name, origin) => `${name}：来自${origin}菜系的分步食谱。`, stepLabel: '步骤' },
  hi: { ogLocale: 'hi_IN', recipeLabel: 'रेसिपी', recipeDescription: (name, origin) => `${name}: ${origin} व्यंजन की चरण-दर-चरण रेसिपी।`, stepLabel: 'चरण' },
  es: { ogLocale: 'es_ES', recipeLabel: 'Receta', recipeDescription: (name, origin) => `${name}: receta paso a paso de la cocina de ${origin}.`, stepLabel: 'Paso' },
  pt: { ogLocale: 'pt_PT', recipeLabel: 'Receita', recipeDescription: (name, origin) => `${name}: receita passo a passo da cozinha de ${origin}.`, stepLabel: 'Passo' },
  nl: { ogLocale: 'nl_NL', recipeLabel: 'Recept', recipeDescription: (name, origin) => `${name}: stap-voor-stap recept uit de keuken van ${origin}.`, stepLabel: 'Stap' },
  de: { ogLocale: 'de_DE', recipeLabel: 'Rezept', recipeDescription: (name, origin) => `${name}: Schritt-für-Schritt-Rezept aus der Küche von ${origin}.`, stepLabel: 'Schritt' },
  ja: { ogLocale: 'ja_JP', recipeLabel: 'レシピ', recipeDescription: (name, origin) => `${name}：${origin}料理のステップ別レシピ。`, stepLabel: '手順' },
  id: { ogLocale: 'id_ID', recipeLabel: 'Resep', recipeDescription: (name, origin) => `${name}: resep langkah demi langkah dari masakan ${origin}.`, stepLabel: 'Langkah' },
  bn: { ogLocale: 'bn_BD', recipeLabel: 'রেসিপি', recipeDescription: (name, origin) => `${name}: ${origin} রন্ধনশৈলীর ধাপে ধাপে রেসিপি।`, stepLabel: 'ধাপ' },
};

export function getSeoPath(locale: string, kind: SeoPageKind): string {
  const normalizedLocale = normalizeSiteLocale(locale);
  const localizedSegment: Record<Exclude<SeoPageKind, 'home'>, string> = {
    recipes: 'recipes',
    services: 'services',
    about: 'about',
    contact: 'contact',
    privacy: 'privacy',
    terms: 'terms',
  };
  const azPath: Record<SeoPageKind, string> = {
    home: '/',
    recipes: '/reseptler',
    services: '/xidmetler',
    about: '/haqqinda',
    contact: '/elaqe',
    privacy: '/privacy',
    terms: '/terms',
  };

  if (normalizedLocale === 'az') return azPath[kind];
  return kind === 'home'
    ? `/${normalizedLocale}`
    : `/${normalizedLocale}/${localizedSegment[kind]}`;
}

export function getAllLanguageAlternates(kind: SeoPageKind): Record<string, string> {
  const languages = Object.fromEntries(
    SITE_LOCALES.map((locale) => [locale, `${siteConfig.url}${getSeoPath(locale, kind)}`]),
  );
  const defaultPath = kind === 'home' ? getSeoPath('az', kind) : getSeoPath('en', kind);
  return { ...languages, 'x-default': `${siteConfig.url}${defaultPath}` };
}

export function withLocaleAlternates(
  locale: string,
  kind: SeoPageKind,
  metadata: Metadata,
): Metadata {
  const normalizedLocale = normalizeSiteLocale(locale);
  const canonical = `${siteConfig.url}${getSeoPath(normalizedLocale, kind)}`;
  const title = typeof metadata.title === 'string'
    ? { absolute: metadata.title }
    : metadata.title;
  const description = metadata.description ?? siteConfig.description;
  const socialTitle = typeof metadata.openGraph?.title === 'string'
    ? metadata.openGraph.title
    : typeof metadata.title === 'string'
      ? metadata.title
      : siteConfig.name;
  const socialDescription = metadata.openGraph?.description ?? description;
  const socialImage = {
    url: `${siteConfig.url}/images/chef-ilhama-social.jpg`,
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — Azerbaijani cuisine`,
  };

  return {
    ...metadata,
    title,
    description,
    robots: metadata.robots ?? {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      ...metadata.alternates,
      canonical,
      languages: getAllLanguageAlternates(kind),
    },
    openGraph: {
      ...metadata.openGraph,
      title: socialTitle,
      description: socialDescription,
      type: 'website',
      siteName: metadata.openGraph?.siteName ?? siteConfig.name,
      images: metadata.openGraph?.images ?? [socialImage],
      locale: SEO_LOCALE_CONFIG[normalizedLocale].ogLocale,
      alternateLocale: SITE_LOCALES
        .filter((item) => item !== normalizedLocale)
        .map((item) => SEO_LOCALE_CONFIG[item].ogLocale),
      url: canonical,
    } as Metadata['openGraph'],
    twitter: {
      ...metadata.twitter,
      card: 'summary_large_image',
      title: metadata.twitter?.title ?? socialTitle,
      description: metadata.twitter?.description ?? description,
      images: metadata.twitter?.images ?? [socialImage.url],
    } as Metadata['twitter'],
  };
}

export function getLocalizedRecipePath(locale: string, slug: string): string {
  const normalizedLocale = normalizeSiteLocale(locale);
  return normalizedLocale === 'az'
    ? `/resept/${slug}`
    : `/${normalizedLocale}/recipe/${slug}`;
}

export function getIndexableRecipeAlternates(slug: string): Record<string, string> {
  return {
    az: `${siteConfig.url}${getLocalizedRecipePath('az', slug)}`,
    en: `${siteConfig.url}${getLocalizedRecipePath('en', slug)}`,
    'x-default': `${siteConfig.url}${getLocalizedRecipePath('en', slug)}`,
  };
}

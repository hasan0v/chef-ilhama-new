import type { Metadata } from 'next';
import type { Recipe } from '@/types/recipe';
import { normalizeSiteLocale, type SiteLocale } from '@/lib/localeRoutes';
import {
  getIndexableRecipeAlternates,
  getLocalizedRecipePath,
  getSeoPath,
  SEO_LOCALE_CONFIG,
} from '@/lib/seoLocales';
import { siteConfig } from '@/lib/site';

const INDEXABLE_RECIPE_LOCALES = new Set<SiteLocale>(['az', 'en']);

export function getRecipeMetadata(recipe: Recipe, locale: string): Metadata {
  const normalizedLocale = normalizeSiteLocale(locale);
  const config = SEO_LOCALE_CONFIG[normalizedLocale];
  const isIndexable = INDEXABLE_RECIPE_LOCALES.has(normalizedLocale);
  const indexLocale: SiteLocale = isIndexable ? normalizedLocale : 'en';
  const canonical = `${siteConfig.url}${getLocalizedRecipePath(indexLocale, recipe.slug)}`;
  const pageUrl = `${siteConfig.url}${getLocalizedRecipePath(normalizedLocale, recipe.slug)}`;
  const description = (recipe.history?.trim() || config.recipeDescription(recipe.name, recipe.origin))
    .replace(/\s+/g, ' ')
    .slice(0, 160);
  const title = `${recipe.name} ${config.recipeLabel} — ${recipe.origin}`;
  const image = recipe.image || `${siteConfig.url}/ilhama.png`;

  return {
    title,
    description,
    keywords: [recipe.name, `${recipe.name} recipe`, recipe.origin, recipe.category, recipe.cuisine]
      .filter(Boolean) as string[],
    authors: [{
      name: siteConfig.name,
      url: `${siteConfig.url}${getSeoPath(normalizedLocale, 'about')}`,
    }],
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: {
        index: isIndexable,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical,
      languages: getIndexableRecipeAlternates(recipe.slug),
    },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: config.ogLocale,
      url: pageUrl,
      siteName: siteConfig.name,
      images: [{
        url: image,
        width: 1200,
        height: 630,
        alt: `${recipe.name} — ${recipe.origin}`,
      }],
      section: recipe.category,
      tags: [recipe.name, recipe.origin, recipe.category, recipe.cuisine].filter(Boolean) as string[],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

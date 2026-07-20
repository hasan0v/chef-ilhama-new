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
import { getRecipeImageVariantUrl } from '@/lib/recipeImageVariants';
import {
  getSearchFocusedRecipeDescription,
  getSearchFocusedRecipeTitle,
} from '@/lib/recipeSearchDemand';

const INDEXABLE_RECIPE_LOCALES = new Set<SiteLocale>(['az', 'en']);

export function getRecipeMetadata(recipe: Recipe, locale: string): Metadata {
  const normalizedLocale = normalizeSiteLocale(locale);
  const config = SEO_LOCALE_CONFIG[normalizedLocale];
  const isIndexable = INDEXABLE_RECIPE_LOCALES.has(normalizedLocale);
  const indexLocale: SiteLocale = isIndexable ? normalizedLocale : 'en';
  const canonical = `${siteConfig.url}${getLocalizedRecipePath(indexLocale, recipe.slug)}`;
  const pageUrl = `${siteConfig.url}${getLocalizedRecipePath(normalizedLocale, recipe.slug)}`;
  const description = getSearchFocusedRecipeDescription(recipe, normalizedLocale);
  const title = getSearchFocusedRecipeTitle(recipe, normalizedLocale);
  const image = getRecipeImageVariantUrl(recipe.slug, '16x9');

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
        height: 675,
        alt: `${recipe.name} — ${recipe.origin}`,
      }],
      section: recipe.category,
      tags: [recipe.name, recipe.origin, recipe.category, recipe.cuisine].filter(Boolean) as string[],
      publishedTime: recipe.createdAt,
      modifiedTime: recipe.updatedAt,
      authors: [`${siteConfig.url}${getSeoPath(normalizedLocale, 'about')}`],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

import type { MetadataRoute } from 'next';
import { getRecipes } from '@/lib/recipes';
import { SITE_LOCALES, type SiteLocale } from '@/lib/localeRoutes';
import {
  getAllLanguageAlternates,
  getIndexableRecipeAlternates,
  getLocalizedRecipePath,
  getSeoPath,
  type SeoPageKind,
} from '@/lib/seoLocales';
import { siteConfig } from '@/lib/site';
import { getCollectionPath, getCollectionsPath, recipeCollections } from '@/lib/recipeCollections';

// Keep the sitemap current as recipes are added and avoid opening another DB
// session during Next's highly parallel static-generation phase.
export const dynamic = 'force-dynamic';

const staticPageSettings: Array<{
  kind: SeoPageKind;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { kind: 'home', changeFrequency: 'weekly', priority: 1 },
  { kind: 'recipes', changeFrequency: 'daily', priority: 0.9 },
  { kind: 'services', changeFrequency: 'monthly', priority: 0.8 },
  { kind: 'about', changeFrequency: 'monthly', priority: 0.7 },
  { kind: 'contact', changeFrequency: 'monthly', priority: 0.6 },
  { kind: 'privacy', changeFrequency: 'yearly', priority: 0.3 },
  { kind: 'terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getRecipes('az');

  const staticPages: MetadataRoute.Sitemap = SITE_LOCALES.flatMap((locale) =>
    staticPageSettings.map(({ kind, changeFrequency, priority }) => ({
      url: `${siteConfig.url}${getSeoPath(locale, kind)}`,
      changeFrequency,
      priority: locale === 'az' ? priority : Math.max(0.2, priority - 0.1),
      alternates: { languages: getAllLanguageAlternates(kind) },
    })),
  );

  const indexableRecipeLocales: SiteLocale[] = ['az', 'en'];
  const recipePages: MetadataRoute.Sitemap = recipes.flatMap((recipe) =>
    indexableRecipeLocales.map((locale) => ({
      url: `${siteConfig.url}${getLocalizedRecipePath(locale, recipe.slug)}`,
      lastModified: recipe.updatedAt ? new Date(recipe.updatedAt) : undefined,
      changeFrequency: 'weekly' as const,
      priority: locale === 'az' ? 0.8 : 0.75,
      images: recipe.image ? [recipe.image] : undefined,
      alternates: { languages: getIndexableRecipeAlternates(recipe.slug) },
    })),
  );

  const collectionIndexes: MetadataRoute.Sitemap = (['az', 'en'] as const).map((locale) => ({
    url: `${siteConfig.url}${getCollectionsPath(locale)}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
    alternates: {
      languages: {
        az: `${siteConfig.url}${getCollectionsPath('az')}`,
        en: `${siteConfig.url}${getCollectionsPath('en')}`,
        'x-default': `${siteConfig.url}${getCollectionsPath('en')}`,
      },
    },
  }));

  const collectionPages: MetadataRoute.Sitemap = recipeCollections.flatMap((collection) =>
    (['az', 'en'] as const).map((locale) => ({
      url: `${siteConfig.url}${getCollectionPath(locale, collection.slug)}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      images: [`${siteConfig.url}/images/recipes/global/${collection.recipeSlugs[0]}.webp`],
      alternates: {
        languages: {
          az: `${siteConfig.url}${getCollectionPath('az', collection.slug)}`,
          en: `${siteConfig.url}${getCollectionPath('en', collection.slug)}`,
          'x-default': `${siteConfig.url}${getCollectionPath('en', collection.slug)}`,
        },
      },
    })),
  );

  return [...staticPages, ...collectionIndexes, ...collectionPages, ...recipePages];
}

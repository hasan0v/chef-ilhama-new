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
import { getGuidePath } from '@/lib/underrepresentedDishesGuide';
import { getRecipeImageVariantUrl } from '@/lib/recipeImageVariants';
import { RECIPE_SLUG_FALLBACK } from '@/lib/recipeSlugFallback';

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
  const recipeIndex = recipes.length > 0
    ? recipes.map((recipe) => ({ slug: recipe.slug, updatedAt: recipe.updatedAt }))
    : RECIPE_SLUG_FALLBACK.map((slug) => ({ slug, updatedAt: undefined }));

  const staticPages: MetadataRoute.Sitemap = SITE_LOCALES.flatMap((locale) =>
    staticPageSettings.map(({ kind, changeFrequency, priority }) => ({
      url: `${siteConfig.url}${getSeoPath(locale, kind)}`,
      changeFrequency,
      priority: locale === 'az' ? priority : Math.max(0.2, priority - 0.1),
      alternates: { languages: getAllLanguageAlternates(kind) },
    })),
  );

  const indexableRecipeLocales: SiteLocale[] = ['az', 'en'];
  const recipePages: MetadataRoute.Sitemap = recipeIndex.flatMap((recipe) =>
    indexableRecipeLocales.map((locale) => ({
      url: `${siteConfig.url}${getLocalizedRecipePath(locale, recipe.slug)}`,
      lastModified: recipe.updatedAt ? new Date(recipe.updatedAt) : undefined,
      changeFrequency: 'weekly' as const,
      priority: locale === 'az' ? 0.8 : 0.75,
      images: (['1x1', '4x3', '16x9'] as const).map((variant) =>
        getRecipeImageVariantUrl(recipe.slug, variant)),
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
      images: [getRecipeImageVariantUrl(collection.recipeSlugs[0], '16x9')],
      alternates: {
        languages: {
          az: `${siteConfig.url}${getCollectionPath('az', collection.slug)}`,
          en: `${siteConfig.url}${getCollectionPath('en', collection.slug)}`,
          'x-default': `${siteConfig.url}${getCollectionPath('en', collection.slug)}`,
        },
      },
    })),
  );

  const editorialGuides: MetadataRoute.Sitemap = (['az', 'en'] as const).map((locale) => ({
    url: `${siteConfig.url}${getGuidePath(locale)}`,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
    images: [`${siteConfig.url}/images/recipes/global/vori-vori-paraguayan-chicken-soup.webp`],
    alternates: {
      languages: {
        az: `${siteConfig.url}${getGuidePath('az')}`,
        en: `${siteConfig.url}${getGuidePath('en')}`,
        'x-default': `${siteConfig.url}${getGuidePath('en')}`,
      },
    },
  }));

  // A focused local-service landing page for people who are ready to book a
  // chef. It intentionally has one Azerbaijani canonical instead of thin
  // locale clones, because its audience and booking flow are local.
  const localChefServiceLanding: MetadataRoute.Sitemap = [{
    url: `${siteConfig.url}/aspaz-xidmeti-baki`,
    changeFrequency: 'monthly',
    priority: 0.88,
    images: [`${siteConfig.url}/ilhama.png`],
  }];

  return [
    ...staticPages,
    ...localChefServiceLanding,
    ...editorialGuides,
    ...collectionIndexes,
    ...collectionPages,
    ...recipePages,
  ];
}

import { siteConfig } from '@/lib/site';

export const RECIPE_IMAGE_VARIANTS = {
  '1x1': { width: 1200, height: 1200 },
  '4x3': { width: 1200, height: 900 },
  '16x9': { width: 1200, height: 675 },
} as const;

export type RecipeImageVariant = keyof typeof RECIPE_IMAGE_VARIANTS;

export function getRecipeImageVariantPath(slug: string, variant: RecipeImageVariant) {
  return `/media/recipes/${encodeURIComponent(slug)}/${variant}.jpg`;
}

export function getRecipeImageVariantUrl(slug: string, variant: RecipeImageVariant) {
  return `${siteConfig.url}${getRecipeImageVariantPath(slug, variant)}`;
}

export function getRecipeImageObjects(slug: string, caption: string) {
  return (Object.entries(RECIPE_IMAGE_VARIANTS) as Array<[
    RecipeImageVariant,
    (typeof RECIPE_IMAGE_VARIANTS)[RecipeImageVariant],
  ]>).map(([variant, dimensions]) => ({
    '@type': 'ImageObject',
    url: getRecipeImageVariantUrl(slug, variant),
    contentUrl: getRecipeImageVariantUrl(slug, variant),
    caption,
    ...dimensions,
  }));
}

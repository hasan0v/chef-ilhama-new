import type { Recipe } from '@/types/recipe';

const AZERBAIJANI_ORIGIN_PATTERN = /azərbaycan|azerbaijan/i;

// Stable editorial order for the homepage. These are recognisable Azerbaijani
// classics with strong existing search demand and complete recipe pages.
const HOMEPAGE_AZERBAIJANI_PRIORITY = [
  'lule-kabab',
  'yarpaq-dolmasi',
  'piti',
  'fisincan-plov',
  'dovga',
  'gurze',
  'goyerti-qutabi-kete',
  'dusbere',
  'bozbas',
] as const;

const homepagePriority = new Map<string, number>(
  HOMEPAGE_AZERBAIJANI_PRIORITY.map((slug, index) => [slug, index]),
);

export function isAzerbaijaniRecipe(recipe: Recipe): boolean {
  return [recipe.origin, recipe.region, recipe.cuisine]
    .filter(Boolean)
    .some((value) => AZERBAIJANI_ORIGIN_PATTERN.test(value as string));
}

export function getHomepageFeaturedRecipes(recipes: Recipe[], limit = 6): Recipe[] {
  return recipes
    .filter(isAzerbaijaniRecipe)
    .map((recipe, originalIndex) => ({
      recipe,
      originalIndex,
      priority: homepagePriority.get(recipe.slug) ?? Number.MAX_SAFE_INTEGER,
    }))
    .sort(
      (a, b) =>
        a.priority - b.priority
        || Number(Boolean(b.recipe.featured)) - Number(Boolean(a.recipe.featured))
        || a.originalIndex - b.originalIndex,
    )
    .slice(0, limit)
    .map(({ recipe }) => recipe);
}

export function getHomepageLatestRecipes(
  recipes: Recipe[],
  excludedRecipeIds: ReadonlySet<string>,
  limit = 4,
): Recipe[] {
  return recipes
    .filter((recipe) => isAzerbaijaniRecipe(recipe) && !excludedRecipeIds.has(recipe.id))
    .slice(0, limit);
}

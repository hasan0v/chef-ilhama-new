import { Recipe } from '@/types/recipe';
import { recipeService } from '@/database/services';

// Cache recipes for 5 minutes
// Cache recipes by locale
const recipesCache = new Map<string, { data: Recipe[]; timestamp: number }>();
const recipesInFlight = new Map<string, Promise<Recipe[]>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const DATABASE_RETRY_DELAYS = [350, 900];

function waitForDatabaseRetry(delay: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, delay));
}

export async function getRecipes(locale?: string): Promise<Recipe[]> {
  try {
    const lang = locale || 'az';
    const cached = recipesCache.get(lang);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    // Several server components request recipes, categories and stats together.
    // Share the same pending query so they do not stampede a one-connection DB
    // pool before the cache has been populated.
    const pending = recipesInFlight.get(lang);
    if (pending) return pending;

    const request = (async () => {
      for (let attempt = 0; attempt <= DATABASE_RETRY_DELAYS.length; attempt += 1) {
        const result = await recipeService.getAllRecipes({ locale: lang, limit: 500 });
        if (result.recipes.length > 0 || result.total > 0) {
          recipesCache.set(lang, { data: result.recipes, timestamp: Date.now() });
          return result.recipes;
        }

        const delay = DATABASE_RETRY_DELAYS[attempt];
        if (delay) await waitForDatabaseRetry(delay);
      }

      // Never overwrite a known-good cache with a transient empty response.
      return recipesCache.get(lang)?.data ?? [];
    })().finally(() => recipesInFlight.delete(lang));

    recipesInFlight.set(lang, request);
    return await request;
  } catch (error) {
    console.error('Error loading recipes:', error);
    return recipesCache.get(locale || 'az')?.data || [];
  }
}

// Cache individual recipes by locale + slug
const recipeBySlugCache = new Map<string, { data: Recipe; timestamp: number }>();
const RECIPE_BY_SLUG_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getRecipeBySlug(slug: string, locale?: string): Promise<Recipe | null> {
  try {
    const lang = locale || 'az';
    const key = `${lang}:${slug}`;
    const cached = recipeBySlugCache.get(key);
    if (cached && Date.now() - cached.timestamp < RECIPE_BY_SLUG_CACHE_DURATION) {
      return cached.data;
    }
    
    let recipe: Recipe | null = null;
    for (let attempt = 0; attempt <= DATABASE_RETRY_DELAYS.length; attempt += 1) {
      recipe = await recipeService.getRecipeBySlug(slug, lang);
      if (recipe) break;
      const delay = DATABASE_RETRY_DELAYS[attempt];
      if (delay) await waitForDatabaseRetry(delay);
    }
    
    if (recipe) {
      // Update cache
      recipeBySlugCache.set(key, {
        data: recipe,
        timestamp: Date.now()
      });
    }
    
    return recipe;
  } catch (error) {
    console.error('Error getting recipe by slug:', error);
    const key = `${locale || 'az'}:${slug}`;
    return recipeBySlugCache.get(key)?.data || null;
  }
}

// Cache featured recipes by locale
const featuredCache = new Map<string, { data: Recipe[]; timestamp: number }>();
const FEATURED_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getFeaturedRecipes(locale?: string): Promise<Recipe[]> {
  try {
    const lang = locale || 'az';
    const cached = featuredCache.get(lang);
    if (cached && Date.now() - cached.timestamp < FEATURED_CACHE_DURATION) {
      return cached.data;
    }
    
    const recipes = (await getRecipes(lang)).filter((recipe) => recipe.featured).slice(0, 6);
    
    // Update cache
    featuredCache.set(lang, {
      data: recipes,
      timestamp: Date.now()
    });
    
    return recipes;
  } catch (error) {
    console.error('Error getting featured recipes:', error);
    return featuredCache.get(locale || 'az')?.data || [];
  }
}

export async function getRecipesByCategory(category: string, locale?: string): Promise<Recipe[]> {
  try {
    return await recipeService.getRecipesByCategory(category, 10, locale);
  } catch (error) {
    console.error('Error getting recipes by category:', error);
    return [];
  }
}

export async function getRecipesByRegion(region: string, locale?: string): Promise<Recipe[]> {
  try {
    return await recipeService.getRecipesByRegion(region, 10, locale);
  } catch (error) {
    console.error('Error getting recipes by region:', error);
    return [];
  }
}

// Cache categories by locale
const categoriesCache = new Map<string, { data: string[]; timestamp: number }>();
const CATEGORIES_CACHE_DURATION = 20 * 60 * 1000; // 20 minutes

// Get unique categories
export async function getCategories(locale?: string): Promise<string[]> {
  try {
    const lang = locale || 'az';
    const cached = categoriesCache.get(lang);
    if (cached && Date.now() - cached.timestamp < CATEGORIES_CACHE_DURATION) {
      return cached.data;
    }
    
    const categories = Array.from(
      new Set((await getRecipes(lang)).map((recipe) => recipe.category).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b, lang));
    
    // Update cache
    categoriesCache.set(lang, {
      data: categories,
      timestamp: Date.now()
    });
    
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return categoriesCache.get(locale || 'az')?.data || [];
  }
}

// Cache regions by locale
const regionsCache = new Map<string, { data: string[]; timestamp: number }>();
const REGIONS_CACHE_DURATION = 20 * 60 * 1000; // 20 minutes

// Get unique regions
export async function getRegions(locale?: string): Promise<string[]> {
  try {
    const lang = locale || 'az';
    const cached = regionsCache.get(lang);
    if (cached && Date.now() - cached.timestamp < REGIONS_CACHE_DURATION) {
      return cached.data;
    }
    
    const recipes = await getRecipes(lang);
    const regions = Array.from(
      new Set(recipes.flatMap((recipe) => [recipe.origin, recipe.region]).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b, lang));
    
    // Update cache
    regionsCache.set(lang, {
      data: regions,
      timestamp: Date.now()
    });
    
    return regions;
  } catch (error) {
    console.error('Error getting regions:', error);
    return regionsCache.get(locale || 'az')?.data || [];
  }
}

// Get recipe statistics - optimized single-pass
export async function getRecipeStats(locale?: string) {
  try {
    const lang = locale || 'az';
    const allRecipes = await getRecipes(lang);
    const categories = new Set(allRecipes.map((recipe) => recipe.category).filter(Boolean));
    const regions = new Set(
      allRecipes.flatMap((recipe) => [recipe.origin, recipe.region]).filter(Boolean),
    );
    
    // Single pass for difficulty breakdown
    const difficultyBreakdown = { easy: 0, medium: 0, hard: 0 };
    for (const r of allRecipes) {
      const diff = r.difficulty;
      if (diff === 'Asan' || diff === 'Easy') difficultyBreakdown.easy++;
      else if (diff === 'Orta' || diff === 'Medium') difficultyBreakdown.medium++;
      else if (diff === 'Çətin' || diff === 'Hard') difficultyBreakdown.hard++;
    }
    
    return {
      totalRecipes: allRecipes.length,
      totalCategories: categories.size,
      totalRegions: regions.size,
      featuredRecipes: allRecipes.filter((recipe) => recipe.featured).length,
      difficultyBreakdown
    };
  } catch (error) {
    console.error('Error getting recipe stats:', error);
    return {
      totalRecipes: 0,
      totalCategories: 0,
      totalRegions: 0,
      featuredRecipes: 0,
      difficultyBreakdown: {
        easy: 0,
        medium: 0,
        hard: 0
      }
    };
  }
}

// Search recipes
export async function searchRecipes(query: string, locale?: string): Promise<Recipe[]> {
  try {
    return await recipeService.searchRecipes(query, 20, locale);
  } catch (error) {
    console.error('Error searching recipes:', error);
    return [];
  }
}

// Preload critical resources
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return;
  
  // Preload featured recipes
  getFeaturedRecipes().catch(() => {});
  
  // Preload stats
  getRecipeStats().catch(() => {});
  
  // Preload categories and regions
  Promise.all([
    getCategories(),
    getRegions()
  ]).catch(() => {});
}

// Clear all caches (useful for development or when data updates)
export function clearAllCaches() {
  recipesCache.clear();
  recipesInFlight.clear();
  featuredCache.clear();
  categoriesCache.clear();
  regionsCache.clear();
  recipeBySlugCache.clear();
}

export function getRelatedRecipes(recipe: Recipe, recipes: Recipe[], limit = 3): Recipe[] {
  const recipeTags = new Set(recipe.tags.map((tag) => tag.toLowerCase()));

  return recipes
    .filter((candidate) => candidate.slug !== recipe.slug)
    .map((candidate) => {
      const sharedTags = candidate.tags.reduce(
        (count, tag) => count + (recipeTags.has(tag.toLowerCase()) ? 1 : 0),
        0,
      );
      const score =
        sharedTags * 3 +
        (candidate.category === recipe.category ? 3 : 0) +
        (candidate.region === recipe.region ? 4 : 0) +
        (candidate.origin === recipe.origin ? 5 : 0) +
        (candidate.featured ? 1 : 0);

      return { candidate, score };
    })
    .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

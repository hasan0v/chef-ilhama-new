import { Recipe } from '@/types/recipe';
import { recipeService } from '@/database/services';

// Cache recipes for 5 minutes
// Cache recipes by locale
const recipesCache = new Map<string, { data: Recipe[]; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getRecipes(locale?: string): Promise<Recipe[]> {
  try {
    const lang = locale || 'az';
    const cached = recipesCache.get(lang);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
    
    // The public catalog and sitemap must not silently inherit the service's
    // paginated 50-row default. Client-side catalog filtering needs the full set.
    const result = await recipeService.getAllRecipes({ locale: lang, limit: 500 });
    
    // Update cache
    recipesCache.set(lang, {
      data: result.recipes,
      timestamp: Date.now()
    });
    
    return result.recipes;
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
    
    const recipe = await recipeService.getRecipeBySlug(slug, lang);
    
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
    
    const recipes = await recipeService.getFeaturedRecipes(6, lang);
    
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
    
    const categories = await recipeService.getCategories(lang);
    
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
    
    const regions = await recipeService.getRegions(lang);
    
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
    const [stats, categories, regions, allRecipes] = await Promise.all([
      recipeService.getStats(),
      recipeService.getCategories(lang),
      recipeService.getRegions(lang),
      getRecipes(lang) // Uses cached data
    ]);
    
    // Single pass for difficulty breakdown
    const difficultyBreakdown = { easy: 0, medium: 0, hard: 0 };
    for (const r of allRecipes) {
      const diff = r.difficulty;
      if (diff === 'Asan' || diff === 'Easy') difficultyBreakdown.easy++;
      else if (diff === 'Orta' || diff === 'Medium') difficultyBreakdown.medium++;
      else if (diff === 'Çətin' || diff === 'Hard') difficultyBreakdown.hard++;
    }
    
    return {
      totalRecipes: stats.totalRecipes,
      totalCategories: categories.length,
      totalRegions: regions.length,
      featuredRecipes: stats.featuredRecipes,
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
  featuredCache.clear();
  categoriesCache.clear();
  regionsCache.clear();
  recipeBySlugCache.clear();
}

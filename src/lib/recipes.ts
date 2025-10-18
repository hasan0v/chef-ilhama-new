import { Recipe } from '@/types/recipe';
import { recipeService } from '@/database/services';

// Cache recipes for 5 minutes
let recipesCache: { data: Recipe[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function getRecipes(): Promise<Recipe[]> {
  try {
    // Check cache first
    if (recipesCache && Date.now() - recipesCache.timestamp < CACHE_DURATION) {
      return recipesCache.data;
    }
    
    const result = await recipeService.getAllRecipes();
    
    // Update cache
    recipesCache = {
      data: result.recipes,
      timestamp: Date.now()
    };
    
    return result.recipes;
  } catch (error) {
    console.error('Error loading recipes:', error);
    return recipesCache?.data || [];
  }
}

// Cache individual recipes for 10 minutes
const recipeBySlugCache = new Map<string, { data: Recipe; timestamp: number }>();
const RECIPE_BY_SLUG_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    // Check cache first
    const cached = recipeBySlugCache.get(slug);
    if (cached && Date.now() - cached.timestamp < RECIPE_BY_SLUG_CACHE_DURATION) {
      return cached.data;
    }
    
    const recipe = await recipeService.getRecipeBySlug(slug);
    
    if (recipe) {
      // Update cache
      recipeBySlugCache.set(slug, {
        data: recipe,
        timestamp: Date.now()
      });
    }
    
    return recipe;
  } catch (error) {
    console.error('Error getting recipe by slug:', error);
    // Try to return from cache even if expired
    const cached = recipeBySlugCache.get(slug);
    return cached?.data || null;
  }
}

// Cache featured recipes for 10 minutes
let featuredCache: { data: Recipe[]; timestamp: number } | null = null;
const FEATURED_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

export async function getFeaturedRecipes(): Promise<Recipe[]> {
  try {
    // Check cache first
    if (featuredCache && Date.now() - featuredCache.timestamp < FEATURED_CACHE_DURATION) {
      return featuredCache.data;
    }
    
    const recipes = await recipeService.getFeaturedRecipes();
    
    // Update cache
    featuredCache = {
      data: recipes,
      timestamp: Date.now()
    };
    
    return recipes;
  } catch (error) {
    console.error('Error getting featured recipes:', error);
    return featuredCache?.data || [];
  }
}

export async function getRecipesByCategory(category: string): Promise<Recipe[]> {
  try {
    return await recipeService.getRecipesByCategory(category);
  } catch (error) {
    console.error('Error getting recipes by category:', error);
    return [];
  }
}

export async function getRecipesByRegion(region: string): Promise<Recipe[]> {
  try {
    return await recipeService.getRecipesByRegion(region);
  } catch (error) {
    console.error('Error getting recipes by region:', error);
    return [];
  }
}

// Cache categories for 20 minutes
let categoriesCache: { data: string[]; timestamp: number } | null = null;
const CATEGORIES_CACHE_DURATION = 20 * 60 * 1000; // 20 minutes

// Get unique categories
export async function getCategories(): Promise<string[]> {
  try {
    // Check cache first
    if (categoriesCache && Date.now() - categoriesCache.timestamp < CATEGORIES_CACHE_DURATION) {
      return categoriesCache.data;
    }
    
    const categories = await recipeService.getCategories();
    
    // Update cache
    categoriesCache = {
      data: categories,
      timestamp: Date.now()
    };
    
    return categories;
  } catch (error) {
    console.error('Error getting categories:', error);
    return categoriesCache?.data || [];
  }
}

// Cache regions for 20 minutes
let regionsCache: { data: string[]; timestamp: number } | null = null;
const REGIONS_CACHE_DURATION = 20 * 60 * 1000; // 20 minutes

// Get unique regions
export async function getRegions(): Promise<string[]> {
  try {
    // Check cache first
    if (regionsCache && Date.now() - regionsCache.timestamp < REGIONS_CACHE_DURATION) {
      return regionsCache.data;
    }
    
    const regions = await recipeService.getRegions();
    
    // Update cache
    regionsCache = {
      data: regions,
      timestamp: Date.now()
    };
    
    return regions;
  } catch (error) {
    console.error('Error getting regions:', error);
    return regionsCache?.data || [];
  }
}

// Get recipe statistics
export async function getRecipeStats() {
  try {
    const stats = await recipeService.getStats();
    const categories = await recipeService.getCategories();
    const regions = await recipeService.getRegions();
    
    // Get difficulty breakdown by fetching recipes
    const allRecipes = await recipeService.getAllRecipes();
    const recipes = allRecipes.recipes;
    
    return {
      totalRecipes: stats.totalRecipes,
      totalCategories: categories.length,
      totalRegions: regions.length,
      featuredRecipes: stats.featuredRecipes,
      difficultyBreakdown: {
        easy: recipes.filter(r => r.difficulty === 'Asan').length,
        medium: recipes.filter(r => r.difficulty === 'Orta').length,
        hard: recipes.filter(r => r.difficulty === 'Çətin').length
      }
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
export async function searchRecipes(query: string): Promise<Recipe[]> {
  try {
    return await recipeService.searchRecipes(query);
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
  recipesCache = null;
  featuredCache = null;
  categoriesCache = null;
  regionsCache = null;
  recipeBySlugCache.clear();
}
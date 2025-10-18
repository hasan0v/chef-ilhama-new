import { Recipe } from '@/types/recipe';

// Utility function to create URL-friendly slugs
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ə]/g, 'e')
    .replace(/[ı]/g, 'i')
    .replace(/[ö]/g, 'o')
    .replace(/[ü]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ğ]/g, 'g')
    .replace(/[ş]/g, 's')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Utility function to split ingredients and instructions into arrays
function parseMultilineText(text: string): string[] {
  if (!text) return [];
  
  // Split by common delimiters and clean up
  return text
    .split(/[,\n\r]/)
    .map(item => item.trim())
    .filter(item => item.length > 0);
}

// Extract tags from various fields
function extractTags(recipe: Partial<Recipe>): string[] {
  const tags = new Set<string>();
  
  // Add category as tag
  if (recipe.category) {
    tags.add(recipe.category);
  }
  
  // Add region as tag
  if (recipe.origin) {
    const regions = recipe.origin.split(',').map(r => r.trim());
    regions.forEach(region => tags.add(region));
  }
  
  // Add difficulty as tag
  if (recipe.difficulty) {
    tags.add(recipe.difficulty);
  }
  
  // Extract cooking method tags from instructions
  if (recipe.instructions) {
    const methodKeywords = ['qızart', 'biş', 'qayna', 'bux', 'soba', 'manqal', 'təndir'];
    const instructionText = recipe.instructions.join(' ').toLowerCase();
    
    methodKeywords.forEach(keyword => {
      if (instructionText.includes(keyword)) {
        tags.add(keyword);
      }
    });
  }
  
  return Array.from(tags);
}

// Parse preparation time to standardized format
function parsePreparationTime(timeStr: string): string {
  if (!timeStr) return '';
  
  // Normalize common time formats
  return timeStr
    .replace(/saat/g, 'saat')
    .replace(/dəqiqə/g, 'dəq')
    .replace(/dəq/g, 'dəq')
    .trim();
}

// Main function to process CSV data into Recipe objects
export function processRecipesData(csvData: string): Recipe[] {
  const lines = csvData.trim().split('\n');
  
  const recipes: Recipe[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const row = lines[i];
    if (!row.trim()) continue;
    
    // Parse CSV row - handle quoted fields
    const fields: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < row.length; j++) {
      const char = row[j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    fields.push(current.trim());
    
    // Map fields to recipe object
    const rawRecipe = {
      name: fields[0] || '',
      origin: fields[1] || '',
      category: fields[2] || '',
      ingredientsRaw: fields[3] || '',
      instructionsRaw: fields[4] || '',
      prepTime: fields[5] || '',
      difficulty: fields[6] as 'Asan' | 'Orta' | 'Çətin' || 'Orta',
      servings: fields[7] || '',
      history: fields[8] || '',
      servingSuggestions: fields[9] || '',
      image: fields[10] || ''
    };
    
    // Process into structured recipe
    const recipe: Recipe = {
      id: `recipe-${i}`,
      name: rawRecipe.name,
      origin: rawRecipe.origin,
      region: '', // No separate region field in current CSV structure
      category: rawRecipe.category,
      ingredients: parseMultilineText(rawRecipe.ingredientsRaw),
      instructions: parseMultilineText(rawRecipe.instructionsRaw),
      prepTime: parsePreparationTime(rawRecipe.prepTime),
      difficulty: rawRecipe.difficulty,
      servings: rawRecipe.servings,
      history: rawRecipe.history,
      servingSuggestions: rawRecipe.servingSuggestions,
      image: rawRecipe.image,
      slug: createSlug(rawRecipe.name),
      tags: [],
      featured: false
    };
    
    // Generate tags
    recipe.tags = extractTags(recipe);
    
    // Mark some recipes as featured (e.g., first few from each category)
    if (i <= 6) {
      recipe.featured = true;
    }
    
    recipes.push(recipe);
  }
  
  return recipes;
}

// Search function using fuzzy search
export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes;
  
  const searchTerm = query.toLowerCase();
  
  return recipes.filter(recipe => {
    return (
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.origin.toLowerCase().includes(searchTerm) ||
      recipe.category.toLowerCase().includes(searchTerm) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm)) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  });
}

// Filter interface
interface RecipeFilters {
  category?: string[];
  difficulty?: string[];
  region?: string[];
  ingredients?: string[];
  cookingTime?: { min: number; max: number };
  rating?: number;
}

// Filter function
export function filterRecipes(recipes: Recipe[], filters: RecipeFilters): Recipe[] {
  return recipes.filter(recipe => {
    // Category filter
    if (filters.category && filters.category.length > 0 && !filters.category.includes(recipe.category)) {
      return false;
    }
    
    // Difficulty filter
    if (filters.difficulty && filters.difficulty.length > 0 && !filters.difficulty.includes(recipe.difficulty)) {
      return false;
    }
    
    // Region filter
    if (filters.region && filters.region.length > 0) {
      const hasMatchingRegion = filters.region.some((region: string) => 
        recipe.origin.includes(region)
      );
      if (!hasMatchingRegion) return false;
    }
    
    // Ingredients filter
    if (filters.ingredients && filters.ingredients.length > 0) {
      const hasMatchingIngredient = filters.ingredients.some((ingredient: string) =>
        recipe.ingredients.some(recipeIng => 
          recipeIng.toLowerCase().includes(ingredient.toLowerCase())
        )
      );
      if (!hasMatchingIngredient) return false;
    }
    
    return true;
  });
}

// Sort function
export function sortRecipes(recipes: Recipe[], sortBy: string, order: 'asc' | 'desc' = 'asc'): Recipe[] {
  const sorted = [...recipes].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'alphabetical':
        comparison = a.name.localeCompare(b.name, 'az');
        break;
      case 'difficulty':
        const difficultyOrder = { 'Asan': 1, 'Orta': 2, 'Çətin': 3 };
        comparison = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        break;
      case 'prepTime':
        // Simple time comparison (assuming times are in consistent format)
        comparison = a.prepTime.localeCompare(b.prepTime);
        break;
      default:
        comparison = a.name.localeCompare(b.name, 'az');
    }
    
    return order === 'desc' ? -comparison : comparison;
  });
  
  return sorted;
}
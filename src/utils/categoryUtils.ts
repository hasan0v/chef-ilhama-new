// Utility functions for handling split categories
export interface CategoryItem {
  name: string;
  count: number;
}

/**
 * Split categories that contain "/" into separate categories
 * Example: "Sıyıq/Tərəvəz yeməyi" -> ["Sıyıq", "Tərəvəz yeməyi"]
 */
export function splitCategories(category: string): string[] {
  if (!category) return [];
  return category.split('/').map(cat => cat.trim()).filter(Boolean);
}

/**
 * Check if a recipe matches any of the split categories
 */
export function recipeMatchesCategory(recipeCategory: string, selectedCategory: string): boolean {
  if (!selectedCategory) return true;
  
  const recipeCats = splitCategories(recipeCategory);
  const selectedCats = splitCategories(selectedCategory);
  
  // Check if any of the recipe's categories match any of the selected categories
  return recipeCats.some(recipeCat => 
    selectedCats.some(selectedCat => 
      recipeCat.toLowerCase() === selectedCat.toLowerCase()
    )
  );
}

/**
 * Get all unique categories from recipes, splitting combined categories
 */
export function extractAllCategories(recipes: { category: string }[]): string[] {
  const allCategories = new Set<string>();
  
  recipes.forEach(recipe => {
    const categories = splitCategories(recipe.category);
    categories.forEach(cat => allCategories.add(cat));
  });
  
  return Array.from(allCategories).sort();
}

/**
 * Get category statistics with split categories
 */
export function getCategoryStats(recipes: { category: string }[]): CategoryItem[] {
  const categoryCount = new Map<string, number>();
  
  recipes.forEach(recipe => {
    const categories = splitCategories(recipe.category);
    categories.forEach(cat => {
      categoryCount.set(cat, (categoryCount.get(cat) || 0) + 1);
    });
  });
  
  return Array.from(categoryCount.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

/**
 * Filter recipes by category (supports split categories)
 */
export function filterRecipesByCategory(recipes: { category: string }[], selectedCategory: string) {
  if (!selectedCategory) return recipes;
  
  return recipes.filter(recipe => recipeMatchesCategory(recipe.category, selectedCategory));
}
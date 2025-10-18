import { getRecipes, getRegions } from '@/lib/recipes';
import ModernRecipesPage from './ModernRecipesPage';
import type { Metadata } from 'next';
import { extractAllCategories } from '@/utils/categoryUtils';

// Cache for 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Reseptlər - Chef İlhamə',
  description: 'Azərbaycan mətbəxinin ən dadlı və ənənəvi reseptləri',
};

export default async function RecipesPage() {
  const [recipes, regions] = await Promise.all([
    getRecipes(),
    getRegions()
  ]);

  // Extract all split categories from recipes (this ensures we get all categories)
  const allCategories = extractAllCategories(recipes);

  return (
    <ModernRecipesPage 
      initialRecipes={recipes}
      categories={allCategories}
      regions={regions}
    />
  );
}
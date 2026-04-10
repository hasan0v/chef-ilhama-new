import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import HomeExperience from '@/components/site/pages/HomeExperience';

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function Home() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipes(),
    getCategories(),
    getRecipeStats()
  ]);

  return (
    <HomeExperience 
      featuredRecipes={featuredRecipes}
      allRecipes={allRecipes}
      categories={categories}
      stats={stats}
    />
  );
}
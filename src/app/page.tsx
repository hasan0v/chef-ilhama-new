import { getFeaturedRecipes, getRecipeStats } from '@/lib/recipes';
import HomePage from './HomePage';

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function Home() {
  const [featuredRecipes, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipeStats()
  ]);

  return (
    <HomePage 
      featuredRecipes={featuredRecipes}
      stats={stats}
    />
  );
}
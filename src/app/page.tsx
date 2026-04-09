import { getFeaturedRecipes, getRecipeStats } from '@/lib/recipes';
import HomeExperience from '@/components/site/pages/HomeExperience';

// Revalidate every 5 minutes
export const revalidate = 300;

export default async function Home() {
  const [featuredRecipes, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipeStats()
  ]);

  return (
    <HomeExperience 
      featuredRecipes={featuredRecipes}
      stats={stats}
    />
  );
}
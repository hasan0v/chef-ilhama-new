import { withLocaleAlternates } from '@/lib/seoLocales';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import HomeExperience from '@/components/site/pages/HomeExperience';
import { getRecipeCollectionSchema } from '@/lib/seo';
import type { Metadata } from 'next';

// Revalidate every 5 minutes
export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('az', 'home', {
  title: 'Chef İlhamə — Azərbaycan Mətbəxi Reseptləri, Şəxsi Aşpaz və Katerinq',
  description:
    'Azərbaycan mətbəxinin bölgəvi dadlarını reseptlərlə kəşf edin. Chef İlhamənin seçilmiş resept kolleksiyası, Bakıda şəxsi aşpaz və katerinq xidmətləri. 15+ il professional təcrübə.',
  alternates: {
    canonical: 'https://www.chef-ilhama.food',
    languages: {
      'az': 'https://www.chef-ilhama.food',
      'en': 'https://www.chef-ilhama.food/en',
    },
  },
});

export default async function Home() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipes(),
    getCategories(),
    getRecipeStats()
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Seçilmiş Azərbaycan Reseptləri',
    'Azərbaycan mətbəxinin bölgəvi dadlarını Chef İlhamənin seçilmiş reseptləri ilə kəşf edin.',
    '/'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <HomeExperience 
        featuredRecipes={featuredRecipes}
        allRecipes={allRecipes}
        categories={categories}
        stats={stats}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'अज़रबैजानी व्यंजन रेसिपी संग्रह - शेफ इल्हामा',
  description: 'पारंपरिक और क्षेत्रीय अज़रबैजानी रेसिपीज का संग्रह। अपनी पसंद की रेसिपी ढूंढें।',
};

export default async function HindiRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
    { name: 'रेसिपीज', href: '/hi/recipes' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecipeCatalogPage
        initialRecipes={recipes}
        categories={categories}
        regions={regions}
        breadcrumbs={[
          { name: 'होम', href: '/hi' },
          { name: 'रेसिपीज', href: '/hi/recipes' },
        ]}
      />
    </>
  );
}

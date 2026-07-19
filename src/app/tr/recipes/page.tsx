import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Azerbaycan Yemek Tarifleri Arşivi - Şef İlhame',
  description: 'Zengin Azerbaycan kulinariyasından yöresel ve geleneksel yemek tarifleri.',
};

export default async function TurkishRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', href: '/tr' },
    { name: 'Tarifler', href: '/tr/recipes' },
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
          { name: 'Ana Sayfa', href: '/tr' },
          { name: 'Tarifler', href: '/tr/recipes' },
        ]}
      />
    </>
  );
}

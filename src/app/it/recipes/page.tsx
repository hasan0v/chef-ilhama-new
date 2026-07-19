import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Archivio delle ricette azerbaigiane - Chef İlhamə',
  description: 'Ricette tradizionali e regionali della ricca gastronomia azerbaigiana.',
};

export default async function ItalianRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
    { name: 'Ricette', href: '/it/recipes' },
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
          { name: 'Home', href: '/it' },
          { name: 'Ricette', href: '/it/recipes' },
        ]}
      />
    </>
  );
}

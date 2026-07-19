import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Aserbaidschanisches Rezeptarchiv - Chef İlhamə',
  description: 'Entdecken Sie die reiche kulinarische Kultur Aserbaidschans anhand von klassischen, bebilderten Rezepten.',
};

export default async function GermanRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('de'),
    getCategories('de'),
    getRegions('de'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
    { name: 'Rezepte', href: '/de/recipes' },
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
          { name: 'Startseite', href: '/de' },
          { name: 'Rezepte', href: '/de/recipes' },
        ]}
      />
    </>
  );
}

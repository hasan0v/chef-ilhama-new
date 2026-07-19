import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Azerbeidzjaans receptenarchief - Chef İlhamə',
  description: 'Ontdek de rijke identiteit van de Azerbeidzjaanse keuken door middel van traditionele recepten.',
};

export default async function DutchRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('nl'),
    getCategories('nl'),
    getRegions('nl'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/nl' },
    { name: 'Recepten', href: '/nl/recipes' },
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
          { name: 'Home', href: '/nl' },
          { name: 'Recepten', href: '/nl/recipes' },
        ]}
      />
    </>
  );
}

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('fr', 'recipes', {
  title: 'Archives des recettes azerbaïdjanaises - Chef İlhamə',
  description: 'Recettes régionales et traditionnelles issues de la riche gastronomie azerbaïdjanaise.',
});

export default async function FrenchRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('fr'),
    getCategories('fr'),
    getRegions('fr'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
    { name: 'Recettes', href: '/fr/recipes' },
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
          { name: 'Accueil', href: '/fr' },
          { name: 'Recettes', href: '/fr/recipes' },
        ]}
      />
    </>
  );
}

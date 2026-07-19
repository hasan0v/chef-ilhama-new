import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('es', 'recipes', {
  title: 'Archivo de recetas culinarias azerbaiyanas - Chef İlhamə',
  description: 'Descubra la rica identidad de la cocina azerbaiyana a través de recetas clásicas explicadas paso a paso.',
});

export default async function SpanishRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('es'),
    getCategories('es'),
    getRegions('es'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', href: '/es' },
    { name: 'Recetas', href: '/es/recipes' },
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
          { name: 'Inicio', href: '/es' },
          { name: 'Recetas', href: '/es/recipes' },
        ]}
      />
    </>
  );
}

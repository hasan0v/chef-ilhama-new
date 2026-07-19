import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('id', 'recipes', {
  title: 'Arsip Resep Kuliner Azerbaijan - Chef İlhamə',
  description: 'Temukan kekayaan kuliner Azerbaijan melalui resep tradisional langkah demi langkah dengan ilustrasi.',
});

export default async function IndonesianRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('id'),
    getCategories('id'),
    getRegions('id'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
    { name: 'Resep', href: '/id/recipes' },
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
          { name: 'Beranda', href: '/id' },
          { name: 'Resep', href: '/id/recipes' },
        ]}
      />
    </>
  );
}

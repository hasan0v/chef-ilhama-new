import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'أرشيف وصفات المطبخ الأذربيجاني - الشيف إلهامة',
  description: 'وصفات تقليدية وإقليمية عريقة من المطبخ الأذربيجاني الغني بالنكهات الأصيلة.',
};

export default async function ArabicRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'الرئيسية', href: '/ar' },
    { name: 'الوصفات', href: '/ar/recipes' },
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
          { name: 'الرئيسية', href: '/ar' },
          { name: 'الوصفات', href: '/ar/recipes' },
        ]}
      />
    </>
  );
}

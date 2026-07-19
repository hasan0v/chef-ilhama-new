import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'আজারবাইজানীয় খাবারের সব রেসিপি - Chef İlhamə',
  description: 'ধাপে ধাপে ছবিসহ আজারবাইজানীয় খাবারের ঐতিহ্যবাহী ও সুস্বাদু রেসিপি সংগ্রহ।',
};

export default async function BengaliRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('bn'),
    getCategories('bn'),
    getRegions('bn'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
    { name: 'রেসিপি', href: '/bn/recipes' },
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
          { name: 'হোম', href: '/bn' },
          { name: 'রেসিপি', href: '/bn/recipes' },
        ]}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Архив азербайджанских рецептов - Шеф Ильхама',
  description: 'Традиционные и региональные рецепты изысканной азербайджанской кухни.',
};

export default async function RussianRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
    { name: 'Рецепты', href: '/ru/recipes' },
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
          { name: 'Главная', href: '/ru' },
          { name: 'Рецепты', href: '/ru/recipes' },
        ]}
      />
    </>
  );
}

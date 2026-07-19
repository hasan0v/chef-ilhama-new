import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'ru');
  
  if (!recipe) {
    return {
      title: 'Рецепт не найден - Шеф Ильхама',
    };
  }

  return {
    title: `Рецепт: ${recipe.name} - Шеф Ильхама`,
    description: recipe.history ? recipe.history.substring(0, 160) : `Пошаговый рецепт приготовления блюда ${recipe.name}.`,
  };
}

export default async function RussianRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'ru');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Главная', href: '/ru' },
    { name: 'Рецепты', href: '/ru/recipes' },
    { name: recipe.name, href: `/ru/recipe/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecipeStoryPage
        recipe={recipe}
        breadcrumbs={[
          { name: 'Главная', href: '/ru' },
          { name: 'Рецепты', href: '/ru/recipes' },
          { name: recipe.name, href: `/ru/recipe/${slug}` },
        ]}
      />
    </>
  );
}

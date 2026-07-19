import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';
import { getRecipeMetadata } from '@/lib/recipeMetadata';

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 300;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'zh');

  if (!recipe) {
    return { title: 'Recipe not found', robots: { index: false, follow: false } };
  }

  return getRecipeMetadata(recipe, 'zh');
}

export default async function ChineseRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'zh');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe, 'zh');
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
    { name: '精品食谱', href: '/zh/recipes' },
    { name: recipe.name, href: `/zh/recipe/${slug}` },
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
          { name: '首页', href: '/zh' },
          { name: '精品食谱', href: '/zh/recipes' },
          { name: recipe.name, href: `/zh/recipe/${slug}` },
        ]}
      />
    </>
  );
}

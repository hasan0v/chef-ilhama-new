import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes, getRelatedRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import type { Metadata } from 'next';
import { getBreadcrumbSchema, getRecipeSchema } from '@/lib/seo';
import { getRecipeMetadata } from '@/lib/recipeMetadata';

interface RecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: RecipePageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'en');

  if (!recipe) {
    return { title: 'Recipe not found', robots: { index: false, follow: false } };
  }

  return getRecipeMetadata(recipe, 'en');
}

export default async function EnglishRecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'en');
  const allRecipes = await getRecipes('en');

  if (!recipe) {
    notFound();
  }
  const relatedRecipes = getRelatedRecipes(recipe, allRecipes);

  const breadcrumbs = [
    { name: 'Home', href: '/en' },
    { name: 'Recipes', href: '/en/recipes' },
    { name: recipe.name, href: `/en/recipe/${recipe.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeSchema(recipe, 'en')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeStoryPage recipe={recipe} relatedRecipes={relatedRecipes} breadcrumbs={breadcrumbs} />
    </>
  );
}

export const revalidate = 300;

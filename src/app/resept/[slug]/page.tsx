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
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return { title: 'Resept tapılmadı', robots: { index: false, follow: false } };
  }

  return getRecipeMetadata(recipe, 'az');
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  const allRecipes = await getRecipes('az');

  if (!recipe) {
    notFound();
  }
  const relatedRecipes = getRelatedRecipes(recipe, allRecipes);

  const breadcrumbs = [
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Reseptlər', href: '/reseptler' },
    { name: recipe.name, href: `/resept/${recipe.slug}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeSchema(recipe, 'az')) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <RecipeStoryPage recipe={recipe} relatedRecipes={relatedRecipes} breadcrumbs={breadcrumbs} />
    </>
  );
}

export const revalidate = 300; // Revalidate every 5 minutes in production

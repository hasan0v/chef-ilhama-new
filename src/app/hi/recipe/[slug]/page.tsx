import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);
  
  if (!recipe) {
    return {
      title: 'रेसिपी नहीं मिली - शेफ इल्हामा',
    };
  }

  return {
    title: `${recipe.name} बनाने की विधि - शेफ इल्हामा`,
    description: recipe.history ? recipe.history.substring(0, 160) : `${recipe.name} बनाने के लिए सामग्री और आसान विधि।`,
  };
}

export default async function HindiRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
    { name: 'रेसिपीज', href: '/hi/recipes' },
    { name: recipe.name, href: `/hi/recipe/${slug}` },
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
          { name: 'होम', href: '/hi' },
          { name: 'रेसिपीज', href: '/hi/recipes' },
          { name: recipe.name, href: `/hi/recipe/${slug}` },
        ]}
      />
    </>
  );
}

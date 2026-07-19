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
      title: 'Ricetta non trovata - Chef İlhamə',
    };
  }

  return {
    title: `Ricetta: ${recipe.name} - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `Ricetta di cucina dettagliata per il piatto tradizionale ${recipe.name}.`,
  };
}

export default async function ItalianRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
    { name: 'Ricette', href: '/it/recipes' },
    { name: recipe.name, href: `/it/recipe/${slug}` },
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
          { name: 'Home', href: '/it' },
          { name: 'Ricette', href: '/it/recipes' },
          { name: recipe.name, href: `/it/recipe/${slug}` },
        ]}
      />
    </>
  );
}

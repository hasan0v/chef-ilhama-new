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
      title: 'Receita não encontrada - Chef İlhamə',
    };
  }

  return {
    title: `Receita de ${recipe.name} - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `Instruções de preparação passo a passo e ingredientes para cozinhar ${recipe.name}.`,
  };
}

export default async function PortugueseRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
    { name: 'Receitas', href: '/pt/recipes' },
    { name: recipe.name, href: `/pt/recipe/${slug}` },
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
          { name: 'Início', href: '/pt' },
          { name: 'Receitas', href: '/pt/recipes' },
          { name: recipe.name, href: `/pt/recipe/${slug}` },
        ]}
      />
    </>
  );
}

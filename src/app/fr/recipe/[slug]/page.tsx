import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getRecipes('fr');
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'fr');
  
  if (!recipe) {
    return {
      title: 'Recette non trouvée - Chef İlhamə',
    };
  }

  return {
    title: `Recette : ${recipe.name} - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `Recette de cuisine détaillée pour le plat traditionnel ${recipe.name}.`,
  };
}

export default async function FrenchRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'fr');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Accueil', href: '/fr' },
    { name: 'Recettes', href: '/fr/recipes' },
    { name: recipe.name, href: `/fr/recipe/${slug}` },
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
          { name: 'Accueil', href: '/fr' },
          { name: 'Recettes', href: '/fr/recipes' },
          { name: recipe.name, href: `/fr/recipe/${slug}` },
        ]}
      />
    </>
  );
}

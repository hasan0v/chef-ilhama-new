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
  const recipe = await getRecipeBySlug(slug, 'id');
  
  if (!recipe) {
    return {
      title: 'Resep tidak ditemukan - Chef İlhamə',
    };
  }

  return {
    title: `Resep ${recipe.name} - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `Langkah-langkah pembuatan dan daftar bahan terperinci untuk memasak ${recipe.name}.`,
  };
}

export default async function IndonesianRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'id');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
    { name: 'Resep', href: '/id/recipes' },
    { name: recipe.name, href: `/id/recipe/${slug}` },
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
          { name: 'Beranda', href: '/id' },
          { name: 'Resep', href: '/id/recipes' },
          { name: recipe.name, href: `/id/recipe/${slug}` },
        ]}
      />
    </>
  );
}

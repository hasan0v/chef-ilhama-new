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
      title: 'রেসিপি খুঁজে পাওয়া যায়নি - Chef İlhamə',
    };
  }

  return {
    title: `${recipe.name} রেসিপি - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `${recipe.name} কীভাবে বাড়িতে সুস্বাদুভাবে রান্না করবেন তার বিস্তারিত রেসিপি ও উপকরণ।`,
  };
}

export default async function BengaliRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
    { name: 'রেসিপি', href: '/bn/recipes' },
    { name: recipe.name, href: `/bn/recipe/${slug}` },
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
          { name: 'হোম', href: '/bn' },
          { name: 'রেসিপি', href: '/bn/recipes' },
          { name: recipe.name, href: `/bn/recipe/${slug}` },
        ]}
      />
    </>
  );
}

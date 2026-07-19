import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getRecipes('ja');
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'ja');
  
  if (!recipe) {
    return {
      title: 'レシピが見つかりません - Chef İlhamə',
    };
  }

  return {
    title: `${recipe.name}のレシピ - Chef İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `${recipe.name}を家庭で美味しく作るための詳しい作り方と必要な材料。`,
  };
}

export default async function JapaneseRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'ja');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
    { name: 'レシピ一覧', href: '/ja/recipes' },
    { name: recipe.name, href: `/ja/recipe/${slug}` },
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
          { name: 'ホーム', href: '/ja' },
          { name: 'レシピ一覧', href: '/ja/recipes' },
          { name: recipe.name, href: `/ja/recipe/${slug}` },
        ]}
      />
    </>
  );
}

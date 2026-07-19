import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getRecipeBySlug, getRecipes } from '@/lib/recipes';
import RecipeStoryPage from '@/components/site/pages/RecipeStoryPage';
import { getRecipeSchema, getBreadcrumbSchema } from '@/lib/seo';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const recipes = await getRecipes('zh');
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'zh');
  
  if (!recipe) {
    return {
      title: '未找到相关食谱 - 主厨 İlhamə',
    };
  }

  return {
    title: `${recipe.name} 的制作食谱 - 主厨 İlhamə`,
    description: recipe.history ? recipe.history.substring(0, 160) : `详细的配料和烹饪步骤分析，教您如何制作正宗的 ${recipe.name}。`,
  };
}

export default async function ChineseRecipePage({ params }: Props) {
  const { slug } = await params;
  const recipe = await getRecipeBySlug(slug, 'zh');

  if (!recipe) {
    notFound();
  }

  const recipeSchema = getRecipeSchema(recipe);
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

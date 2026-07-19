import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: '阿塞拜疆美食经典食谱档案 - 主厨 İlhamə',
  description: '汇聚阿塞拜疆丰富特色餐饮流派与地道地域美食烹饪方法。',
};

export default async function ChineseRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
    { name: '精品食谱', href: '/zh/recipes' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecipeCatalogPage
        initialRecipes={recipes}
        categories={categories}
        regions={regions}
        breadcrumbs={[
          { name: '首页', href: '/zh' },
          { name: '精品食谱', href: '/zh/recipes' },
        ]}
      />
    </>
  );
}

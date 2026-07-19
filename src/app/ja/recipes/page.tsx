import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'アゼルバイジャン料理レシピ一覧 - Chef İlhamə',
  description: '伝統的な手順で紹介する、アゼルバイジャンの豊かな食文化が息づくレシピコレクション。',
};

export default async function JapaneseRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes('ja'),
    getCategories('ja'),
    getRegions('ja'),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
    { name: 'レシピ一覧', href: '/ja/recipes' },
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
          { name: 'ホーム', href: '/ja' },
          { name: 'レシピ一覧', href: '/ja/recipes' },
        ]}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { getCategories, getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Arquivo de receitas clássicas do Azerbaijão - Chef İlhamə',
  description: 'Descubra a rica identidade da cozinha do Azerbaijão através de receitas clássicas e regionais.',
};

export default async function PortugueseRecipesPage() {
  const [recipes, categories, regions] = await Promise.all([
    getRecipes(),
    getCategories(),
    getRegions(),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Início', href: '/pt' },
    { name: 'Receitas', href: '/pt/recipes' },
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
          { name: 'Início', href: '/pt' },
          { name: 'Receitas', href: '/pt/recipes' },
        ]}
      />
    </>
  );
}

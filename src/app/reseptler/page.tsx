import { getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import type { Metadata } from 'next';
import { extractAllCategories } from '@/utils/categoryUtils';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';

// Cache for 5 minutes
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Azərbaycan Reseptləri — Ənənəvi Bölgəvi Yeməklər',
  description: 'Azərbaycan mətbəxinin ən dadlı və ənənəvi reseptləri. 25+ bölgədən 50+ resept: plov, dolma, kabab, şorba, şirniyyat və daha çox. Addım-addım hazırlanma qaydası.',
  keywords: 'Azərbaycan reseptləri, Azerbaijani recipes, ənənəvi yeməklər, plov resepti, dolma resepti, kabab resepti, Azerbaijani food recipes, traditional Azerbaijani dishes',
  openGraph: {
    title: 'Azərbaycan Reseptləri — Chef İlhamə',
    description: '25+ bölgədən ənənəvi Azərbaycan reseptləri. Addım-addım hazırlanma qaydası.',
    type: 'website',
    locale: 'az_AZ',
    alternateLocale: 'en_US',
    url: 'https://chef-ilhama.food/reseptler',
    siteName: 'Chef İlhamə',
    images: [{ url: 'https://chef-ilhama.food/ilhama.png', width: 1200, height: 630, alt: 'Azərbaycan reseptləri kolleksiyası' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azərbaycan Reseptləri — Chef İlhamə',
    description: '25+ bölgədən ənənəvi Azərbaycan reseptləri kolleksiyası.',
    images: ['https://chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://chef-ilhama.food/reseptler',
    languages: {
      'az': 'https://chef-ilhama.food/reseptler',
      'en': 'https://chef-ilhama.food/en/recipes',
    },
  },
};

export default async function RecipesPage() {
  const [recipes, regions] = await Promise.all([
    getRecipes(),
    getRegions()
  ]);

  // Extract all split categories from recipes (this ensures we get all categories)
  const allCategories = extractAllCategories(recipes);

  const collectionSchema = getRecipeCollectionSchema(
    recipes,
    'Azərbaycan Reseptləri — Chef İlhamə',
    'Azərbaycan mətbəxinin ən dadlı və ənənəvi reseptləri kolleksiyası.',
    '/reseptler'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Reseptlər', href: '/reseptler' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <RecipeCatalogPage
        initialRecipes={recipes}
        categories={allCategories}
        regions={regions}
        breadcrumbs={[
          { name: 'Ana Səhifə', href: '/' },
          { name: 'Reseptlər', href: '/reseptler' },
        ]}
      />
    </>
  );
}
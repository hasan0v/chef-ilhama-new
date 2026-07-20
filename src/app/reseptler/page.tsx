import { withLocaleAlternates } from '@/lib/seoLocales';
import { getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import type { Metadata } from 'next';
import { extractAllCategories } from '@/utils/categoryUtils';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';

// Cache for 5 minutes
export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('az', 'recipes', {
  title: 'Azərbaycan və Dünya Reseptləri — Nadir Bölgəvi Yeməklər',
  description: 'Azərbaycan və dünyanın az tanınan bölgəvi yeməklərini bişirin. Ölkə, kateqoriya, vaxt və çətinliyə görə ənənəvi reseptləri kəşf edin.',
  keywords: 'Azərbaycan reseptləri, dünya mətbəxi, nadir yeməklər, ənənəvi reseptlər, bölgəvi yeməklər, qlobal reseptlər, Azerbaijani recipes',
  openGraph: {
    title: 'Azərbaycan və Dünya Reseptləri — Chef İlhamə',
    description: 'Azərbaycan və dünyanın az tanınan bölgəvi reseptləri. Aydın inqrediyentlər, addımlar və mənbələr.',
    type: 'website',
    locale: 'az_AZ',
    alternateLocale: 'en_US',
    url: 'https://www.chef-ilhama.food/reseptler',
    siteName: 'Chef İlhamə',
    images: [{ url: 'https://www.chef-ilhama.food/ilhama.png', width: 1200, height: 630, alt: 'Azərbaycan və dünya reseptləri kolleksiyası' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azərbaycan və Dünya Reseptləri — Chef İlhamə',
    description: 'Az tanınan bölgəvi yeməklər və Azərbaycan klassikləri.',
    images: ['https://www.chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://www.chef-ilhama.food/reseptler',
    languages: {
      'az': 'https://www.chef-ilhama.food/reseptler',
      'en': 'https://www.chef-ilhama.food/en/recipes',
    },
  },
});

export default async function RecipesPage() {
  const [recipes, regions] = await Promise.all([
    getRecipes(),
    getRegions()
  ]);

  // Extract all split categories from recipes (this ensures we get all categories)
  const allCategories = extractAllCategories(recipes);

  const collectionSchema = getRecipeCollectionSchema(
    recipes,
    'Azərbaycan və Dünya Reseptləri — Chef İlhamə',
    'Azərbaycan və dünyanın az tanınan bölgəvi yeməklərindən seçilmiş resept kolleksiyası.',
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

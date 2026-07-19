import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { extractAllCategories } from '@/utils/categoryUtils';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('en', 'recipes', {
  title: 'Azerbaijani Recipes — Traditional Regional Dishes',
  description:
    'The most delicious traditional Azerbaijani recipes. 50+ recipes from 25+ regions: plov, dolma, kebab, soups, pastries and more. Step-by-step preparation instructions.',
  keywords:
    'Azerbaijani recipes, traditional Azerbaijani food, plov recipe, dolma recipe, kebab recipe, Azerbaijan cuisine, Caucasus recipes',
  openGraph: {
    title: 'Azerbaijani Recipes — Chef İlhamə',
    description:
      'Traditional Azerbaijani recipes from 25+ regions. Step-by-step preparation guides.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: 'https://chef-ilhama.food/en/recipes',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Azerbaijani recipe collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azerbaijani Recipes — Chef İlhamə',
    description: 'Traditional Azerbaijani recipes from 25+ regions.',
    images: ['https://chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://chef-ilhama.food/en/recipes',
    languages: {
      az: 'https://chef-ilhama.food/reseptler',
      en: 'https://chef-ilhama.food/en/recipes',
    },
  },
});

export default async function EnglishRecipesPage() {
  const [recipes, regions] = await Promise.all([getRecipes('en'), getRegions('en')]);
  const allCategories = extractAllCategories(recipes);

  const collectionSchema = getRecipeCollectionSchema(
    recipes,
    'Azerbaijani Recipes — Chef İlhamə',
    'Collection of the most delicious traditional Azerbaijani recipes.',
    '/en/recipes'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
    { name: 'Recipes', href: '/en/recipes' },
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
          { name: 'Home', href: '/en' },
          { name: 'Recipes', href: '/en/recipes' },
        ]}
      />
    </>
  );
}

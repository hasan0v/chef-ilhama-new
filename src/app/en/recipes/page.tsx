import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getRecipes, getRegions } from '@/lib/recipes';
import RecipeCatalogPage from '@/components/site/pages/RecipeCatalogPage';
import { extractAllCategories } from '@/utils/categoryUtils';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('en', 'recipes', {
  title: 'Global & Azerbaijani Recipes — Rare Regional Dishes',
  description:
    'Cook underrepresented regional dishes from Azerbaijan and around the world. Search rare traditional recipes by country, category, time and difficulty.',
  keywords:
    'global recipes, rare traditional dishes, regional food recipes, Azerbaijani recipes, world cuisine, authentic recipes, underrepresented dishes',
  openGraph: {
    title: 'Global & Azerbaijani Recipes — Chef İlhamə',
    description:
      'Rare regional dishes from Azerbaijan and around the world, with clear ingredients, cooking steps and sources.',
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
        alt: 'Global and Azerbaijani recipe collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Global & Azerbaijani Recipes — Chef İlhamə',
    description: 'Rare regional recipes with clear steps and sources.',
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
    'Global & Azerbaijani Recipes — Chef İlhamə',
    'A curated collection of underrepresented regional recipes from Azerbaijan and around the world.',
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

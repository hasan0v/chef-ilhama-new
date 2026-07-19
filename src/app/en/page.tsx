import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('en', 'home', {
  title: 'Chef İlhamə — Azerbaijani Recipes, Private Chef & Catering in Baku',
  description:
    'Discover authentic Azerbaijani cuisine with Chef İlhamə. Traditional recipes from 25+ regions, private chef services, and premium catering in Baku, Sumqayıt & Abşeron.',
  keywords: 'Azerbaijani recipes, Azerbaijan food, Baku chef, private chef Baku, catering Azerbaijan, traditional Azerbaijani dishes, Azerbaijani cuisine',
  openGraph: {
    title: 'Chef İlhamə — Azerbaijani Recipes & Private Chef',
    description: 'Authentic Azerbaijani cuisine. Traditional recipes from 25+ regions, private chef & catering in Baku.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/en`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Azerbaijani cuisine' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Azerbaijani Recipes',
    description: 'Authentic Azerbaijani cuisine from 25+ regions. Private chef & catering in Baku.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/en`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
    },
  },
});

export default async function EnglishHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('en'),
    getRecipes('en'),
    getCategories('en'),
    getRecipeStats('en'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Traditional Azerbaijani Recipes',
    'Discover authentic Azerbaijani cuisine with traditional recipes from 25+ regions.',
    '/en'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
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
      <HomeExperience 
        featuredRecipes={featuredRecipes}
        allRecipes={allRecipes}
        categories={categories}
        stats={stats}
      />
    </>
  );
}

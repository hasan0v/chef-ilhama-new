import type { Metadata } from 'next';
import UnderrepresentedDishesGuidePage from '@/components/site/pages/UnderrepresentedDishesGuidePage';
import { getBreadcrumbSchema, getEditorialGuideSchema, getRecipeCollectionSchema } from '@/lib/seo';
import { getRecipes } from '@/lib/recipes';
import { getGuidePath, getGuideRecipes } from '@/lib/underrepresentedDishesGuide';
import { siteConfig } from '@/lib/site';

export const revalidate = 300;

const title = '50 Underrepresented Regional Dishes Worth Discovering';
const description = 'Explore 50 cookable regional dishes from 39 countries: overlooked soups, noodles, breads, stews, dumplings and ceremonial foods with source trails.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'underrepresented regional dishes',
    'rare traditional foods',
    'unique food around the world',
    'global regional recipes',
    'lesser known dishes',
  ],
  authors: [{ name: siteConfig.name, url: `${siteConfig.url}/en/about` }],
  alternates: {
    canonical: `${siteConfig.url}${getGuidePath('en')}`,
    languages: {
      az: `${siteConfig.url}${getGuidePath('az')}`,
      en: `${siteConfig.url}${getGuidePath('en')}`,
      'x-default': `${siteConfig.url}${getGuidePath('en')}`,
    },
  },
  openGraph: {
    title,
    description,
    type: 'article',
    url: `${siteConfig.url}${getGuidePath('en')}`,
    siteName: siteConfig.name,
    publishedTime: '2026-07-20T00:00:00+04:00',
    modifiedTime: '2026-07-20T00:00:00+04:00',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default async function UnderrepresentedRegionalDishesGuide() {
  const recipes = getGuideRecipes(await getRecipes('en'));
  const path = getGuidePath('en');
  const breadcrumbs = [
    { name: 'Home', href: '/en' },
    { name: 'Collections', href: '/en/collections' },
    { name: '50 underrepresented regional dishes', href: path },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeCollectionSchema(recipes, title, description, path, 'en')) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getEditorialGuideSchema({
            title,
            description,
            url: path,
            image: `${path}/opengraph-image`,
            locale: 'en',
            datePublished: '2026-07-20T00:00:00+04:00',
            dateModified: '2026-07-20T00:00:00+04:00',
          })),
        }}
      />
      <UnderrepresentedDishesGuidePage locale="en" recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}

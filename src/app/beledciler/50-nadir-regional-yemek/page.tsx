import type { Metadata } from 'next';
import UnderrepresentedDishesGuidePage from '@/components/site/pages/UnderrepresentedDishesGuidePage';
import { getBreadcrumbSchema, getEditorialGuideSchema, getRecipeCollectionSchema } from '@/lib/seo';
import { getRecipes } from '@/lib/recipes';
import { getGuidePath, getGuideRecipes } from '@/lib/underrepresentedDishesGuide';
import { siteConfig } from '@/lib/site';

export const revalidate = 300;

const title = 'Kəşf etməyə dəyər 50 nadir regional yemək';
const description = '39 ölkədən 50 bişirilə bilən regional yemək: az tanınan şorba, əriştə, çörək, güveç, kündə və mərasim reseptlərini mənbələri ilə kəşf edin.';

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    'nadir regional yeməklər',
    'fərqli ölkələrin yeməkləri',
    'az tanınan dünya yeməkləri',
    'qlobal bölgəvi reseptlər',
  ],
  authors: [{ name: siteConfig.name, url: `${siteConfig.url}/haqqinda` }],
  alternates: {
    canonical: `${siteConfig.url}${getGuidePath('az')}`,
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
    url: `${siteConfig.url}${getGuidePath('az')}`,
    siteName: siteConfig.name,
    publishedTime: '2026-07-20T00:00:00+04:00',
    modifiedTime: '2026-07-20T00:00:00+04:00',
  },
  twitter: { card: 'summary_large_image', title, description },
};

export default async function NadirRegionalYemeklerGuide() {
  const recipes = getGuideRecipes(await getRecipes('az'));
  const path = getGuidePath('az');
  const breadcrumbs = [
    { name: 'Ana səhifə', href: '/' },
    { name: 'Kolleksiyalar', href: '/kolleksiyalar' },
    { name: '50 nadir regional yemək', href: path },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getRecipeCollectionSchema(recipes, title, description, path, 'az')) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getEditorialGuideSchema({
            title,
            description,
            url: path,
            image: `${path}/opengraph-image`,
            locale: 'az',
            datePublished: '2026-07-20T00:00:00+04:00',
            dateModified: '2026-07-20T00:00:00+04:00',
          })),
        }}
      />
      <UnderrepresentedDishesGuidePage locale="az" recipes={recipes} breadcrumbs={breadcrumbs} />
    </>
  );
}

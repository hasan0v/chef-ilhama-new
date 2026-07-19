import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('tr', 'home', {
  title: 'Şef İlhame — Azerbaycan Yemek Tarifleri, Özel Şef ve Catering Hizmeti',
  description:
    'Şef İlhame ile otantik Azerbaycan mutfağını keşfedin. 25+ yöreden geleneksel tarifler, özel şef rezervasyonları ve Bakü, Sumgayıt, Abşeron genelinde catering hizmetleri.',
  keywords: 'Azerbaycan yemek tarifleri, Bakü şef, özel şef Bakü, catering Azerbaycan, geleneksel Azerbaycan yemekleri, Azerbaycan mutfağı',
  openGraph: {
    title: 'Şef İlhame — Azerbaycan Yemek Tarifleri & Özel Şef',
    description: 'Otantik Azerbaycan mutfağı. 25+ yöreden geleneksel tarifler, özel şef & catering hizmetleri.',
    type: 'website',
    locale: 'tr_TR',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/tr`,
    siteName: 'Şef İlhame',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Şef İlhame — Azerbaycan mutfağı' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Şef İlhame — Azerbaycan Yemek Tarifleri',
    description: '25+ yöreden otantik Azerbaycan yemek tarifleri. Özel şef & catering hizmetleri.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/tr`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
    },
  },
});

export default async function TurkishHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('tr'),
    getRecipes('tr'),
    getCategories('tr'),
    getRecipeStats('tr'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Şef İlhame — Geleneksel Azerbaycan Yemek Tarifleri',
    '25+ yöreden geleneksel Azerbaycan tariflerini keşfedin.',
    '/tr'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', href: '/tr' },
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

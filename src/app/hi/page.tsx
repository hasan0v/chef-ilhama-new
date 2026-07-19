import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('hi', 'home', {
  title: 'शेफ इल्हामा — अज़रबैजानी व्यंजन रेसिपीज, प्रीमियम कैटरिंग और पर्सनल शेफ सेवाएं (बाकू)',
  description:
    'शेफ इल्हामा के साथ असली अज़रबैजानी व्यंजनों का स्वाद लें। 25 से अधिक क्षेत्रों की पारंपरिक रेसिपीज, प्रीमियम कैटरिंग और बाकू, सुमगयीत और अबशेरोन में पर्सनल शेफ सेवाएं।',
  keywords: 'अज़रबैजानी रेसिपीज, अज़रबैजानी व्यंजन, बाकू शेफ, बाकू कैटरिंग, पर्सनल शेफ बाकू, पारंपरिक रेसिपीज',
  openGraph: {
    title: 'शेफ इल्हामा — अज़रबैजानी व्यंजन रेसिपीज और पर्सनल शेफ',
    description: 'अज़रबैजानी व्यंजन। 25+ क्षेत्रों की पारंपरिक रेसिपीज, कैटरिंग और पर्सनल शेफ बुकिंग सेवाएं।',
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/hi`,
    siteName: 'शेफ इल्हामा',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'शेफ इल्हामा — अज़रबैजानी व्यंजन' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'शेफ इल्हामा — अज़रबैजानी व्यंजन रेसिपीज',
    description: '25+ क्षेत्रों की पारंपरिक अज़रबैजानी रेसिपीज। कैटरिंग और पर्सनल शेफ सेवाएं।',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/hi`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
      'it': `${siteConfig.url}/it`,
      'ar': `${siteConfig.url}/ar`,
      'zh': `${siteConfig.url}/zh`,
      'hi': `${siteConfig.url}/hi`,
    },
  },
});

export default async function HindiHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('hi'),
    getRecipes('hi'),
    getCategories('hi'),
    getRecipeStats('hi'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'शेफ इल्हामा — पारंपरिक अज़रबैजानी रेसिपीज',
    '25 से अधिक क्षेत्रों की पारंपरिक अज़रबैजानी रेसिपी संग्रह खोजें।',
    '/hi'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
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

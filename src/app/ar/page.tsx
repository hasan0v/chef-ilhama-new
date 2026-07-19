import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('ar', 'home', {
  title: 'الشيف إلهامة — وصفات المطبخ الأذربيجاني، خدمات ضيافة وشيف خاص في باكو',
  description:
    'اكتشف المطبخ الأذربيجاني الأصيل مع الشيف إلهامة. وصفات تقليدية من أكثر من 25 منطقة، وخدمات ضيافة (كاترينج) فاخرة وحجز شيف خاص في باكو، سومقاييت وأبشيرون.',
  keywords: 'وصفات أذربيجانية، المطبخ الأذربيجاني، شيف خاص باكو، كاترينج باكو، ضيافة فاخرة باكو، أكلات تقليدية أذربيجان',
  openGraph: {
    title: 'الشيف إلهامة — وصفات المطبخ الأذربيجاني وشيف خاص',
    description: 'المطبخ الأذربيجاني الأصيل. وصفات تقليدية من 25+ منطقة، وخدمات ضيافة وشيف خاص.',
    type: 'website',
    locale: 'ar_AR',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/ar`,
    siteName: 'الشيف إلهامة',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'الشيف إلهامة — المطبخ الأذربيجاني' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الشيف إلهامة — وصفات المطبخ الأذربيجاني',
    description: 'وصفات المطبخ الأذربيجاني من 25+ منطقة. خدمات ضيافة وشيف خاص.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/ar`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
      'it': `${siteConfig.url}/it`,
      'ar': `${siteConfig.url}/ar`,
    },
  },
});

export default async function ArabicHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('ar'),
    getRecipes('ar'),
    getCategories('ar'),
    getRecipeStats('ar'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'الشيف إلهامة — وصفات أذربيجانية تقليدية',
    'اكتشف المطبخ الأذربيجاني الأصيل من خلال وصفات تقليدية من أكثر من 25 منطقة.',
    '/ar'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'الرئيسية', href: '/ar' },
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

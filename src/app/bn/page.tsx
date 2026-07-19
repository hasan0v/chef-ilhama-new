import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('bn', 'home', {
  title: 'শেফ ইলহামা — আজারবাইজানীয় খাবারের রেসিপি, প্রিমিয়াম ক্যাটারিং এবং পার্সোনাল শেফ সার্ভিস (বাকু)',
  description:
    'শেফ ইলহামার সাথে আজারবাইজানীয় খাবারের আঞ্চলিক স্বাদ আবিষ্কার করুন। ২৫টিরও বেশি অঞ্চলের ঐতিহ্যবাহী রেসিপি, প্রিমিয়াম ক্যাটারিং এবং বাকু, সুমগাইত এবং আবশেরনে পার্সোনাল শেফ বুকিং সার্ভিস।',
  keywords: 'আজারবাইজানীয় রেসিপি, আজারবাইজানীয় খাবার, পার্সোনাল শেফ বাকু, ক্যাটারিং বাকু, ঐতিহ্যবাহী রেসিপি',
  openGraph: {
    title: 'শেফ ইলহামা — আজারবাইজানীয় রেসিপি এবং পার্সোনাল শেফ',
    description: 'আজারবাইজানীয় খাবারের ঐতিহ্যবাহী ও সুস্বাদু রেসিপি। প্রিমিয়াম ক্যাটারিং এবং পার্সোনাল শেফ।',
    type: 'website',
    locale: 'bn_BD',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/bn`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'শেফ ইলহামা — আজারবাইজানীয় খাবার' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'শেফ ইলহামা — আজারবাইজানীয় খাবারের রেসিপি',
    description: '২৫টিরও বেশি অঞ্চলের আজারবাইজানীয় রেসিপি সংগ্রহ। ক্যাটারিং এবং পার্সোনাল শেফ।',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/bn`,
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
      'es': `${siteConfig.url}/es`,
      'pt': `${siteConfig.url}/pt`,
      'nl': `${siteConfig.url}/nl`,
      'de': `${siteConfig.url}/de`,
      'ja': `${siteConfig.url}/ja`,
      'id': `${siteConfig.url}/id`,
      'bn': `${siteConfig.url}/bn`,
    },
  },
});

export default async function BengaliHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('bn'),
    getRecipes('bn'),
    getCategories('bn'),
    getRecipeStats('bn'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'শেফ ইলহামা — আজারবাইজানীয় ঐতিহ্যবাহী রেসিপি',
    '২৫টিরও বেশি অঞ্চলের আজারবাইজানি ঐতিহ্যবাহী রেসিপি সংগ্রহ ঘুরে দেখুন।',
    '/bn'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
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

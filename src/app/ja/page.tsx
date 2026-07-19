import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'シェフ・イルハメ — アゼルバイジャン料理レシピ、プレミアムケータリング＆出張シェフサービス (バクー)',
  description:
    'シェフ・イルハメがお届けする本格アゼルバイジャン料理。25以上の地域に伝わる伝統レシピ、プレミアムケータリング、バクー、スムガイト、アプシェロンへの出張プライベートシェフサービス。',
  keywords: 'アゼルバイジャン料理, アゼルバイジャン料理レシピ, 出張シェフ バクー, ケータリング バクー, 伝統レシピ',
  openGraph: {
    title: 'シェフ・イルハメ — アゼルバイジャン料理レシピ＆出張シェフ',
    description: 'アゼルバイジャンの郷土の味と伝統レシピ。プレミアムケータリング＆プライベートシェフ。',
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/ja`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'シェフ・イルハメ — アゼルバイジャン料理' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'シェフ・イルハメ — アゼルバイジャン料理レシピ',
    description: '25以上の地域に伝わるアゼルバイジャン料理レシピ。ケータリング＆出張シェフ。',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/ja`,
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
    },
  },
};

export default async function JapaneseHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipes(),
    getCategories(),
    getRecipeStats(),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'シェフ・イルハメ — アゼルバイジャン伝統料理レシピ',
    '25以上の地域に伝わるアゼルバイジャンの伝統的なレシピコレクションをご覧ください。',
    '/ja'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
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

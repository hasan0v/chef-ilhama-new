import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = {
  title: '主厨 İlhamə — 阿塞拜疆风味食谱、高端宴会外烩及私厨定制服务（巴库）',
  description:
    '跟随主厨 İlhamə 探索地道的阿塞拜疆美食。提供来自 25 个以上地区的传统食谱、高端宴会外烩（Catering）以及巴库、苏姆盖特和阿普歇伦的上门私厨服务。',
  keywords: '阿塞拜疆食谱, 阿塞拜疆美食, 巴库私厨, 巴库外烩, 高端宴会外烩, 传统菜肴',
  openGraph: {
    title: '主厨 İlhamə — 阿塞拜疆风味食谱 & 私厨定制',
    description: '地道的阿塞拜疆美食。25+ 地域传统食谱、高端外烩及私厨预约服务。',
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/zh`,
    siteName: '主厨 İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: '主厨 İlhamə — 阿塞拜疆美食' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '主厨 İlhamə — 阿塞拜疆风味食谱',
    description: '源自 25+ 产区的地道阿塞拜疆食谱。外烩及私厨预约。',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/zh`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
      'it': `${siteConfig.url}/it`,
      'ar': `${siteConfig.url}/ar`,
      'zh': `${siteConfig.url}/zh`,
    },
  },
};

export default async function ChineseHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes(),
    getRecipes(),
    getCategories(),
    getRecipeStats(),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    '主厨 İlhamə — 阿塞拜疆传统菜谱推荐',
    '探索源自阿塞拜疆 25+ 地域的传统地道食谱档案。',
    '/zh'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
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

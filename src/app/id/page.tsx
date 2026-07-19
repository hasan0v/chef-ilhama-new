import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('id', 'home', {
  title: 'Chef İlhamə — Resep Kuliner Azerbaijan, Catering Premium & Privat Chef (Baku)',
  description:
    'Temukan kuliner autentik Azerbaijan bersama Chef İlhamə. Lebih dari 25 wilayah resep tradisional, catering premium, dan layanan privat chef di Baku, Sumqayıt, dan Abşeron.',
  keywords: 'resep Azerbaijan, kuliner Azerbaijan, privat chef Baku, catering Baku, resep tradisional',
  openGraph: {
    title: 'Chef İlhamə — Resep Azerbaijan dan Privat Chef',
    description: 'Cita rasa daerah dan resep tradisional Azerbaijan. Catering premium dan privat chef.',
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/id`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Kuliner Azerbaijan' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Resep Azerbaijan',
    description: 'Resep kuliner Azerbaijan dari 25+ wilayah. Catering dan privat chef.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/id`,
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
    },
  },
});

export default async function IndonesianHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('id'),
    getRecipes('id'),
    getCategories('id'),
    getRecipeStats('id'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Resep Tradisional Azerbaijan',
    'Jelajahi koleksi resep tradisional Azerbaijan dari lebih dari 25 wilayah.',
    '/id'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
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

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('de', 'home', {
  title: 'Chef İlhamə — Rezepte der aserbaidschanischen Küche, Premium-Catering und Privatkoch-Services (Baku)',
  description:
    'Entdecken Sie die authentische aserbaidschanische Küche mit Chef İlhamə. Über 25 Regionen an traditionellen Rezepten, Premium-Catering und Privatkoch-Services in Baku, Sumqayıt und Abşeron.',
  keywords: 'aserbaidschanische Rezepte, aserbaidschanische Küche, Privatkoch Baku, Catering Baku, traditionelle Rezepte',
  openGraph: {
    title: 'Chef İlhamə — Aserbaidschanische Rezepte und Privatkoch',
    description: 'Regionale Aromen und traditionelle Rezepte aus Aserbaidschan. Premium-Catering und Privatkoch.',
    type: 'website',
    locale: 'de_DE',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/de`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Aserbaidschanische Küche' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Aserbaidschanische Rezepte',
    description: 'Aserbaidschanische Rezepte von 25+ Regionen. Catering und Privatkoch.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/de`,
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
    },
  },
});

export default async function GermanHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('de'),
    getRecipes('de'),
    getCategories('de'),
    getRecipeStats('de'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Traditionelle Aserbaidschanische Rezepte',
    'Entdecken Sie die Rezeptsammlung aus über 25 Regionen Aserbaidschans.',
    '/de'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
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

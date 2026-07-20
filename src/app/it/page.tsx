import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('it', 'home', {
  title: 'Chef İlhamə — Ricette della Cucina Azerbaigiana, Catering e Chef a Domicilio a Baku',
  description:
    'Scopri la cucina autentica dell\'Azerbaigian con la Chef İlhamə. Ricette tradizionali da oltre 25 regioni, servizio catering premium e chef privato a domicilio a Baku, Sumqayıt e Abşeron.',
  keywords: 'ricette azerbaigiane, cucina azerbaigiana, chef a domicilio Baku, catering Baku, chef privato Azerbaigian, piatti tradizionali',
  openGraph: {
    title: 'Chef İlhamə — Ricette dell\'Azerbaigian & Chef Privato',
    description: 'Cucina autentica dell\'Azerbaigian. Ricette tradizionali da 25+ regioni, servizio catering & chef privato.',
    type: 'website',
    locale: 'it_IT',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/it`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/images/chef-ilhama-social.jpg`, width: 1200, height: 630, alt: 'Chef İlhamə — cucina azerbaigiana' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Ricette della cucina azerbaigiana',
    description: 'Ricette dell\'Azerbaigian da 25+ regioni. Servizio catering & chef privato.',
    images: [`${siteConfig.url}/images/chef-ilhama-social.jpg`],
  },
  alternates: {
    canonical: `${siteConfig.url}/it`,
    languages: {
      'az': siteConfig.url,
      'en': `${siteConfig.url}/en`,
      'tr': `${siteConfig.url}/tr`,
      'ru': `${siteConfig.url}/ru`,
      'fr': `${siteConfig.url}/fr`,
      'it': `${siteConfig.url}/it`,
    },
  },
});

export default async function ItalianHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('it'),
    getRecipes('it'),
    getCategories('it'),
    getRecipeStats('it'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Ricette azerbaigiane tradizionali',
    'Scopri la cucina autentica dell\'Azerbaigian attraverso ricette da oltre 25 regioni.',
    '/it'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/it' },
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

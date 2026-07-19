import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import { getCategories, getFeaturedRecipes, getRecipes, getRecipeStats } from '@/lib/recipes';
import { siteConfig } from '@/lib/site';
import { getRecipeCollectionSchema, getBreadcrumbSchema } from '@/lib/seo';
import HomeExperience from '@/components/site/pages/HomeExperience';

export const revalidate = 300;

export const metadata: Metadata = withLocaleAlternates('nl', 'home', {
  title: 'Chef İlhamə — Recepten uit de Azerbeidzjaanse keuken, premium catering en privéchef-services (Bakoe)',
  description:
    'Ontdek de authentieke Azerbeidzjaanse keuken met Chef İlhamə. Meer dan 25 regio\'s aan traditionele recepten, premium catering en privéchef-services in Bakoe, Sumqayıt en Abşeron.',
  keywords: 'Azerbeidzjaanse recepten, Azerbeidzjaanse keuken, privéchef Bakoe, catering Bakoe, traditionele recepten',
  openGraph: {
    title: 'Chef İlhamə — Azerbeidzjaanse recepten en privéchef',
    description: 'Regionale smaken en traditionele recepten van Azerbeidzjan. Premium catering en privéchef.',
    type: 'website',
    locale: 'nl_NL',
    alternateLocale: 'az_AZ',
    url: `${siteConfig.url}/nl`,
    siteName: 'Chef İlhamə',
    images: [{ url: `${siteConfig.url}/ilhama.png`, width: 1200, height: 630, alt: 'Chef İlhamə — Azerbeidzjaanse keuken' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef İlhamə — Azerbeidzjaanse recepten',
    description: 'Azerbeidzjaanse recepten van 25+ regio\'s. Catering en privéchef.',
    images: [`${siteConfig.url}/ilhama.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/nl`,
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
    },
  },
});

export default async function DutchHomePage() {
  const [featuredRecipes, allRecipes, categories, stats] = await Promise.all([
    getFeaturedRecipes('nl'),
    getRecipes('nl'),
    getCategories('nl'),
    getRecipeStats('nl'),
  ]);

  const collectionSchema = getRecipeCollectionSchema(
    featuredRecipes,
    'Chef İlhamə — Traditionele Azerbeidzjaanse recepten',
    'Ontdek de traditionele recepten van Azerbeidzjan uit meer dan 25 regio\'s.',
    '/nl'
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/nl' },
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

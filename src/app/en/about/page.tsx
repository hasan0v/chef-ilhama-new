import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getAboutPageSchema, getAuthorSchema, getBreadcrumbSchema } from '@/lib/seo';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'About Chef İlhamə — Professional Azerbaijani Chef',
  description:
    'Chef İlhamə — professional Azerbaijani chef with 15+ years of culinary experience. Private chef, premium catering and menu curation in Baku, Sumqayıt & Abşeron. Regional recipes and culinary craft.',
  keywords:
    'Chef İlhamə, Azerbaijani chef, private chef Baku, professional chef Azerbaijan, catering Baku, culinary consultant',
  openGraph: {
    title: 'About Chef İlhamə — Professional Azerbaijani Chef',
    description:
      'Chef İlhamə — 15+ years of professional experience. Regional Azerbaijani cuisine with a modern refined approach.',
    type: 'profile',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: 'https://chef-ilhama.food/en/about',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə — Professional Azerbaijani chef',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Chef İlhamə',
    description:
      'Professional Azerbaijani chef with 15+ years of experience. Regional recipes and catering services.',
    images: ['https://chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://chef-ilhama.food/en/about',
    languages: {
      az: 'https://chef-ilhama.food/haqqinda',
      en: 'https://chef-ilhama.food/en/about',
    },
  },
};

export default function EnglishAboutPage() {
  const aboutSchema = getAboutPageSchema();
  const personSchema = { '@context': 'https://schema.org', ...getAuthorSchema() };
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
    { name: 'About', href: '/en/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Home', href: '/en' },
        { name: 'About', href: '/en/about' },
      ]} />
    </>
  );
}

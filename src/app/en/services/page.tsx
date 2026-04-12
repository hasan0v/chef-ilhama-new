import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getServicePageSchema, getBreadcrumbSchema, getFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Chef Services Baku — Private Chef & Catering',
  description:
    'The best private chef service in Baku. Wedding feasts, premium catering, banquet chef, and corporate events. 15+ years of professional experience. Baku, Sumqayıt, Abşeron.',
  keywords:
    'private chef Baku, catering service Baku, wedding catering Azerbaijan, personal chef Azerbaijan, event catering, banquet chef',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Chef Services Baku — Private Chef & Catering | Chef İlhamə',
    description:
      'The best private chef service in Baku. Wedding feasts, catering, banquet chef. 15+ years of experience.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: 'https://chef-ilhama.food/en/services',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə — Chef Services Baku',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chef Services Baku — Private Chef | Chef İlhamə',
    description: 'The best private chef service in Baku. Wedding feasts, catering, banquet chef.',
    images: ['https://chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://chef-ilhama.food/en/services',
    languages: {
      az: 'https://chef-ilhama.food/xidmetler',
      en: 'https://chef-ilhama.food/en/services',
    },
  },
};

const serviceFaqs = [
  {
    question: 'What services does Chef İlhamə offer?',
    answer:
      'Chef İlhamə offers private chef service, premium catering, wedding feast planning, corporate event service, engagement and family celebration catering, as well as masterclass and workshop formats.',
  },
  {
    question: 'Which areas are covered?',
    answer:
      'Services cover Baku, Sumqayıt, and the Abşeron region. Venue and logistics are planned in advance.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'You can order via WhatsApp (+994 77 614 11 74), phone, or the inquiry form on the website. The fastest response comes through WhatsApp.',
  },
  {
    question: 'What event sizes are available?',
    answer:
      'Services are available from intimate 10-person private dinners to grand 300+ guest wedding ceremonies.',
  },
];

export default function EnglishServicesPage() {
  const serviceSchema = getServicePageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
    { name: 'Services', href: '/en/services' },
  ]);
  const faqSchema = getFAQSchema(serviceFaqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Home', href: '/en' },
        { name: 'Services', href: '/en/services' },
      ]} />
    </>
  );
}

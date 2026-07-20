import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getContactPageSchema, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('en', 'contact', {
  title: 'Contact — Chef İlhamə',
  description:
    'Get in touch with Chef İlhamə. Send a private chef or catering service inquiry via WhatsApp, phone, or email. Baku, Sumqayıt, Abşeron.',
  keywords: 'contact Chef İlhamə, book chef Baku, catering order Baku, contact chef Azerbaijan',
  openGraph: {
    title: 'Contact — Chef İlhamə',
    description:
      'Contact Chef İlhamə. WhatsApp, phone, email. Baku, Sumqayıt, Abşeron.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'az_AZ',
    url: 'https://www.chef-ilhama.food/en/contact',
    siteName: 'Chef İlhamə',
    images: [
      {
        url: 'https://www.chef-ilhama.food/ilhama.png',
        width: 1200,
        height: 630,
        alt: 'Chef İlhamə — Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — Chef İlhamə',
    description: 'Contact Chef İlhamə. WhatsApp, phone, email.',
    images: ['https://www.chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://www.chef-ilhama.food/en/contact',
    languages: {
      az: 'https://www.chef-ilhama.food/elaqe',
      en: 'https://www.chef-ilhama.food/en/contact',
    },
  },
});

export default function EnglishContactPage() {
  const contactSchema = getContactPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/en' },
    { name: 'Contact', href: '/en/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'Home', href: '/en' },
        { name: 'Contact', href: '/en/contact' },
      ]} />
    </>
  );
}

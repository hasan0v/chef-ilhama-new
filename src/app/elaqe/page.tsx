import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getContactPageSchema, getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('az', 'contact', {
  title: 'Əlaqə — Chef İlhamə',
  description: 'Chef İlhamə ilə əlaqə saxlayın. WhatsApp, telefon, email ilə şəxsi aşpaz və katerinq xidmət sorğusu göndərin. Bakı, Sumqayıt, Abşeron.',
  keywords: 'Chef İlhamə əlaqə, aşpaz sifariş, katerinq sifariş Bakı, contact chef Baku',
  openGraph: {
    title: 'Əlaqə — Chef İlhamə',
    description: 'Chef İlhamə ilə əlaqə. WhatsApp, telefon, email. Bakı, Sumqayıt, Abşeron.',
    type: 'website',
    locale: 'az_AZ',
    alternateLocale: 'en_US',
    url: 'https://www.chef-ilhama.food/elaqe',
    siteName: 'Chef İlhamə',
    images: [{ url: 'https://www.chef-ilhama.food/ilhama.png', width: 1200, height: 630, alt: 'Chef İlhamə əlaqə' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Əlaqə — Chef İlhamə',
    description: 'Chef İlhamə ilə əlaqə. WhatsApp, telefon, email.',
    images: ['https://www.chef-ilhama.food/ilhama.png'],
  },
  alternates: {
    canonical: 'https://www.chef-ilhama.food/elaqe',
    languages: {
      'az': 'https://www.chef-ilhama.food/elaqe',
      'en': 'https://www.chef-ilhama.food/en/contact',
    },
  },
});

export default function ContactPage() {
  const contactSchema = getContactPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Əlaqə', href: '/elaqe' },
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
        { name: 'Ana Səhifə', href: '/' },
        { name: 'Əlaqə', href: '/elaqe' },
      ]} />
    </>
  );
}

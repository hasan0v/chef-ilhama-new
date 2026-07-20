import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('hi', 'contact', {
  title: 'संपर्क करें - शेफ इल्हामा',
  description: 'शेफ इल्हामा कुकिंग स्टूडियो से संपर्क करें। कैटरिंग, पर्सनल शेफ बुकिंग और सेवाएं।',
});

export default function HindiContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
    { name: 'संपर्क करें', href: '/hi/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'होम', href: '/hi' },
        { name: 'संपर्क करें', href: '/hi/contact' },
      ]} />
    </>
  );
}

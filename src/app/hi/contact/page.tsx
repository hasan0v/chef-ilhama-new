import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'संपर्क करें - शेफ इल्हामा',
  description: 'शेफ इल्हामा कुकिंग स्टूडियो से संपर्क करें। कैटरिंग, पर्सनल शेफ बुकिंग और सेवाएं।',
};

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
      <ContactStudioPage breadcrumbs={[
        { name: 'होम', href: '/hi' },
        { name: 'संपर्क करें', href: '/hi/contact' },
      ]} />
    </>
  );
}

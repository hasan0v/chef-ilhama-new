import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('hi', 'services', {
  title: 'सेवाएं - शेफ इल्हामा',
  description: 'पर्सनल शेफ बुकिंग स्टूडियो, इवेंट कैटरिंग और बाकू में खास पार्टियों के लिए सेवाएं।',
});

export default function HindiServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
    { name: 'सेवाएं', href: '/hi/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'होम', href: '/hi' },
        { name: 'सेवाएं', href: '/hi/services' },
      ]} />
    </>
  );
}

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('id', 'services', {
  title: 'Layanan - Chef İlhamə',
  description: 'Pesan Chef İlhamə untuk privat chef di rumah, catering premium, dan jamuan pernikahan di Baku.',
});

export default function IndonesianServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
    { name: 'Layanan', href: '/id/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'Beranda', href: '/id' },
        { name: 'Layanan', href: '/id/services' },
      ]} />
    </>
  );
}

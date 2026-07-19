import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Layanan - Chef İlhamə',
  description: 'Studio pemesanan privat chef di rumah, catering premium untuk korporasi, dan perencanaan jamuan pernikahan di Baku.',
};

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

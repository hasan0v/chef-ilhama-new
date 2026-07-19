import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'الخدمات - الشيف إلهامة',
  description: 'استوديو حجز الشيف الخاص، خدمات الضيافة والكاترينج الفاخر والتجمعات الحصرية في باكو.',
};

export default function ArabicServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'الرئيسية', href: '/ar' },
    { name: 'الخدمات', href: '/ar/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'الرئيسية', href: '/ar' },
        { name: 'الخدمات', href: '/ar/services' },
      ]} />
    </>
  );
}

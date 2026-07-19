import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'সেবাসমূহ - Chef İlhamə',
  description: 'বাসায় পার্সোনাল শেফ বুকিং সার্ভিস, কর্পোরেট প্রিমিয়াম ক্যাটারিং এবং বিয়ে বাড়ির রাজকীয় দস্তরখান পরিকল্পনা।',
};

export default function BengaliServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
    { name: 'সেবাসমূহ', href: '/bn/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'হোম', href: '/bn' },
        { name: 'সেবাসমূহ', href: '/bn/services' },
      ]} />
    </>
  );
}

import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'যোগাযোগ - Chef İlhamə',
  description: 'শেফ ইলহামার স্টুডিওর সাথে যোগাযোগের মাধ্যমসমূহ। ক্যাটারিং, পার্সোনাল শেফ এবং রিজার্ভেশন।',
};

export default function BengaliContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
    { name: 'যোগাযোগ', href: '/bn/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'হোম', href: '/bn' },
        { name: 'যোগাযোগ', href: '/bn/contact' },
      ]} />
    </>
  );
}

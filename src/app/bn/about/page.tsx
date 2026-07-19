import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'শেফ পরিচিতি - Chef İlhamə',
  description: 'শেফ ইলহামার স্টুডিওর গল্প, আমাদের ব্র্যান্ডের মূল্যবোধ এবং আতিথেয়তার নান্দনিক দর্শন।',
};

export default function BengaliAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'হোম', href: '/bn' },
    { name: 'শেফ পরিচিতি', href: '/bn/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'হোম', href: '/bn' },
        { name: 'শেফ পরিচিতি', href: '/bn/about' },
      ]} />
    </>
  );
}

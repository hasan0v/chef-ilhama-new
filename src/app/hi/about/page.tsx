import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'शेफ के बारे में - शेफ इल्हामा',
  description: 'शेफ इल्हामा कुकिंग स्टूडियो की कहानी, हमारे सिद्धांत और सेवाएं।',
};

export default function HindiAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'होम', href: '/hi' },
    { name: 'शेफ के बारे में', href: '/hi/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'होम', href: '/hi' },
        { name: 'शेफ के बारे में', href: '/hi/about' },
      ]} />
    </>
  );
}

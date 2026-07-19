import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('tr', 'about', {
  title: 'Hakkımızda - Şef İlhame',
  description: 'Şef İlhame kulinariya stüdyosunun hikayesi, değerleri ve hizmet vizyonu.',
});

export default function TurkishAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', href: '/tr' },
    { name: 'Hakkımızda', href: '/tr/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Ana Sayfa', href: '/tr' },
        { name: 'Hakkımızda', href: '/tr/about' },
      ]} />
    </>
  );
}

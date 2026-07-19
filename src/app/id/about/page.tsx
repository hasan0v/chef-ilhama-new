import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('id', 'about', {
  title: 'Tentang Kami - Chef İlhamə',
  description: 'Kisah di balik studio kuliner Chef İlhamə, nilai-nilai kami, dan visi tentang hospitality premium.',
});

export default function IndonesianAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
    { name: 'Tentang Kami', href: '/id/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Beranda', href: '/id' },
        { name: 'Tentang Kami', href: '/id/about' },
      ]} />
    </>
  );
}

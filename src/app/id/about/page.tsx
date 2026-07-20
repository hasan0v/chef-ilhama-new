import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('id', 'about', {
  title: 'Tentang Kami - Chef İlhamə',
  description: 'Kisah Chef İlhamə, nilai-nilainya, dan visinya tentang hospitality premium.',
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
      <AboutChefPage breadcrumbs={[
        { name: 'Beranda', href: '/id' },
        { name: 'Tentang Kami', href: '/id/about' },
      ]} />
    </>
  );
}

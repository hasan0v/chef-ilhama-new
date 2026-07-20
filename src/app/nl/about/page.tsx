import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('nl', 'about', {
  title: 'Over mij - Chef İlhamə',
  description: 'Het verhaal van Chef İlhamə, haar waarden en visie op gastvrijheid.',
});

export default function DutchAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', href: '/nl' },
    { name: 'Over mij', href: '/nl/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Home', href: '/nl' },
        { name: 'Over mij', href: '/nl/about' },
      ]} />
    </>
  );
}

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('nl', 'about', {
  title: 'Over mij - Chef İlhamə',
  description: 'Het verhaal achter de culinaire studio van Chef İlhamə, onze waarden en visie op gastvrijheid.',
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
      <AboutStudioPage breadcrumbs={[
        { name: 'Home', href: '/nl' },
        { name: 'Over mij', href: '/nl/about' },
      ]} />
    </>
  );
}

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('de', 'about', {
  title: 'Über mich - Chef İlhamə',
  description: 'Die Geschichte hinter dem kulinarischen Studio von Chef İlhamə, unsere Werte und Vision von erlesener Gastfreundschaft.',
});

export default function GermanAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Startseite', href: '/de' },
    { name: 'Über mich', href: '/de/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'Startseite', href: '/de' },
        { name: 'Über mich', href: '/de/about' },
      ]} />
    </>
  );
}

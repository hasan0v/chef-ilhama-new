import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('es', 'about', {
  title: 'Sobre mí - Chef İlhamə',
  description: 'La historia de Chef İlhamə, sus valores y su visión de la hospitalidad.',
});

export default function SpanishAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Inicio', href: '/es' },
    { name: 'Sobre mí', href: '/es/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutChefPage breadcrumbs={[
        { name: 'Inicio', href: '/es' },
        { name: 'Sobre mí', href: '/es/about' },
      ]} />
    </>
  );
}

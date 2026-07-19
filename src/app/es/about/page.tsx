import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('es', 'about', {
  title: 'Sobre mí - Chef İlhamə',
  description: 'La historia detrás del estudio culinario de la Chef İlhamə, nuestros valores y visión de la hospitalidad.',
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
      <AboutStudioPage breadcrumbs={[
        { name: 'Inicio', href: '/es' },
        { name: 'Sobre mí', href: '/es/about' },
      ]} />
    </>
  );
}

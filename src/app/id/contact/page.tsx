import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('id', 'contact', {
  title: 'Kontak - Chef İlhamə',
  description: 'Hubungi studio kuliner Chef İlhamə. Catering, privat chef, dan reservasi.',
});

export default function IndonesianContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Beranda', href: '/id' },
    { name: 'Kontak', href: '/id/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'Beranda', href: '/id' },
        { name: 'Kontak', href: '/id/contact' },
      ]} />
    </>
  );
}

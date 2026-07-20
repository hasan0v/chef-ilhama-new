import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('id', 'contact', {
  title: 'Kontak - Chef İlhamə',
  description: 'Hubungi Chef İlhamə untuk catering, privat chef, dan reservasi.',
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
      <ContactChefPage breadcrumbs={[
        { name: 'Beranda', href: '/id' },
        { name: 'Kontak', href: '/id/contact' },
      ]} />
    </>
  );
}

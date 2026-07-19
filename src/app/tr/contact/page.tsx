import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('tr', 'contact', {
  title: 'İletişim - Şef İlhame',
  description: 'Şef İlhame mutfak stüdyosuyla iletişime geçin. Rezervasyon, catering ve özel şef talepleri.',
});

export default function TurkishContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', href: '/tr' },
    { name: 'İletişim', href: '/tr/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactStudioPage breadcrumbs={[
        { name: 'Ana Sayfa', href: '/tr' },
        { name: 'İletişim', href: '/tr/contact' },
      ]} />
    </>
  );
}

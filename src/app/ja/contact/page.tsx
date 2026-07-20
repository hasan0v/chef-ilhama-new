import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('ja', 'contact', {
  title: 'お問い合わせ - Chef İlhamə',
  description: 'シェフ・イルハメの料理スタジオへのお問い合わせ。ケータリング、出張シェフ、ご予約。',
});

export default function JapaneseContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
    { name: 'お問い合わせ', href: '/ja/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: 'ホーム', href: '/ja' },
        { name: 'お問い合わせ', href: '/ja/contact' },
      ]} />
    </>
  );
}

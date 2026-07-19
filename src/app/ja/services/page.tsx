import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: '出張・ケータリング - Chef İlhamə',
  description: '私邸への出張プライベートシェフ予約サービス、企業向けプレミアムケータリング、バクーでの婚礼の祝宴プロデュース。',
};

export default function JapaneseServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
    { name: '出張・ケータリング', href: '/ja/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: 'ホーム', href: '/ja' },
        { name: '出張・ケータリング', href: '/ja/services' },
      ]} />
    </>
  );
}

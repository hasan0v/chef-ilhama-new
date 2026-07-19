import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'シェフについて - Chef İlhamə',
  description: 'シェフ・イルハメの料理スタジオの背景にある歩み、私たちが重んじる価値観、そしてもてなしの美学。',
};

export default function JapaneseAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'ホーム', href: '/ja' },
    { name: 'シェフについて', href: '/ja/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: 'ホーム', href: '/ja' },
        { name: 'シェフについて', href: '/ja/about' },
      ]} />
    </>
  );
}

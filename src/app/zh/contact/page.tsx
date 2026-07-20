import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import ContactChefPage from '@/components/site/pages/ContactChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('zh', 'contact', {
  title: '联系我们 - 主厨 İlhamə',
  description: '联系主厨 İlhamə 工作室。定制预约、高端外烩及私厨咨询。',
});

export default function ChineseContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
    { name: '联系我们', href: '/zh/contact' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactChefPage breadcrumbs={[
        { name: '首页', href: '/zh' },
        { name: '联系我们', href: '/zh/contact' },
      ]} />
    </>
  );
}

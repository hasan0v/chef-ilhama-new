import type { Metadata } from 'next';
import ServicesExperience from '@/components/site/pages/ServicesExperience';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: '定制服务 - 主厨 İlhamə',
  description: '高端预约上门私厨服务、精致小型沙龙晚宴及高端宴会外烩（Catering）策划。',
};

export default function ChineseServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
    { name: '定制服务', href: '/zh/services' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesExperience breadcrumbs={[
        { name: '首页', href: '/zh' },
        { name: '定制服务', href: '/zh/services' },
      ]} />
    </>
  );
}

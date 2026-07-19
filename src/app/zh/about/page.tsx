import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: '关于厨师 - 主厨 İlhamə',
  description: '主厨 İlhamə 烹饪工作室的故事、品牌理念与卓越服务愿景。',
};

export default function ChineseAboutPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '首页', href: '/zh' },
    { name: '关于厨师', href: '/zh/about' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutStudioPage breadcrumbs={[
        { name: '首页', href: '/zh' },
        { name: '关于厨师', href: '/zh/about' },
      ]} />
    </>
  );
}

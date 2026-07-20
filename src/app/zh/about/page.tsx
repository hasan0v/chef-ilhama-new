import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import AboutChefPage from '@/components/site/pages/AboutChefPage';
import { getBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = withLocaleAlternates('zh', 'about', {
  title: '关于厨师 - 主厨 İlhamə',
  description: '主厨 İlhamə 烹饪工作室的故事、品牌理念与卓越服务愿景。',
});

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
      <AboutChefPage breadcrumbs={[
        { name: '首页', href: '/zh' },
        { name: '关于厨师', href: '/zh/about' },
      ]} />
    </>
  );
}

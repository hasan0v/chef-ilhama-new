import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import type { BreadcrumbItem } from '@/lib/seo';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageLayout({ children, breadcrumbs }: PageLayoutProps) {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbNav items={breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
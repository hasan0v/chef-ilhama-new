'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BreadcrumbNav from '@/components/layout/BreadcrumbNav';
import type { BreadcrumbItem } from '@/lib/seo';
import { usePathname } from 'next/navigation';

interface PageLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export default function PageLayout({ children, breadcrumbs }: PageLayoutProps) {
  const pathname = usePathname();

  const isHome = pathname === '/' || 
                 pathname === '/en' || 
                 pathname === '/tr' || 
                 pathname === '/ru' || 
                 pathname === '/fr' || 
                 pathname === '/it' || 
                 pathname === '/ar' || 
                 pathname === '/zh' || 
                 pathname === '/hi' || 
                 pathname === '/es' || 
                 pathname === '/pt' || 
                 pathname === '/nl' || 
                 pathname === '/de' || 
                 pathname === '/ja' || 
                 pathname === '/id' || 
                 pathname === '/bn';

  return (
    <div className={`page-shell flex min-h-screen flex-col ${isHome ? '!pt-0' : ''}`}>
      <Header />
      <main className="flex-grow">
        {breadcrumbs && breadcrumbs.length > 0 && <BreadcrumbNav items={breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
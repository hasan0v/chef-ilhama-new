import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import type { BreadcrumbItem } from '@/lib/seo';

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Breadcrumb" className="px-4 py-3 sm:px-6 lg:px-8">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 text-sm text-[rgba(57,44,35,0.64)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />}
              {isLast ? (
                <span className="font-medium text-[rgba(57,44,35,0.88)]" aria-current="page">
                  {index === 0 && <Home className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[rgba(141,58,36,0.96)]"
                >
                  {index === 0 && <Home className="mr-1 inline h-3.5 w-3.5" aria-hidden="true" />}
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

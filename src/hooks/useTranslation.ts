'use client';

import { usePathname } from 'next/navigation';
import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';

export function useTranslation() {
  const pathname = usePathname();
  if (pathname?.startsWith('/en/') || pathname === '/en') {
    return { t: en, locale: 'en' as const };
  }
  if (pathname?.startsWith('/tr/') || pathname === '/tr') {
    return { t: tr, locale: 'tr' as const };
  }
  return { t: az, locale: 'az' as const };
}

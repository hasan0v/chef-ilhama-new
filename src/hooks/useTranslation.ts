'use client';

import { usePathname } from 'next/navigation';
import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';

export function useTranslation() {
  const pathname = usePathname();
  const isEn = pathname?.startsWith('/en/') || pathname === '/en';
  const t = isEn ? en : az;
  return { t, locale: isEn ? 'en' : 'az' as const };
}

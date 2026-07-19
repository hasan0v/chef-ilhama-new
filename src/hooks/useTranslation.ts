'use client';

import { usePathname } from 'next/navigation';
import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';
import { ru } from '@/dictionaries/ru';
import { fr } from '@/dictionaries/fr';

export function useTranslation() {
  const pathname = usePathname();
  if (pathname?.startsWith('/en/') || pathname === '/en') {
    return { t: en, locale: 'en' as const };
  }
  if (pathname?.startsWith('/tr/') || pathname === '/tr') {
    return { t: tr, locale: 'tr' as const };
  }
  if (pathname?.startsWith('/ru/') || pathname === '/ru') {
    return { t: ru, locale: 'ru' as const };
  }
  if (pathname?.startsWith('/fr/') || pathname === '/fr') {
    return { t: fr, locale: 'fr' as const };
  }
  return { t: az, locale: 'az' as const };
}

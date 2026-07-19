'use client';

import { usePathname } from 'next/navigation';
import { az } from '@/dictionaries/az';
import { en } from '@/dictionaries/en';
import { tr } from '@/dictionaries/tr';
import { ru } from '@/dictionaries/ru';
import { fr } from '@/dictionaries/fr';
import { it } from '@/dictionaries/it';
import { ar } from '@/dictionaries/ar';
import { zh } from '@/dictionaries/zh';
import { hi } from '@/dictionaries/hi';
import { es } from '@/dictionaries/es';
import { pt } from '@/dictionaries/pt';
import { nl } from '@/dictionaries/nl';
import { de } from '@/dictionaries/de';
import { ja } from '@/dictionaries/ja';

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
  if (pathname?.startsWith('/it/') || pathname === '/it') {
    return { t: it, locale: 'it' as const };
  }
  if (pathname?.startsWith('/ar/') || pathname === '/ar') {
    return { t: ar, locale: 'ar' as const };
  }
  if (pathname?.startsWith('/zh/') || pathname === '/zh') {
    return { t: zh, locale: 'zh' as const };
  }
  if (pathname?.startsWith('/hi/') || pathname === '/hi') {
    return { t: hi, locale: 'hi' as const };
  }
  if (pathname?.startsWith('/es/') || pathname === '/es') {
    return { t: es, locale: 'es' as const };
  }
  if (pathname?.startsWith('/pt/') || pathname === '/pt') {
    return { t: pt, locale: 'pt' as const };
  }
  if (pathname?.startsWith('/nl/') || pathname === '/nl') {
    return { t: nl, locale: 'nl' as const };
  }
  if (pathname?.startsWith('/de/') || pathname === '/de') {
    return { t: de, locale: 'de' as const };
  }
  if (pathname?.startsWith('/ja/') || pathname === '/ja') {
    return { t: ja, locale: 'ja' as const };
  }
  return { t: az, locale: 'az' as const };
}

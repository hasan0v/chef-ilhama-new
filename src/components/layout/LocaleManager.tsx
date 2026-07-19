'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LocaleManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const isAr = pathname.startsWith('/ar/') || pathname === '/ar';
    const isEn = pathname.startsWith('/en/') || pathname === '/en';
    const isTr = pathname.startsWith('/tr/') || pathname === '/tr';
    const isRu = pathname.startsWith('/ru/') || pathname === '/ru';
    const isFr = pathname.startsWith('/fr/') || pathname === '/fr';
    const isIt = pathname.startsWith('/it/') || pathname === '/it';
    const isZh = pathname.startsWith('/zh/') || pathname === '/zh';
    const isHi = pathname.startsWith('/hi/') || pathname === '/hi';
    const isEs = pathname.startsWith('/es/') || pathname === '/es';

    let lang = 'az';
    let dir = 'ltr';

    if (isAr) {
      lang = 'ar';
      dir = 'rtl';
    } else if (isEn) {
      lang = 'en';
    } else if (isTr) {
      lang = 'tr';
    } else if (isRu) {
      lang = 'ru';
    } else if (isFr) {
      lang = 'fr';
    } else if (isIt) {
      lang = 'it';
    } else if (isZh) {
      lang = 'zh';
    } else if (isHi) {
      lang = 'hi';
    } else if (isEs) {
      lang = 'es';
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [pathname]);

  return null;
}

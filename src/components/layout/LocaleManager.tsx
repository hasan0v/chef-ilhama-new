'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function LocaleManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    const supported = ['en', 'tr', 'ru', 'fr', 'it', 'ar', 'zh', 'hi', 'es', 'pt', 'nl', 'de', 'ja', 'id', 'bn'];

    // Automatic redirection logic at root page '/'
    if (pathname === '/') {
      const savedLocale = localStorage.getItem('user-selected-locale');
      if (savedLocale && savedLocale !== 'az') {
        if (supported.includes(savedLocale)) {
          window.location.replace(`/${savedLocale}`);
          return;
        }
      } else if (!savedLocale) {
        // First time load: detect browser language
        const browserLang = ((navigator.languages && navigator.languages[0]) || navigator.language || '').substring(0, 2).toLowerCase();
        if (supported.includes(browserLang)) {
          localStorage.setItem('user-selected-locale', browserLang);
          window.location.replace(`/${browserLang}`);
          return;
        } else {
          localStorage.setItem('user-selected-locale', 'az');
        }
      }
    }

    // Save locale preference when visiting a localized path
    const pathParts = pathname.split('/');
    const firstSegment = pathParts[1];
    if (supported.includes(firstSegment)) {
      localStorage.setItem('user-selected-locale', firstSegment);
    } else if (pathname === '/') {
      localStorage.setItem('user-selected-locale', 'az');
    }

    const isAr = pathname.startsWith('/ar/') || pathname === '/ar';
    const isEn = pathname.startsWith('/en/') || pathname === '/en';
    const isTr = pathname.startsWith('/tr/') || pathname === '/tr';
    const isRu = pathname.startsWith('/ru/') || pathname === '/ru';
    const isFr = pathname.startsWith('/fr/') || pathname === '/fr';
    const isIt = pathname.startsWith('/it/') || pathname === '/it';
    const isZh = pathname.startsWith('/zh/') || pathname === '/zh';
    const isHi = pathname.startsWith('/hi/') || pathname === '/hi';
    const isEs = pathname.startsWith('/es/') || pathname === '/es';
    const isPt = pathname.startsWith('/pt/') || pathname === '/pt';
    const isNl = pathname.startsWith('/nl/') || pathname === '/nl';
    const isDe = pathname.startsWith('/de/') || pathname === '/de';
    const isJa = pathname.startsWith('/ja/') || pathname === '/ja';
    const isId = pathname.startsWith('/id/') || pathname === '/id';
    const isBn = pathname.startsWith('/bn/') || pathname === '/bn';

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
    } else if (isPt) {
      lang = 'pt';
    } else if (isNl) {
      lang = 'nl';
    } else if (isDe) {
      lang = 'de';
    } else if (isJa) {
      lang = 'ja';
    } else if (isId) {
      lang = 'id';
    } else if (isBn) {
      lang = 'bn';
    }

    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [pathname]);

  return null;
}

'use client';

import { useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0DZ2LRYK9J';

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const sendPageView = useCallback(() => {
    if (!pathname) return;
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    sendPageView();
  }, [sendPageView]);

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  );
}

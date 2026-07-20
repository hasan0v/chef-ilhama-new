'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { ANALYTICS_CONSENT_EVENT, getAnalyticsConsent } from '@/lib/analyticsConsent';

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-0DZ2LRYK9J';

function subscribeToAnalyticsConsent(onStoreChange: () => void) {
  window.addEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
  return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, onStoreChange);
}

function getCanonicalHostSnapshot() {
  return window.location.hostname === 'www.chef-ilhama.food';
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, getAnalyticsConsent, () => null);
  const isCanonicalHost = useSyncExternalStore(
    () => () => undefined,
    getCanonicalHostSnapshot,
    () => false,
  );

  const sendPageView = useCallback(() => {
    if (!pathname || consent !== 'granted') return;
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [consent, pathname]);

  useEffect(() => {
    sendPageView();
  }, [sendPageView]);

  if (consent !== 'granted' || !isCanonicalHost) return null;

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            send_page_view: false,
            anonymize_ip: true
          });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" onLoad={sendPageView} />
    </>
  );
}

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

function getConsentUpdate(consent: 'granted' | 'denied' | null) {
  const value = consent === 'granted' ? 'granted' : 'denied';

  return {
    analytics_storage: value,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  } as const;
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeToAnalyticsConsent, getAnalyticsConsent, () => null);
  const sendPageView = useCallback(() => {
    if (!pathname) return;
    window.gtag?.('event', 'page_view', {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  useEffect(() => {
    // The bootstrap in the root layout defines the denied default before the
    // Google tag loads. This update records an explicit visitor choice (or
    // keeps the privacy-safe default while the banner is undecided).
    window.gtag?.('consent', 'update', getConsentUpdate(consent));
  }, [consent]);

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

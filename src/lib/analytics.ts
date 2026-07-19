export type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, parameters: Record<string, AnalyticsValue> = {}) {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', eventName, Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined),
  ));
}

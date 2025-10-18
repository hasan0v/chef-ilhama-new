// Performance optimization utilities
import { useCallback, useMemo } from 'react';

// Debounce hook for search and filtering
export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      const timeoutId = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(timeoutId);
    },
    [callback, delay]
  );

  return debouncedCallback as T;
}

// Throttle hook for scroll events
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  let lastCall = 0;
  
  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return callback(...args);
      }
    },
    [callback, delay]
  );

  return throttledCallback as T;
}

// Image optimization helper
export function getOptimizedImageProps(src: string, alt: string, priority = false) {
  return {
    src,
    alt,
    priority,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    style: {
      objectFit: 'cover' as const,
    },
    loading: priority ? 'eager' as const : 'lazy' as const,
  };
}

// Intersection Observer hook for lazy loading
export function useIntersectionObserver(
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const defaultOptions = useMemo(() => ({
    threshold: 0.1,
    rootMargin: '50px',
    ...options,
  }), [options]);

  return useCallback((callback: (isIntersecting: boolean) => void) => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => callback(entry.isIntersecting),
      defaultOptions
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, defaultOptions]);
}

// Virtual scrolling utilities
export function calculateVisibleItems(
  containerHeight: number,
  itemHeight: number,
  scrollTop: number,
  overscan = 3
) {
  const visibleStart = Math.floor(scrollTop / itemHeight);
  const visibleEnd = Math.min(
    visibleStart + Math.ceil(containerHeight / itemHeight),
    Math.floor(scrollTop / itemHeight) + Math.ceil(containerHeight / itemHeight)
  );

  return {
    start: Math.max(0, visibleStart - overscan),
    end: visibleEnd + overscan,
  };
}

// Memoization helper for complex calculations
export function useMemoizedCalculation<T>(
  calculation: () => T,
  dependencies: React.DependencyList
): T {
  return useMemo(calculation, dependencies);
}

// Resource preloading
export function preloadRoute(href: string) {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
}

// Critical resource hints
export function addResourceHints() {
  if (typeof window === 'undefined') return;

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: true },
    { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossOrigin) link.crossOrigin = '';
    document.head.appendChild(link);
  });
}

// Service Worker registration
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
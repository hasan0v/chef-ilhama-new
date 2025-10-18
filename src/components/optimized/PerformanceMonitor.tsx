'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if performance API is available
    if (process.env.NODE_ENV !== 'production' || typeof window === 'undefined') {
      return;
    }

    const metrics: PerformanceMetrics = {};
    
    // Measure Core Web Vitals
    const measurePerformance = () => {
      // First Contentful Paint
      const paintEntries = performance.getEntriesByType('paint');
      const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }

      // Time to First Byte
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
        metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
      }

      // Log metrics for debugging (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', {
          'First Contentful Paint': metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
          'Time to First Byte': metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A',
          'Page Load Time': `${performance.now().toFixed(2)}ms`
        });
      }
    };

    // Measure performance after page load
    if (document.readyState === 'complete') {
      setTimeout(measurePerformance, 100);
    } else {
      window.addEventListener('load', () => {
        setTimeout(measurePerformance, 100);
      });
    }

    // Measure LCP using PerformanceObserver
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          metrics.lcp = lastEntry.startTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.name === 'first-input') {
              metrics.fid = (entry as any).processingStart - entry.startTime;
            }
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          metrics.cls = clsValue;
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });

        // Report metrics after 5 seconds (when they're stable)
        setTimeout(() => {
          if (process.env.NODE_ENV === 'development') {
            console.log('Core Web Vitals:', {
              'LCP': metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
              'FID': metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A', 
              'CLS': metrics.cls ? metrics.cls.toFixed(4) : 'N/A'
            });

            // Performance recommendations
            const recommendations = [];
            if (metrics.fcp && metrics.fcp > 1800) {
              recommendations.push('FCP > 1.8s: Consider reducing bundle size or enabling SSR');
            }
            if (metrics.lcp && metrics.lcp > 2500) {
              recommendations.push('LCP > 2.5s: Optimize images and critical resources');
            }
            if (metrics.fid && metrics.fid > 100) {
              recommendations.push('FID > 100ms: Reduce JavaScript execution time');
            }
            if (metrics.cls && metrics.cls > 0.1) {
              recommendations.push('CLS > 0.1: Fix layout shifts from images/fonts');
            }

            if (recommendations.length > 0) {
              console.warn('Performance Recommendations:', recommendations);
            } else {
              console.log('✅ All Core Web Vitals are within good thresholds!');
            }
          }
        }, 5000);

      } catch (error) {
        console.warn('Performance monitoring failed:', error);
      }
    }

    // Resource timing analysis
    const analyzeResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources
        .filter((resource: any) => resource.duration > 1000)
        .map((resource: any) => ({
          name: resource.name.split('/').pop(),
          duration: resource.duration.toFixed(2),
          size: resource.transferSize
        }));

      if (slowResources.length > 0 && process.env.NODE_ENV === 'development') {
        console.warn('Slow Resources (>1s):', slowResources);
      }
    };

    setTimeout(analyzeResourceTiming, 3000);

  }, []);

  return null; // This component doesn't render anything
}

// Hook for manual performance tracking
export const usePerformanceTracking = () => {
  const trackCustomMetric = (name: string, startTime: number) => {
    const duration = performance.now() - startTime;
    if (process.env.NODE_ENV === 'development') {
      console.log(`Custom Metric - ${name}: ${duration.toFixed(2)}ms`);
    }
  };

  const trackPageTransition = (from: string, to: string) => {
    const startTime = performance.now();
    return () => {
      const duration = performance.now() - startTime;
      if (process.env.NODE_ENV === 'development') {
        console.log(`Page transition ${from} → ${to}: ${duration.toFixed(2)}ms`);
      }
    };
  };

  return { trackCustomMetric, trackPageTransition };
};
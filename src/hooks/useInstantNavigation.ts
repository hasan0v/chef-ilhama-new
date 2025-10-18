'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useCallback } from 'react';

// Instant Navigation Hook
export function useInstantNavigation() {
  const router = useRouter();

  // Preload critical routes on app start
  useEffect(() => {
    const preloadRoutes = ['/reseptler', '/haqqinda'];
    preloadRoutes.forEach(route => {
      router.prefetch(route);
    });
  }, [router]);

  const navigateInstantly = useCallback((href: string) => {
    // Use push for instant navigation
    router.push(href);
  }, [router]);

  const prefetchRoute = useCallback((href: string) => {
    router.prefetch(href);
  }, [router]);

  return { navigateInstantly, prefetchRoute };
}

// Navigation utilities
export function createInstantNavigationHandler(
  navigateInstantly: (href: string) => void,
  href: string
) {
  return () => navigateInstantly(href);
}

export function createPrefetchHandler(
  prefetchRoute: (href: string) => void,
  href: string
) {
  return () => prefetchRoute(href);
}

// Recipe card prefetch utility
export function usePrefetchRecipes(recipes: { slug: string }[]) {
  const router = useRouter();

  useEffect(() => {
    // Prefetch first few recipes immediately
    const prefetchTimer = setTimeout(() => {
      recipes.slice(0, 6).forEach(recipe => {
        router.prefetch(`/resept/${recipe.slug}`);
      });
    }, 50);

    return () => clearTimeout(prefetchTimer);
  }, [recipes, router]);
}
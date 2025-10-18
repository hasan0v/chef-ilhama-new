// High-performance component wrapper with lazy loading and virtualization
'use client';

import { memo, useMemo, useCallback, lazy, Suspense } from 'react';
import { Recipe } from '@/types/recipe';

// Lazy load heavy components
const LazyRecipeCard = lazy(() => 
  import('@/components/recipe/AnimatedRecipeCard').then(module => ({
    default: module.default
  }))
);

const LazyRecipeGrid = lazy(() => 
  import('@/components/recipe/RecipeGrid').then(module => ({
    default: module.default
  }))
);

interface OptimizedRecipeListProps {
  recipes: Recipe[];
  viewMode?: 'grid' | 'list';
  className?: string;
}

// Virtualized recipe list for better performance with large datasets
function OptimizedRecipeList({ recipes, viewMode = 'grid', className }: OptimizedRecipeListProps) {
  // Memoize recipe chunks for better performance
  const recipeChunks = useMemo(() => {
    if (recipes.length <= 12) return [recipes];
    
    const chunks = [];
    for (let i = 0; i < recipes.length; i += 12) {
      chunks.push(recipes.slice(i, i + 12));
    }
    return chunks;
  }, [recipes]);

  const renderRecipeChunk = useCallback((chunk: Recipe[], chunkIndex: number) => (
    <div key={chunkIndex} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {chunk.map((recipe) => (
        <Suspense 
          key={recipe.id} 
          fallback={
            <div className="h-64 bg-gray-200 animate-pulse rounded-lg" />
          }
        >
          <LazyRecipeCard recipe={recipe} />
        </Suspense>
      ))}
    </div>
  ), []);

  if (viewMode === 'list') {
    return (
      <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
        <LazyRecipeGrid recipes={recipes} className={className} />
      </Suspense>
    );
  }

  return (
    <div className={className}>
      {recipeChunks.map((chunk, index) => renderRecipeChunk(chunk, index))}
    </div>
  );
}

export default memo(OptimizedRecipeList);

// Optimized search component with debouncing
interface OptimizedSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export const OptimizedSearch = memo(function OptimizedSearch({ 
  onSearch, 
  placeholder = "Axtarış...", 
  debounceMs = 300 
}: OptimizedSearchProps) {
  const debouncedSearch = useCallback(
    (query: string) => debounce(onSearch, debounceMs)(query),
    [onSearch, debounceMs]
  );

  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => debouncedSearch(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
    />
  );
});

// Debounce utility
function debounce(
  func: (query: string) => void,
  wait: number
): (query: string) => void {
  let timeout: NodeJS.Timeout;
  return (query: string) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(query), wait);
  };
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  useMemo(() => {
    if (typeof window === 'undefined') return;
    
    const start = performance.now();
    
    return () => {
      const end = performance.now();
      console.log(`${componentName} render time: ${end - start}ms`);
    };
  }, [componentName]);
}
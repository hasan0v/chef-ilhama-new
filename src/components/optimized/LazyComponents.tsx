'use client';

import { lazy, Suspense, ReactNode } from 'react';

// Types for component props
interface WrapperProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// Lazy load heavy components
export const LazyMotionDiv = lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.div 
  }))
);

export const LazyAnimatePresence = lazy(() =>
  import('framer-motion').then(module => ({
    default: module.AnimatePresence
  }))
);

// Simple loading skeletons using CSS classes
const SkeletonDiv = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

// Loading skeletons for different component types
export const CardSkeleton = () => (
  <div className="space-y-3">
    <SkeletonDiv className="h-48 w-full rounded-lg" />
    <div className="space-y-2">
      <SkeletonDiv className="h-4 w-3/4" />
      <SkeletonDiv className="h-4 w-1/2" />
    </div>
  </div>
);

export const HeaderSkeleton = () => (
  <div className="h-16 border-b bg-white/80 backdrop-blur-sm">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-full">
      <SkeletonDiv className="h-8 w-32" />
      <div className="hidden md:flex space-x-6">
        <SkeletonDiv className="h-4 w-20" />
        <SkeletonDiv className="h-4 w-20" />
        <SkeletonDiv className="h-4 w-20" />
        <SkeletonDiv className="h-4 w-20" />
      </div>
      <SkeletonDiv className="h-6 w-6 md:hidden" />
    </div>
  </div>
);

export const RecipeGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 6 }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

// Optimized wrapper components with loading states
export const LazyMotionWrapper = ({ children, ...props }: WrapperProps) => (
  <Suspense fallback={<div className="animate-pulse bg-gray-100 rounded h-20" />}>
    <LazyMotionDiv {...props}>
      {children}
    </LazyMotionDiv>
  </Suspense>
);

export const LazyAnimatePresenceWrapper = ({ children, ...props }: WrapperProps) => (
  <Suspense fallback={null}>
    <LazyAnimatePresence {...props}>
      {children}
    </LazyAnimatePresence>
  </Suspense>
);
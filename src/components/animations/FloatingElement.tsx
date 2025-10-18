'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingElementProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'diagonal';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
}

export default function FloatingElement({ 
  children, 
  direction = 'up', 
  duration = 3, 
  delay = 0, 
  distance = 10,
  className = ''
}: FloatingElementProps) {
  
  const getAnimationVariants = () => {
    switch (direction) {
      case 'up':
        return {
          y: [-distance, distance, -distance]
        };
      case 'down':
        return {
          y: [distance, -distance, distance]
        };
      case 'left':
        return {
          x: [-distance, distance, -distance]
        };
      case 'right':
        return {
          x: [distance, -distance, distance]
        };
      case 'diagonal':
        return {
          x: [-distance, distance, -distance],
          y: [-distance, distance, -distance]
        };
      default:
        return {
          y: [-distance, distance, -distance]
        };
    }
  };

  return (
    <motion.div
      animate={getAnimationVariants()}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Preset floating components
export function FloatingChef({ className = '' }: { className?: string }) {
  return (
    <FloatingElement direction="up" duration={4} distance={15} className={className}>
      <div className="text-6xl opacity-20">👨‍🍳</div>
    </FloatingElement>
  );
}

export function FloatingFood({ className = '' }: { className?: string }) {
  return (
    <FloatingElement direction="diagonal" duration={5} distance={20} className={className}>
      <div className="text-4xl opacity-15">🍽️</div>
    </FloatingElement>
  );
}

export function FloatingSpice({ className = '' }: { className?: string }) {
  return (
    <FloatingElement direction="right" duration={3} distance={12} className={className}>
      <div className="text-3xl opacity-10">🌶️</div>
    </FloatingElement>
  );
}
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ReactNode, forwardRef } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  animationType?: 'pulse' | 'bounce' | 'shake' | 'glow' | 'ripple';
}

const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ 
    children, 
    onClick, 
    variant = 'default', 
    size = 'default', 
    className = '', 
    disabled = false,
    type = 'button',
    animationType = 'pulse'
  }, ref) => {

    const getAnimationVariants = () => {
      switch (animationType) {
        case 'pulse':
          return {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 },
            transition: { type: "spring" as const, stiffness: 400, damping: 17 }
          };
        case 'bounce':
          return {
            whileHover: { y: -2 },
            whileTap: { y: 0 },
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
          };
        case 'shake':
          return {
            whileHover: { 
              x: [0, -2, 2, -2, 2, 0],
              transition: { duration: 0.5 }
            },
            whileTap: { scale: 0.95 }
          };
        case 'glow':
          return {
            whileHover: { 
              boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)",
              scale: 1.02
            },
            whileTap: { scale: 0.98 }
          };
        case 'ripple':
          return {
            whileHover: { scale: 1.03 },
            whileTap: { 
              scale: 0.97,
              transition: { duration: 0.1 }
            }
          };
        default:
          return {
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          };
      }
    };

    const animationProps = getAnimationVariants();

    return (
      <motion.div
        whileHover={animationProps.whileHover}
        whileTap={animationProps.whileTap}
        transition={animationProps.transition}
        className="inline-block"
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={className}
          disabled={disabled}
          type={type}
          onClick={onClick}
        >
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

export default AnimatedButton;
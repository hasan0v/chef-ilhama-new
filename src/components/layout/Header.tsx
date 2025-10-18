'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChefHat, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Ana Səhifə', href: '/' },
  { name: 'Reseptlər', href: '/reseptler' },
  { name: 'Xidmətlər', href: '/xidmetler' },
  { name: 'Haqqında', href: '/haqqinda' },
  { name: 'Əlaqə', href: '/elaqe' }
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  
  const handleInstantNavigation = useCallback((href: string) => {
    setIsMenuOpen(false); // Close mobile menu
    router.push(href);
  }, [router]);
  
  // Prefetch all navigation routes on component mount
  useEffect(() => {
    navigation.forEach(item => {
      router.prefetch(item.href);
    });
  }, [router]);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const itemVariants = {
    closed: { x: -20, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <ChefHat className="h-8 w-8 text-red-700" />
              </motion.div>
              <motion.span 
                className="font-bold text-xl text-gray-900"
                whileHover={{ 
                  color: "#b91c1c",
                  textShadow: "0 0 8px rgba(185, 28, 28, 0.3)"
                }}
              >
                Chef İlhamə
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation with stagger animations */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
              >
                <button
                  onClick={() => handleInstantNavigation(item.href)}
                  onMouseEnter={() => router.prefetch(item.href)}
                  className="text-gray-700 hover:text-red-700 px-3 py-2 text-sm font-medium transition-colors relative overflow-hidden bg-transparent border-none cursor-pointer"
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ 
                      textShadow: "0 2px 4px rgba(0,0,0,0.1)"
                    }}
                  >
                    {item.name}
                  </motion.span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Animated Mobile menu button */}
          <div className="md:hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Animated Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <button
                      onClick={() => handleInstantNavigation(item.href)}
                      onMouseEnter={() => router.prefetch(item.href)}
                      className="text-gray-700 hover:text-red-700 block px-3 py-2 text-base font-medium hover:bg-red-50 rounded-md transition-colors w-full text-left bg-transparent border-none cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
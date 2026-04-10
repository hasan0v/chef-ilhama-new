'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ChefHat, Clock3, Menu, Phone, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { getWhatsAppHref, mainNavigation, siteConfig } from '@/lib/site';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/60 bg-[rgba(255,251,246,0.82)] shadow-[0_18px_60px_rgba(52,34,22,0.12)] backdrop-blur-xl">
        <div className="hidden items-center justify-between border-b border-[rgba(98,67,45,0.08)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(95,59,37,0.72)] md:flex">
          <div className="flex items-center gap-3">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{siteConfig.hours}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{siteConfig.serviceAreas.join(' · ')}</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(141,58,36,0.72)]" />
            <a href={siteConfig.phoneHref} className="transition-colors hover:text-[rgba(141,58,36,0.96)]">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,rgba(141,58,36,0.14),rgba(201,150,69,0.18))] text-[rgba(141,58,36,0.96)] transition-transform duration-300 group-hover:-rotate-6">
              <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="display-title text-xl sm:text-2xl lg:text-3xl leading-none text-foreground">Chef İlhamə</div>
              <div className="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-[rgba(95,59,37,0.64)]">
                Resept kolleksiyası
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]'
                      : 'text-[rgba(57,44,35,0.76)] hover:bg-white/70 hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/70 px-5 text-[rgba(57,44,35,0.82)] hover:bg-white">
              <Link href="/reseptler">
                <Search className="h-4 w-4" />
                Reseptlər
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-5 text-white shadow-[0_12px_30px_rgba(141,58,36,0.28)] hover:bg-[rgba(141,58,36,0.9)]">
              <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                Əlaqə
              </a>
            </Button>
          </div>

          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label="Menyunu aç"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="overflow-hidden border-t border-[rgba(98,67,45,0.08)] lg:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2 px-4 py-4">
                {mainNavigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]'
                          : 'bg-white/50 text-[rgba(57,44,35,0.82)] hover:bg-white/80'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="grid gap-2 pt-2">
                  <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] text-white">
                    <Link href="/reseptler">Reseptlərə bax</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full border-[rgba(98,67,45,0.14)] bg-white/70">
                    <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
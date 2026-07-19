'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ChefHat, Clock3, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import { useTranslation } from '@/hooks/useTranslation';

function getLocalizedPath(currentPath: string, targetLocale: 'az' | 'en' | 'tr' | 'ru' | 'fr'): string {
  let cleanPath = currentPath;
  if (currentPath.startsWith('/en/') || currentPath === '/en') {
    cleanPath = currentPath === '/en' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/tr/') || currentPath === '/tr') {
    cleanPath = currentPath === '/tr' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/ru/') || currentPath === '/ru') {
    cleanPath = currentPath === '/ru' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/fr/') || currentPath === '/fr') {
    cleanPath = currentPath === '/fr' ? '/' : currentPath.substring(3);
  }

  let routeKey = cleanPath;
  let slug = '';
  if (cleanPath.startsWith('/resept/')) {
    routeKey = '/resept';
    slug = cleanPath.substring(8);
  } else if (cleanPath.startsWith('/recipe/')) {
    routeKey = '/resept';
    slug = cleanPath.substring(8);
  }

  const paths: Record<string, Record<'az' | 'en' | 'tr' | 'ru' | 'fr', string>> = {
    '/': { az: '/', en: '/', tr: '/', ru: '/', fr: '/' },
    '/reseptler': { az: '/reseptler', en: '/recipes', tr: '/recipes', ru: '/recipes', fr: '/recipes' },
    '/recipes': { az: '/reseptler', en: '/recipes', tr: '/recipes', ru: '/recipes', fr: '/recipes' },
    '/haqqinda': { az: '/haqqinda', en: '/about', tr: '/about', ru: '/about', fr: '/about' },
    '/about': { az: '/haqqinda', en: '/about', tr: '/about', ru: '/about', fr: '/about' },
    '/xidmetler': { az: '/xidmetler', en: '/services', tr: '/services', ru: '/services', fr: '/services' },
    '/services': { az: '/xidmetler', en: '/services', tr: '/services', ru: '/services', fr: '/services' },
    '/elaqe': { az: '/elaqe', en: '/contact', tr: '/contact', ru: '/contact', fr: '/contact' },
    '/contact': { az: '/elaqe', en: '/contact', tr: '/contact', ru: '/contact', fr: '/contact' },
    '/privacy': { az: '/privacy', en: '/privacy', tr: '/privacy', ru: '/privacy', fr: '/privacy' },
    '/terms': { az: '/terms', en: '/terms', tr: '/terms', ru: '/terms', fr: '/terms' },
    '/resept': { az: `/resept/${slug}`, en: `/recipe/${slug}`, tr: `/recipe/${slug}`, ru: `/recipe/${slug}`, fr: `/recipe/${slug}` }
  };

  const matched = paths[routeKey];
  let targetPath = cleanPath;
  if (matched) {
    targetPath = matched[targetLocale];
  }

  if (targetLocale === 'az') return targetPath;
  return `/${targetLocale}${targetPath === '/' ? '' : targetPath}`;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  const navigation = locale === 'en' ? [
    { name: t.nav.home, href: '/en' },
    { name: t.nav.recipes, href: '/en/recipes' },
    { name: t.nav.services, href: '/en/services' },
    { name: t.nav.about, href: '/en/about' },
    { name: t.nav.contact, href: '/en/contact' },
  ] : locale === 'tr' ? [
    { name: t.nav.home, href: '/tr' },
    { name: t.nav.recipes, href: '/tr/recipes' },
    { name: t.nav.services, href: '/tr/services' },
    { name: t.nav.about, href: '/tr/about' },
    { name: t.nav.contact, href: '/tr/contact' },
  ] : locale === 'ru' ? [
    { name: t.nav.home, href: '/ru' },
    { name: t.nav.recipes, href: '/ru/recipes' },
    { name: t.nav.services, href: '/ru/services' },
    { name: t.nav.about, href: '/ru/about' },
    { name: t.nav.contact, href: '/ru/contact' },
  ] : locale === 'fr' ? [
    { name: t.nav.home, href: '/fr' },
    { name: t.nav.recipes, href: '/fr/recipes' },
    { name: t.nav.services, href: '/fr/services' },
    { name: t.nav.about, href: '/fr/about' },
    { name: t.nav.contact, href: '/fr/contact' },
  ] : [
    { name: t.nav.home, href: '/' },
    { name: t.nav.recipes, href: '/reseptler' },
    { name: t.nav.services, href: '/xidmetler' },
    { name: t.nav.about, href: '/haqqinda' },
    { name: t.nav.contact, href: '/elaqe' },
  ];

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/60 bg-[rgba(255,251,246,0.82)] shadow-[0_18px_60px_rgba(52,34,22,0.12)] backdrop-blur-xl">
        <div className="hidden items-center justify-between border-b border-[rgba(98,67,45,0.08)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-[rgba(95,59,37,0.72)] md:flex">
          <div className="flex items-center gap-3">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{locale === 'en' ? 'Daily 08:00 - 22:00' : locale === 'tr' ? 'Her Gün 08:00 - 22:00' : locale === 'ru' ? 'Ежедневно 08:00 - 22:00' : locale === 'fr' ? 'Tous les jours 08:00 - 22:00' : 'Hər gün 08:00 - 22:00'}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{siteConfig.serviceAreas.map(area => area === 'Bakı' && locale === 'en' ? 'Baku' : area).join(' · ')}</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(141,58,36,0.72)]" />
            <a href={siteConfig.phoneHref} className="transition-colors hover:text-[rgba(141,58,36,0.96)]">
              {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4 sm:px-6">
          <Link href={locale === 'en' ? "/en" : locale === 'tr' ? "/tr" : locale === 'ru' ? "/ru" : locale === 'fr' ? "/fr" : "/"} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,rgba(141,58,36,0.14),rgba(201,150,69,0.18))] text-[rgba(141,58,36,0.96)] transition-transform duration-300 group-hover:-rotate-6">
              <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className="display-title text-xl sm:text-2xl lg:text-3xl leading-none text-foreground">{siteConfig.name}</div>
              <div className="mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                {t.header.recipesSub}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/en' && item.href !== '/tr' && item.href !== '/ru' && item.href !== '/fr' && pathname?.startsWith(item.href));

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
              <Link href={locale === 'en' ? "/en/recipes" : locale === 'tr' ? "/tr/recipes" : locale === 'ru' ? "/ru/recipes" : locale === 'fr' ? "/fr/recipes" : "/reseptler"}>
                <Search className="h-4 w-4" />
                {t.nav.recipes}
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-[rgba(141,58,36,0.96)] px-5 text-white shadow-[0_12px_30px_rgba(141,58,36,0.28)] hover:bg-[rgba(141,58,36,0.9)]">
              <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                {t.header.contactBtn}
              </a>
            </Button>
            
            {/* Language Switcher */}
            <div className="flex items-center gap-1 rounded-full border border-[rgba(98,67,45,0.1)] bg-white/72 p-0.5">
              {(['az', 'en', 'tr', 'ru', 'fr'] as const).map((lang) => {
                const isActive = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={getLocalizedPath(pathname || '/', lang)}
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ${
                      isActive
                        ? 'bg-[rgba(141,58,36,0.92)] text-white shadow-sm'
                        : 'text-[rgba(57,44,35,0.68)] hover:text-foreground hover:bg-white/50'
                    }`}
                  >
                    {lang}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Selector */}
            <div className="flex items-center gap-1 rounded-full border border-[rgba(98,67,45,0.1)] bg-white/72 p-0.5">
              {(['az', 'en', 'tr', 'ru', 'fr'] as const).map((lang) => {
                const isActive = locale === lang;
                return (
                  <Link
                    key={lang}
                    href={getLocalizedPath(pathname || '/', lang)}
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider transition-all duration-150 ${
                      isActive
                        ? 'bg-[rgba(141,58,36,0.92)] text-white shadow-sm'
                        : 'text-[rgba(57,44,35,0.68)] hover:text-foreground hover:bg-white/50'
                    }`}
                  >
                    {lang}
                  </Link>
                );
              })}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? t.header.mobileMenuClose : t.header.mobileMenuOpen}
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
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/en' && item.href !== '/tr' && item.href !== '/ru' && item.href !== '/fr' && pathname?.startsWith(item.href));

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
                    <Link href={locale === 'en' ? "/en/recipes" : locale === 'tr' ? "/tr/recipes" : locale === 'ru' ? "/ru/recipes" : locale === 'fr' ? "/fr/recipes" : "/reseptler"} onClick={() => setIsMenuOpen(false)}>{t.header.viewRecipes}</Link>
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
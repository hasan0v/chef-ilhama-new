'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ChefHat, Clock3, Menu, Search, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import { useTranslation } from '@/hooks/useTranslation';
import { persistLocalePreference } from '@/lib/localePreference';

const languages = [
  { code: 'az', label: 'Azərbaycanca' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'zh', label: '中文' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ja', label: '日本語' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' }
] as const;

function subscribeToNavbarScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true });
  return () => window.removeEventListener('scroll', onStoreChange);
}

function getNavbarScrollSnapshot() {
  return window.scrollY > 80;
}

function getServerNavbarScrollSnapshot() {
  return false;
}

function getLocalizedPath(currentPath: string, targetLocale: string): string {
  let cleanPath = currentPath;
  if (currentPath.startsWith('/en/') || currentPath === '/en') {
    cleanPath = currentPath === '/en' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/tr/') || currentPath === '/tr') {
    cleanPath = currentPath === '/tr' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/ru/') || currentPath === '/ru') {
    cleanPath = currentPath === '/ru' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/fr/') || currentPath === '/fr') {
    cleanPath = currentPath === '/fr' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/it/') || currentPath === '/it') {
    cleanPath = currentPath === '/it' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/ar/') || currentPath === '/ar') {
    cleanPath = currentPath === '/ar' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/zh/') || currentPath === '/zh') {
    cleanPath = currentPath === '/zh' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/hi/') || currentPath === '/hi') {
    cleanPath = currentPath === '/hi' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/es/') || currentPath === '/es') {
    cleanPath = currentPath === '/es' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/pt/') || currentPath === '/pt') {
    cleanPath = currentPath === '/pt' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/nl/') || currentPath === '/nl') {
    cleanPath = currentPath === '/nl' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/de/') || currentPath === '/de') {
    cleanPath = currentPath === '/de' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/ja/') || currentPath === '/ja') {
    cleanPath = currentPath === '/ja' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/id/') || currentPath === '/id') {
    cleanPath = currentPath === '/id' ? '/' : currentPath.substring(3);
  } else if (currentPath.startsWith('/bn/') || currentPath === '/bn') {
    cleanPath = currentPath === '/bn' ? '/' : currentPath.substring(3);
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

  const paths: Record<string, Record<string, string>> = {
    '/': { az: '/', en: '/', tr: '/', ru: '/', fr: '/', it: '/', ar: '/', zh: '/', hi: '/', es: '/', pt: '/', nl: '/', de: '/', ja: '/', id: '/', bn: '/' },
    '/reseptler': { az: '/reseptler', en: '/recipes', tr: '/recipes', ru: '/recipes', fr: '/recipes', it: '/recipes', ar: '/recipes', zh: '/recipes', hi: '/recipes', es: '/recipes', pt: '/recipes', nl: '/recipes', de: '/recipes', ja: '/recipes', id: '/recipes', bn: '/recipes' },
    '/recipes': { az: '/reseptler', en: '/recipes', tr: '/recipes', ru: '/recipes', fr: '/recipes', it: '/recipes', ar: '/recipes', zh: '/recipes', hi: '/recipes', es: '/recipes', pt: '/recipes', nl: '/recipes', de: '/recipes', ja: '/recipes', id: '/recipes', bn: '/recipes' },
    '/haqqinda': { az: '/haqqinda', en: '/about', tr: '/about', ru: '/about', fr: '/about', it: '/about', ar: '/about', zh: '/about', hi: '/about', es: '/about', pt: '/about', nl: '/about', de: '/about', ja: '/about', id: '/about', bn: '/about' },
    '/about': { az: '/haqqinda', en: '/about', tr: '/about', ru: '/about', fr: '/about', it: '/about', ar: '/about', zh: '/about', hi: '/about', es: '/about', pt: '/about', nl: '/about', de: '/about', ja: '/about', id: '/about', bn: '/about' },
    '/xidmetler': { az: '/xidmetler', en: '/services', tr: '/services', ru: '/services', fr: '/services', it: '/services', ar: '/services', zh: '/services', hi: '/services', es: '/services', pt: '/services', nl: '/services', de: '/services', ja: '/services', id: '/services', bn: '/services' },
    '/services': { az: '/xidmetler', en: '/services', tr: '/services', ru: '/services', fr: '/services', it: '/services', ar: '/services', zh: '/services', hi: '/services', es: '/services', pt: '/services', nl: '/services', de: '/services', ja: '/services', id: '/services', bn: '/services' },
    '/elaqe': { az: '/elaqe', en: '/contact', tr: '/contact', ru: '/contact', fr: '/contact', it: '/contact', ar: '/contact', zh: '/contact', hi: '/contact', es: '/contact', pt: '/contact', nl: '/contact', de: '/contact', ja: '/contact', id: '/contact', bn: '/contact' },
    '/contact': { az: '/elaqe', en: '/contact', tr: '/contact', ru: '/contact', fr: '/contact', it: '/contact', ar: '/contact', zh: '/contact', hi: '/contact', es: '/contact', pt: '/contact', nl: '/contact', de: '/contact', ja: '/contact', id: '/contact', bn: '/contact' },
    '/privacy': { az: '/privacy', en: '/privacy', tr: '/privacy', ru: '/privacy', fr: '/privacy', it: '/privacy', ar: '/privacy', zh: '/privacy', hi: '/privacy', es: '/privacy', pt: '/privacy', nl: '/privacy', de: '/privacy', ja: '/privacy', id: '/privacy', bn: '/privacy' },
    '/terms': { az: '/terms', en: '/terms', tr: '/terms', ru: '/terms', fr: '/terms', it: '/terms', ar: '/terms', zh: '/terms', hi: '/terms', es: '/terms', pt: '/terms', nl: '/terms', de: '/terms', ja: '/terms', id: '/terms', bn: '/terms' },
    '/resept': { az: `/resept/${slug}`, en: `/recipe/${slug}`, tr: `/recipe/${slug}`, ru: `/recipe/${slug}`, fr: `/recipe/${slug}`, it: `/recipe/${slug}`, ar: `/recipe/${slug}`, zh: `/recipe/${slug}`, hi: `/recipe/${slug}`, es: `/recipe/${slug}`, pt: `/recipe/${slug}`, nl: `/recipe/${slug}`, de: `/recipe/${slug}`, ja: `/recipe/${slug}`, id: `/recipe/${slug}`, bn: `/recipe/${slug}` }
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const pathname = usePathname();
  const { t, locale } = useTranslation();

  const isHome = pathname === '/' || 
                 pathname === '/en' || 
                 pathname === '/tr' || 
                 pathname === '/ru' || 
                 pathname === '/fr' || 
                 pathname === '/it' || 
                 pathname === '/ar' || 
                 pathname === '/zh' || 
                 pathname === '/hi' || 
                 pathname === '/es' || 
                 pathname === '/pt' || 
                 pathname === '/nl' || 
                 pathname === '/de' || 
                 pathname === '/ja' || 
                 pathname === '/id' || 
                 pathname === '/bn';

  const isHomeScrolled = useSyncExternalStore(
    subscribeToNavbarScroll,
    getNavbarScrollSnapshot,
    getServerNavbarScrollSnapshot,
  );
  const showNavbar = !isHome || isHomeScrolled;

  // Close dropdowns on outside clicks
  useEffect(() => {
    if (!isLangOpen) return;
    const handleClose = () => setIsLangOpen(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [isLangOpen]);

  useEffect(() => {
    if (!isMobileLangOpen) return;
    const handleClose = () => setIsMobileLangOpen(false);
    window.addEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [isMobileLangOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsLangOpen(false);
      setIsMobileLangOpen(false);
      setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

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
  ] : locale === 'it' ? [
    { name: t.nav.home, href: '/it' },
    { name: t.nav.recipes, href: '/it/recipes' },
    { name: t.nav.services, href: '/it/services' },
    { name: t.nav.about, href: '/it/about' },
    { name: t.nav.contact, href: '/it/contact' },
  ] : locale === 'ar' ? [
    { name: t.nav.home, href: '/ar' },
    { name: t.nav.recipes, href: '/ar/recipes' },
    { name: t.nav.services, href: '/ar/services' },
    { name: t.nav.about, href: '/ar/about' },
    { name: t.nav.contact, href: '/ar/contact' },
  ] : locale === 'zh' ? [
    { name: t.nav.home, href: '/zh' },
    { name: t.nav.recipes, href: '/zh/recipes' },
    { name: t.nav.services, href: '/zh/services' },
    { name: t.nav.about, href: '/zh/about' },
    { name: t.nav.contact, href: '/zh/contact' },
  ] : locale === 'hi' ? [
    { name: t.nav.home, href: '/hi' },
    { name: t.nav.recipes, href: '/hi/recipes' },
    { name: t.nav.services, href: '/hi/services' },
    { name: t.nav.about, href: '/hi/about' },
    { name: t.nav.contact, href: '/hi/contact' },
  ] : locale === 'es' ? [
    { name: t.nav.home, href: '/es' },
    { name: t.nav.recipes, href: '/es/recipes' },
    { name: t.nav.services, href: '/es/services' },
    { name: t.nav.about, href: '/es/about' },
    { name: t.nav.contact, href: '/es/contact' },
  ] : locale === 'pt' ? [
    { name: t.nav.home, href: '/pt' },
    { name: t.nav.recipes, href: '/pt/recipes' },
    { name: t.nav.services, href: '/pt/services' },
    { name: t.nav.about, href: '/pt/about' },
    { name: t.nav.contact, href: '/pt/contact' },
  ] : locale === 'nl' ? [
    { name: t.nav.home, href: '/nl' },
    { name: t.nav.recipes, href: '/nl/recipes' },
    { name: t.nav.services, href: '/nl/services' },
    { name: t.nav.about, href: '/nl/about' },
    { name: t.nav.contact, href: '/nl/contact' },
  ] : locale === 'de' ? [
    { name: t.nav.home, href: '/de' },
    { name: t.nav.recipes, href: '/de/recipes' },
    { name: t.nav.services, href: '/de/services' },
    { name: t.nav.about, href: '/de/about' },
    { name: t.nav.contact, href: '/de/contact' },
  ] : locale === 'ja' ? [
    { name: t.nav.home, href: '/ja' },
    { name: t.nav.recipes, href: '/ja/recipes' },
    { name: t.nav.services, href: '/ja/services' },
    { name: t.nav.about, href: '/ja/about' },
    { name: t.nav.contact, href: '/ja/contact' },
  ] : locale === 'id' ? [
    { name: t.nav.home, href: '/id' },
    { name: t.nav.recipes, href: '/id/recipes' },
    { name: t.nav.services, href: '/id/services' },
    { name: t.nav.about, href: '/id/about' },
    { name: t.nav.contact, href: '/id/contact' },
  ] : locale === 'bn' ? [
    { name: t.nav.home, href: '/bn' },
    { name: t.nav.recipes, href: '/bn/recipes' },
    { name: t.nav.services, href: '/bn/services' },
    { name: t.nav.about, href: '/bn/about' },
    { name: t.nav.contact, href: '/bn/contact' },
  ] : [
    { name: t.nav.home, href: '/' },
    { name: t.nav.recipes, href: '/reseptler' },
    { name: t.nav.services, href: '/xidmetler' },
    { name: t.nav.about, href: '/haqqinda' },
    { name: t.nav.contact, href: '/elaqe' },
  ];

  return (
    <header
      aria-hidden={isHome && !showNavbar}
      inert={isHome && !showNavbar ? true : undefined}
      style={isHome ? { transform: showNavbar ? 'translateY(0)' : 'translateY(calc(-100% - 1rem))' } : undefined}
      className={`z-50 px-4 pt-4 transition-[transform,opacity] duration-500 ease-out sm:px-6 lg:px-8 ${
      isHome 
        ? `fixed inset-x-0 top-0 ${showNavbar ? 'opacity-100' : 'pointer-events-none opacity-0'}`
        : 'sticky top-0 opacity-100 translate-y-0'
    }`}
    >
      <div className={`mx-auto max-w-7xl rounded-[2rem] border transition-colors duration-300 ${
        isHome && !showNavbar 
          ? 'border-transparent bg-transparent shadow-none' 
          : 'border-white/60 bg-[rgba(255,251,246,0.82)] shadow-[0_18px_60px_rgba(52,34,22,0.12)] backdrop-blur-xl'
      }`}>
        <div className={`hidden items-center justify-between border-b border-[rgba(98,67,45,0.08)] px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] transition-all duration-300 md:flex ${
          isHome && !showNavbar ? 'opacity-0 h-0 py-0 overflow-hidden border-none' : 'opacity-100 text-[rgba(95,59,37,0.72)]'
        }`}>
          <div className="flex items-center gap-3">
            <Clock3 className="h-3.5 w-3.5" />
            <span>{locale === 'en' ? 'Daily 08:00 - 22:00' : locale === 'tr' ? 'Her Gün 08:00 - 22:00' : locale === 'ru' ? 'Ежедневно 08:00 - 22:00' : locale === 'fr' ? 'Tous les jours 08:00 - 22:00' : locale === 'it' ? 'Tutti i giorni 08:00 - 22:00' : locale === 'ar' ? 'يوميًا 08:00 - 22:00' : locale === 'zh' ? '每日 08:00 - 22:00' : locale === 'hi' ? 'रोजाना 08:00 - 22:00' : locale === 'es' ? 'Todos los días 08:00 - 22:00' : locale === 'pt' ? 'Todos os dias 08:00 - 22:00' : locale === 'nl' ? 'Dagelijks 08:00 - 22:00' : locale === 'de' ? 'Täglich 08:00 - 22:00' : locale === 'ja' ? '営業時間 08:00 - 22:00' : locale === 'id' ? 'Setiap Hari 08:00 - 22:00' : locale === 'bn' ? 'প্রতিদিন ০৮:০০ - ২২:০০' : 'Hər gün 08:00 - 22:00'}</span>
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
          <Link href={locale === 'en' ? "/en" : locale === 'tr' ? "/tr" : locale === 'ru' ? "/ru" : locale === 'fr' ? "/fr" : locale === 'it' ? "/it" : locale === 'ar' ? "/ar" : locale === 'zh' ? "/zh" : locale === 'hi' ? "/hi" : locale === 'es' ? "/es" : locale === 'pt' ? "/pt" : locale === 'nl' ? "/nl" : locale === 'de' ? "/de" : locale === 'ja' ? "/ja" : locale === 'id' ? "/id" : locale === 'bn' ? "/bn" : "/"} className="flex items-center gap-2.5 group">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-[linear-gradient(135deg,rgba(141,58,36,0.14),rgba(201,150,69,0.18))] text-[rgba(141,58,36,0.96)] transition-transform duration-300 group-hover:-rotate-6">
              <ChefHat className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>
            <div>
              <div className={`display-title text-xl sm:text-2xl lg:text-3xl leading-none transition-colors duration-300 ${isHome && !showNavbar ? 'text-white' : 'text-foreground'}`}>{siteConfig.name}</div>
              <div className={`mt-0.5 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] transition-colors duration-300 ${isHome && !showNavbar ? 'text-white/60' : 'text-[rgba(112,83,59,0.68)]'}`}>
                {t.header.recipesSub}
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/en' && item.href !== '/tr' && item.href !== '/ru' && item.href !== '/fr' && item.href !== '/it' && item.href !== '/ar' && item.href !== '/zh' && item.href !== '/hi' && item.href !== '/es' && item.href !== '/pt' && item.href !== '/nl' && item.href !== '/de' && item.href !== '/ja' && item.href !== '/id' && item.href !== '/bn' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    isHome && !showNavbar
                      ? (isActive ? 'bg-white/18 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white')
                      : (isActive ? 'bg-[rgba(141,58,36,0.12)] text-[rgba(141,58,36,0.96)]' : 'text-[rgba(57,44,35,0.76)] hover:bg-white/70 hover:text-foreground')
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="outline" className={`rounded-full px-5 transition-all duration-300 ${
              isHome && !showNavbar
                ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                : 'border-[rgba(98,67,45,0.14)] bg-white/70 text-[rgba(57,44,35,0.82)] hover:bg-white'
            }`}>
              <Link href={locale === 'en' ? "/en/recipes" : locale === 'tr' ? "/tr/recipes" : locale === 'ru' ? "/ru/recipes" : locale === 'fr' ? "/fr/recipes" : locale === 'it' ? "/it/recipes" : locale === 'ar' ? "/ar/recipes" : locale === 'zh' ? "/zh/recipes" : locale === 'hi' ? "/hi/recipes" : locale === 'es' ? "/es/recipes" : locale === 'pt' ? "/pt/recipes" : locale === 'nl' ? "/nl/recipes" : locale === 'de' ? "/de/recipes" : locale === 'ja' ? "/ja/recipes" : locale === 'id' ? "/id/recipes" : locale === 'bn' ? "/bn/recipes" : "/reseptler"}>
                <Search className="h-4 w-4" />
                {t.nav.recipes}
              </Link>
            </Button>
            <Button asChild className={`rounded-full px-5 shadow-[0_12px_30px_rgba(141,58,36,0.28)] transition-all duration-300 ${
              isHome && !showNavbar
                ? 'bg-white text-[rgba(34,27,23,0.94)] hover:bg-white/90 shadow-md'
                : 'bg-[rgba(141,58,36,0.96)] text-white hover:bg-[rgba(141,58,36,0.9)]'
            }`}>
              <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer">
                {t.header.contactBtn}
              </a>
            </Button>
            
            {/* Desktop Language Switcher Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangOpen(!isLangOpen);
                }}
                aria-label="Choose language"
                aria-haspopup="menu"
                aria-expanded={isLangOpen}
                aria-controls="desktop-language-menu"
                className={`h-10 rounded-full px-4 text-sm font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
                  isHome && !showNavbar
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-[rgba(98,67,45,0.14)] bg-white/70 text-[rgba(57,44,35,0.82)] hover:bg-white'
                }`}
              >
                <Globe className="h-4 w-4 text-[rgba(141,58,36,0.8)]" />
                <span>{locale}</span>
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
              </Button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    id="desktop-language-menu"
                    role="menu"
                    className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[rgba(98,67,45,0.1)] bg-white/95 p-1.5 shadow-[0_12px_40px_rgba(52,34,22,0.16)] backdrop-blur-md z-50 max-h-80 overflow-y-auto"
                  >
                    {languages.map((lang) => {
                      const isActive = locale === lang.code;
                      return (
                        <Link
                          key={lang.code}
                          href={getLocalizedPath(pathname || '/', lang.code)}
                          role="menuitem"
                          onClick={() => {
                            persistLocalePreference(lang.code);
                          }}
                          className={`flex items-center justify-between rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)] font-semibold'
                              : 'text-[rgba(57,44,35,0.76)] hover:bg-[rgba(98,67,45,0.05)] hover:text-foreground'
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{lang.code}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher Dropdown */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMobileLangOpen(!isMobileLangOpen);
                }}
                aria-label="Choose language"
                aria-haspopup="menu"
                aria-expanded={isMobileLangOpen}
                aria-controls="mobile-language-menu"
                className={`h-10 rounded-full px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all duration-300 ${
                  isHome && !showNavbar
                    ? 'border-white/20 bg-white/10 text-white hover:bg-white/20'
                    : 'border-[rgba(98,67,45,0.12)] bg-white/70 text-[rgba(57,44,35,0.82)] hover:bg-white'
                }`}
              >
                <Globe className="h-3.5 w-3.5 text-[rgba(141,58,36,0.8)]" />
                <span>{locale}</span>
                <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${isMobileLangOpen ? 'rotate-180' : ''}`} />
              </Button>
              <AnimatePresence>
                {isMobileLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.12, ease: 'easeOut' }}
                    id="mobile-language-menu"
                    role="menu"
                    className="absolute right-0 mt-1.5 w-48 overflow-hidden rounded-xl border border-[rgba(98,67,45,0.1)] bg-white/95 p-1 shadow-[0_10px_30px_rgba(52,34,22,0.16)] backdrop-blur-md z-50 max-h-64 overflow-y-auto"
                  >
                    {languages.map((lang) => {
                      const isActive = locale === lang.code;
                      return (
                        <Link
                          key={lang.code}
                          href={getLocalizedPath(pathname || '/', lang.code)}
                          role="menuitem"
                          onClick={() => {
                            persistLocalePreference(lang.code);
                          }}
                          className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                            isActive
                              ? 'bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)]'
                              : 'text-[rgba(57,44,35,0.76)] hover:bg-[rgba(98,67,45,0.05)] hover:text-foreground'
                          }`}
                        >
                          <span>{lang.label}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{lang.code}</span>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`h-10 w-10 rounded-full transition-colors duration-300 ${isHome && !showNavbar ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-black/5'}`}
              onClick={() => setIsMenuOpen((value) => !value)}
              aria-label={isMenuOpen ? t.header.mobileMenuClose : t.header.mobileMenuOpen}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-main-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="overflow-hidden border-t border-[rgba(98,67,45,0.08)] lg:hidden"
              id="mobile-main-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2 px-4 py-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && item.href !== '/en' && item.href !== '/tr' && item.href !== '/ru' && item.href !== '/fr' && item.href !== '/it' && item.href !== '/ar' && item.href !== '/zh' && item.href !== '/hi' && item.href !== '/es' && item.href !== '/pt' && item.href !== '/nl' && item.href !== '/de' && item.href !== '/ja' && item.href !== '/id' && item.href !== '/bn' && pathname?.startsWith(item.href));

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
                    <Link href={locale === 'en' ? "/en/recipes" : locale === 'tr' ? "/tr/recipes" : locale === 'ru' ? "/ru/recipes" : locale === 'fr' ? "/fr/recipes" : locale === 'it' ? "/it/recipes" : locale === 'ar' ? "/ar/recipes" : locale === 'zh' ? "/zh/recipes" : locale === 'hi' ? "/hi/recipes" : locale === 'es' ? "/es/recipes" : locale === 'pt' ? "/pt/recipes" : locale === 'nl' ? "/nl/recipes" : locale === 'de' ? "/de/recipes" : locale === 'ja' ? "/ja/recipes" : locale === 'id' ? "/id/recipes" : locale === 'bn' ? "/bn/recipes" : "/reseptler"} onClick={() => setIsMenuOpen(false)}>{t.header.viewRecipes}</Link>
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

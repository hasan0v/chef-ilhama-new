'use client';

import Link from 'next/link';
import { ChefHat, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import { useTranslation } from '@/hooks/useTranslation';

export default function Footer() {
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
  ] : [
    { name: t.nav.home, href: '/' },
    { name: t.nav.recipes, href: '/reseptler' },
    { name: t.nav.services, href: '/xidmetler' },
    { name: t.nav.about, href: '/haqqinda' },
    { name: t.nav.contact, href: '/elaqe' },
  ];

  const legalNav = locale === 'en' ? [
    { name: t.nav.privacy, href: '/en/privacy' },
    { name: t.nav.terms, href: '/en/terms' },
  ] : locale === 'tr' ? [
    { name: t.nav.privacy, href: '/tr/privacy' },
    { name: t.nav.terms, href: '/tr/terms' },
  ] : locale === 'ru' ? [
    { name: t.nav.privacy, href: '/ru/privacy' },
    { name: t.nav.terms, href: '/ru/terms' },
  ] : locale === 'fr' ? [
    { name: t.nav.privacy, href: '/fr/privacy' },
    { name: t.nav.terms, href: '/fr/terms' },
  ] : locale === 'it' ? [
    { name: t.nav.privacy, href: '/it/privacy' },
    { name: t.nav.terms, href: '/it/terms' },
  ] : locale === 'ar' ? [
    { name: t.nav.privacy, href: '/ar/privacy' },
    { name: t.nav.terms, href: '/ar/terms' },
  ] : locale === 'zh' ? [
    { name: t.nav.privacy, href: '/zh/privacy' },
    { name: t.nav.terms, href: '/zh/terms' },
  ] : locale === 'hi' ? [
    { name: t.nav.privacy, href: '/hi/privacy' },
    { name: t.nav.terms, href: '/hi/terms' },
  ] : [
    { name: t.nav.privacy, href: '/privacy' },
    { name: t.nav.terms, href: '/terms' },
  ];

  return (
    <footer className="px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pb-8 lg:pt-14">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.25rem] sm:rounded-[2.2rem] border border-[rgba(98,67,45,0.1)] bg-[linear-gradient(135deg,rgba(34,27,23,0.98),rgba(59,40,28,0.96))] text-white shadow-[0_28px_90px_rgba(26,18,12,0.34)]">
        <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_0.8fr_1fr] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[rgba(255,220,181,0.92)]">
                <ChefHat className="h-6 w-6" />
              </div>
              <div>
                <div className="display-title text-2xl sm:text-3xl leading-none text-white">{siteConfig.name}</div>
                <div className="mt-1 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">
                  {t.footer.recipesSub}
                </div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/68 sm:text-base">
              {t.footer.description}
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              {t.footer.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition-colors hover:bg-white/10 hover:text-white">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition-colors hover:bg-white/10 hover:text-white">
                <Phone className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">{t.footer.navigation}</h3>
            <ul className="space-y-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">{t.footer.discover}</h3>
            <ul className="space-y-2">
              <li><Link href={locale === 'en' ? "/en/recipes" : locale === 'tr' ? "/tr/recipes" : locale === 'ru' ? "/ru/recipes" : locale === 'fr' ? "/fr/recipes" : locale === 'it' ? "/it/recipes" : locale === 'ar' ? "/ar/recipes" : locale === 'zh' ? "/zh/recipes" : locale === 'hi' ? "/hi/recipes" : "/reseptler"} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">{t.nav.recipes}</Link></li>
              <li><Link href={locale === 'en' ? "/en/about" : locale === 'tr' ? "/tr/about" : locale === 'ru' ? "/ru/about" : locale === 'fr' ? "/fr/about" : locale === 'it' ? "/it/about" : locale === 'ar' ? "/ar/about" : locale === 'zh' ? "/zh/about" : locale === 'hi' ? "/hi/about" : "/haqqinda"} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">{t.nav.about}</Link></li>
              <li><Link href={locale === 'en' ? "/en/services" : locale === 'tr' ? "/tr/services" : locale === 'ru' ? "/ru/services" : locale === 'fr' ? "/fr/services" : locale === 'it' ? "/it/services" : locale === 'ar' ? "/ar/services" : locale === 'zh' ? "/zh/services" : locale === 'hi' ? "/hi/services" : "/xidmetler"} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">{t.nav.services}</Link></li>
              <li><Link href={locale === 'en' ? "/en/contact" : locale === 'tr' ? "/tr/contact" : locale === 'ru' ? "/ru/contact" : locale === 'fr' ? "/fr/contact" : locale === 'it' ? "/it/contact" : locale === 'ar' ? "/ar/contact" : locale === 'zh' ? "/zh/contact" : locale === 'hi' ? "/hi/contact" : "/elaqe"} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-4 w-4 text-[rgba(255,220,181,0.88)]" />
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-4 w-4 text-[rgba(255,220,181,0.88)]" />
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-[rgba(255,220,181,0.88)]" />
                <span className="text-sm text-white/68 sm:text-base">
                  {siteConfig.serviceAreas.map(area => area === 'Bakı' && locale === 'en' ? 'Baku' : area).join(', ')}
                </span>
              </div>
              <div className="pt-3">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[rgba(34,27,23,0.94)] transition-transform duration-200 hover:-translate-y-0.5">
                  {t.footer.chatWhatsAppBtn}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/45">
              {t.footer.copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
            <div className="flex flex-wrap gap-5">
              {legalNav.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-white/45 transition-colors hover:text-white/82">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
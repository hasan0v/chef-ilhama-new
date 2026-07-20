'use client';

import Image from 'next/image';
import { ChefHat, Globe, Instagram, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { siteConfig, getWhatsAppHref } from '@/lib/site';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13.2a8.16 8.16 0 005.58 2.17v-3.45a4.85 4.85 0 01-2.99-1.04V6.69h2.99z" />
    </svg>
  );
}

const links = [
  {
    label: 'WhatsApp',
    subtitle: 'Birbaşa yazın',
    href: getWhatsAppHref(),
    icon: WhatsAppIcon,
    color: 'from-[#25d366] to-[#128c7e]',
    ring: 'ring-green-400/30',
  },
  {
    label: 'Instagram',
    subtitle: '@chef.ilhama',
    href: siteConfig.instagram,
    icon: Instagram,
    color: 'from-pink-500 via-rose-500 to-orange-400',
    ring: 'ring-pink-400/30',
  },
  {
    label: 'TikTok',
    subtitle: '@chef.ilhama',
    href: 'https://www.tiktok.com/@chef.ilhama',
    icon: TikTokIcon,
    color: 'from-[#010101] to-[#1a1a1a]',
    ring: 'ring-slate-400/30',
  },
  {
    label: 'Zəng edin',
    subtitle: siteConfig.phoneDisplay,
    href: siteConfig.phoneHref,
    icon: Phone,
    color: 'from-blue-500 to-indigo-600',
    ring: 'ring-blue-400/30',
  },
  {
    label: 'E-poçt',
    subtitle: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
    color: 'from-amber-500 to-orange-600',
    ring: 'ring-amber-400/30',
  },
  {
    label: 'Vebsayt',
    subtitle: 'chef-ilhama.food',
    href: siteConfig.url,
    icon: Globe,
    color: 'from-[#8d3a24] to-[#6b2a1a]',
    ring: 'ring-[#8d3a24]/30',
  },
];

const navLinks = [
  { label: 'Reseptlər', href: '/reseptler' },
  { label: 'Xidmətlər', href: '/xidmetler' },
  { label: 'Haqqında', href: '/haqqinda' },
  { label: 'Əlaqə', href: '/elaqe' },
];

export default function VisitCard() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#f7efe2]">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-80 w-80 animate-[float_8s_ease-in-out_infinite] rounded-full bg-[#8d3a24]/[0.06] blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-64 w-64 animate-[float_10s_ease-in-out_infinite_reverse] rounded-full bg-[#c99645]/[0.08] blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 animate-[float_12s_ease-in-out_infinite_1s] rounded-full bg-[#355441]/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[100dvh] max-w-md flex-col px-5 py-10 sm:py-14">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-5">
            {/* Animated ring */}
            <div className="absolute -inset-1.5 animate-[spin_12s_linear_infinite] rounded-full bg-gradient-to-tr from-[#8d3a24] via-[#c99645] to-[#355441] opacity-60 blur-sm" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#f7efe2] shadow-xl">
              <Image
                src="/images/chef-ilhama-portrait.webp"
                alt="Chef İlhamə"
                fill
                className="object-cover"
                sizes="112px"
                priority
              />
            </div>
            {/* Chef hat badge */}
            <div className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#f7efe2] bg-[#8d3a24] text-white shadow-lg">
              <ChefHat className="h-4 w-4" />
            </div>
          </div>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-[#241c18]">
            Chef İlhamə
          </h1>
          <p className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.22em] text-[#8d3a24]">
            Şəxsi Aşpaz
          </p>
          <p className="mt-3 max-w-[260px] text-sm leading-6 text-[rgba(57,44,35,0.68)]">
            Bakıda premium şəxsi aşpaz xidməti. Toy, tədbir və private dining.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('/') ? undefined : '_blank'}
              rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_2px_20px_rgba(52,34,22,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(52,34,22,0.12)] active:scale-[0.98] ${link.ring} hover:ring-2`}
            >
              {/* Icon */}
              <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${link.color} text-white shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                <link.icon className="h-5 w-5" />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold text-[#241c18]">{link.label}</div>
                <div className="truncate text-[12.5px] text-[rgba(57,44,35,0.56)]">{link.subtitle}</div>
              </div>

              {/* Arrow */}
              <ArrowUpRight className="h-4 w-4 shrink-0 text-[rgba(57,44,35,0.3)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[rgba(57,44,35,0.6)]" />

              {/* Hover gradient shine */}
              <div className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
            </a>
          ))}
        </div>

        {/* Quick nav to site pages */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {navLinks.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full border border-[rgba(98,67,45,0.12)] bg-white/50 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-[rgba(57,44,35,0.64)] backdrop-blur-sm transition-all duration-200 hover:border-[rgba(141,58,36,0.22)] hover:bg-white/80 hover:text-[#8d3a24]"
            >
              {n.label}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-10 text-center">
          <div className="mx-auto mb-3 h-px w-12 bg-[rgba(98,67,45,0.12)]" />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[rgba(57,44,35,0.36)]">
            {siteConfig.serviceAreas.join(' · ')}
          </p>
          <p className="mt-1 text-[10.5px] text-[rgba(57,44,35,0.28)]">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
      </div>

      {/* Float animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
      `}</style>
    </div>
  );
}

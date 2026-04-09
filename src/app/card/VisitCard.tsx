'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ChefHat, Globe, Instagram, Mail, MessageCircle, Music2, Phone, ArrowUpRight } from 'lucide-react';
import { siteConfig, getWhatsAppHref } from '@/lib/site';

const links = [
  {
    label: 'WhatsApp',
    subtitle: 'Birbaşa yazın',
    href: getWhatsAppHref(),
    icon: MessageCircle,
    color: 'from-emerald-500 to-green-600',
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
    icon: Music2,
    color: 'from-slate-800 to-slate-950',
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div
          className="flex flex-col items-center text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="relative mb-5">
            {/* Animated ring */}
            <div className="absolute -inset-1.5 animate-[spin_12s_linear_infinite] rounded-full bg-gradient-to-tr from-[#8d3a24] via-[#c99645] to-[#355441] opacity-60 blur-sm" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full border-[3px] border-[#f7efe2] shadow-xl">
              <Image
                src="/ilhama.png"
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
            Private Chef Atelier
          </p>
          <p className="mt-3 max-w-[260px] text-sm leading-6 text-[rgba(57,44,35,0.68)]">
            Bakıda premium şəxsi aşpaz xidməti. Toy, tədbir və private dining.
          </p>
        </div>

        {/* Links */}
        <div className="mt-8 flex flex-col gap-3">
          {links.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('/') ? undefined : '_blank'}
              rel={link.href.startsWith('/') ? undefined : 'noopener noreferrer'}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_2px_20px_rgba(52,34,22,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(52,34,22,0.12)] active:scale-[0.98] ${link.ring} hover:ring-2`}
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${150 + i * 80}ms, box-shadow 0.3s, translate 0.3s`,
              }}
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
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s, transform 0.6s cubic-bezier(0.16,1,0.3,1) 0.8s',
          }}
        >
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
        <div
          className="mt-auto pt-10 text-center"
          style={{
            opacity: mounted ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.16,1,0.3,1) 1s',
          }}
        >
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

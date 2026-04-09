import Link from 'next/link';
import { ChefHat, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { getWhatsAppHref, legalNavigation, mainNavigation, siteConfig } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="px-4 pb-6 pt-10 sm:px-6 lg:px-8 lg:pb-8 lg:pt-14">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.2rem] border border-[rgba(98,67,45,0.1)] bg-[linear-gradient(135deg,rgba(34,27,23,0.98),rgba(59,40,28,0.96))] text-white shadow-[0_28px_90px_rgba(26,18,12,0.34)]">
        <div className="grid gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.15fr_0.85fr_0.8fr_1fr] lg:px-12 lg:py-14">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[rgba(255,220,181,0.92)]">
                <ChefHat className="h-6 w-6" />
              </div>
              <div>
                <div className="display-title text-3xl leading-none text-white">Chef İlhamə</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">Curated dining experiences</div>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/68 sm:text-base">
              Bakı və Abşeron boyunca private dining, tədbir catering və zərif Azərbaycan menyuları üçün kulinariya studiyası.
            </p>
            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
              <span>Private Chef</span>
              <span>Wedding Catering</span>
              <span>Modern Azerbaijani</span>
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
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Naviqasiya</h3>
            <ul className="space-y-2">
              {mainNavigation.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/68 transition-colors hover:text-white sm:text-base">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Xidmət Fokusları</h3>
            <ul className="space-y-2">
              <li className="text-sm text-white/68 sm:text-base">Private dinner masaları</li>
              <li className="text-sm text-white/68 sm:text-base">Toy və nişan menyuları</li>
              <li className="text-sm text-white/68 sm:text-base">Korporativ təqdimat catering</li>
              <li className="text-sm text-white/68 sm:text-base">Regional resept kurasiyası</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/45">Əlaqə</h3>
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
                <span className="text-sm text-white/68 sm:text-base">{siteConfig.serviceAreas.join(', ')}</span>
              </div>
              <div className="pt-3">
                <a href={getWhatsAppHref()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-[rgba(34,27,23,0.94)] transition-transform duration-200 hover:-translate-y-0.5">
                  WhatsApp ilə danış
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-5 sm:px-8 lg:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-white/45">
              © {new Date().getFullYear()} Chef İlhamə. Bütün hüquqlar qorunur.
            </p>
            <div className="flex flex-wrap gap-5">
              {legalNavigation.map((link) => (
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
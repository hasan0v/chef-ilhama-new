'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChefHat,
  Clock3,
  MapPinned,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  UtensilsCrossed,
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { getWhatsAppHref, siteConfig } from '@/lib/site';
import { chefSearchAliasGroups } from '@/lib/chefSearchAliases';
import { trackEvent } from '@/lib/analytics';

const occasions = [
  'Evdə qonaqlıq',
  'Ailə bayramı',
  'Toy və nişan',
  'Şirkət tədbiri',
];

const guestOptions = ['10–20 nəfər', '20–60 nəfər', '60–150 nəfər', '150+ nəfər'];

const services = [
  {
    icon: ChefHat,
    title: 'Şəxsi aşpaz',
    description: 'Evdə qonaqlıq, private dinner və ailə süfrəsi üçün yerində hazırlıq və servis.',
    accent: 'bg-[#d88a5d]/15 text-[#9a4329]',
  },
  {
    icon: UtensilsCrossed,
    title: 'Katerinq',
    description: 'Menyu, porsiya planı və təqdimatı bir xəttdə qurulan tədbir süfrəsi.',
    accent: 'bg-[#d6aa55]/18 text-[#8a6120]',
  },
  {
    icon: CalendarDays,
    title: 'Toy və mərasim',
    description: 'Miqyası, qonaq axını və mətbəx ritmi öncədən düşünülən böyük süfrələr.',
    accent: 'bg-[#6d8c77]/16 text-[#355441]',
  },
];

const faqs = [
  {
    q: '“Aşpaz”, “aspaz” və ya “asbaz” axtarıram — bu xidmət mənim üçündür?',
    a: 'Bəli. Bu sözlər eyni ehtiyacı ifadə edir: ev qonaqlığı, ailə şənliyi və ya tədbir üçün peşəkar aşpaz sifarişi. Tədbir növünü və qonaq sayını yazın, uyğun formatı birlikdə planlayaq.',
  },
  {
    q: 'Toy yeməkləri və ya “toy yemekleri” üçün aşpaz sifariş etmək olar?',
    a: 'Bəli. Toy, nişan və ailə mərasimi üçün menyu, porsiya, hazırlıq və servis axını qonaq sayınıza uyğun qurulur.',
  },
  {
    q: '“Evə aşpaz”, “eve aspaz” və “şəxsi aşpaz” eyni xidmətdir?',
    a: 'Bəli. Ev qonaqlığı və private dinner üçün yerində hazırlıq, menyu və servis planı şəxsi aşpaz formatında təqdim olunur.',
  },
  {
    q: 'Katerinq, keyterinq və katering xidməti üçün müraciət edə bilərəm?',
    a: 'Bəli. Fərqli yazılışlardan asılı olmayaraq, qonaq sayı, məkan, tarix və tədbir formatı ilə yazın; uyğun katerinq planı hazırlanacaq.',
  },
  {
    q: 'Aşpaz xidməti hansı ərazilərdə göstərilir?',
    a: 'Chef İlhamə Bakı, Sumqayıt və Abşeron üzrə şəxsi aşpaz, katerinq və tədbir xidməti planlayır. Məkan və logistika sorğu zamanı dəqiqləşdirilir.',
  },
  {
    q: 'Qiymət necə müəyyənləşir?',
    a: 'Qiymət qonaq sayı, tədbir tarixi, menyu, məkan və servis formatına görə hazırlanır. Qısa brif göndərin, sizə uyğun plan qurulsun.',
  },
  {
    q: 'Kiçik ev qonaqlığı üçün də sifariş mümkündür?',
    a: 'Bəli. Şəxsi aşpaz formatı ev qonaqlığı və private dinner üçün də uyğundur; qonaq sayı və istədiyiniz dad istiqaməti ilə yazın.',
  },
  {
    q: 'Nə qədər əvvəldən əlaqə saxlamaq lazımdır?',
    a: 'Tarixiniz bəllidirsə, mümkün qədər tez yazın. Beləliklə menyu, alış-veriş və mətbəx planı daha rahat koordinasiya olunur.',
  },
];

export default function ChefBookingLanding() {
  const [occasion, setOccasion] = useState(occasions[0]);
  const [guests, setGuests] = useState(guestOptions[0]);
  const [dateHint, setDateHint] = useState('');
  const [hasStartedBrief, setHasStartedBrief] = useState(false);

  useEffect(() => {
    trackEvent('booking_landing_view', { landing: 'aspaz-xidmeti-baki' });
  }, []);

  const markBriefStarted = () => {
    if (hasStartedBrief) return;
    setHasStartedBrief(true);
    trackEvent('booking_brief_started', { landing: 'aspaz-xidmeti-baki' });
  };

  const whatsappHref = useMemo(() => {
    const dateLine = dateHint ? `\nTarix: ${dateHint}` : '';
    return getWhatsAppHref(
      `Salam Chef İlhamə, aşpaz xidməti üçün məlumat almaq istəyirəm.\nTədbir: ${occasion}\nQonaq sayı: ${guests}${dateLine}`,
    );
  }, [occasion, guests, dateHint]);

  return (
    <PageLayout breadcrumbs={[
      { name: 'Ana Səhifə', href: '/' },
      { name: 'Aşpaz xidməti', href: '/aspaz-xidmeti-baki' },
    ]}>
      <section className="relative overflow-hidden bg-[#18372c] px-4 pb-14 pt-7 text-white sm:px-6 sm:pb-20 lg:px-8">
        <div className="pointer-events-none absolute inset-0 opacity-70" aria-hidden="true">
          <div className="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#d78c5f]/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#f1c972]/10 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_30%),linear-gradient(120deg,transparent_40%,rgba(255,255,255,0.045))]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl pt-5 lg:py-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-[#f9e7c4] uppercase backdrop-blur-sm">
              <MapPinned className="h-3.5 w-3.5" /> Bakı · Sumqayıt · Abşeron
            </div>
            <h1 className="display-title max-w-xl text-5xl leading-[0.91] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Aşpaz axtarırsınız?<br />
              <span className="text-[#f2c974]">Süfrəniz üçün</span> doğru başlanğıc.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/76 sm:text-lg">
              Chef İlhamə ilə şəxsi aşpaz, ailə süfrəsi, toy və katerinq xidmətini birbaşa planlayın. Menyu, porsiya və servis tədbirinizə uyğun qurulur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-[#f4d18a] px-6 text-[#18372c] shadow-[0_14px_34px_rgba(0,0,0,0.18)] hover:bg-[#ffe2a4]">
                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('booking_whatsapp_opened', { location: 'hero', occasion, guests, has_date: Boolean(dateHint) })}>
                  WhatsApp ilə planla <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/25 bg-white/5 px-6 text-white hover:bg-white/10 hover:text-white">
                <a href={siteConfig.phoneHref} onClick={() => trackEvent('booking_phone_clicked', { location: 'hero' })}><Phone className="h-4 w-4" /> Birbaşa zəng</a>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-white/12 pt-6">
              <div><strong className="block text-xl text-[#f7d68e]">15+</strong><span className="mt-1 block text-xs leading-5 text-white/62">il peşəkar təcrübə</span></div>
              <div><strong className="block text-xl text-[#f7d68e]">1:1</strong><span className="mt-1 block text-xs leading-5 text-white/62">birbaşa planlama</span></div>
              <div><strong className="block text-xl text-[#f7d68e]">AZ</strong><span className="mt-1 block text-xs leading-5 text-white/62">yerli süfrə ritmi</span></div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[520px] lg:mx-0">
            <div className="absolute -inset-3 rounded-[2.5rem] border border-white/14 bg-white/5" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] bg-[#dac29f] shadow-[0_30px_70px_rgba(0,0,0,0.32)]">
              <Image
                src="/images/chef-ilhama-portrait.webp"
                alt="Chef İlhamə — Bakı şəxsi aşpaz və katerinq xidməti"
                width={1024}
                height={1024}
                priority
                className="aspect-[4/4.35] w-full object-cover object-[50%_18%]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#172b23]/90 via-[#172b23]/20 to-transparent px-6 pb-6 pt-20">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] text-[#f5d991] uppercase">Chef İlhamə</p>
                    <p className="mt-1 text-sm text-white/86">Şəxsi aşpaz · Katerinq · Tədbir süfrəsi</p>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-[#f5d991] backdrop-blur-sm"><ChefHat className="h-5 w-5" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fbf7ef] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.84fr_1.16fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#a15a2d] uppercase">Sifariş üçün qısa brif</p>
            <h2 className="display-title mt-4 max-w-md text-4xl leading-[0.96] tracking-[-0.045em] text-[#35251e] sm:text-5xl">Tədbirinizi 3 addımda deyin.</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#6c5a50]">Form doldurmağa vaxt itirməyin. Seçimləri edin, WhatsApp açıldıqda məlumatınız hazır olacaq.</p>
            <div className="mt-7 flex items-center gap-3 text-sm text-[#5d7767]"><Clock3 className="h-5 w-5" /> Detallar sonra dəqiqləşdirilir — bu, sadəcə rahat başlanğıcdır.</div>
          </div>

          <div className="rounded-[2rem] border border-[#e6d9c6] bg-white p-5 shadow-[0_24px_60px_rgba(92,62,37,0.08)] sm:p-8">
            <div className="space-y-8">
              <fieldset>
                <legend className="text-sm font-semibold text-[#35251e]"><span className="mr-2 text-[#b26736]">01</span>Tədbir nə üçündür?</legend>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {occasions.map((item) => <button key={item} type="button" aria-pressed={occasion === item} onClick={() => { markBriefStarted(); setOccasion(item); trackEvent('booking_occasion_selected', { occasion: item }); }} className={`rounded-full border px-4 py-2.5 text-sm font-medium transition ${occasion === item ? 'border-[#a24e2d] bg-[#a24e2d] text-white shadow-sm' : 'border-[#e5d8c5] bg-[#fffaf3] text-[#65554b] hover:border-[#bd7b56]'}`}>{occasion === item && <Check className="mr-1.5 inline h-3.5 w-3.5" />}{item}</button>)}
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold text-[#35251e]"><span className="mr-2 text-[#b26736]">02</span>Təxminən neçə qonaq?</legend>
                <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                  {guestOptions.map((item) => <button key={item} type="button" aria-pressed={guests === item} onClick={() => { markBriefStarted(); setGuests(item); trackEvent('booking_guest_count_selected', { guest_range: item }); }} className={`rounded-2xl border px-3 py-3 text-sm font-medium transition ${guests === item ? 'border-[#355441] bg-[#355441] text-white shadow-sm' : 'border-[#e5d8c5] bg-[#fffaf3] text-[#65554b] hover:border-[#73927d]'}`}>{item}</button>)}
                </div>
              </fieldset>
              <label className="block">
                <span className="text-sm font-semibold text-[#35251e]"><span className="mr-2 text-[#b26736]">03</span>Tarix (istəyə bağlı)</span>
                <input type="date" min={new Date().toISOString().slice(0, 10)} value={dateHint} onFocus={markBriefStarted} onChange={(event) => { setDateHint(event.target.value); trackEvent('booking_date_selected', { has_date: Boolean(event.target.value) }); }} className="mt-4 h-12 w-full rounded-2xl border border-[#e5d8c5] bg-[#fffaf3] px-4 text-sm text-[#35251e] outline-none transition placeholder:text-[#a9988d] focus:border-[#a24e2d] focus:ring-4 focus:ring-[#a24e2d]/10" />
              </label>
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('booking_whatsapp_opened', { location: 'brief', occasion, guests, has_date: Boolean(dateHint) })} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-[#18372c] px-5 text-center text-sm font-semibold text-white transition hover:bg-[#234a3b]">
                <MessageCircle className="h-5 w-5 text-[#f4d18a]" /> Məlumatla WhatsApp-a keç <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.16em] text-[#a15a2d] uppercase">Bir süfrə, üç format</p>
            <h2 className="display-title mt-4 text-4xl leading-[0.96] tracking-[-0.045em] text-[#35251e] sm:text-5xl">Sadəcə yemək yox, rahat ev sahibliyi.</h2>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return <article key={service.title} className="group rounded-[1.85rem] border border-[#e9dfd1] bg-[#fffdf9] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(91,57,35,0.10)] sm:p-7">
                <div className="flex items-start justify-between"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.accent}`}><Icon className="h-5 w-5" /></div><span className="text-sm font-semibold text-[#c8b7a7]">0{index + 1}</span></div>
                <h3 className="mt-7 text-xl font-semibold tracking-[-0.035em] text-[#35251e]">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6b5c51]">{service.description}</p>
              </article>;
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-[#65554b]">
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#4d8067]" /> Menyu tədbirinizə uyğunlaşdırılır</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#4d8067]" /> Qonaq sayı və servis axını planlanır</span>
            <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-[#4d8067]" /> Bakı və ətrafı üçün koordinasiya</span>
          </div>
        </div>
      </section>

      <section className="bg-[#f0e6d6] px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-[#a15a2d] uppercase">Sifariş verməzdən əvvəl</p>
            <h2 className="display-title mt-4 text-4xl leading-[0.96] tracking-[-0.045em] text-[#35251e] sm:text-5xl">Ən çox soruşulanlar.</h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[#6c5a50]">Aydın brif daha doğru menyu və daha rahat tədbir deməkdir.</p>
            <div className="mt-8 rounded-[1.6rem] bg-[#18372c] p-6 text-white">
              <Sparkles className="h-5 w-5 text-[#f4d18a]" />
              <p className="mt-4 text-sm leading-7 text-white/78">Tarix, qonaq sayı və tədbir növünü yazın. Chef İlhamə menyu və xidmət formatını həmin kontekstə görə planlamağa başlayacaq.</p>
            </div>
          </div>
          <div className="divide-y divide-[#d9c7b4] border-y border-[#d9c7b4]">
            {faqs.map((faq) => <article key={faq.q} className="py-5 first:pt-0 last:pb-0"><h3 className="text-base font-semibold tracking-[-0.02em] text-[#35251e]">{faq.q}</h3><p className="mt-2 text-sm leading-7 text-[#6b5c51]">{faq.a}</p></article>)}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-[#e8ddcf] bg-[#fffdf9] p-6 shadow-[0_20px_55px_rgba(91,57,35,0.06)] sm:p-9">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#355441]/10 text-[#355441]"><Search className="h-5 w-5" /></div>
              <p className="mt-5 text-xs font-bold tracking-[0.16em] text-[#a15a2d] uppercase">Sizin yazılışınızla</p>
              <h2 className="display-title mt-3 text-4xl leading-[0.96] tracking-[-0.045em] text-[#35251e]">Düzgün aşpaz xidmətini tapın.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#6b5c51]">Bu ifadələr eyni sifariş niyyətinin fərqli yazılışlarıdır. Vacib olan tədbiriniz və qonaq sayınızdır.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {chefSearchAliasGroups.map((group) => <div key={group.label} className="rounded-2xl border border-[#ebe1d5] bg-[#fbf7ef] px-5 py-4"><p className="text-sm font-semibold text-[#35251e]">{group.label}</p><p className="mt-2 text-xs leading-5 text-[#816f63]">{group.aliases.join(' · ')}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#18372c] px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-[2rem] border border-white/13 bg-white/5 p-7 sm:p-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl"><p className="text-xs font-bold tracking-[0.16em] text-[#f4d18a] uppercase">Süfrənizi planlamağa hazırsınız?</p><h2 className="display-title mt-4 text-4xl leading-[0.96] tracking-[-0.045em] sm:text-5xl">Aşpaz seçimini uzatmayın.</h2><p className="mt-4 text-base leading-8 text-white/72">Bir mesajla tədbirinizin çərçivəsini paylaşın; qalanını birlikdə dəqiqləşdirək.</p></div>
          <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-[#f4d18a] px-6 text-[#18372c] hover:bg-[#ffe2a4]"><a href={whatsappHref} target="_blank" rel="noopener noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp ilə yaz</a></Button>
        </div>
      </section>
    </PageLayout>
  );
}

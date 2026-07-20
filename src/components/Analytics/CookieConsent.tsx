'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAnalyticsConsent, saveAnalyticsConsent, type AnalyticsConsent } from '@/lib/analyticsConsent';
import { getSiteLocaleFromPathname, getLocalizedPath } from '@/lib/localeRoutes';
import { usePathname } from 'next/navigation';

type ConsentCopy = {
  title: string;
  body: string;
  accept: string;
  decline: string;
  privacy: string;
};

const copy: Record<string, ConsentCopy> = {
  az: { title: 'Analitika seçiminiz', body: 'Saytı daha faydalı etmək üçün anonim istifadə analitikası yalnız icazənizlə işləyir.', accept: 'Qəbul et', decline: 'Yalnız zəruri', privacy: 'Məxfilik' },
  en: { title: 'Your analytics choice', body: 'Anonymous usage analytics help us improve the site and run only with your permission.', accept: 'Accept', decline: 'Essential only', privacy: 'Privacy' },
  tr: { title: 'Analitik tercihiniz', body: 'Siteyi geliştirmemize yardımcı olan anonim analizler yalnızca izninizle çalışır.', accept: 'Kabul et', decline: 'Yalnızca gerekli', privacy: 'Gizlilik' },
  ru: { title: 'Ваш выбор аналитики', body: 'Анонимная аналитика помогает улучшать сайт и включается только с вашего согласия.', accept: 'Принять', decline: 'Только необходимое', privacy: 'Конфиденциальность' },
  fr: { title: 'Votre choix analytique', body: 'Les analyses anonymes nous aident à améliorer le site et ne fonctionnent qu’avec votre accord.', accept: 'Accepter', decline: 'Essentiel uniquement', privacy: 'Confidentialité' },
  de: { title: 'Ihre Analyseauswahl', body: 'Anonyme Analysen helfen uns, die Website zu verbessern, und laufen nur mit Ihrer Einwilligung.', accept: 'Akzeptieren', decline: 'Nur erforderlich', privacy: 'Datenschutz' },
  es: { title: 'Tu elección analítica', body: 'La analítica anónima nos ayuda a mejorar el sitio y solo funciona con tu permiso.', accept: 'Aceptar', decline: 'Solo esencial', privacy: 'Privacidad' },
  it: { title: 'La tua scelta analitica', body: 'Le analisi anonime ci aiutano a migliorare il sito e funzionano solo con il tuo consenso.', accept: 'Accetta', decline: 'Solo essenziali', privacy: 'Privacy' },
  pt: { title: 'A sua escolha de análise', body: 'A análise anónima ajuda-nos a melhorar o site e só funciona com a sua autorização.', accept: 'Aceitar', decline: 'Só o essencial', privacy: 'Privacidade' },
  nl: { title: 'Uw analytische keuze', body: 'Anonieme analyses helpen ons de site te verbeteren en werken alleen met uw toestemming.', accept: 'Accepteren', decline: 'Alleen noodzakelijk', privacy: 'Privacy' },
  ar: { title: 'اختيارك للتحليلات', body: 'تساعدنا التحليلات المجهولة على تحسين الموقع ولا تعمل إلا بإذن منك.', accept: 'قبول', decline: 'الضروري فقط', privacy: 'الخصوصية' },
  zh: { title: '您的分析选择', body: '匿名分析可帮助我们改进网站，只有在您同意后才会启用。', accept: '接受', decline: '仅必要项', privacy: '隐私' },
  ja: { title: '分析に関する選択', body: '匿名の利用分析はサイト改善に役立ち、お客様の許可がある場合にのみ実行されます。', accept: '同意する', decline: '必須のみ', privacy: 'プライバシー' },
  id: { title: 'Pilihan analitik Anda', body: 'Analitik anonim membantu kami meningkatkan situs dan hanya berjalan dengan izin Anda.', accept: 'Terima', decline: 'Hanya yang penting', privacy: 'Privasi' },
  hi: { title: 'आपकी एनालिटिक्स पसंद', body: 'अनाम विश्लेषण साइट को बेहतर बनाने में मदद करता है और केवल आपकी अनुमति से चलता है।', accept: 'स्वीकार करें', decline: 'केवल आवश्यक', privacy: 'गोपनीयता' },
  bn: { title: 'আপনার অ্যানালিটিক্স পছন্দ', body: 'নামবিহীন বিশ্লেষণ সাইট উন্নত করতে সাহায্য করে এবং শুধু আপনার অনুমতিতে চালু হয়।', accept: 'গ্রহণ করুন', decline: 'শুধু প্রয়োজনীয়', privacy: 'গোপনীয়তা' },
};

export default function CookieConsent() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('chef-analytics-consent', onStoreChange);
      return () => window.removeEventListener('chef-analytics-consent', onStoreChange);
    },
    getAnalyticsConsent,
    () => null,
  );
  const locale = getSiteLocaleFromPathname(pathname);
  const labels = copy[locale] || copy.en;

  if (consent !== null) return null;

  const choose = (value: AnalyticsConsent) => {
    saveAnalyticsConsent(value);
  };

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-label={labels.title}
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-[1.5rem] border border-[rgba(98,67,45,0.14)] bg-[rgba(255,251,246,0.97)] p-4 shadow-[0_20px_60px_rgba(52,34,22,0.18)] backdrop-blur-xl sm:inset-x-auto sm:right-6 sm:w-[min(32rem,calc(100vw-3rem))] sm:p-5"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[rgba(141,58,36,0.1)] text-[rgba(141,58,36,0.96)]">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold text-[rgba(57,44,35,0.94)]">{labels.title}</h2>
          <p className="mt-1.5 text-xs leading-5 text-[rgba(57,44,35,0.7)]">{labels.body}</p>
          <Link href={getLocalizedPath(locale, '/privacy', '/privacy')} className="mt-2 inline-block text-xs font-semibold text-[rgba(141,58,36,0.96)] hover:underline">
            {labels.privacy}
          </Link>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => choose('denied')} className="h-9 rounded-full border-[rgba(98,67,45,0.16)] bg-white px-4 text-xs">
          {labels.decline}
        </Button>
        <Button type="button" onClick={() => choose('granted')} className="h-9 rounded-full bg-[rgba(141,58,36,0.96)] px-4 text-xs text-white hover:bg-[rgba(141,58,36,0.9)]">
          {labels.accept}
        </Button>
      </div>
    </aside>
  );
}

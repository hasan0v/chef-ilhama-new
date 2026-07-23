'use client';

import Link from 'next/link';
import { useSyncExternalStore } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getSiteLocaleFromPathname, getLocalizedPath } from '@/lib/localeRoutes';
import { usePathname } from 'next/navigation';

const NOTICE_KEY = 'chef-privacy-notice-dismissed-v1';
const NOTICE_EVENT = 'chef-privacy-notice-dismissed';
let dismissedForCurrentPage = false;

function subscribeToNotice(onStoreChange: () => void) {
  window.addEventListener(NOTICE_EVENT, onStoreChange);
  return () => window.removeEventListener(NOTICE_EVENT, onStoreChange);
}

function isNoticeVisible() {
  if (dismissedForCurrentPage) return false;
  try {
    return window.localStorage.getItem(NOTICE_KEY) !== 'true';
  } catch {
    return true;
  }
}

type NoticeCopy = {
  title: string;
  body: string;
  privacy: string;
  dismiss: string;
};

const copy: Record<string, NoticeCopy> = {
  az: { title: 'Məxfilik bildirişi', body: 'Sayt açıldıqda reklamsız və cookiesiz istifadə statistikası avtomatik ölçülür. Dil və resept seçimləri yalnız cihazınızda saxlanır.', privacy: 'Ətraflı məxfilik məlumatı', dismiss: 'Anladım' },
  en: { title: 'Privacy notice', body: 'When the site opens, cookieless usage statistics are measured automatically without advertising profiles. Language and recipe preferences stay on your device.', privacy: 'Detailed privacy information', dismiss: 'Got it' },
  tr: { title: 'Gizlilik bildirimi', body: 'Site açıldığında reklamsız ve çerezsiz kullanım istatistikleri otomatik ölçülür. Dil ve tarif tercihleri yalnızca cihazınızda saklanır.', privacy: 'Ayrıntılı gizlilik bilgisi', dismiss: 'Anladım' },
  ru: { title: 'Уведомление о конфиденциальности', body: 'При открытии сайта автоматически измеряется статистика без рекламных профилей и аналитических cookie. Язык и рецепты сохраняются только на вашем устройстве.', privacy: 'Подробнее о конфиденциальности', dismiss: 'Понятно' },
  fr: { title: 'Avis de confidentialité', body: 'À l’ouverture du site, des statistiques sans cookies ni profil publicitaire sont mesurées automatiquement. Vos préférences restent sur votre appareil.', privacy: 'Informations détaillées', dismiss: 'Compris' },
  de: { title: 'Datenschutzhinweis', body: 'Beim Öffnen werden cookielose Nutzungsstatistiken ohne Werbeprofile automatisch gemessen. Sprach- und Rezeptpräferenzen bleiben auf Ihrem Gerät.', privacy: 'Ausführliche Datenschutzinformationen', dismiss: 'Verstanden' },
  es: { title: 'Aviso de privacidad', body: 'Al abrir el sitio se miden automáticamente estadísticas sin cookies ni perfiles publicitarios. Las preferencias de idioma y recetas quedan en tu dispositivo.', privacy: 'Información detallada', dismiss: 'Entendido' },
  it: { title: 'Avviso sulla privacy', body: 'All’apertura del sito vengono misurate automaticamente statistiche senza cookie né profili pubblicitari. Le preferenze restano sul dispositivo.', privacy: 'Informativa dettagliata', dismiss: 'Ho capito' },
  pt: { title: 'Aviso de privacidade', body: 'Ao abrir o site, são medidas automaticamente estatísticas sem cookies nem perfis publicitários. As preferências ficam apenas no seu dispositivo.', privacy: 'Informação detalhada', dismiss: 'Entendi' },
  nl: { title: 'Privacyverklaring', body: 'Bij het openen worden automatisch cookieloze statistieken zonder advertentieprofielen gemeten. Taal- en receptvoorkeuren blijven op uw apparaat.', privacy: 'Uitgebreide privacy-informatie', dismiss: 'Begrepen' },
  ar: { title: 'إشعار الخصوصية', body: 'عند فتح الموقع تُقاس إحصاءات استخدام بلا ملفات تعريف ارتباط أو ملفات إعلانية. تبقى تفضيلات اللغة والوصفات على جهازك.', privacy: 'تفاصيل الخصوصية', dismiss: 'فهمت' },
  zh: { title: '隐私提示', body: '打开网站时会自动统计不含广告画像和分析 Cookie 的匿名使用数据。语言与食谱偏好仅保存在您的设备上。', privacy: '详细隐私信息', dismiss: '知道了' },
  ja: { title: 'プライバシー通知', body: 'サイトを開くと、広告プロファイルや分析Cookieを使わない利用統計が自動測定されます。言語とレシピ設定は端末内に保存されます。', privacy: '詳しいプライバシー情報', dismiss: '確認しました' },
  id: { title: 'Pemberitahuan privasi', body: 'Saat situs dibuka, statistik tanpa cookie dan profil iklan diukur otomatis. Preferensi bahasa dan resep hanya tersimpan di perangkat Anda.', privacy: 'Informasi privasi lengkap', dismiss: 'Mengerti' },
  hi: { title: 'गोपनीयता सूचना', body: 'साइट खुलने पर बिना विज्ञापन प्रोफ़ाइल और एनालिटिक्स कुकी के उपयोग आँकड़े अपने आप मापे जाते हैं। भाषा और रेसिपी पसंद आपके डिवाइस पर रहती हैं।', privacy: 'विस्तृत गोपनीयता जानकारी', dismiss: 'समझ गया' },
  bn: { title: 'গোপনীয়তা বিজ্ঞপ্তি', body: 'সাইট খুললে বিজ্ঞাপন প্রোফাইল বা অ্যানালিটিক্স কুকি ছাড়া ব্যবহার পরিসংখ্যান স্বয়ংক্রিয়ভাবে মাপা হয়। ভাষা ও রেসিপির পছন্দ আপনার ডিভাইসেই থাকে।', privacy: 'বিস্তারিত গোপনীয়তা তথ্য', dismiss: 'বুঝেছি' },
};

export default function PrivacyNotice() {
  const pathname = usePathname();
  const visible = useSyncExternalStore(subscribeToNotice, isNoticeVisible, () => false);
  const locale = getSiteLocaleFromPathname(pathname);
  const labels = copy[locale] || copy.en;

  const dismiss = () => {
    dismissedForCurrentPage = true;
    try {
      window.localStorage.setItem(NOTICE_KEY, 'true');
    } catch {
      // The notice can still be dismissed for the current page view.
    }
    window.dispatchEvent(new Event(NOTICE_EVENT));
  };

  if (!visible) return null;

  return (
    <aside
      role="status"
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
      <div className="mt-4 flex justify-end">
        <Button type="button" onClick={dismiss} className="h-9 rounded-full bg-[rgba(141,58,36,0.96)] px-5 text-xs text-white hover:bg-[rgba(141,58,36,0.9)]">
          {labels.dismiss}
        </Button>
      </div>
    </aside>
  );
}

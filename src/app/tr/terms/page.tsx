import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kullanım Şartları - Şef İlhame',
  description: 'Şef İlhame web sitesinin kullanımı ve özel şef / catering hizmetlerine dair temel kurallar.',
};

const sections = [
  {
    index: '01',
    title: 'Genel kullanım kuralları',
    content: (
      <>
        <p>Bu siteyi kullanarak aşağıdaki kurallara ve şartlara uymayı kabul etmiş sayılırsınız.</p>
        <ul className="prose-list list-disc">
          <li>Sitenin yasal ve dürüst amaçlarla kullanılması</li>
          <li>İçeriklerin kopyalanmaması ve manipüle edilmemesi</li>
          <li>Fikri mülkiyet haklarına ve kaynaklara saygı gösterilmesi</li>
          <li>Talep formlarında doğru ve eksiksiz bilgi verilmesi</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Şef hizmeti siparişleri',
    content: (
      <>
        <p>Özel şef ve catering siparişleri, davet gününün büyüklüğüne, tarihine ve menü detaylarına göre ayrıca onaylanır.</p>
        <ul className="prose-list list-disc">
          <li>Küçük davetler için en az 48 saat önceden iletişime geçilmesi önerilir</li>
          <li>Düğün ve büyük organizasyonlar için 1-2 hafta önceden planlama yapılması uygundur</li>
          <li>Fiyatlandırma ve nihai menü, brifing sonrasında yazılı teklif olarak sunulur</li>
          <li>Mekan koşulları ve lojistik detaylar teklif sürecini etkileyebilir</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'İptal ve değişiklik şartları',
    content: (
      <>
        <p>Planlanan davet tarihlerindeki değişiklik ve iptal taleplerinin mümkün olan en erken sürede bildirilmesi gerekir.</p>
        <ul className="prose-list list-disc">
          <li>Önceden bildirilen tarih değişiklikleri uygunluk durumuna göre yeniden planlanır</li>
          <li>Çok kısa süre kala yapılan iptallerde hazırlık masrafları yansıtılabilir</li>
          <li>Lojistik ve ham madde tedarik süreci başlamış olan projeler ayrıca değerlendirilir</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Tarif içerikleri ve telif hakkı',
    content: (
      <>
        <p>Sitede yer alan tarifler ve içerikler kişisel kullanıma açık olup, ticari amaçla kullanımı izne tabidir.</p>
        <ul className="prose-list list-disc">
          <li>Tarifleri evinizde kişisel amaçlarla serbestçe uygulayabilirsiniz</li>
          <li>Ticari mecralarda yayınlama ve toplu kopyalama süreçleri önceden onay gerektirir</li>
          <li>Kaynak gösterilmeden veya izinsiz yapılan tam kopyalamalar yasal sorumluluk doğurabilir</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Hizmet kalitesi ve sorumluluk',
    content: (
      <>
        <p>Ekibimiz yüksek standartlarda hizmet sunmak için çalışmaktadır, ancak kontrolümüz dışındaki etkenler ayrıca değerlendirilir.</p>
        <ul className="prose-list list-disc">
          <li>Mücbir sebepler ve mekan kısıtlamaları sorumluluk dışındadır</li>
          <li>Müşteri tarafından yanlış veya eksik verilen brifing detaylarından kaynaklanan aksaklıklar müşterinin sorumluluğundadır</li>
          <li>Üçüncü taraf tedarik zincirindeki gecikmeler farklı ele alınır</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'İletişim ve geri bildirim',
    content: (
      <>
        <p>Kullanım şartları, hizmet kalitesi ve diğer tüm konular için bizimle iletişime geçebilirsiniz.</p>
        <ul className="prose-list list-disc">
          <li>E-posta: {siteConfig.email}</li>
          <li>Telefon / WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Çalışma saatleri: Her gün 08:00 - 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Kullanım Şartları"
      title={<>Sitenin kullanımı ve hizmet siparişlerine dair genel kurallar aşağıda net başlıklar altında sunulmuştur.</>}
      description="Yeni tasarım dili sayesinde yasal sayfalar da artık çok daha okunaklı: Karmaşık uzun paragraflar yerine düzenli kartlar tasarlandı."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

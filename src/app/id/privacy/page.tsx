import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - Chef İlhamə',
  description: 'Rincian tentang pengumpulan, pemrosesan, dan perlindungan data pribadi Anda di situs web kami.',
};

const sections = [
  {
    index: '01',
    title: 'Data yang Kami Kumpulkan',
    content: (
      <>
        <p>
          Kami mengumpulkan data pribadi dalam jumlah minimal melalui formulir pertanyaan, tautan langsung ke WhatsApp, dan alat analisis lalu lintas dasar untuk memberikan tanggapan yang cepat dan berkualitas.
        </p>
        <ul className="prose-list list-disc">
          <li>Nama lengkap dan informasi kontak</li>
          <li>Alamat email dan nomor telepon</li>
          <li>Detail spesifik dari permintaan layanan dan acara</li>
          <li>Statistik penjelajahan situs yang bersifat anonim</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Tujuan Pemrosesan Data',
    content: (
      <>
        <p>Semua informasi yang kami kumpulkan digunakan semata-mata untuk merencanakan dan menyediakan layanan kami.</p>
        <ul className="prose-list list-disc">
          <li>Merespon permintaan penawaran harga untuk privat chef atau catering</li>
          <li>Merancang proposal menu kustom dan merencanakan logistik acara</li>
          <li>Menjaga riwayat komunikasi dan kontrol kualitas layanan</li>
          <li>Menganalisis lalu lintas situs untuk mengoptimalkan pengalaman pengguna</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Perlindungan dan Keamanan Data',
    content: (
      <>
        <p>Kami menerapkan langkah-langkah teknis dan organisasional untuk melindungi data Anda dari akses yang tidak sah.</p>
        <ul className="prose-list list-disc">
          <li>Server dan database aman dengan kontrol akses terbatas</li>
          <li>Pengumpulan data yang benar-benar diperlukan untuk kelancaran layanan saja</li>
          <li>Akses informasi yang dibatasi hanya kepada staf yang berwenang</li>
          <li>Pemrosesan data yang aman dan anonim dalam analisis lalu lintas web</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Layanan Pihak Ketiga',
    content: (
      <>
        <p>Situs web kami menggunakan alat dari penyedia layanan eksternal yang memiliki kebijakan privasi mereka sendiri.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics untuk pengukuran statistik kunjungan</li>
          <li>WhatsApp Business untuk layanan pelanggan yang cepat</li>
          <li>Penyedia hosting dan server pengiriman email yang diperlukan untuk fungsi situs</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Hak Hukum Anda',
    content: (
      <>
        <p>Anda memiliki hak untuk mengakses, memperbaiki, atau meminta penghapusan informasi pribadi Anda yang kami simpan.</p>
        <ul className="prose-list list-disc">
          <li>Hak untuk meminta akses dan perbaikan data yang tidak akurat</li>
          <li>Hak untuk meminta penghapusan permanen catatan pribadi Anda dari sistem kami</li>
          <li>Hak untuk mencabut izin kontak kapan saja</li>
          <li>Hak untuk meminta informasi tambahan mengenai penggunaan data Anda</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Kontak dan Pertanyaan',
    content: (
      <>
        <p>Untuk mengajukan pertanyaan atau menggunakan hak Anda terkait kebijakan privasi, silakan hubungi kami.</p>
        <ul className="prose-list list-disc">
          <li>Alamat Email: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Area Layanan: Baku, Sumqayıt, dan Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Kebijakan Privasi"
      title={<>Kami menjelaskan secara transparan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.</>}
      description="Teks hukum telah disesuaikan dengan estetika modern situs web, mengelompokkan informasi ke dalam kartu-kartu yang jelas daripada paragraf panjang yang membingungkan."
      sections={sections}
      updatedAt="9 April 2026"
    />
  );
}

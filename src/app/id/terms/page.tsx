import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('id', 'terms', {
  title: 'Syarat & Ketentuan - Chef İlhamə',
  description: 'Syarat penggunaan situs web dan ketentuan yang berlaku untuk pemesanan layanan privat chef dan catering.',
});

const sections = [
  {
    index: '01',
    title: 'Ketentuan Penggunaan Umum',
    content: (
      <>
        <p>Dengan mengakses dan menggunakan situs web ini, Anda setuju untuk mematuhi syarat dan ketentuan berikut.</p>
        <ul className="prose-list list-disc">
          <li>Menggunakan situs web hanya untuk tujuan yang sah dan dengan itikad baik</li>
          <li>Dilarang keras menyalin, mereproduksi, atau mengubah bagian mana pun dari desain dan konten situs</li>
          <li>Menghormati hak cipta intelektual, mencantumkan sumber asli jika Anda membagikan resep</li>
          <li>Memberikan data yang akurat dan lengkap saat mengisi formulir permintaan</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Pemesanan & Kontrak Layanan',
    content: (
      <>
        <p>Kontrak untuk layanan privat chef dan catering dikonfirmasi secara individual setelah menyepakati detail tanggal, menu, dan jumlah tamu.</p>
        <ul className="prose-list list-disc">
          <li>Untuk makan malam privat kecil, kami menyarankan memulai perencanaan minimal 48 jam sebelumnya</li>
          <li>Untuk pesta pertunangan atau pernikahan berskala besar, disarankan menghubungi kami 1-2 minggu sebelumnya</li>
          <li>Penawaran harga resmi dan menu final akan diserahkan secara tertulis setelah cakupan layanan disepakati</li>
          <li>Kondisi logistik tempat acara yang dipilih oleh klien dapat mempengaruhi biaya akhir layanan</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Pembatalan & Perubahan Tanggal',
    content: (
      <>
        <p>Setiap permintaan perubahan tanggal atau pembatalan layanan yang telah dipesan harus diajukan secepat mungkin.</p>
        <ul className="prose-list list-disc">
          <li>Perubahan tanggal acara bergantung pada ketersediaan jadwal Chef İlhamə</li>
          <li>Pembatalan yang sangat dekat dengan tanggal acara dapat dikenakan biaya untuk bahan baku yang telah dibeli</li>
          <li>Pembatalan acara dengan konsep dekorasi atau tata letak khusus akan dievaluasi secara independen</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Hak Cipta Resep',
    content: (
      <>
        <p>Resep yang dipublikasikan di situs web ini dibagikan untuk penggunaan domestik/pribadi; penggunaan komersial memerlukan izin tertulis.</p>
        <ul className="prose-list list-disc">
          <li>Anda bebas mencoba dan memasak resep ini di dapur rumah Anda</li>
          <li>Dilarang memperbanyak secara komersial atau menyajikannya sebagai menu restoran komersial tanpa izin</li>
          <li>Penyebaran non-komersial di blog atau media sosial wajib menyertakan tautan aktif ke resep asli di situs kami</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Batasan Tanggung Jawab',
    content: (
      <>
        <p>Tim kami menjamin standar pelayanan tertinggi, namun mengecualikan kejadian force majeure di luar kendali manajemen.</p>
        <ul className="prose-list list-disc">
          <li>Kami tidak bertanggung jawab atas masalah teknis atau fasilitas dapur yang tidak memadai di lokasi pilihan klien</li>
          <li>Masalah akibat informasi yang salah dari klien (jumlah tamu, alergi makanan, dll.) merupakan tanggung jawab klien</li>
          <li>Keterlambatan logistik akibat force majeure atau kemacetan lalu lintas parah akan diselesaikan dengan opsi terbaik di lokasi</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Layanan Dukungan & Hubungi Kami',
    content: (
      <>
        <p>Untuk pertanyaan mengenai syarat dan ketentuan penggunaan, silakan hubungi kami melalui saluran komunikasi resmi.</p>
        <ul className="prose-list list-disc">
          <li>Alamat Email: {siteConfig.email}</li>
          <li>Telepon & WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Jam Operasional: Setiap Hari pukul 08:00 - 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Syarat & Ketentuan"
      title={<>Syarat dan ketentuan ini mengatur akses situs web dan pemesanan layanan kuliner kami.</>}
      description="Sesuai dengan estetika desain baru kami, syarat dan ketentuan disajikan dalam kartu-kartu terstruktur agar lebih nyaman dibaca."
      sections={sections}
      updatedAt="9 April 2026"
    />
  );
}

import type { Metadata } from 'next';
import ContactStudioPage from '@/components/site/pages/ContactStudioPage';

export const metadata: Metadata = {
  title: 'Əlaqə - Chef İlhamə',
  description: 'Chef İlhamə ilə əlaqə, WhatsApp sifarişi və private chef xidmət sorğusu.',
};

export default function ContactPage() {
  return <ContactStudioPage />;
}

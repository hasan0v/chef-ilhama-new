import type { Metadata } from 'next';
import VisitCard from './VisitCard';

export const metadata: Metadata = {
  title: 'Chef İlhamə — Visit Card',
  description: 'Chef İlhamə ilə əlaqə saxlayın. WhatsApp, Instagram, TikTok, zəng və daha çox.',
  openGraph: {
    title: 'Chef İlhamə — Visit Card',
    description: 'Chef İlhamə ilə əlaqə saxlayın. WhatsApp, Instagram, TikTok, zəng və daha çox.',
    type: 'website',
    images: [{ url: '/images/chef-ilhama-social.jpg', width: 1200, height: 630 }],
  },
};

export default function CardPage() {
  return <VisitCard />;
}

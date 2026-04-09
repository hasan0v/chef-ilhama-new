import type { Metadata } from 'next';
import AboutStudioPage from '@/components/site/pages/AboutStudioPage';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Haqqında - Chef İlhamə',
  description: 'Chef İlhamə brendi, kulinariya yanaşması və studiya dəyərləri haqqında məlumat.',
};

export default function AboutPage() {
  return <AboutStudioPage />;
}

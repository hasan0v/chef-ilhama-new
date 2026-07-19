import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service - Chef İlhamə',
  description: 'Main rules regarding the use of the Chef İlhamə website and chef services.',
};

const sections = [
  {
    index: '01',
    title: 'General terms of use',
    content: (
      <>
        <p>By using this site, you agree to comply with the following principles.</p>
        <ul className="prose-list list-disc">
          <li>Using the site for lawful and honest purposes</li>
          <li>Not falsifying or misrepresenting content</li>
          <li>Respecting copyrights and sources</li>
          <li>Providing accurate information in service requests</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Chef service orders',
    content: (
      <>
        <p>Service orders are confirmed separately based on the size of the event, date, and selected menu structure.</p>
        <ul className="prose-list list-disc">
          <li>For small events, contacting at least 48 hours in advance is recommended</li>
          <li>For weddings and large events, planning 1-2 weeks in advance is more suitable</li>
          <li>Price and service outline are presented separately after the request</li>
          <li>Venue and logistical conditions may affect the proposal</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Cancellation and modification',
    content: (
      <>
        <p>Modifications and cancellations of event dates should be reported as early as possible.</p>
        <ul className="prose-list list-disc">
          <li>Changes notified in advance are replanned more easily</li>
          <li>Costs may arise in case of cancellations made on short notice</li>
          <li>Projects where product purchase and logistics have started are evaluated separately</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Recipe content and copyright',
    content: (
      <>
        <p>Recipe and text materials on the site are open for personal use, but commercial use requires separate consent.</p>
        <ul className="prose-list list-disc">
          <li>You can freely use recipes in your personal kitchen</li>
          <li>Commercial publishing and copying require prior permission</li>
          <li>Sharing without source credit and complete copying are not considered correct</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Service quality and liability',
    content: (
      <>
        <p>The team strives to maintain a high service standard, but some situations may not be under our direct control.</p>
        <ul className="prose-list list-disc">
          <li>Force majeure and venue limitations are evaluated separately</li>
          <li>Inaccurate information provided by the client may affect the outcome</li>
          <li>Liability for third-party delays is evaluated differently</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contact and complaints',
    content: (
      <>
        <p>The following channels are active for contact regarding terms of use, service quality, or other topics.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>Phone / WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Working hours: Daily 08:00 - 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms of Service"
      title={<>The main rules regarding the use of the site and service orders are presented in clear blocks.</>}
      description="The new design has made the legal pages readable as well: structured cards are now visible instead of long, tedious text streams."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

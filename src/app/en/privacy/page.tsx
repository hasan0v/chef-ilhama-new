import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('en', 'privacy', {
  title: 'Privacy Policy - Chef İlhamə',
  description: 'Information about the data collected on the Chef İlhamə website and how it is protected.',
});

const sections = [
  {
    index: '01',
    title: 'What data is collected',
    content: (
      <>
        <p>
          We collect a limited amount of information on the site via contact forms, WhatsApp links, and analytics. The goal is to respond to requests and monitor service quality.
        </p>
        <ul className="prose-list list-disc">
          <li>Name and contact details</li>
          <li>Email and phone number</li>
          <li>Event and service request records</li>
          <li>Anonymous site usage statistics</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Purpose of data usage',
    content: (
      <>
        <p>The collected data is used solely to manage the service process more accurately and quickly.</p>
        <ul className="prose-list list-disc">
          <li>To respond to bookings and inquiries</li>
          <li>To customize menu and event planning</li>
          <li>To monitor contact history and service quality</li>
          <li>To analyze site performance and user flows</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Protection of data',
    content: (
      <>
        <p>Technical and operational measures are taken to protect personal data.</p>
        <ul className="prose-list list-disc">
          <li>Secure hosting and access control</li>
          <li>Storing only necessary information</li>
          <li>Restricting access permissions</li>
          <li>Applying the minimum data principle when using third-party tools</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Third-party services',
    content: (
      <>
        <p>Some external services are used on the site. These services have their own privacy terms.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics for analytical purposes</li>
          <li>WhatsApp for communication and reservations</li>
          <li>Hosting and email infrastructure for service continuity</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Your rights',
    content: (
      <>
        <p>You can send an inquiry regarding your stored personal data at any time.</p>
        <ul className="prose-list list-disc">
          <li>Request to view and correct data</li>
          <li>Application for deletion of data</li>
          <li>Withdrawal of communication consent</li>
          <li>Request for additional explanation about data processing</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contact',
    content: (
      <>
        <p>You can use the following channels for questions or applications regarding the privacy policy.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Service coverage: {siteConfig.serviceAreas.map(area => area === 'Bakı' ? 'Baku' : area).join(', ')}</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title={<>How personal information is collected, used, and protected is explained here clearly.</>}
      description="This page has also been aligned with the new design system of the site: legal content is divided into readable blocks and contact information is presented clearly."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

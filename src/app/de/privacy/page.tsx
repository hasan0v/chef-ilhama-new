import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('de', 'privacy', {
  title: 'Datenschutzerklärung - Chef İlhamə',
  description: 'Details zur Erhebung, Verarbeitung und zum Schutz Ihrer personenbezogenen Daten auf unserer Website.',
});

const sections = [
  {
    index: '01',
    title: 'Erhebung personenbezogener Daten',
    content: (
      <>
        <p>
          Wir erheben nur ein Minimum an personenbezogenen Daten über Kontaktformulare, direkte WhatsApp-Links und grundlegende Analysetools, um eine schnelle und qualitativ hochwertige Bearbeitung zu gewährleisten.
        </p>
        <ul className="prose-list list-disc">
          <li>Vollständiger Name und Kontaktdaten</li>
          <li>E-Mail-Adresse und Telefonnummer</li>
          <li>Spezifische Details zur Serviceanfrage und zum Event</li>
          <li>Anonyme statistische Nutzungsdaten</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Zweck der Datenverarbeitung',
    content: (
      <>
        <p>Alle erhobenen Daten werden ausschließlich zur Planung und Durchführung unserer Dienstleistungen verwendet.</p>
        <ul className="prose-list list-disc">
          <li>Beantwortung von Anfragen für Privatköche oder Catering-Services</li>
          <li>Entwurf individueller Menüvorschläge und logistische Planung</li>
          <li>Führung einer Kommunikationshistorie und Qualitätskontrolle</li>
          <li>Analyse des Website-Traffics zur Optimierung der Benutzerfreundlichkeit</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Schutz und Datensicherheit',
    content: (
      <>
        <p>Wir treffen angemessene technische und organisatorische Maßnahmen, um Ihre Daten vor unbefugtem Zugriff zu schützen.</p>
        <ul className="prose-list list-disc">
          <li>Gesicherte Server und Datenbanken mit strikter Zugriffskontrolle</li>
          <li>Ausschließliche Erhebung von Daten, die für den Service unbedingt erforderlich sind</li>
          <li>Eingeschränkter Zugriff auf Informationen, nur für autorisiertes Personal</li>
          <li>Sichere, anonymisierte Datenverarbeitung bei der Webanalyse</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Dienste von Drittanbietern',
    content: (
      <>
        <p>Unsere Website nutzt Tools externer Partner, die ihre eigenen Datenschutzrichtlinien haben.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics für statistische Besuchermessungen</li>
          <li>WhatsApp Business für direkten und schnellen Kundenservice</li>
          <li>Hosting- und E-Mail-Provider, die für den Betrieb der Website notwendig sind</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Ihre gesetzlichen Rechte',
    content: (
      <>
        <p>Sie haben das Recht, die bei uns gespeicherten personenbezogenen Daten einzusehen, zu korrigieren oder löschen zu lassen.</p>
        <ul className="prose-list list-disc">
          <li>Recht auf Auskunft und Berichtigung unrichtiger Daten</li>
          <li>Recht auf dauerhafte Löschung Ihrer persönlichen Daten aus unseren Systemen</li>
          <li>Recht auf jederzeitigen Widerruf von Kontaktberechtigungen</li>
          <li>Recht auf Klärung und Auskunft über die Verwendung Ihrer Daten</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Kontakt für Fragen',
    content: (
      <>
        <p>Bei Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte können Sie sich jederzeit an uns wenden.</p>
        <ul className="prose-list list-disc">
          <li>E-Mail-Adresse: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Servicegebiet: Baku, Sumqayıt und Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Datenschutzerklärung"
      title={<>Wir erklären transparent, wie wir Ihre personenbezogenen Daten erheben, nutzen und schützen.</>}
      description="Die Rechtstexte wurden an den modernen Stil der Website angepasst und in klaren Karten statt unleserlicher Textblöcke aufbereitet."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

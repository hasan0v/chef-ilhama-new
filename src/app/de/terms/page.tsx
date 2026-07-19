import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('de', 'terms', {
  title: 'Allgemeine Geschäftsbedingungen - Chef İlhamə',
  description: 'Nutzungsbedingungen der Website und die Bedingungen für die Buchung unserer Privatkoch- und Catering-Services.',
});

const sections = [
  {
    index: '01',
    title: 'Allgemeine Nutzungsregeln',
    content: (
      <>
        <p>Mit dem Zugriff auf diese Website erklären Sie sich mit den folgenden Nutzungsbedingungen einverstanden.</p>
        <ul className="prose-list list-disc">
          <li>Nutzen Sie die Website ausschließlich für legitime Zwecke und in gutem Glauben</li>
          <li>Es ist strengstens untersagt, Teile des Designs oder der Inhalte zu kopieren oder zu modifizieren</li>
          <li>Respektieren Sie das Urheberrecht und verlinken Sie die Website, wenn Sie Rezepte teilen</li>
          <li>Machen Sie bei der Anfrage über Formulare korrekte und vollständige Angaben</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Buchung und Servicevereinbarung',
    content: (
      <>
        <p>Die Buchung von Privatkoch- und Catering-Dienstleistungen wird individuell nach Absprache von Datum, Menü und Gästeanzahl bestätigt.</p>
        <ul className="prose-list list-disc">
          <li>Für kleine private Dinner empfehlen wir eine Planungszeit von mindestens 48 Stunden im Voraus</li>
          <li>Für Hochzeiten und Großveranstaltungen empfiehlt sich ein Kontakt 1 bis 2 Wochen im Voraus</li>
          <li>Das verbindliche Angebot und die endgültige Menüauswahl werden nach Klärung der Details schriftlich übermittelt</li>
          <li>Logistische Gegebenheiten des vom Kunden gewählten Veranstaltungsortes können den Endpreis beeinflussen</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Stornierung und Terminänderung',
    content: (
      <>
        <p>Terminänderungen oder Stornierungen des vereinbarten Services müssen uns so früh wie möglich mitgeteilt werden.</p>
        <ul className="prose-list list-disc">
          <li>Verschiebungen sind abhängig von der Verfügbarkeit in unserem Terminkalender möglich</li>
          <li>Bei Stornierungen kurz vor dem Event können Kosten für bereits eingekaufte Zutaten anfallen</li>
          <li>Stornierungen von Veranstaltungen mit speziellem Deko-Aufbau werden gesondert bewertet</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Rechte an den Rezepten',
    content: (
      <>
        <p>Die auf der Website veröffentlichten Rezepte sind für den privaten Gebrauch bestimmt; eine kommerzielle Nutzung bedarf der Zustimmung.</p>
        <ul className="prose-list list-disc">
          <li>Sie können die Rezepte gerne zu Hause nachkochen und nutzen</li>
          <li>Die kommerzielle Vervielfältigung oder Verwendung auf Menükarten ohne Absprache ist untersagt</li>
          <li>Das Teilen auf Blogs oder Social Media erfordert eine Verlinkung auf das Originalrezept unserer Website</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Haftungsbeschränkung',
    content: (
      <>
        <p>Unser Team garantiert höchste Qualitätsstandards, unter Ausschluss von Fällen höherer Gewalt, die außerhalb unserer Kontrolle liegen.</p>
        <ul className="prose-list list-disc">
          <li>Wir haften nicht für technische Ausfälle der vom Kunden bereitgestellten Küche</li>
          <li>Probleme aufgrund falscher Angaben (z.B. Gästeanzahl oder Allergien) liegen in der Verantwortung des Kunden</li>
          <li>Bei logistischen Verzögerungen durch äußere Umstände werden wir vor Ort nach der bestmöglichen Alternative suchen</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Support und Kontakt',
    content: (
      <>
        <p>Bei Fragen zu den Nutzungsbedingungen können Sie uns über die üblichen Kanäle erreichen.</p>
        <ul className="prose-list list-disc">
          <li>E-Mail-Adresse: {siteConfig.email}</li>
          <li>Telefonnummer & WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Bürozeiten: Täglich von 08:00 bis 22:00 Uhr</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="AGB"
      title={<>Diese Bedingungen regeln den Zugriff auf die Website und die Buchung unserer kulinarischen Services.</>}
      description="Im Einklang mit unserem modernen Stil präsentieren wir die Allgemeinen Geschäftsbedingungen in übersichtlichen Karten zur optimalen Lesbarkeit."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('it', 'privacy', {
  title: 'Privacy Policy - Chef İlhamə',
  description: 'Informazioni relative alla raccolta, all\'uso e alla tutela dei dati personali sul sito della Chef İlhamə.',
});

const sections = [
  {
    index: '01',
    title: 'Dati raccolti',
    content: (
      <>
        <p>
          Raccogliamo una quantità limitata di dati tramite i moduli di contatto, i link di reindirizzamento a WhatsApp e strumenti di analisi standard. Il nostro obiettivo è rispondere rapidamente alle vostre richieste e garantire la qualità del servizio.
        </p>
        <ul className="prose-list list-disc">
          <li>Nome completo e contatti</li>
          <li>Indirizzo email e numero di telefono</li>
          <li>Dettagli relativi alla richiesta di ricevimento</li>
          <li>Statistiche di utilizzo anonime del sito</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Finalità della raccolta',
    content: (
      <>
        <p>Tutti i dati raccolti servono esclusivamente a migliorare l\'efficacia e la qualità del nostro servizio.</p>
        <ul className="prose-list list-disc">
          <li>Risposte alle richieste di prenotazione e di servizio catering</li>
          <li>Creazione di menu personalizzati e pianificazione dell\'evento</li>
          <li>Monitoraggio della cronologia degli scambi e della relazione cliente</li>
          <li>Misurazione delle prestazioni del sito e analisi dell\'esperienza utente</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Tutela dei dati',
    content: (
      <>
        <p>Misure di sicurezza rigorose, sia tecniche che organizzative, sono attive per proteggere i vostri dati personali.</p>
        <ul className="prose-list list-disc">
          <li>Infrastruttura di hosting e database sicuri</li>
          <li>Archiviazione limitata ai soli dati strettamente necessari</li>
          <li>Diritti di accesso limitati ai soli collaboratori autorizzati</li>
          <li>Principi di minimizzazione durante i trasferimenti a terze parti</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Servizi di terze parti',
    content: (
      <>
        <p>Il nostro sito utilizza infrastrutture esterne che applicano le proprie politiche di riservatezza.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics per le statistiche di visita</li>
          <li>WhatsApp per scambi rapidi e prenotazioni</li>
          <li>Servizi di hosting e server di posta per il funzionamento generale</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'I vostri diritti',
    content: (
      <>
        <p>Avete il pieno diritto di controllare le vostre informazioni personali in qualsiasi momento.</p>
        <ul className="prose-list list-disc">
          <li>Diritto di accesso e rettifica dei dati</li>
          <li>Diritto di opposizione e cancellazione definitiva</li>
          <li>Revoca delle autorizzazioni alla comunicazione</li>
          <li>Richieste di informazioni sui nostri processi di trattamento</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contatti',
    content: (
      <>
        <p>Per qualsiasi domanda o richiesta relativa ai vostri dati personali, utilizzate i seguenti canali.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Zone coperte: Baku, Sumqayıt e Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title={<>Illustriamo qui in modo chiaro come le vostre informazioni personali vengono raccolte, utilizzate e protette.</>}
      description="Anche i testi legali sono stati allineati al nuovo design del sito: più leggibili e suddivisi in chiare schede informative."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

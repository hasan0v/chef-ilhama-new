import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Termini di Servizio - Chef İlhamə',
  description: 'Regole di utilizzo del sito della Chef İlhamə, condizioni per la prenotazione di servizi catering e chef a domicilio.',
};

const sections = [
  {
    index: '01',
    title: 'Regole generali d\'uso',
    content: (
      <>
        <p>Utilizzando questo sito, accettate di conformarvi alle presenti regole e condizioni.</p>
        <ul className="prose-list list-disc">
          <li>Uso del sito esclusivamente per scopi legali e in buona fede</li>
          <li>Divieto di copiare, modificare o manipolare i contenuti</li>
          <li>Rispetto dei diritti d\'autore e delle attribuzioni delle fonti</li>
          <li>Fornitura di informazioni esatte e complete nei moduli</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Prenotazione di servizi',
    content: (
      <>
        <p>I servizi di chef privato e catering sono confermati su preventivo in base alla data, al numero di ospiti e al menu.</p>
        <ul className="prose-list list-disc">
          <li>Per piccole cene private, è consigliato un preavviso minimo di 48 ore</li>
          <li>Per matrimoni e grandi banchetti, la pianificazione ideale va da 1 a 2 settimane prima</li>
          <li>Le tariffe e i menu definitivi sono proposti per iscritto dopo la fase di brief</li>
          <li>Le condizioni logistiche e di allestimento in loco possono influenzare il preventivo</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Condizioni di annullamento e modifica',
    content: (
      <>
        <p>Qualsiasi modifica o annullamento delle date degli eventi pianificati deve esserci comunicata il prima possibile.</p>
        <ul className="prose-list list-disc">
          <li>I cambi data segnalati in anticipo verranno riorganizzati in base alla disponibilità</li>
          <li>Le cancellazioni dell\'ultimo minuto possono comportare l\'addebito dei costi di preparazione sostenuti</li>
          <li>I progetti che comportano materie prime già acquistate saranno oggetto di valutazione specifica</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Contenuto delle ricette & diritti d\'autore',
    content: (
      <>
        <p>Le ricette e i contenuti del sito sono destinati ad uso personale. Qualsiasi uso commerciale richiede autorizzazione.</p>
        <ul className="prose-list list-disc">
          <li>È possibile riprodurre liberamente le ricette a casa per scopi privati</li>
          <li>La pubblicazione su supporti commerciali e la copia di massa sono soggette ad accordo preventivo</li>
          <li>Non è consentita la riproduzione integrale senza la menzione della fonte attiva</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Limiti di responsabilità',
    content: (
      <>
        <p>Il nostro team si impegna a mantenere un servizio eccellente, ma i fattori esterni sono soggetti a valutazioni specifiche.</p>
        <ul className="prose-list list-disc">
          <li>I casi di forza maggiore e le limitazioni tecniche del luogo dell\'evento non rientrano nella nostra responsabilità</li>
          <li>Gli errori derivanti da un brief impreciso o incompleto fornito dal cliente rimangono di sua responsabilità</li>
          <li>I ritardi imputabili a catene logistiche terze sono trattati separatamente</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contatti e feedback',
    content: (
      <>
        <p>Per qualsiasi scambio riguardante i nostri termini di servizio o la qualità dei nostri servizi, potete contattarci.</p>
        <ul className="prose-list list-disc">
          <li>Email: {siteConfig.email}</li>
          <li>Telefono / WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Orari di attività: Tutti i giorni dalle 08:00 alle 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Termini di Servizio"
      title={<>Le regole che disciplinano l'uso del sito e l'ordinazione dei servizi sono dettagliate di seguito.</>}
      description="Il nuovo design rende la lettura delle nostre condizioni molto più semplice tramite schede chiare."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

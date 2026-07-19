import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacybeleid - Chef İlhamə',
  description: 'Details over het verzamelen, verwerken en beschermen van uw persoonsgegevens op onze website.',
};

const sections = [
  {
    index: '01',
    title: 'Gegevens die we verzamelen',
    content: (
      <>
        <p>
          We verzamelen een minimale hoeveelheid persoonsgegevens via ons aanvraagformulier, WhatsApp-links en standaard webanalyse-tools om een snelle en hoogwaardige reactie te garanderen.
        </p>
        <ul className="prose-list list-disc">
          <li>Volledige naam en contactgegevens</li>
          <li>E-mailadres en telefoonnummer</li>
          <li>Specifieke details van de serviceaanvraag en het evenement</li>
          <li>Anonieme statistische websitebezoekgegevens</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Doel van gegevensverwerking',
    content: (
      <>
        <p>Alle informatie die we verzamelen wordt uitsluitend gebruikt om onze diensten te plannen en uit te voeren.</p>
        <ul className="prose-list list-disc">
          <li>Reageren op serviceaanvragen voor privéchefs of catering</li>
          <li>Gepersonaliseerde menuvoorstellen ontwerpen en logistiek plannen</li>
          <li>Communicatiegeschiedenis en kwaliteitscontrole bijhouden</li>
          <li>Webverkeer analyseren om de surfervaring te optimaliseren</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Beveiliging en bescherming',
    content: (
      <>
        <p>We nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen onbevoegde toegang.</p>
        <ul className="prose-list list-disc">
          <li>Beveiligde servers en databases met strikt toegangsbeheer</li>
          <li>Verzameling van uitsluitend die gegevens die noodzakelijk zijn voor de dienstverlening</li>
          <li>Beperkte toegang tot informatie, alleen voor geautoriseerd personeel</li>
          <li>Veilige, geanonimiseerde verwerking in webanalyse</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Diensten van derden',
    content: (
      <>
        <p>Onze website maakt gebruik van tools van externe leveranciers die hun eigen privacybeleid hanteren.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics voor statistische bezoekersmeting</li>
          <li>WhatsApp Business voor directe klantenservice</li>
          <li>Hosting- en e-mailproviders noodzakelijk voor de websitefunctionaliteit</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Uw wettelijke rechten',
    content: (
      <>
        <p>U heeft het recht om de persoonlijke informatie die wij bewaren in te zien, te corrigeren of te laten verwijderen.</p>
        <ul className="prose-list list-disc">
          <li>Recht om inzage en correctie van onjuiste gegevens te vragen</li>
          <li>Recht om permanente verwijdering van uw gegevens aan te vragen</li>
          <li>Recht om toestemming voor contact op elk moment in te trekken</li>
          <li>Recht om aanvullende informatie te vragen over hoe uw gegevens worden gebruikt</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contact en vragen',
    content: (
      <>
        <p>Voor vragen over uw privacy of om uw rechten uit te oefenen, kunt u contact met ons opnemen.</p>
        <ul className="prose-list list-disc">
          <li>E-mailadres: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Servicegebied: Bakoe, Sumqayıt en Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacybeleid"
      title={<>We leggen op transparante wijze uit hoe we uw persoonsgegevens verwerken en beschermen.</>}
      description="De juridische teksten zijn aangepast aan de moderne esthetiek van de website. De informatie is ingedeeld in overzichtelijke kaarten in plaats van lange lappen tekst."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Voorwaarden - Chef İlhamə',
  description: 'Gebruiksvoorwaarden van de website en de voorwaarden die van toepassing zijn op de boeking van onze privéchef- en cateringdiensten.',
};

const sections = [
  {
    index: '01',
    title: 'Algemene gebruiksvoorwaarden',
    content: (
      <>
        <p>Door deze website te bezoeken en te gebruiken, gaat u akkoord met het naleven van de volgende voorwaarden.</p>
        <ul className="prose-list list-disc">
          <li>Gebruik de website uitsluitend voor legitieme doeleinden en te goeder trouw</li>
          <li>Het is ten strengste verboden om enig deel van het ontwerp of de inhoud te kopiëren, te reproduceren of aan te passen</li>
          <li>Respecteer intellectueel eigendom en vermeld de website als bron wanneer u recepten deelt</li>
          <li>Verstrek correcte en volledige gegevens bij het invullen van aanvraagformulieren</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Boekingen en overeenkomst',
    content: (
      <>
        <p>De boeking van privéchefs en cateringdiensten is definitief nadat er overeenstemming is bereikt over de datum, het menu en het aantal gasten.</p>
        <ul className="prose-list list-disc">
          <li>Voor kleine privédiners raden we aan om de planning minimaal 48 uur van tevoren te starten</li>
          <li>Voor huwelijksbanketten en grootschalige evenementen raden we aan om 1 tot 2 weken van tevoren contact op te nemen</li>
          <li>De definitieve offerte en het definitieve menuvoorstel worden schriftelijk verstrekt na afstemming van de wensen</li>
          <li>Logistieke aspecten van de door de klant gekozen locatie kunnen van invloed zijn op de uiteindelijke prijs</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Annulering en verplaatsing',
    content: (
      <>
        <p>Verzoeken om een datum te wijzigen of een boeking te annuleren dienen zo spoedig mogelijk te worden doorgegeven.</p>
        <ul className="prose-list list-disc">
          <li>Wijzigingen van datum worden ingepland op basis van beschikbaarheid in onze agenda</li>
          <li>Bij annuleringen kort voor de datum van het evenement kunnen kosten voor reeds ingekochte ingrediënten in rekening worden gebracht</li>
          <li>Annuleringen voor evenementen met speciale thematische opstellingen worden per geval beoordeeld</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Rechten op recepten',
    content: (
      <>
        <p>De op de website gepubliceerde recepten worden gedeeld voor persoonlijk thuisgebruik; commercieel gebruik is niet toegestaan zonder voorafgaande toestemming.</p>
        <ul className="prose-list list-disc">
          <li>U mag de recepten vrijuit gebruiken en bereiden in uw eigen keuken</li>
          <li>Commerciële reproductie of gebruik op menukaarten van restaurants zonder schriftelijke toestemming is verboden</li>
          <li>Niet-commercieel delen op blogs of sociale media moet voorzien zijn van een duidelijke link naar het originele recept op onze website</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Beperking van aansprakelijkheid',
    content: (
      <>
        <p>Ons team garandeert de hoogste servicestandaarden, met uitsluiting van overmachtssituaties die buiten onze macht liggen.</p>
        <ul className="prose-list list-disc">
          <li>We zijn niet aansprakelijk voor technische storingen of ontoereikende faciliteiten in de door de klant ter beschikking gestelde keuken</li>
          <li>Problemen als gevolg van onjuiste informatie verstrekt door de klant vallen onder de verantwoordelijkheid van de klant</li>
          <li>Bij onvoorziene logistieke vertragingen door overmacht zullen we ter plaatse zoeken naar het best mogelijke alternatief</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Support en contact',
    content: (
      <>
        <p>Voor vragen of verduidelijking over de gebruiksvoorwaarden kunt u contact met ons opnemen via de gebruikelijke kanalen.</p>
        <ul className="prose-list list-disc">
          <li>E-mailadres: {siteConfig.email}</li>
          <li>Telefoon & WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Openingstijden: Dagelijks van 08:00 tot 22:00 uur</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Voorwaarden"
      title={<>Deze voorwaarden regelen de toegang tot de website en het boeken van onze culinaire diensten.</>}
      description="In lijn met ons vernieuwde ontwerp presenteren we de algemene voorwaarden in gestructureerde kaarten voor optimale leesbaarheid."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

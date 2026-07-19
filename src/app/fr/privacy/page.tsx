import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('fr', 'privacy', {
  title: 'Politique de confidentialité - Chef İlhamə',
  description: 'Informations concernant la collecte, l\'utilisation et la protection des données personnelles sur le site de la Chef İlhamə.',
});

const sections = [
  {
    index: '01',
    title: 'Données collectées',
    content: (
      <>
        <p>
          Nous collectons un nombre limité de données via les formulaires de contact, les liens WhatsApp et des outils analytiques standard. Notre but est de répondre rapidement à vos demandes et de garantir la qualité de service.
        </p>
        <ul className="prose-list list-disc">
          <li>Nom complet et coordonnées</li>
          <li>Adresse e-mail et numéro de téléphone</li>
          <li>Détails concernant votre demande de réception</li>
          <li>Statistiques d\'utilisation anonymes du site</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Finalité de la collecte',
    content: (
      <>
        <p>Toutes les données collectées servent exclusivement à améliorer l\'efficacité et la qualité de notre prise en charge.</p>
        <ul className="prose-list list-disc">
          <li>Réponses aux demandes de réservation et de service traiteur</li>
          <li>Conception de menus personnalisés et planification de l\'événement</li>
          <li>Suivi de l\'historique des échanges et de la relation client</li>
          <li>Mesure des performances du site et analyse de l\'expérience utilisateur</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Protection des données',
    content: (
      <>
        <p>Des mesures de sécurité strictes, tant techniques qu\'organisationnelles, sont en place pour protéger vos données personnelles.</p>
        <ul className="prose-list list-disc">
          <li>Infrastructure d\'hébergement et base de données sécurisées</li>
          <li>Stockage limité aux données strictement nécessaires</li>
          <li>Droits d\'accès limités aux seuls collaborateurs autorisés</li>
          <li>Principes de minimisation lors des transferts vers des outils tiers</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Services tiers',
    content: (
      <>
        <p>Notre site utilise des infrastructures externes dont les politiques de confidentialité s\'appliquent.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics pour les statistiques de visites</li>
          <li>WhatsApp pour les échanges rapides et réservations</li>
          <li>Services d\'hébergement et serveurs de messagerie pour le fonctionnement général</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Vos droits',
    content: (
      <>
        <p>Vous disposez d\'un droit complet concernant vos informations personnelles.</p>
        <ul className="prose-list list-disc">
          <li>Droit d\'accès et de rectification de vos données</li>
          <li>Droit d\'opposition et de suppression définitive</li>
          <li>Révocation des autorisations de communication</li>
          <li>Demandes d\'informations sur nos processus de traitement</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contact',
    content: (
      <>
        <p>Pour toute question ou demande relative à vos données personnelles, veuillez utiliser les canaux suivants.</p>
        <ul className="prose-list list-disc">
          <li>E-mail : {siteConfig.email}</li>
          <li>WhatsApp : {siteConfig.phoneDisplay}</li>
          <li>Zone d\'activité : Bakou, Sumgayıt et Abchéron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Politique de confidentialité"
      title={<>Nous détaillons ici de manière claire comment vos informations personnelles sont collectées, utilisées et sécurisées.</>}
      description="Les textes juridiques s'harmonisent également avec le nouveau design du site : plus lisibles, ils sont présentés sous forme de cartes d'information claires."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

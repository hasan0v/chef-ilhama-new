import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('fr', 'terms', {
  title: 'Conditions d\'utilisation - Chef İlhamə',
  description: 'Règles d\'utilisation du site de la Chef İlhamə, conditions de réservation de services traiteur et chef privé.',
});

const sections = [
  {
    index: '01',
    title: 'Règles générales d\'utilisation',
    content: (
      <>
        <p>En utilisant ce site, vous acceptez de vous conformer aux présentes règles et conditions.</p>
        <ul className="prose-list list-disc">
          <li>Utilisation du site uniquement à des fins légales et de bonne foi</li>
          <li>Interdiction de copier, modifier ou manipuler les contenus</li>
          <li>Respect des droits d\'auteur et des attributions</li>
          <li>Fourniture d\'informations exactes et complètes dans les formulaires</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Réservation de prestations',
    content: (
      <>
        <p>Les services de chef privé et traiteur sont confirmés sur devis, en fonction de la date, du nombre d\'invités et du menu.</p>
        <ul className="prose-list list-disc">
          <li>Pour les petits dîners privés, un délai de 48 heures minimum est recommandé</li>
          <li>Pour les mariages et banquets de grande envergure, une planification de 1 à 2 semaines en amont est optimale</li>
          <li>Les tarifs et les menus finaux sont soumis par écrit après l\'étape de brief</li>
          <li>Les conditions d\'installation sur site et logistiques peuvent influencer le devis</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Conditions d\'annulation et modification',
    content: (
      <>
        <p>Toute modification ou annulation de date d\'événement planifié doit nous être signalée dans les plus brefs délais.</p>
        <ul className="prose-list list-disc">
          <li>Les reports de dates signalés à l\'avance sont réorganisés sous réserve de disponibilité</li>
          <li>Les annulations de dernière minute peuvent donner lieu à la facturation des frais de préparation engagés</li>
          <li>Les projets impliquant des matières premières déjà achetées font l\'objet d\'une étude spécifique</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Contenus des recettes & droits d\'auteur',
    content: (
      <>
        <p>Les recettes et contenus du site sont destinés à un usage personnel. Tout usage commercial nécessite une autorisation.</p>
        <ul className="prose-list list-disc">
          <li>Vous pouvez reproduire librement les recettes chez vous à des fins privées</li>
          <li>La publication sur des supports commerciaux et la copie de masse sont soumises à accord préalable</li>
          <li>Toute reproduction complète sans mention de la source active n\'est pas autorisée</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Limites de responsabilité',
    content: (
      <>
        <p>Notre équipe s\'efforce de maintenir une prestation d\'excellence, mais les facteurs externes font l\'objet d\'un suivi spécifique.</p>
        <ul className="prose-list list-disc">
          <li>Les cas de force majeure et contraintes techniques du lieu d\'événement ne relèvent pas de notre responsabilité</li>
          <li>Les erreurs issues d\'un brief inexact ou incomplet fourni par le client sont de sa responsabilité</li>
          <li>Les retards imputables aux réseaux logistiques externes sont traités à part</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contact et retours',
    content: (
      <>
        <p>Pour tout échange concernant nos conditions d\'utilisation ou la qualité de nos services, contactez-nous.</p>
        <ul className="prose-list list-disc">
          <li>E-mail : {siteConfig.email}</li>
          <li>Téléphone / WhatsApp : {siteConfig.phoneDisplay}</li>
          <li>Heures d\'activité : Tous les jours de 08:00 à 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Conditions d'utilisation"
      title={<>Les règles régissant l'usage de nos services et de ce site sont détaillées ci-dessous.</>}
      description="Le nouveau design simplifie la lecture de nos conditions d'utilisation grâce à des encadrés d'information clairs."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidad - Chef İlhamə',
  description: 'Detalles sobre la recopilación, tratamiento y protección de sus datos personales en nuestro sitio web.',
};

const sections = [
  {
    index: '01',
    title: 'Datos que recopilamos',
    content: (
      <>
        <p>
          Recopilamos una cantidad mínima de datos personales mediante formularios de consulta, enlaces directos a WhatsApp y herramientas básicas de análisis de tráfico para dar una respuesta ágil y con calidad.
        </p>
        <ul className="prose-list list-disc">
          <li>Nombre completo e información de contacto</li>
          <li>Dirección de correo electrónico y teléfono</li>
          <li>Detalles específicos de la solicitud de servicio y evento</li>
          <li>Estadísticas de navegación anónimas</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Finalidad del tratamiento de datos',
    content: (
      <>
        <p>Toda la información que recopilamos se utiliza con el único fin de planificar y prestar nuestros servicios.</p>
        <ul className="prose-list list-disc">
          <li>Responder a solicitudes de presupuestos de chef privado o catering</li>
          <li>Diseñar propuestas de menús personalizadas y planificar la logística</li>
          <li>Mantener un historial de comunicación y control de calidad</li>
          <li>Analizar el tráfico de la web para optimizar la experiencia de navegación</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Protección y seguridad',
    content: (
      <>
        <p>Implementamos medidas técnicas y organizativas para salvaguardar sus datos frente a accesos no autorizados.</p>
        <ul className="prose-list list-disc">
          <li>Servidores y bases de datos con control de acceso restringido</li>
          <li>Recopilación exclusiva de los datos estrictamente necesarios para el servicio</li>
          <li>Acceso limitado a la información únicamente al personal autorizado</li>
          <li>Tratamiento seguro y anonimizado en la analítica web</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Servicios de terceros',
    content: (
      <>
        <p>Nuestro sitio web utiliza herramientas de proveedores externos que tienen sus propias políticas de privacidad.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics para la medición estadística de visitas</li>
          <li>WhatsApp Business para la atención inmediata al cliente</li>
          <li>Proveedores de hosting y envío de correo electrónico necesarios para la funcionalidad</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Sus derechos legales',
    content: (
      <>
        <p>Tiene derecho a acceder, corregir o solicitar la eliminación de la información personal que conservamos.</p>
        <ul className="prose-list list-disc">
          <li>Derecho a solicitar acceso y rectificación de datos inexactos</li>
          <li>Derecho a solicitar la eliminación permanente de sus registros personales</li>
          <li>Derecho a revocar los permisos de contacto en cualquier momento</li>
          <li>Derecho a solicitar información adicional sobre el uso de sus datos</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contacto y consultas',
    content: (
      <>
        <p>Para resolver cualquier duda o ejercer sus derechos sobre la privacidad de sus datos, contáctenos.</p>
        <ul className="prose-list list-disc">
          <li>Correo electrónico: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Ámbito de servicios: Bakú, Sumqayıt y Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Política de privacidad"
      title={<>Explicamos de forma transparente cómo tratamos y protegemos sus datos personales.</>}
      description="Los textos legales se han adaptado a la estética moderna de la web, organizando la información en tarjetas claras e intuitivas en lugar de bloques densos de texto."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

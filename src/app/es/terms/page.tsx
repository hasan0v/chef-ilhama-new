import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('es', 'terms', {
  title: 'Condiciones de uso - Chef İlhamə',
  description: 'Normas de uso del sitio web y condiciones aplicables a la reserva de servicios de chef privado y catering.',
});

const sections = [
  {
    index: '01',
    title: 'Normas de uso general',
    content: (
      <>
        <p>Al acceder y utilizar este sitio web, usted acepta cumplir y quedar sujeto a las siguientes condiciones.</p>
        <ul className="prose-list list-disc">
          <li>Utilizar el sitio web exclusivamente para fines legítimos y de buena fe</li>
          <li>Queda estrictamente prohibido copiar, reproducir o modificar cualquier parte del diseño y contenido</li>
          <li>Respetar los derechos de autor, citando adecuadamente la autoría de las recetas si se comparten</li>
          <li>Proporcionar datos reales y completos al cumplimentar los formularios de reserva</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Reservas y contratación de servicios',
    content: (
      <>
        <p>La contratación de los servicios de chef privado y catering se confirma de manera individual tras acordar los detalles de fecha, menú e invitados.</p>
        <ul className="prose-list list-disc">
          <li>Para cenas privadas pequeñas, recomendamos iniciar la planificación con al menos 48 horas de antelación</li>
          <li>Para banquetes de boda y eventos de gran escala, se sugiere contactar con 1 o 2 semanas de antelación</li>
          <li>El presupuesto definitivo y la propuesta de menú cerrada se entregarán por escrito tras definir el alcance</li>
          <li>Las condiciones logísticas del espacio elegido por el cliente pueden influir en el coste del servicio</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Cancelación y cambios de fecha',
    content: (
      <>
        <p>Cualquier solicitud de cambio de fecha o cancelación del servicio contratado deberá comunicarse a la mayor brevedad.</p>
        <ul className="prose-list list-disc">
          <li>Los cambios de fecha se reprogramarán según la disponibilidad de nuestra agenda</li>
          <li>Las cancelaciones muy próximas a la fecha del servicio pueden conllevar costes por las materias primas ya adquiridas</li>
          <li>Las cancelaciones en eventos con montajes especiales se valorarán de forma independiente</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Derechos sobre las recetas',
    content: (
      <>
        <p>Las recetas publicadas en el sitio web se comparten con fines de entretenimiento doméstico; su uso comercial requiere autorización.</p>
        <ul className="prose-list list-disc">
          <li>Usted puede cocinar y recrear las recetas en su hogar libremente</li>
          <li>Queda prohibida la reproducción comercial o el uso en menús comerciales sin consentimiento por escrito</li>
          <li>Las publicaciones no comerciales en web deben enlazar claramente a la receta original en nuestro sitio</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Limitación de responsabilidad',
    content: (
      <>
        <p>Nuestro equipo garantiza los máximos estándares en el servicio, excluyendo imprevistos de fuerza mayor ajenos a nuestra gestión.</p>
        <ul className="prose-list list-disc">
          <li>No nos hacemos responsables por fallos técnicos o condiciones inadecuadas de la cocina proporcionada por el cliente</li>
          <li>Los contratiempos derivados de información incorrecta aportada por el cliente serán responsabilidad de este</li>
          <li>Los retrasos por fuerza mayor o cortes de suministro ajenos se resolverán buscando la mejor alternativa in situ</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Soporte y contacto',
    content: (
      <>
        <p>Para cualquier aclaración sobre las condiciones de uso, puede comunicarse por los medios habituales.</p>
        <ul className="prose-list list-disc">
          <li>Correo electrónico: {siteConfig.email}</li>
          <li>Teléfono y WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Horario de atención: Todos los días de 08:00 a 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Condiciones de uso"
      title={<>Estas condiciones regulan el acceso al sitio web y la contratación de nuestros servicios culinarios.</>}
      description="Nuestra interfaz renovada presenta las condiciones generales de uso en tarjetas estructuradas, eliminando textos densos para agilizar su lectura."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

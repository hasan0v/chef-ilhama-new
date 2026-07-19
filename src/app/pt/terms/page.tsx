import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('pt', 'terms', {
  title: 'Termos de uso - Chef İlhamə',
  description: 'Normas de utilização do website e condições aplicáveis à reserva de serviços de chef privado e catering.',
});

const sections = [
  {
    index: '01',
    title: 'Normas de utilização geral',
    content: (
      <>
        <p>Ao aceder e utilizar este website, aceita cumprir e ficar sujeito às seguintes condições.</p>
        <ul className="prose-list list-disc">
          <li>Utilizar o website exclusivamente para fins legítimos e de boa fé</li>
          <li>É estritamente proibido copiar, reproduzir ou modificar qualquer parte do design e conteúdo</li>
          <li>Respeitar os direitos de autor, citando adequadamente a autoria das receitas se as partilhar</li>
          <li>Fornecer dados reais e completos ao preencher os formulários de reserva</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Reservas e contratação de serviços',
    content: (
      <>
        <p>A contratação dos serviços de chef privado e catering é confirmada de forma individual após acordar os detalhes de data, menu e convidados.</p>
        <ul className="prose-list list-disc">
          <li>Para jantares privados pequenos, recomendamos iniciar o planeamento com pelo menos 48 horas de antecedência</li>
          <li>Para banquetes de casamento e eventos de grande escala, sugere-se contactar com 1 ou 2 semanas de antecedência</li>
          <li>O orçamento definitivo e a proposta de menu fechada serão entregues por escrito após definir o alcance</li>
          <li>As condições logísticas do espaço escolhido pelo cliente podem influenciar o custo final do serviço</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Cancelamento e alterações de data',
    content: (
      <>
        <p>Qualquer pedido de alteração de data ou cancelamento do serviço contratado deverá ser comunicado o mais breve possível.</p>
        <ul className="prose-list list-disc">
          <li>As alterações de data serão reprogramadas segundo a disponibilidade da nossa agenda</li>
          <li>Os cancelamentos muito próximos da data do serviço podem implicar custos pelas matérias-primas já adquiridas</li>
          <li>Os cancelamentos em eventos com montagens especiais serão valorizados de forma independente</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Direitos sobre as receitas',
    content: (
      <>
        <p>As receitas publicadas no website são partilhadas com fins de entretenimento doméstico; o seu uso comercial requer autorização.</p>
        <ul className="prose-list list-disc">
          <li>Pode cozinhar e recriar as receitas na sua casa livremente</li>
          <li>É proibida a reprodução comercial ou o uso em menus comerciais sem consentimento por escrito</li>
          <li>As publicações não comerciais em blogues ou redes devem ligar claramente à receita original no nosso site</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Limitação de responsabilidade',
    content: (
      <>
        <p>A nossa equipa garante os máximos padrões no serviço, excluindo imprevistos de força maior alheios à nossa gestão.</p>
        <ul className="prose-list list-disc">
          <li>Não nos responsabilizamos por falhas técnicas ou condições inadequadas da cozinha fornecida pelo cliente</li>
          <li>Os contratempos derivados de informações incorretas fornecidas pelo cliente serão da responsabilidade deste</li>
          <li>Os atrasos por força maior ou cortes de abastecimento alheios serão resolvidos procurando a melhor alternativa no local</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Suporte e contacto',
    content: (
      <>
        <p>Para qualquer esclarecimento sobre as condições de uso, pode comunicar pelos meios habituais.</p>
        <ul className="prose-list list-disc">
          <li>E-mail: {siteConfig.email}</li>
          <li>Telefone e WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Horário de atendimento: Todos os dias das 08:00 às 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Termos de uso"
      title={<>Estas condições regulam o acesso ao site e a contratação dos nossos serviços culinários.</>}
      description="A nossa interface renovada apresenta as condições gerais de uso em cartões estruturados, eliminando textos densos para agilizar a leitura."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

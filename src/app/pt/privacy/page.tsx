import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Política de privacidade - Chef İlhamə',
  description: 'Detalhes sobre a recolha, tratamento e proteção dos seus dados pessoais no nosso website.',
};

const sections = [
  {
    index: '01',
    title: 'Dados que recolhemos',
    content: (
      <>
        <p>
          Recolhemos uma quantidade mínima de dados pessoais através de formulários de consulta, ligações de redirecionamento para o WhatsApp e ferramentas básicas de análise de tráfego para garantir uma resposta rápida e de qualidade.
        </p>
        <ul className="prose-list list-disc">
          <li>Nome completo e informações de contacto</li>
          <li>Endereço de e-mail e número de telefone</li>
          <li>Detalhes específicos da solicitação de serviço e evento</li>
          <li>Estatísticas de navegação anónimas</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'Finalidade do tratamento de dados',
    content: (
      <>
        <p>Toda a informação que recolhemos é utilizada com a única finalidade de planear e prestar os nossos serviços.</p>
        <ul className="prose-list list-disc">
          <li>Responder a solicitações de orçamentos de chef privado ou catering</li>
          <li>Desenhar propostas de menus personalizadas e planeamento logístico</li>
          <li>Manter um histórico de comunicação e controle de qualidade</li>
          <li>Analisar o tráfego do site para otimizar a experiência de navegação</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'Proteção e segurança',
    content: (
      <>
        <p>Implementamos medidas técnicas e organizacionais para salvaguardar os seus dados face a acessos não autorizados.</p>
        <ul className="prose-list list-disc">
          <li>Servidores e bases de dados com controlo de acesso restrito</li>
          <li>Recolha exclusiva dos dados estritamente necessários para o serviço</li>
          <li>Acesso limitado à informação unicamente a funcionários autorizados</li>
          <li>Tratamento seguro e anonimizado na análise web</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'Serviços de terceiros',
    content: (
      <>
        <p>O nosso site utiliza ferramentas de fornecedores externos que têm as suas próprias políticas de privacidade.</p>
        <ul className="prose-list list-disc">
          <li>Google Analytics para a medição estatística de visitas</li>
          <li>WhatsApp Business para o atendimento imediato ao cliente</li>
          <li>Fornecedores de alojamento e envio de e-mails necessários para a funcionalidade</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'Os seus direitos legais',
    content: (
      <>
        <p>Tem direito a aceder, corrigir ou solicitar a eliminação da informação pessoal que conservamos.</p>
        <ul className="prose-list list-disc">
          <li>Direito a solicitar acesso e retificação de dados incorretos</li>
          <li>Direito a solicitar a eliminação permanente dos seus registos pessoais</li>
          <li>Direito a revogar as permissões de contacto a qualquer momento</li>
          <li>Direito a solicitar informações adicionais sobre o tratamento dos seus dados</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'Contacto e consultas',
    content: (
      <>
        <p>Para esclarecer qualquer dúvida ou exercer os seus direitos sobre a privacidade dos seus dados, contacte-nos.</p>
        <ul className="prose-list list-disc">
          <li>E-mail: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>Âmbito de serviços: Baku, Sumqayıt e Abşeron</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Política de privacidade"
      title={<>Explicamos de forma transparente como tratamos e protegemos os seus dados pessoais.</>}
      description="Os textos legais foram adaptados à estética moderna do site, organizando a informação em cartões claros e intuitivos em vez de blocos densos de texto."
      sections={sections}
      updatedAt="09.04.2026"
    />
  );
}

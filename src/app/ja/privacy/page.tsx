import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: 'プライバシーポリシー - Chef İlhamə',
  description: '当サイトにおけるお客様の個人情報の収集、取り扱い、および保護に関する方針の詳細。',
};

const sections = [
  {
    index: '01',
    title: '収集する個人情報について',
    content: (
      <>
        <p>
          当スタジオは、お問い合わせフォーム、直接のWhatsAppリンク、および基本的なアクセス解析ツールを通じて、円滑かつ高品質な対応に必要な最小限の個人情報のみを収集します。
        </p>
        <ul className="prose-list list-disc">
          <li>ご氏名および連絡先情報</li>
          <li>メールアドレスおよびお電話番号</li>
          <li>ご希望のサービス内容およびイベントの詳細</li>
          <li>匿名化された基本的なウェブサイト閲覧統計データ</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: '個人情報の利用目的',
    content: (
      <>
        <p>収集したすべての情報は、サービスの計画および確実な提供の目的にのみ使用されます。</p>
        <ul className="prose-list list-disc">
          <li>出張シェフまたはケータリングサービスのご相談への対応</li>
          <li>個別のメニュー提案の作成および現地ロジスティクスの計画</li>
          <li>コミュニケーション履歴の維持およびサービスの品質管理</li>
          <li>サイトの利便性向上に向けたアクセス統計の分析</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: '情報の安全管理と保護について',
    content: (
      <>
        <p>当スタジオは、不正アクセスからお客様の情報を保護するため、適切な技術的・組織的対策を講じています。</p>
        <ul className="prose-list list-disc">
          <li>アクセス制限が適用された安全なサーバーおよびデータベースでの管理</li>
          <li>サービス提供に必要不可欠な最小限の情報のみの収集</li>
          <li>アクセス権を持つ限られた正社員のみによる情報の取り扱い</li>
          <li>アクセス解析における安全な匿名化処理</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: '第三者提供サービスについて',
    content: (
      <>
        <p>当サイトは、それぞれ独自のプライバシーポリシーを有する外部パートナーのツールを使用しています。</p>
        <ul className="prose-list list-disc">
          <li>統計的なアクセス解析のためのGoogle Analyticsの利用</li>
          <li>迅速なコミュニケーションのためのWhatsApp Businessの利用</li>
          <li>サイト稼働に必要なホスティングおよび基本的なメール配信サーバー</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: 'お客様の権利',
    content: (
      <>
        <p>お客様は、当スタジオが保有するご自身の個人情報に関して、確認、訂正、または削除を求める権利を有しています。</p>
        <ul className="prose-list list-disc">
          <li>ご自身の個人情報の開示および誤った情報の修正を求める権利</li>
          <li>当スタジオのシステムから個人情報を恒久的に削除するよう求める権利</li>
          <li>連絡に関する同意をいつでも撤回する権利</li>
          <li>情報の取り扱いに関する詳細な説明を求める権利</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'お問い合わせ窓口',
    content: (
      <>
        <p>プライバシーポリシーに関するご質問や権利の行使につきましては、以下までご連絡ください。</p>
        <ul className="prose-list list-disc">
          <li>メールアドレス: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>主な活動エリア: バクー、スムガイト、アプシェロン地方</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="プライバシーポリシー"
      title={<>お預かりする個人情報の収集目的、取り扱い、および安全な保護について透明性を持って説明します。</>}
      description="法的なドキュメントもサイトのモダンな美意識に調和するよう、難解な長文ではなく、視覚的で分かりやすいカード形式に整理して記載しています。"
      sections={sections}
      updatedAt="2026年4月9日"
    />
  );
}

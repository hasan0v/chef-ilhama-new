import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('ja', 'terms', {
  title: '利用規約 - Chef İlhamə',
  description: '当サイトの利用条件、および出張シェフやケータリングサービスのご予約に適用される基本条件。',
});

const sections = [
  {
    index: '01',
    title: 'サイトのご利用にあたって',
    content: (
      <>
        <p>当サイトをご利用いただくことで、お客様は以下の規約および条件に従うことに同意されたものとみなされます。</p>
        <ul className="prose-list list-disc">
          <li>当サイトを適法、かつ誠実な目的でのみ利用すること</li>
          <li>サイトのデザインやコンテンツのいかなる部分も、無断で複製・改変しないこと</li>
          <li>知的財産権を尊重し、レシピを共有する際は当サイトが原典であることを明記すること</li>
          <li>フォームに入力する際は、正確で虚偽のない内容を送信すること</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: 'ご予約とご契約について',
    content: (
      <>
        <p>出張シェフおよびケータリングサービスのご契約は、日程、メニュー内容、およびゲスト人数について双方の合意があった時点で確定します。</p>
        <ul className="prose-list list-disc">
          <li>少人数のプライベートディナーの場合、開催予定日の48時間前までのご相談を推奨します</li>
          <li>挙式や大規模なレセプションの場合、1〜2週間前までにご相談いただくのが理想的です</li>
          <li>詳細を確認後、確定したお見積書および正式なメニュー案をメール等で提示いたします</li>
          <li>お客様が指定される会場の設備環境によって、別途ロジスティクス費用が発生する場合があります</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: 'キャンセルおよび日程の変更',
    content: (
      <>
        <p>確定したご予約の日程変更またはキャンセルをご希望の場合は、速やかにご連絡ください。</p>
        <ul className="prose-list list-disc">
          <li>日程の変更は、スタジオのスケジュール状況および空き状況に基づいて判断されます</li>
          <li>開催日直前のキャンセルの場合、既に手配済みの食材費等の実費をご請求させていただく場合があります</li>
          <li>特別な装飾や手配を伴う大型イベントのキャンセルについては、個別にご相談のうえ決定します</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: 'レシピの取り扱いと著作権について',
    content: (
      <>
        <p>当サイトに掲載されているレシピは、ご家庭で調理を楽しむ目的で共有されています。商用利用には別途許可が必要です。</p>
        <ul className="prose-list list-disc">
          <li>個人で料理を作り、家庭で愉しむためにレシピを使用することは自由です</li>
          <li>事前の書面による合意なしに、飲食店等のメニューへの無断使用や商業的二次利用はできません</li>
          <li>SNS等で紹介される場合は、当サイトの該当レシピへのリンクを明記していただくようお願いします</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: '免責事項',
    content: (
      <>
        <p>当スタジオは最高水準のサービス提供をお約束しますが、管理の及ばない不可抗力による事態については責任を負いかねます。</p>
        <ul className="prose-list list-disc">
          <li>お客様から提供されたキッチンの設備不良等に起因するトラブルについては責任を負えません</li>
          <li>アレルギーやご人数の変更など、お客様からのご連絡ミスによるトラブルは自己責任となります</li>
          <li>天災や道路事情による不可抗力な遅延が生じた場合は、現地で最善の代替策を講じるよう努めます</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: 'お問い合わせ・規約に関して',
    content: (
      <>
        <p>利用規約についてご不明な点がございましたら、以下の窓口までお寄せください。</p>
        <ul className="prose-list list-disc">
          <li>メールアドレス: {siteConfig.email}</li>
          <li>お電話・WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>営業時間: 毎日 08:00 - 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="利用規約"
      title={<>当サイトの利用方法、および当スタジオの提供する調理・ケータリングサービスのご予約条件を定めています。</>}
      description="当サイトのデザイン刷新に伴い、規約情報も視覚的なカード形式でスッキリと整理し、視認性を高めています。"
      sections={sections}
      updatedAt="2026年4月9日"
    />
  );
}

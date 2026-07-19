import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = {
  title: '服务条款 - 主厨 İlhamə',
  description: '主厨 İlhamə 官方网站使用守则以及定制私厨、活动外烩预约条款。',
};

const sections = [
  {
    index: '01',
    title: '网站使用基本守则',
    content: (
      <>
        <p>访问或使用本网站，即代表您同意并接受本服务条款的全部约束。</p>
        <ul className="prose-list list-disc">
          <li>严格出于诚信、合法且正当的目的访问网站</li>
          <li>严禁以任何手段复制、修改或恶意篡改本站的内容与设计</li>
          <li>尊重原创作者版权，引用或传播本站内容必须声明源产出地</li>
          <li>在提交预约申请时，保证填写的各项数据均真实、准确且完整</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: '服务预约与订单确认',
    content: (
      <>
        <p>所有的私厨和外烩预订必须基于双方就人数、时间及菜单风格协商一致，并正式确认后方生效。</p>
        <ul className="prose-list list-disc">
          <li>对于10-20人的私密晚宴，建议您至少提前 48 小时联系我们</li>
          <li>对于婚礼大席或企业大型晚宴，建议提前 1 到 2 周开启统筹和采购对接</li>
          <li>所有最终价格及菜单，均在充分沟通需求后以正式书面报价提案的形式提交</li>
          <li>活动场地的设备基础、动线布局和物理物流条件可能会影响最终报价</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: '取消订单与退改条款',
    content: (
      <>
        <p>如需更改活动日期或取消服务预订，您必须尽可能提前通知我们。</p>
        <ul className="prose-list list-disc">
          <li>提前沟通的日期变更，我们将在档期允许的前提下全力协助您重新排期</li>
          <li>在临近活动日的极短时间内取消订单，可能需要承担已产生的备货和原材料损耗成本</li>
          <li>若物料与特种食材已进入采办或深加工流程，退改方案将视具体情况另行协商</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: '食谱内容及版权声明',
    content: (
      <>
        <p>本网站分享的食谱主要面向个人爱好者的家庭烹饪，任何商业用途均需获得书面授权。</p>
        <ul className="prose-list list-disc">
          <li>您可以在您家中的厨房自由参考并制作本站分享的佳肴</li>
          <li>严禁将本站食谱用于商业经营、纸质出版或在未授权平台上进行商业分发</li>
          <li>非商业性网络转载，必须注明原作者及本官方网站的超链接源地址</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: '免责声明与服务责任限制',
    content: (
      <>
        <p>我们的团队会以最高标准确保出餐和服务质量，但对无法控制的外界因素我们不承担法律责任。</p>
        <ul className="prose-list list-disc">
          <li>因自然灾害、特殊管制及不可抗力导致活动中断的，双方均免责</li>
          <li>由于客户提供的意向简报信息错误（如人数少报、过敏原漏报）导致的损失由客户自行承担</li>
          <li>由于第三方供应商物料突发性断供或延误产生的执行微调，我方将尽力补救</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: '建议反馈与联系我们',
    content: (
      <>
        <p>如果您对我们的服务守则有任何修改建议，或者在使用过程中有任何不适，请随时向我们反馈。</p>
        <ul className="prose-list list-disc">
          <li>电子邮箱: {siteConfig.email}</li>
          <li>电话专线 / WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>服务接待时间: 每日 08:00 - 22:00</li>
        </ul>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="服务条款"
      title={<>本守则旨在约束您在使用本网站以及预定我们线下服务时的各项基本行为规范。</>}
      description="在全新的视觉风格下，法律条款看起来清晰明快：原有的冗长文章已被分门别类的卡片化设计所取代。"
      sections={sections}
      updatedAt="2026年04月09日"
    />
  );
}

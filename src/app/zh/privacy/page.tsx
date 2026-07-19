import { withLocaleAlternates } from '@/lib/seoLocales';
import type { Metadata } from 'next';
import LegalPage from '@/components/site/pages/LegalPage';
import { siteConfig } from '@/lib/site';

export const metadata: Metadata = withLocaleAlternates('zh', 'privacy', {
  title: '隐私政策 - 主厨 İlhamə',
  description: '主厨 İlhamə 官方网站关于个人数据收集、使用及安全保护的相关说明。',
});

const sections = [
  {
    index: '01',
    title: '我们收集哪些数据',
    content: (
      <>
        <p>
          我们仅通过联系表单、WhatsApp 跳转链接和标准网站分析工具收集极少量的个人数据。其目的在于快速响应您的咨询并提供定制化服务。
        </p>
        <ul className="prose-list list-disc">
          <li>姓名及联络沟通细节</li>
          <li>电子邮箱与电话号码</li>
          <li>关于活动或宴会定制的意向细节</li>
          <li>匿名的网站访问统计与偏好分析</li>
        </ul>
      </>
    ),
  },
  {
    index: '02',
    title: '数据收集的用途',
    content: (
      <>
        <p>我们收集的所有数据均仅用于为您提供更高效、更具品质的服务保障。</p>
        <ul className="prose-list list-disc">
          <li>回复您的私厨预订、商务宴请和外烩定制申请</li>
          <li>为您定制菜单、核算价格以及规划现场物流流程</li>
          <li>记录沟通历史、优化后续活动执行方案</li>
          <li>监测网站运行表现、优化并提升用户的使用体验</li>
        </ul>
      </>
    ),
  },
  {
    index: '03',
    title: '我们如何保护您的数据',
    content: (
      <>
        <p>我们采取了严密的技术与管理手段来保障您个人数据的绝对安全。</p>
        <ul className="prose-list list-disc">
          <li>使用安全的服务器及数据库访问控制体系</li>
          <li>只收集和保留业务开展所必须的最基础数据</li>
          <li>严格限制数据库的访问权限，非授权人员禁止查看</li>
          <li>在使用第三方服务分析时，遵循最小披露和去标识化原则</li>
        </ul>
      </>
    ),
  },
  {
    index: '04',
    title: '第三方服务合作',
    content: (
      <>
        <p>我们的网站依托于一些外部工具以提供辅助功能，他们有其自身的隐私条款约束。</p>
        <ul className="prose-list list-disc">
          <li>使用 Google Analytics 统计并分析访问量数据</li>
          <li>使用 WhatsApp 进行实时在线客服和即时预约沟通</li>
          <li>基础的云端服务器提供商以及邮件派发系统支持</li>
        </ul>
      </>
    ),
  },
  {
    index: '05',
    title: '您的法定权利',
    content: (
      <>
        <p>对于我们持有的您的个人信息，您拥有完整的控制和查询权利。</p>
        <ul className="prose-list list-disc">
          <li>有权要求查询、更正有误的个人信息</li>
          <li>有权要求永久删除您在系统中的留存数据</li>
          <li>可以随时撤回之前授予的通讯和营销联络许可</li>
          <li>就您的数据处理方式，有权向我们要求获得书面说明</li>
        </ul>
      </>
    ),
  },
  {
    index: '06',
    title: '联络方式',
    content: (
      <>
        <p>如果您对我们的隐私政策有任何疑问或诉求，请随时与我们取得联络。</p>
        <ul className="prose-list list-disc">
          <li>电子邮箱: {siteConfig.email}</li>
          <li>WhatsApp: {siteConfig.phoneDisplay}</li>
          <li>核心业务区域: 巴库、苏姆盖特及阿普歇伦区域</li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="隐私政策"
      title={<>在此，我们以极其透明的方式说明我们如何收集、使用和保护您的个人信息。</>}
      description="法律声明文件亦融入了网站的现代设计语言：我们将长篇大论的条款化繁为简，整理成清晰、易读的板块信息。"
      sections={sections}
      updatedAt="2026年04月09日"
    />
  );
}

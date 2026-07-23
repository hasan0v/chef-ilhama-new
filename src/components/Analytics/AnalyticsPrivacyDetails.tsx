'use client';

import type { SiteLocale } from '@/lib/localeRoutes';

type DisclosureCopy = {
  title: string;
  intro: string;
  items: string[];
};

const disclosureCopy: Record<SiteLocale, DisclosureCopy> = {
  az: {
    title: 'Analitika, cookies və cihaz yaddaşı',
    intro: 'Sayt açılan kimi məhdud, cookiesiz Google Analytics ölçümü başlayır. Bu ölçüm reklam profili yaratmaq üçün istifadə edilmir.',
    items: [
      'Ölçülən məlumatlar: baxılan səhifənin URL-i və başlığı, keçid mənbəyi, baxış vaxtı, sayt dili, brauzer, əməliyyat sistemi, cihaz kateqoriyası və səhifədaxili klik hadisələri.',
      'IP ünvanı ölkə və şəhər səviyyəsində təxmini məkanı müəyyənləşdirmək üçün ötürülmə zamanı istifadə olunur; Google Analytics onu məlumat bazasına yazmazdan əvvəl silir.',
      'Analytics storage, reklam storage-i, reklam fərdiləşdirilməsi və Google signals bağlıdır; buna görə Google Analytics identifikator və reklam cookie-ləri yaradılmır.',
      'Dil seçimi üçün zəruri locale cookie-si bir il saxlanır. Bildirişin bağlanması, seçilmiş dil, saxlanmış reseptlər və bişirmə proqresi yalnız brauzerinizin localStorage yaddaşında qalır.',
      'Hosting provayderi səhifəni çatdırmaq və təhlükəsizliyi qorumaq üçün IP, sorğu vaxtı və texniki request loglarını məhdud müddət emal edə bilər.',
      'Əlaqə forması məlumatı serverimizdə saxlamır; WhatsApp düyməsini seçdiyiniz zaman yazdığınız məlumat WhatsApp-a göndərilir və onun məxfilik qaydaları tətbiq olunur.',
    ],
  },
  en: {
    title: 'Analytics, cookies, and device storage',
    intro: 'Limited, cookieless Google Analytics measurement starts when the site opens. It is not used to create advertising profiles.',
    items: [
      'Measured data includes the page URL and title, referrer, visit time, site language, browser, operating system, device category, and on-page interaction events.',
      'The IP address is used in transit to derive approximate country and city; Google Analytics discards it before the data is logged.',
      'Analytics storage, ad storage, ad personalization, and Google signals remain disabled, so Google Analytics identifier and advertising cookies are not created.',
      'A necessary locale cookie remembers language for one year. Notice dismissal, language, saved recipes, and cooking progress stay only in browser localStorage.',
      'The hosting provider may process IP, request time, and technical request logs for a limited period to deliver and secure the site.',
      'The contact form is not stored on our server. If you choose WhatsApp, the information you entered is sent to WhatsApp under its privacy terms.',
    ],
  },
  tr: {
    title: 'Analitik, çerezler ve cihaz depolaması',
    intro: 'Site açıldığında sınırlı ve çerezsiz Google Analytics ölçümü başlar. Reklam profili oluşturmak için kullanılmaz.',
    items: [
      'Sayfa URL’si ve başlığı, yönlendiren kaynak, ziyaret zamanı, dil, tarayıcı, işletim sistemi, cihaz kategorisi ve sayfa içi etkileşimler ölçülür.',
      'IP adresi yaklaşık ülke ve şehri belirlemek için aktarım sırasında kullanılır; Google Analytics kaydetmeden önce IP’yi siler.',
      'Analytics storage, reklam depolaması, reklam kişiselleştirme ve Google signals kapalıdır; Google Analytics kimlik ve reklam çerezleri oluşturulmaz.',
      'Dil için gerekli locale çerezi bir yıl saklanır. Bildirim, dil, kaydedilen tarifler ve pişirme ilerlemesi yalnızca tarayıcı localStorage alanında kalır.',
      'Barındırma sağlayıcısı güvenlik ve site teslimi için IP ve teknik istek günlüklerini sınırlı süre işleyebilir.',
      'İletişim formu sunucumuzda tutulmaz; WhatsApp seçildiğinde girdiğiniz bilgi WhatsApp’a gönderilir ve onun gizlilik koşulları geçerli olur.',
    ],
  },
  ru: {
    title: 'Аналитика, cookie и память устройства',
    intro: 'При открытии сайта запускается ограниченное измерение Google Analytics без cookie. Оно не используется для рекламного профилирования.',
    items: [
      'Измеряются URL и заголовок страницы, источник перехода, время, язык, браузер, ОС, тип устройства и события взаимодействия.',
      'IP используется при передаче для определения примерной страны и города; Google Analytics удаляет его до записи данных.',
      'Analytics storage, рекламное хранилище, персонализация рекламы и Google signals отключены; идентификационные и рекламные cookie GA не создаются.',
      'Необходимый locale-cookie хранит язык один год. Закрытие уведомления, язык, рецепты и прогресс готовки остаются только в localStorage браузера.',
      'Хостинг может ограниченно обрабатывать IP и технические журналы запросов для доставки и защиты сайта.',
      'Форма не сохраняется на нашем сервере; при выборе WhatsApp введённые данные передаются WhatsApp по его правилам конфиденциальности.',
    ],
  },
  fr: {
    title: 'Analyses, cookies et stockage local',
    intro: 'Une mesure Google Analytics limitée et sans cookies commence à l’ouverture du site. Elle ne sert pas au profilage publicitaire.',
    items: [
      'Sont mesurés : URL et titre, provenance, heure, langue, navigateur, système, catégorie d’appareil et interactions sur la page.',
      'L’adresse IP sert en transit à déduire le pays et la ville approximatifs ; Google Analytics la supprime avant journalisation.',
      'Le stockage analytique et publicitaire, la personnalisation et Google signals restent désactivés ; aucun cookie identifiant ou publicitaire GA n’est créé.',
      'Un cookie locale nécessaire mémorise la langue un an. Avis, langue, recettes et progression restent uniquement dans le localStorage du navigateur.',
      'L’hébergeur peut traiter brièvement IP et journaux techniques pour fournir et sécuriser le site.',
      'Le formulaire n’est pas stocké sur notre serveur ; si WhatsApp est choisi, les données sont envoyées à WhatsApp selon ses règles.',
    ],
  },
  de: {
    title: 'Analysen, Cookies und Gerätespeicher',
    intro: 'Beim Öffnen startet eine begrenzte, cookielose Google-Analytics-Messung. Sie dient nicht der Erstellung von Werbeprofilen.',
    items: [
      'Gemessen werden Seiten-URL und Titel, Referrer, Zeit, Sprache, Browser, Betriebssystem, Gerätekategorie und Interaktionen.',
      'Die IP-Adresse wird während der Übertragung zur ungefähren Länder- und Stadtbestimmung genutzt und vor der Protokollierung verworfen.',
      'Analytics- und Werbespeicher, Personalisierung und Google signals bleiben deaktiviert; GA-Kennungs- und Werbe-Cookies werden nicht gesetzt.',
      'Ein notwendiges Locale-Cookie speichert die Sprache ein Jahr. Hinweis, Sprache, Rezepte und Kochfortschritt bleiben nur im localStorage.',
      'Der Hosting-Anbieter kann IP und technische Anfrageprotokolle begrenzt zur Bereitstellung und Sicherheit verarbeiten.',
      'Das Formular wird nicht auf unserem Server gespeichert; bei WhatsApp werden Ihre Eingaben nach dessen Datenschutzregeln übertragen.',
    ],
  },
  es: {
    title: 'Analítica, cookies y almacenamiento local',
    intro: 'Al abrir el sitio comienza una medición limitada de Google Analytics sin cookies. No se usa para crear perfiles publicitarios.',
    items: [
      'Se miden URL y título, procedencia, hora, idioma, navegador, sistema operativo, tipo de dispositivo e interacciones.',
      'La IP se usa en tránsito para obtener país y ciudad aproximados; Google Analytics la descarta antes de registrar los datos.',
      'El almacenamiento analítico y publicitario, la personalización y Google signals siguen desactivados; GA no crea cookies de identificación o publicidad.',
      'Una cookie locale necesaria recuerda el idioma un año. Aviso, idioma, recetas y progreso quedan solo en localStorage.',
      'El proveedor de alojamiento puede procesar temporalmente IP y registros técnicos para entregar y proteger el sitio.',
      'El formulario no se guarda en nuestro servidor; al elegir WhatsApp, los datos se envían conforme a sus reglas de privacidad.',
    ],
  },
  it: {
    title: 'Analisi, cookie e memoria del dispositivo',
    intro: 'All’apertura parte una misurazione Google Analytics limitata e senza cookie. Non viene usata per profili pubblicitari.',
    items: [
      'Vengono misurati URL e titolo, provenienza, ora, lingua, browser, sistema operativo, tipo di dispositivo e interazioni.',
      'L’IP è usato in transito per ricavare paese e città approssimativi; Google Analytics lo elimina prima della registrazione.',
      'Archiviazione analitica e pubblicitaria, personalizzazione e Google signals restano disattivati; GA non crea cookie identificativi o pubblicitari.',
      'Un cookie locale necessario ricorda la lingua per un anno. Avviso, lingua, ricette e avanzamento restano solo nel localStorage.',
      'L’hosting può trattare per breve tempo IP e log tecnici per erogare e proteggere il sito.',
      'Il modulo non è salvato sul nostro server; scegliendo WhatsApp, i dati sono inviati secondo le sue condizioni privacy.',
    ],
  },
  pt: {
    title: 'Análise, cookies e armazenamento local',
    intro: 'Ao abrir o site inicia-se uma medição limitada e sem cookies no Google Analytics. Não é usada para criar perfis publicitários.',
    items: [
      'São medidos URL e título, origem, hora, idioma, navegador, sistema operativo, tipo de dispositivo e interações.',
      'O IP é usado em trânsito para obter país e cidade aproximados; o Google Analytics elimina-o antes do registo.',
      'Armazenamento analítico e publicitário, personalização e Google signals ficam desativados; o GA não cria cookies identificadores ou publicitários.',
      'Um cookie locale necessário recorda o idioma por um ano. Aviso, idioma, receitas e progresso ficam apenas no localStorage.',
      'O alojamento pode processar temporariamente IP e registos técnicos para fornecer e proteger o site.',
      'O formulário não é guardado no nosso servidor; ao escolher WhatsApp, os dados seguem as regras de privacidade desse serviço.',
    ],
  },
  nl: {
    title: 'Analytics, cookies en apparaatopslag',
    intro: 'Bij het openen start beperkte, cookieloze Google Analytics-meting. Deze wordt niet gebruikt voor advertentieprofielen.',
    items: [
      'Pagina-URL en titel, verwijzer, tijd, taal, browser, besturingssysteem, apparaattype en interacties worden gemeten.',
      'Het IP-adres wordt tijdens overdracht gebruikt voor een schatting van land en stad en vóór opslag door Google Analytics verwijderd.',
      'Analytics- en advertentieopslag, personalisatie en Google signals blijven uit; GA maakt geen identificatie- of advertentiecookies.',
      'Een noodzakelijke locale-cookie onthoudt de taal één jaar. Melding, taal, recepten en voortgang blijven alleen in localStorage.',
      'De hostingprovider kan IP en technische logs tijdelijk verwerken om de site te leveren en beveiligen.',
      'Het formulier wordt niet op onze server opgeslagen; bij WhatsApp gelden de privacyregels van WhatsApp.',
    ],
  },
  ar: {
    title: 'التحليلات وملفات الارتباط وتخزين الجهاز',
    intro: 'يبدأ قياس محدود بلا ملفات ارتباط عبر Google Analytics عند فتح الموقع، ولا يُستخدم لإنشاء ملفات إعلانية.',
    items: [
      'تُقاس صفحة الزيارة وعنوانها والمصدر والوقت واللغة والمتصفح ونظام التشغيل ونوع الجهاز والتفاعلات.',
      'يُستخدم عنوان IP أثناء النقل لاشتقاق البلد والمدينة التقريبيين ثم يحذفه Google Analytics قبل التسجيل.',
      'يبقى تخزين التحليلات والإعلانات والتخصيص وGoogle signals معطلاً، فلا تُنشأ ملفات تعريف أو إعلان من GA.',
      'يحفظ ملف locale الضروري اللغة لمدة سنة. يبقى إغلاق الإشعار واللغة والوصفات والتقدم داخل localStorage فقط.',
      'قد تعالج الاستضافة IP وسجلات الطلب التقنية لفترة محدودة لتقديم الموقع وحمايته.',
      'لا يُحفظ نموذج التواصل على خادمنا؛ عند اختيار WhatsApp تُرسل البيانات وفق سياسة خصوصيته.',
    ],
  },
  zh: {
    title: '分析、Cookie 与设备存储',
    intro: '网站打开时会启动有限且无 Cookie 的 Google Analytics 测量，不用于建立广告画像。',
    items: [
      '测量内容包括页面 URL 与标题、来源、时间、语言、浏览器、操作系统、设备类别和页面互动。',
      'IP 仅在传输中用于推断大致国家和城市；Google Analytics 会在记录前将其丢弃。',
      '分析与广告存储、广告个性化及 Google signals 均保持关闭，因此 GA 不创建识别或广告 Cookie。',
      '必要的 locale Cookie 保存语言一年。提示关闭状态、语言、收藏食谱和烹饪进度仅保存在 localStorage。',
      '托管商可能短期处理 IP 和技术请求日志，以提供并保护网站。',
      '联系表单不会保存在我们的服务器；选择 WhatsApp 后，数据按其隐私规则发送。',
    ],
  },
  ja: {
    title: '分析、Cookie、端末内保存',
    intro: 'サイトを開くと、Cookieを使わない限定的なGoogle Analytics測定が開始されます。広告プロファイルには使用しません。',
    items: [
      'ページURL・タイトル、参照元、時刻、言語、ブラウザ、OS、端末区分、ページ内操作を測定します。',
      'IPは転送中に国・都市の概算に使われ、Google Analyticsは記録前に破棄します。',
      '分析・広告ストレージ、広告パーソナライズ、Google signalsは無効で、GAの識別・広告Cookieは作成されません。',
      '必要なlocale Cookieは言語を1年間保存します。通知、言語、保存レシピ、進捗はlocalStorageだけに残ります。',
      'ホスティング事業者は配信と保護のためIPと技術ログを一時処理する場合があります。',
      'フォームは当社サーバーに保存されず、WhatsApp選択時は同社のプライバシー条件で送信されます。',
    ],
  },
  id: {
    title: 'Analitik, cookie, dan penyimpanan perangkat',
    intro: 'Pengukuran Google Analytics terbatas tanpa cookie dimulai saat situs dibuka dan tidak digunakan untuk profil iklan.',
    items: [
      'URL dan judul halaman, perujuk, waktu, bahasa, browser, sistem operasi, jenis perangkat, dan interaksi diukur.',
      'IP digunakan saat transit untuk perkiraan negara dan kota; Google Analytics membuangnya sebelum data dicatat.',
      'Penyimpanan analitik dan iklan, personalisasi, serta Google signals tetap nonaktif; cookie identitas dan iklan GA tidak dibuat.',
      'Cookie locale yang diperlukan menyimpan bahasa satu tahun. Notifikasi, bahasa, resep, dan progres hanya tersimpan di localStorage.',
      'Penyedia hosting dapat memproses IP dan log teknis secara terbatas untuk menyajikan dan melindungi situs.',
      'Formulir tidak disimpan di server kami; jika WhatsApp dipilih, data dikirim menurut aturan privasinya.',
    ],
  },
  hi: {
    title: 'एनालिटिक्स, कुकी और डिवाइस स्टोरेज',
    intro: 'साइट खुलते ही सीमित, कुकी-रहित Google Analytics माप शुरू होता है। इसका उपयोग विज्ञापन प्रोफ़ाइल के लिए नहीं होता।',
    items: [
      'पेज URL व शीर्षक, रेफ़रल, समय, भाषा, ब्राउज़र, OS, डिवाइस श्रेणी और पेज इंटरैक्शन मापे जाते हैं।',
      'IP का उपयोग ट्रांज़िट में अनुमानित देश और शहर के लिए होता है; Google Analytics इसे लॉग करने से पहले हटा देता है।',
      'Analytics व ad storage, personalization और Google signals बंद रहते हैं; GA पहचान या विज्ञापन कुकी नहीं बनाता।',
      'ज़रूरी locale कुकी भाषा को एक साल याद रखती है। नोटिस, भाषा, रेसिपी और प्रगति केवल localStorage में रहती है।',
      'होस्टिंग प्रदाता साइट देने और सुरक्षित रखने के लिए IP व तकनीकी लॉग सीमित समय संसाधित कर सकता है।',
      'फ़ॉर्म हमारे सर्वर पर नहीं रहता; WhatsApp चुनने पर डेटा उसकी गोपनीयता शर्तों के तहत भेजा जाता है।',
    ],
  },
  bn: {
    title: 'অ্যানালিটিক্স, কুকি ও ডিভাইস স্টোরেজ',
    intro: 'সাইট খুললে সীমিত ও কুকিবিহীন Google Analytics পরিমাপ শুরু হয়। এটি বিজ্ঞাপন প্রোফাইল তৈরিতে ব্যবহৃত হয় না।',
    items: [
      'পেজ URL ও শিরোনাম, রেফারার, সময়, ভাষা, ব্রাউজার, OS, ডিভাইসের ধরন এবং ইন্টারঅ্যাকশন মাপা হয়।',
      'ট্রানজিটে IP দিয়ে আনুমানিক দেশ ও শহর নির্ধারণ করা হয়; লগ করার আগে Google Analytics এটি বাদ দেয়।',
      'Analytics ও ad storage, personalization এবং Google signals বন্ধ থাকে; GA পরিচয় বা বিজ্ঞাপন কুকি তৈরি করে না।',
      'প্রয়োজনীয় locale কুকি এক বছর ভাষা মনে রাখে। নোটিস, ভাষা, রেসিপি ও অগ্রগতি শুধু localStorage-এ থাকে।',
      'সাইট সরবরাহ ও নিরাপত্তার জন্য হোস্টিং প্রদানকারী সীমিত সময় IP ও প্রযুক্তিগত লগ প্রক্রিয়া করতে পারে।',
      'ফর্ম আমাদের সার্ভারে থাকে না; WhatsApp বাছলে তথ্য তার গোপনীয়তা নীতির অধীনে পাঠানো হয়।',
    ],
  },
};

export default function AnalyticsPrivacyDetails({ locale }: { locale: SiteLocale }) {
  const content = disclosureCopy[locale] ?? disclosureCopy.en;

  return (
    <>
      <p>{content.intro}</p>
      <ul className="prose-list list-disc">
        {content.items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </>
  );
}

export function getAnalyticsPrivacyTitle(locale: SiteLocale) {
  return (disclosureCopy[locale] ?? disclosureCopy.en).title;
}

export type CollectionLocale = 'az' | 'en';

export interface RecipeCollectionDefinition {
  slug: string;
  title: Record<CollectionLocale, string>;
  shortTitle: Record<CollectionLocale, string>;
  description: Record<CollectionLocale, string>;
  introduction: Record<CollectionLocale, string[]>;
  eyebrow: Record<CollectionLocale, string>;
  searchIntent: Record<CollectionLocale, string>;
  accent: 'terracotta' | 'forest' | 'saffron' | 'ink';
  recipeSlugs: string[];
  highlights: Record<CollectionLocale, Array<{ label: string; value: string }>>;
  faqs: Record<CollectionLocale, Array<{ question: string; answer: string }>>;
}

export const recipeCollections: RecipeCollectionDefinition[] = [
  {
    slug: 'rare-traditional-dishes',
    title: {
      en: 'Rare Traditional Dishes Worth Discovering',
      az: 'Kəşf etməyə dəyər nadir ənənəvi yeməklər',
    },
    shortTitle: { en: 'Hidden food gems', az: 'Gizli mətbəx inciləri' },
    description: {
      en: 'Ten regional recipes with real search interest and far less competition than the usual global classics.',
      az: 'Axtarış marağı olan, amma məşhur qlobal klassiklərdən daha az rəqabətli on bölgəvi resept.',
    },
    introduction: {
      en: [
        'Some dishes are famous at home yet almost invisible outside their region. This collection follows that gap: recipes people actively look for, without sending you back to the same familiar list of global classics.',
        'Expect cornmeal dumplings from Paraguay, pumpkin-seed sauce from Yucatán, Albanian yogurt-baked lamb and other dishes whose technique tells a story about place. Start with the flavour profile that sounds most surprising, then use the source notes on each recipe to explore further.',
      ],
      az: [
        'Bəzi yeməklər öz ölkəsində məşhurdur, amma bölgədən kənarda demək olar görünmür. Bu kolleksiya məhz həmin boşluğu izləyir: insanların axtardığı, lakin hər saytda təkrarlanmayan reseptlər.',
        'Paraqvay qarğıdalı kündələri, Yukatan balqabaq tumu sousu, Albaniya qatıq-qoyun əti soba yeməyi və məkanın hekayəsini daşıyan başqa texnikalarla tanış olun. Ən maraqlı dad profilindən başlayın və hər reseptdəki mənbələrlə mövzunu dərinləşdirin.',
      ],
    },
    eyebrow: { en: 'Editor’s research trail', az: 'Redaktorun araşdırma marşrutu' },
    searchIntent: { en: 'rare traditional food recipes', az: 'nadir ənənəvi yemək reseptləri' },
    accent: 'terracotta',
    recipeSlugs: [
      'vori-vori-paraguayan-chicken-soup',
      'papadzules-yucatan-egg-tacos',
      'tave-kosi-albanian-lamb-yogurt-bake',
      'sopa-de-mani-bolivian-peanut-soup',
      'llapingachos-ecuadorian-potato-cakes',
      'lablabi-tunisian-chickpea-soup',
      'piperade-basque-pepper-tomato-stew',
      'saltenas-bolivian-meat-pastries',
      'pakhala-bhata-odia-fermented-rice',
      'undhiyu-gujarati-winter-vegetable-stew',
    ],
    highlights: {
      en: [{ label: 'Countries', value: '9' }, { label: 'Recipes', value: '10' }, { label: 'Best for', value: 'Curious cooks' }],
      az: [{ label: 'Ölkə', value: '9' }, { label: 'Resept', value: '10' }, { label: 'Kimlər üçün', value: 'Maraqsevərlər' }],
    },
    faqs: {
      en: [
        { question: 'What makes a traditional dish “rare” here?', answer: 'It is regionally meaningful and has measurable discovery interest, but is covered by far fewer English-language recipe pages than mainstream dishes.' },
        { question: 'Are these simplified versions?', answer: 'The recipes keep the dish-defining technique and ingredients, while noting practical substitutions where a regional ingredient may be difficult to source.' },
      ],
      az: [
        { question: 'Burada yeməyi “nadir” edən nədir?', answer: 'Yemək öz bölgəsi üçün əhəmiyyətlidir və axtarış marağı var, amma məşhur yeməklərlə müqayisədə daha az saytda əhatə olunur.' },
        { question: 'Bunlar sadələşdirilmiş versiyalardır?', answer: 'Reseptlər yeməyi müəyyən edən əsas texnika və inqrediyentləri qoruyur, çətin tapılan bölgəvi məhsullar üçün praktik alternativlər göstərilir.' },
      ],
    },
  },
  {
    slug: 'world-comfort-soups',
    title: { en: 'World Comfort Soups Beyond the Usual Bowl', az: 'Adi seçimlərdən fərqli dünya şorbaları' },
    shortTitle: { en: 'World comfort soups', az: 'Dünya comfort şorbaları' },
    description: {
      en: 'Five deeply comforting soups built with chickpeas, peanuts, bread, grains and seasonal ritual.',
      az: 'Noxud, yer fıstığı, çörək, taxıl və mövsümi ənənələrlə hazırlanan beş doyumlu şorba.',
    },
    introduction: {
      en: [
        'Comfort soup is a global idea, but every kitchen builds comfort differently. Vori-vori thickens chicken broth with cheese-and-cornmeal dumplings; sopa de maní turns peanuts into a savoury base; açorda gives yesterday’s bread a fragrant second life.',
        'These recipes are useful entry points into unfamiliar cuisines because the format is recognisable while the flavours are not. Compare the thickening technique, garnish and balance of acidity as you cook across continents.',
      ],
      az: [
        'Doyumlu şorba qlobal anlayışdır, amma hər mətbəx rahatlıq hissini fərqli qurur. Vori-vori toyuq bulyonunu pendirli qarğıdalı kündələri ilə, sopa de maní yer fıstığı ilə qatılaşdırır, açorda isə dünənin çörəyinə ətirli ikinci həyat verir.',
        'Tanış format və yeni dadlar bu reseptləri fərqli mətbəxlərə yaxşı giriş nöqtəsinə çevirir. Bişirərkən qatılaşdırma texnikasını, qarniri və turşuluq balansını müqayisə edin.',
      ],
    },
    eyebrow: { en: 'Search-led collection', az: 'Axtarış yönümlü kolleksiya' },
    searchIntent: { en: 'unique comfort soup recipes', az: 'fərqli doyumlu şorba reseptləri' },
    accent: 'saffron',
    recipeSlugs: [
      'vori-vori-paraguayan-chicken-soup',
      'sopa-de-mani-bolivian-peanut-soup',
      'lablabi-tunisian-chickpea-soup',
      'fanesca-ecuadorian-easter-soup',
      'acorda-alentejana-portuguese-bread-soup',
    ],
    highlights: {
      en: [{ label: 'Continents', value: '3' }, { label: 'Recipes', value: '5' }, { label: 'Mood', value: 'Comforting' }],
      az: [{ label: 'Qitə', value: '3' }, { label: 'Resept', value: '5' }, { label: 'Əhval', value: 'Doyumlu' }],
    },
    faqs: {
      en: [
        { question: 'Which soup is quickest?', answer: 'Açorda alentejana takes about 35 minutes; lablabi follows at roughly 45 minutes.' },
        { question: 'Which recipes are naturally meat-free?', answer: 'Lablabi and açorda can be made vegetarian with vegetable broth. Always check every ingredient and garnish for your dietary needs.' },
      ],
      az: [
        { question: 'Ən tez hansı şorba hazırlanır?', answer: 'Açorda alentejana təxminən 35, lablabi isə 45 dəqiqəyə hazırlanır.' },
        { question: 'Hansı reseptlər ətsiz hazırlana bilər?', answer: 'Lablabi və açorda tərəvəz bulyonu ilə vegetarian hazırlana bilər. Pəhriz ehtiyacınıza görə bütün inqrediyent və qarnirləri ayrıca yoxlayın.' },
      ],
    },
  },
  {
    slug: 'cold-noodles-across-asia',
    title: { en: 'Cold Noodle Recipes Across Asia', az: 'Asiyanın soyuq əriştə reseptləri' },
    shortTitle: { en: 'Cold noodles', az: 'Soyuq əriştələr' },
    description: {
      en: 'Four cooling noodle traditions: nutty, creamy, springy and sharply dressed.',
      az: 'Dörd sərinləşdirici əriştə ənənəsi: qozlu, kremli, elastik və parlaq turşməzə dadlar.',
    },
    introduction: {
      en: [
        'Cold noodles are not one technique. Korean kongguksu uses chilled soy milk, Japanese hiyashi chūka layers bright toppings over springy noodles, and Xi’an liangpi depends on texture and a chilli-vinegar dressing.',
        'Use this collection as a temperature-and-texture guide. The recipes share a refreshing purpose, yet each one solves it with a completely different base, noodle and finishing sauce.',
      ],
      az: [
        'Soyuq əriştə tək texnika deyil. Koreya kongguksu soyuq soya südündən istifadə edir, Yapon hiyashi chūka elastik əriştəni parlaq qarnirlərlə birləşdirir, Sian liangpi isə tekstura və bibər-sirkə sousuna söykənir.',
        'Bu kolleksiyanı temperatur və tekstura bələdçisi kimi istifadə edin. Reseptlərin məqsədi eyni dərəcədə sərinləşdiricidir, amma baza, əriştə və son sous tamamilə fərqlidir.',
      ],
    },
    eyebrow: { en: 'Summer discovery trail', az: 'Yay kəşf marşrutu' },
    searchIntent: { en: 'Asian cold noodle recipes', az: 'Asiya soyuq əriştə reseptləri' },
    accent: 'forest',
    recipeSlugs: [
      'hiyashi-chuka-japanese-cold-noodles',
      'kongguksu-korean-soy-milk-noodles',
      'liangpi-xian-cold-skin-noodles',
      'num-banh-chok-cambodian-fish-noodles',
    ],
    highlights: {
      en: [{ label: 'Countries', value: '4' }, { label: 'Recipes', value: '4' }, { label: 'Season', value: 'Warm weather' }],
      az: [{ label: 'Ölkə', value: '4' }, { label: 'Resept', value: '4' }, { label: 'Mövsüm', value: 'İsti hava' }],
    },
    faqs: {
      en: [
        { question: 'Are all cold noodle recipes served icy?', answer: 'No. Some are thoroughly chilled, while others are served cool or at room temperature. Follow the individual recipe for the intended texture.' },
        { question: 'Which one is fastest?', answer: 'Hiyashi chūka is the quickest in this set at around 40 minutes when the toppings are prepared efficiently.' },
      ],
      az: [
        { question: 'Bütün soyuq əriştələr buz kimi servis edilir?', answer: 'Xeyr. Bəziləri tam soyudulur, digərləri sərin və ya otaq temperaturunda verilir. Düzgün tekstura üçün konkret resepti izləyin.' },
        { question: 'Ən sürətli hansıdır?', answer: 'Qarnirlər paralel hazırlandıqda hiyashi chūka bu kolleksiyada təxminən 40 dəqiqə ilə ən sürətli seçimdir.' },
      ],
    },
  },
  {
    slug: 'fermented-and-tangy-flavours',
    title: { en: 'Fermented and Tangy Flavours Around the World', az: 'Dünyanın fermentləşdirilmiş və turşməzə dadları' },
    shortTitle: { en: 'Fermented flavours', az: 'Ferment dadları' },
    description: {
      en: 'Rice, fish, yogurt and crisp salad traditions that turn time and acidity into flavour.',
      az: 'Zamanı və turşuluğu dada çevirən düyü, balıq, qatıq və xırtıldayan salat ənənələri.',
    },
    introduction: {
      en: [
        'Fermentation is not a single “funky” flavour. It can cool rice, deepen a fish mash, sharpen a yogurt-soaked bread salad or add savoury contrast to crisp rice. These dishes show how preservation techniques become everyday comfort food.',
        'Food-safety rules matter when working with fermented ingredients. Use clean equipment, respect the timing in each recipe and rely on properly prepared commercial ingredients whenever a traditional ferment is unfamiliar.',
      ],
      az: [
        'Fermentasiya tək bir “kəskin” dad demək deyil. Düyünü sərinləşdirə, balıq əzməsini dərinləşdirə, qatıqla isladılmış çörək salatını parlaqlaşdıra və xırtıldayan düyüyə umami kontrastı verə bilər.',
        'Fermentləşdirilmiş məhsullarda qida təhlükəsizliyi vacibdir. Təmiz avadanlıqdan istifadə edin, hər reseptdəki vaxta əməl edin və ənənəvi ferment tanış deyilsə, düzgün hazırlanmış kommersiya məhsulunu seçin.',
      ],
    },
    eyebrow: { en: '2026 flavour direction', az: '2026 dad istiqaməti' },
    searchIntent: { en: 'fermented food recipes around the world', az: 'dünya fermentləşdirilmiş yemək reseptləri' },
    accent: 'ink',
    recipeSlugs: [
      'pakhala-bhata-odia-fermented-rice',
      'eromba-manipuri-fermented-fish-mash',
      'nam-khao-lao-crispy-rice-salad',
      'qurutob-tajik-bread-yogurt-salad',
      'asam-pedas-malaysian-sour-spicy-fish',
    ],
    highlights: {
      en: [{ label: 'Regions', value: '5' }, { label: 'Recipes', value: '5' }, { label: 'Flavour', value: 'Tangy & savoury' }],
      az: [{ label: 'Bölgə', value: '5' }, { label: 'Resept', value: '5' }, { label: 'Dad', value: 'Turşməzə & umami' }],
    },
    faqs: {
      en: [
        { question: 'Do I need to ferment ingredients at home?', answer: 'Not always. Several dishes use a prepared fermented ingredient; pakhala bhata is the clearest example where resting the rice is part of the recipe itself.' },
        { question: 'Are fermented foods automatically probiotic?', answer: 'No. Cooking can reduce or remove live cultures, and not every fermented product contains proven probiotic strains.' },
      ],
      az: [
        { question: 'Məhsulları evdə fermentləşdirmək lazımdır?', answer: 'Həmişə yox. Bir neçə yemək hazır ferment məhsulundan istifadə edir; düyünün dincəlməsi reseptin hissəsi olan ən aydın nümunə pakhala bhatadır.' },
        { question: 'Bütün ferment qidalar avtomatik probiotikdir?', answer: 'Xeyr. Bişirmə canlı mədəniyyətləri azalda və ya yox edə bilər, hər ferment məhsulunda sübut olunmuş probiotik ştammlar olmur.' },
      ],
    },
  },
  {
    slug: 'global-recipes-under-60-minutes',
    title: { en: 'Global Recipes Ready in 60 Minutes or Less', az: '60 dəqiqəyə hazır qlobal reseptlər' },
    shortTitle: { en: 'Under 60 minutes', az: '60 dəqiqədən az' },
    description: {
      en: 'Fast regional cooking without flattening every dish into the same weeknight formula.',
      az: 'Hər yeməyi eyni gündəlik formulaya salmadan sürətli bölgəvi bişirmə.',
    },
    introduction: {
      en: [
        'Fast food at home can still have a strong sense of place. This set ranges from Japanese tea rice and Greek tomato eggs to Tunisian chickpea soup and Sardinian clam pasta.',
        'Times assume ingredients are measured before cooking. Read the recipe once, prepare garnishes early and choose the 20–30 minute dishes when speed matters more than a long simmer.',
      ],
      az: [
        'Evdə sürətli hazırlanan yemək də məkan hissini qoruya bilər. Bu seçki Yapon çaylı düyüsündən Yunan pomidorlu yumurtasına, Tunis noxud şorbasından Sardiniya midiyalı pastasına qədər uzanır.',
        'Vaxt inqrediyentlərin əvvəlcədən ölçüldüyünü nəzərdə tutur. Resepti bir dəfə tam oxuyun, qarnirləri əvvəl hazırlayın və sürət əsasdırsa 20–30 dəqiqəlik seçimlərə başlayın.',
      ],
    },
    eyebrow: { en: 'Weeknight passport', az: 'Gündəlik mətbəx pasportu' },
    searchIntent: { en: 'easy global recipes under 60 minutes', az: '60 dəqiqəyə asan dünya yeməkləri' },
    accent: 'saffron',
    recipeSlugs: [
      'ochazuke-japanese-tea-rice',
      'strapatsada-greek-tomato-eggs',
      'conchitas-a-la-parmesana-peruvian-scallops',
      'banosh-ukrainian-carpathian-cornmeal',
      'acorda-alentejana-portuguese-bread-soup',
      'hiyashi-chuka-japanese-cold-noodles',
      'lablabi-tunisian-chickpea-soup',
      'shiro-wat-ethiopian-chickpea-stew',
      'fregola-con-arselle-sardinian-clam-pasta',
      'asam-pedas-malaysian-sour-spicy-fish',
      'mie-aceh-indonesian-spicy-noodles',
    ],
    highlights: {
      en: [{ label: 'Countries', value: '10' }, { label: 'Recipes', value: '11' }, { label: 'Maximum', value: '60 min' }],
      az: [{ label: 'Ölkə', value: '10' }, { label: 'Resept', value: '11' }, { label: 'Maksimum', value: '60 dəq' }],
    },
    faqs: {
      en: [
        { question: 'Does the timing include preparation?', answer: 'The displayed time is the recipe’s total working estimate unless the recipe explicitly mentions soaking or resting.' },
        { question: 'Which recipes are easiest for a first attempt?', answer: 'Ochazuke, strapatsada, açorda and lablabi use straightforward methods and flexible finishing garnishes.' },
      ],
      az: [
        { question: 'Göstərilən vaxta hazırlıq daxildir?', answer: 'Resept ayrıca islatma və ya dincəlmə göstərmirsə, ekrandakı vaxt ümumi iş müddətinin təxminidir.' },
        { question: 'İlk cəhd üçün hansılar daha asandır?', answer: 'Ochazuke, strapatsada, açorda və lablabi sadə texnika və çevik qarnirlərlə hazırlanır.' },
      ],
    },
  },
  {
    slug: 'chickpea-recipes-around-the-world',
    title: { en: 'Chickpea Recipes from Tunisia to Ethiopia', az: 'Tunisdən Efiopiyaya noxud reseptləri' },
    shortTitle: { en: 'Chickpeas, differently', az: 'Noxud, fərqli şəkildə' },
    description: {
      en: 'See how one pantry staple becomes soup, silky stew and a foundation for bold regional seasoning.',
      az: 'Eyni mətbəx məhsulunun şorba, ipək kimi güveç və güclü bölgəvi ədviyyat bazasına çevrilməsi.',
    },
    introduction: {
      en: [
        'Chickpeas travel well across cuisines because they carry spice, acidity and fat without losing their own nutty character. Tunisian lablabi keeps the chickpeas whole in a bread-thickened soup; Ethiopian shiro wat turns chickpea flour into a smooth, berbere-led stew.',
        'The collection is intentionally compact. It compares two highly distinct techniques instead of padding the page with recipes where chickpeas play only a minor role.',
      ],
      az: [
        'Noxud öz qozlu xarakterini itirmədən ədviyyat, turşuluq və yağı daşıdığı üçün müxtəlif mətbəxlərdə rahat işləyir. Tunis lablabi noxudu çörəklə qatılaşdırılmış şorbada bütöv saxlayır; Efiopiya shiro wat isə noxud ununu berbere əsaslı hamar güveçə çevirir.',
        'Kolleksiya bilərəkdən yığcamdır. Noxudun kiçik rol oynadığı reseptlərlə səhifəni doldurmaq əvəzinə iki tam fərqli texnikanı müqayisə edir.',
      ],
    },
    eyebrow: { en: 'Ingredient deep dive', az: 'İnqrediyentə dərin baxış' },
    searchIntent: { en: 'unique chickpea recipes', az: 'fərqli noxud reseptləri' },
    accent: 'forest',
    recipeSlugs: ['lablabi-tunisian-chickpea-soup', 'shiro-wat-ethiopian-chickpea-stew'],
    highlights: {
      en: [{ label: 'Countries', value: '2' }, { label: 'Recipes', value: '2' }, { label: 'Time', value: '45 min each' }],
      az: [{ label: 'Ölkə', value: '2' }, { label: 'Resept', value: '2' }, { label: 'Vaxt', value: 'Hər biri 45 dəq' }],
    },
    faqs: {
      en: [
        { question: 'Can canned chickpeas be used for lablabi?', answer: 'Yes. Rinse them well and simmer long enough for the broth to take on their flavour; dried chickpeas usually provide a fuller cooking liquid.' },
        { question: 'Is shiro wat made with whole chickpeas?', answer: 'It is traditionally based on finely milled chickpea or broad-bean flour, which gives the stew its smooth body.' },
      ],
      az: [
        { question: 'Lablabi üçün konserv noxud istifadə etmək olar?', answer: 'Bəli. Yaxşı yuyun və bulyonun dadı oturuşana qədər bişirin; quru noxud adətən daha dolğun bişirmə suyu verir.' },
        { question: 'Shiro wat bütöv noxudla hazırlanır?', answer: 'Ənənəvi olaraq güveçə hamar quruluş verən çox incə çəkilmiş noxud və ya paxla unundan hazırlanır.' },
      ],
    },
  },
];

export function getRecipeCollection(slug: string) {
  return recipeCollections.find((collection) => collection.slug === slug);
}

export function getCollectionsPath(locale: CollectionLocale) {
  return locale === 'az' ? '/kolleksiyalar' : '/en/collections';
}

export function getCollectionPath(locale: CollectionLocale, slug: string) {
  return `${getCollectionsPath(locale)}/${slug}`;
}

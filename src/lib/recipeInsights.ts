export interface RecipeInsightLocale {
  taste: string;
  technique: string;
  substitution: string;
  avoid: string;
  storage: string;
}

export interface RecipeInsight {
  en: RecipeInsightLocale;
  az: RecipeInsightLocale;
}

const recipeInsights: Record<string, RecipeInsight> = {
  'vori-vori-paraguayan-chicken-soup': {
    en: {
      taste: 'Vori-vori is savoury and deeply chicken-forward, with gentle oregano and a soft dairy richness from the cheese-and-cornmeal dumplings.',
      technique: 'Moisten the cornmeal gradually with hot broth. The dough should hold a marble-size ball without cracking, yet remain soft enough to cook tender.',
      substitution: 'Use a mild, firm cow’s-milk cheese that can be finely crumbled when Paraguayan cheese is unavailable; avoid very salty aged cheese.',
      avoid: 'Do not boil aggressively after adding the dumplings. A steady simmer keeps them intact and prevents the outside from breaking before the centre cooks.',
      storage: 'Refrigerate for up to 3 days. Reheat gently with a splash of water because the dumplings continue to thicken the broth.',
    },
    az: {
      taste: 'Vori-vori güclü toyuq dadı, yüngül mərzə ətri və pendirli qarğıdalı kündələrindən gələn yumşaq süd zənginliyi ilə doyumlu şorbadır.',
      technique: 'Qarğıdalı ununu isti bulyonla tədricən nəmləndirin. Xəmir çatlamadan mərmər boyda top tutmalı, amma yumşaq bişəcək qədər zərif qalmalıdır.',
      substitution: 'Paraqvay pendiri tapılmırsa, incə ovulan yumşaq dadlı bərk inək pendiri seçin; çox duzlu yaşlı pendirdən qaçın.',
      avoid: 'Kündələri əlavə etdikdən sonra güclü qaynatmayın. Sabit zəif qaynama onların içi bişənə qədər bütöv qalmasına kömək edir.',
      storage: 'Soyuducuda 3 gün saxlayın. Kündələr bulyonu qatılaşdırmağa davam etdiyi üçün az su əlavə edib zəif odda qızdırın.',
    },
  },
  'papadzules-yucatan-egg-tacos': {
    en: {
      taste: 'Papadzules balance a nutty, creamy pumpkin-seed sauce with mild egg filling and the bright acidity and heat of roasted tomato-habanero sauce.',
      technique: 'Blend the seeds while warm liquid is added gradually, then keep the sauce below a hard boil. Excess heat can make the seed sauce grainy or oily.',
      substitution: 'Epazote has a distinctive flavour; if it is unavailable, use a small amount of coriander stem and oregano as a practical—not identical—alternative.',
      avoid: 'Do not leave tortillas dry and cold. Warm them and coat them briefly in sauce so they roll without cracking.',
      storage: 'Store the sauces, eggs and tortillas separately for up to 2 days. Assemble just before serving so the tortillas do not become heavy.',
    },
    az: {
      taste: 'Papadzules qozlu-kremli balqabaq tumu sousunu yumşaq yumurta içliyi və qovrulmuş pomidor-habanero sousunun turşuluq-acılığı ilə balanslaşdırır.',
      technique: 'İlıq mayeni tədricən əlavə edərək tumları blenderdən keçirin və sousu güclü qaynatmayın. Artıq istilik sousu dənəli və yağlı edə bilər.',
      substitution: 'Epazotenin dadı unikaldır; tapılmırsa az miqdarda keşniş saplağı və mərzə praktik, amma tam eyni olmayan alternativdir.',
      avoid: 'Tortillanı soyuq və quru bükməyin. Çatlamaması üçün qızdırın və qısa müddət sousla örtün.',
      storage: 'Sous, yumurta və tortillanı ayrı-ayrı 2 gün saxlayın. Tortillanın ağırlaşmaması üçün servisdən əvvəl yığın.',
    },
  },
  'tave-kosi-albanian-lamb-yogurt-bake': {
    en: {
      taste: 'Tavë kosi is rich but tangy: tender lamb and rice sit under a lightly sour, savoury yogurt-and-egg custard with a browned top.',
      technique: 'Use full-fat yogurt and let the cooked flour mixture cool slightly before whisking it with yogurt and eggs. This gives the topping a smoother set.',
      substitution: 'Lamb shoulder gives the characteristic flavour, but goat or a well-marbled cut of beef can follow the same method with adjusted cooking time.',
      avoid: 'Do not pour cold yogurt mixture over fiercely bubbling fat. Extreme temperature contrast encourages curdling instead of a fine custard.',
      storage: 'Cool promptly and refrigerate for up to 3 days. Reheat covered at a moderate temperature so the yogurt layer does not dry out.',
    },
    az: {
      taste: 'Tavë kosi zəngin, amma turşməzədir: yumşaq qoyun əti və düyü qızarmış üstlü qatıq-yumurta kremi altında bişir.',
      technique: 'Tam yağlı qatıq istifadə edin və bişmiş un qarışığını qatıq-yumurta ilə çalmazdan əvvəl azca soyudun. Bu, üst qata daha hamar quruluş verir.',
      substitution: 'Qoyun çiyni xarakterik dad verir; keçi əti və ya yağlı mal əti də bişmə vaxtı uyğunlaşdırılmaqla eyni texnikada işləyə bilər.',
      avoid: 'Soyuq qatıq qarışığını çox isti, qaynayan yağın üzərinə tökməyin. Kəskin temperatur fərqi hamar krem əvəzinə kəsilmə yaradır.',
      storage: 'Tez soyudub 3 günədək soyuducuda saxlayın. Qatıq qatının qurumaması üçün orta temperaturda üstü örtülü qızdırın.',
    },
  },
  'sopa-de-mani-bolivian-peanut-soup': {
    en: {
      taste: 'Sopa de maní is creamy without dairy, with roasted-nut depth, savoury beef broth, sweet vegetables and crisp potato garnish.',
      technique: 'Blend soaked raw peanuts until completely smooth and stir the pot regularly during the long simmer; the dense purée settles easily.',
      substitution: 'Unsweetened natural peanut butter can work in a pinch, but start with less and check the label for added sugar, salt or stabilisers.',
      avoid: 'Do not use roasted salted snack peanuts as a direct swap. Their seasoning and stronger roast can dominate the broth.',
      storage: 'Refrigerate the soup for up to 3 days and keep fried potato garnish separate. Loosen with stock or water when reheating.',
    },
    az: {
      taste: 'Sopa de maní süd məhsulu olmadan kremli, qovrulmuş yer fıstığı dərinliyi, ətli bulyon, şirin tərəvəz və xırtıldayan kartof qarniri ilə balanslıdır.',
      technique: 'İsladılmış çiy fıstığı tam hamar olana qədər blenderdən keçirin və uzun bişmə zamanı qazanı tez-tez qarışdırın; sıx püre dibə çökür.',
      substitution: 'Çarəsiz halda şəkərsiz təbii fıstıq əzməsi işləyə bilər, amma az miqdardan başlayın və etiketdə şəkər, duz, stabilizator olub-olmadığını yoxlayın.',
      avoid: 'Duzlu qovrulmuş qəlyanaltı fıstığını birbaşa əvəz kimi işlətməyin. Güclü qovrulma və duz bulyonu üstələyə bilər.',
      storage: 'Şorbanı 3 gün soyuducuda saxlayın, qızardılmış kartofu ayrı tutun. Qızdırarkən bulyon və ya su ilə duruldun.',
    },
  },
  'llapingachos-ecuadorian-potato-cakes': {
    en: {
      taste: 'Llapingachos have a crisp achiote-scented crust, a soft potato centre and pockets of melted cheese, usually balanced by fresh curtido and peanut sauce.',
      technique: 'Let the seasoned mash cool before shaping. Resting firms the starch enough for the cakes to hold together in the pan.',
      substitution: 'Choose a low-moisture melting cheese such as mozzarella or young gouda when Ecuadorian quesillo is not available.',
      avoid: 'Do not move the cakes too early. Wait for a real crust to form, then turn once with a broad spatula.',
      storage: 'Shape and refrigerate uncooked cakes for up to 24 hours, separated by parchment. Cooked cakes reheat best in a lightly oiled pan.',
    },
    az: {
      taste: 'Llapingachos xırtıldayan achiote ətirli qabıq, yumşaq kartof içi və ərimiş pendir ciblərini təzə curtido və fıstıq sousu ilə balanslaşdırır.',
      technique: 'Forma verməzdən əvvəl ədviyyatlı kartof püresini soyudun. Dincəlmə nişastanı tavada dağılmayacaq qədər bərkidir.',
      substitution: 'Ekvador quesillo pendiri yoxdursa, mozzarella və ya gənc gouda kimi az nəmli əriyən pendir seçin.',
      avoid: 'Kökləri tez tərpətməyin. Həqiqi qabıq yaranana qədər gözləyin, sonra geniş spatula ilə bir dəfə çevirin.',
      storage: 'Bişməmiş kökləri perqamentlə ayıraraq 24 saat soyuducuda saxlayın. Bişmiş köklər az yağlı tavada daha yaxşı qızır.',
    },
  },
  'lablabi-tunisian-chickpea-soup': {
    en: {
      taste: 'Lablabi is earthy and garlicky, sharpened with lemon and harissa, with bread turning the chickpea broth into a hearty, spoonable meal.',
      technique: 'Keep the broth slightly looser than you want before it hits the bowl. Torn bread absorbs liquid quickly and controls the final thickness.',
      substitution: 'Canned chickpeas save time; rinse them, then simmer in seasoned broth long enough for the beans and liquid to taste connected.',
      avoid: 'Do not add all the harissa and lemon to the pot at once. Serving them at the table lets each bowl keep its balance.',
      storage: 'Refrigerate chickpeas and broth together for up to 4 days, but add bread, egg and garnishes only when serving.',
    },
    az: {
      taste: 'Lablabi torpaqvari noxud və sarımsaq dadını limon-harissa ilə parlaqlaşdırır, çörək isə bulyonu doyumlu qaşıq yeməyinə çevirir.',
      technique: 'Bulyonu kasada istədiyinizdən bir qədər duru saxlayın. Qoparılmış çörək mayeni sürətlə çəkir və son qatılığı müəyyən edir.',
      substitution: 'Konserv noxud vaxta qənaət edir; yuyun və noxudla bulyonun dadı birləşənə qədər ədviyyatlı mayedə bişirin.',
      avoid: 'Bütün harissa və limonu qazana birdən əlavə etməyin. Masada servis etmək hər kasanın balansını qoruyur.',
      storage: 'Noxud və bulyonu birlikdə 4 gün saxlayın, amma çörək, yumurta və qarnirləri yalnız servis zamanı əlavə edin.',
    },
  },
  'piperade-basque-pepper-tomato-stew': {
    en: {
      taste: 'Piperade is sweet from slowly softened peppers and onion, bright from tomato and gently warm rather than aggressively hot.',
      technique: 'Cook the peppers and onion until fully soft before adding eggs. The vegetables are the sauce; rushing them leaves a watery, raw-tasting base.',
      substitution: 'Use a mix of sweet red and green peppers. A small pinch of mild smoked paprika can add depth when Espelette pepper is unavailable.',
      avoid: 'If adding eggs, keep the heat low and stop while they are still glossy. Residual heat finishes them without making the dish dry.',
      storage: 'The pepper-tomato base keeps for 4 days refrigerated. Add freshly cooked eggs after reheating the base for the best texture.',
    },
    az: {
      taste: 'Piperade yavaş yumşalmış bibər-soğandan şirin, pomidordan parlaq və kəskin acı deyil, yüngül isti dada malikdir.',
      technique: 'Yumurta əlavə etməzdən əvvəl bibər-soğanı tam yumşaldın. Tərəvəzlər sousun özüdür; tələsmək sulu və çiy dadlı baza yaradır.',
      substitution: 'Şirin qırmızı və yaşıl bibər qarışığı istifadə edin. Espelette yoxdursa azca yumşaq hisə verilmiş paprika dərinlik verə bilər.',
      avoid: 'Yumurta əlavə edirsinizsə, odu zəif saxlayın və yumurtalar hələ parlaq ikən dayandırın. Qalıq istilik qurumadan bişirməni tamamlayır.',
      storage: 'Bibər-pomidor bazası soyuducuda 4 gün qalır. Ən yaxşı tekstura üçün bazanı qızdırıb təzə yumurta əlavə edin.',
    },
  },
  'saltenas-bolivian-meat-pastries': {
    en: {
      taste: 'Salteñas combine a lightly sweet, golden pastry with a savoury, gently spicy and famously juicy meat filling.',
      technique: 'Chill the cooked filling until its natural gelatin and starch set firmly. Cold filling is the key to sealing a pastry that bakes juicy rather than leaking.',
      substitution: 'A concentrated homemade stock gives the best set; powdered gelatin can support a weak stock, but should not make the filling rubbery.',
      avoid: 'Do not overfill or let sauce touch the sealing edge. Keep the rim clean, press out air and crimp firmly.',
      storage: 'Freeze shaped unbaked pastries on a tray, then bag them for up to 2 months. Bake from frozen with extra time rather than thawing fully.',
    },
    az: {
      taste: 'Salteñas yüngül şirin qızılı xəmiri duzlu, azca acılı və məşhur dərəcədə şirəli ət içliyi ilə birləşdirir.',
      technique: 'Bişmiş içliyi təbii jelatin və nişasta bərkiyənə qədər soyudun. Soyuq içlik axmadan şirəli bişən xəmirin əsas sirridir.',
      substitution: 'Qatı ev bulyonu ən yaxşı nəticəni verir; zəif bulyona azca jelatin kömək edə bilər, amma içlik rezinləşməməlidir.',
      avoid: 'Həddən artıq doldurmayın və sousun bağlanan kənara dəyməsinə imkan verməyin. Kənarı təmiz saxlayın, havanı çıxarın və möhkəm bükün.',
      storage: 'Forma verilmiş bişməmiş piroqları tavada dondurub 2 ay paketdə saxlayın. Tam əritmək əvəzinə əlavə vaxtla donmuş halda bişirin.',
    },
  },
  'pakhala-bhata-odia-fermented-rice': {
    en: {
      taste: 'Pakhala bhata is cooling, lightly sour and rice-forward, with yogurt, herbs, fried sides and mustard-led tempering adding contrast.',
      technique: 'Use clean utensils and potable water, and keep the rice protected while it rests. In warm kitchens, controlled refrigeration is the safer choice.',
      substitution: 'Plain unsweetened yogurt can supply acidity when a long rest is impractical, though it does not recreate the same fermented character.',
      avoid: 'Discard rice with an unpleasant odour, visible mould or unusual colour. Fermentation should never be used to rescue rice handled unsafely.',
      storage: 'Treat cooked rice carefully: cool promptly, refrigerate and consume within a short window. Do not repeatedly return warmed portions to storage.',
    },
    az: {
      taste: 'Pakhala bhata sərinləşdirici, yüngül turş və düyü əsaslıdır; qatıq, göyərti, qızardılmış əlavələr və xardal temperi kontrast verir.',
      technique: 'Təmiz qab və içməli su istifadə edin, dincələn düyünü qoruyun. İsti mətbəxdə nəzarətli soyuducu daha təhlükəsiz seçimdir.',
      substitution: 'Uzun dincəlmə praktik deyilsə, şəkərsiz sadə qatıq turşuluq verə bilər, amma eyni ferment xarakterini tam yaratmır.',
      avoid: 'Pis qoxu, görünən kif və qəribə rəng olan düyünü atın. Fermentasiya təhlükəsiz saxlanmamış düyünü xilas etmək üsulu deyil.',
      storage: 'Bişmiş düyünü tez soyudun, soyuducuda saxlayın və qısa müddətdə istifadə edin. Qızdırılmış porsiyanı təkrar soyuducuya qaytarmayın.',
    },
  },
  'undhiyu-gujarati-winter-vegetable-stew': {
    en: {
      taste: 'Undhiyu is layered and aromatic: earthy roots, sweet green vegetables, coconut, herbs and fenugreek dumplings meet warm spice and gentle sweetness.',
      technique: 'Stage vegetables by density instead of adding everything together. Firm roots need a head start; tender beans and dumplings should keep their shape.',
      substitution: 'Use the freshest mix of seasonal roots, beans and small aubergines available. The layered method matters more than forcing one unavailable vegetable.',
      avoid: 'Do not stir hard once the pot is layered. Turn ingredients gently so the vegetables and muthiya dumplings remain distinct.',
      storage: 'Refrigerate for up to 3 days. Reheat slowly with a spoonful of water; high heat can break the vegetables and make the coconut mixture catch.',
    },
    az: {
      taste: 'Undhiyu qatlı və ətirlidir: torpaqvari kök tərəvəzlər, şirin yaşıl tərəvəz, kokos, göyərti və fenugreek kündələri isti ədviyyatla birləşir.',
      technique: 'Hər şeyi eyni anda əlavə etmək əvəzinə tərəvəzləri sıxlığına görə mərhələləyin. Bərk köklər əvvəl, zərif lobya və kündələr sonra bişməlidir.',
      substitution: 'Mövsümdə olan ən təzə kök, lobya və kiçik badımcan qarışığını seçin. Tapılmayan bir tərəvəzi məcbur etməkdənsə qatlı üsul daha vacibdir.',
      avoid: 'Qazan qatlandıqdan sonra sərt qarışdırmayın. Tərəvəz və muthiya kündələrinin formasını qorumaq üçün yumşaq çevirin.',
      storage: 'Soyuducuda 3 gün saxlayın. Bir qaşıq su ilə yavaş qızdırın; güclü istilik tərəvəzi dağıda və kokos qarışığını dibə yapışdıra bilər.',
    },
  },
  'musakhan-palestinian-sumac-chicken': {
    en: {
      taste: 'Musakhan is savoury, fruity-tart and deeply aromatic: sumac brightens roasted chicken while olive-oil-softened onions soak into the flatbread below.',
      technique: 'Cook the onions slowly until completely collapsed but not crisp. Their oil becomes the seasoning for the bread, so softness and sweetness matter more than browning.',
      substitution: 'A sturdy large flatbread can replace taboon when necessary. Warm it first so it absorbs onion oil without splitting or turning brittle.',
      avoid: 'Do not assemble too early. Layer the warm bread, onions and chicken shortly before the final bake so the base stays rich rather than wet and heavy.',
      storage: 'Refrigerate chicken and onion mixture for up to 3 days. Store bread separately and rebuild the layers before reheating in the oven.',
    },
    az: {
      taste: 'Musakhan duzlu, meyvəvari turş və ətirlidir: sumaq qızarmış toyuğu parlaqlaşdırır, zeytun yağında yumşalmış soğan altdakı çörəyə hopur.',
      technique: 'Soğanı xırtıldatmadan tam çökənə qədər zəif odda bişirin. Onun yağı çörəyin ədviyyatına çevrildiyi üçün qızarmaqdan çox yumşaqlıq və şirinlik vacibdir.',
      substitution: 'Taboon tapılmırsa, möhkəm böyük yastı çörək istifadə edin. Yağı çatlamadan çəkməsi üçün əvvəlcə azca qızdırın.',
      avoid: 'Çox erkən yığmayın. Çörək, soğan və toyuğu son sobadan az əvvəl qatlayın ki, baza ağır və yaş olmasın.',
      storage: 'Toyuq-soğan qarışığını 3 gün soyuducuda, çörəyi ayrı saxlayın. Sobada qızdırmazdan əvvəl qatları yenidən yığın.',
    },
  },
  'fregola-con-arselle-sardinian-clam-pasta': {
    en: {
      taste: 'Toasted fregola brings a nutty chew to briny clam liquor, sweet collapsed tomatoes, garlic and a fresh lift of parsley and lemon zest.',
      technique: 'Strain the clam liquor carefully, then add it and hot stock gradually. Fregola should finish al dente and slightly brothy rather than dry like a pilaf.',
      substitution: 'Small toasted pasta or Israeli couscous can imitate the shape, but toast it lightly first; the result is practical rather than traditionally Sardinian.',
      avoid: 'Discard clams that remain closed after cooking and do not return the opened clams too early. Two final minutes are enough to warm them without toughness.',
      storage: 'Seafood pasta is best served immediately. Refrigerate leftovers promptly for no more than 1 day and reheat gently with a little stock.',
    },
    az: {
      taste: 'Qovrulmuş fregola qozlu teksturanı duzlu midiya suyu, yumşalmış şirin pomidor, sarımsaq, cəfəri və limon qabığı ilə birləşdirir.',
      technique: 'Midiya suyunu diqqətlə süzün, sonra isti bulyonla birlikdə mərhələli əlavə edin. Fregola plov kimi quru deyil, al dente və azca sulu bitməlidir.',
      substitution: 'Kiçik qovrulmuş pasta və ya İsrail kuskusu formanı təqlid edə bilər; əvvəlcə yüngül qovurun. Nəticə praktikdir, amma ənənəvi Sardiniya versiyası deyil.',
      avoid: 'Bişəndən sonra bağlı qalan midiyaları atın və açılmış midiyaları tez qaytarmayın. Sərtləşmədən isinməsi üçün son iki dəqiqə kifayətdir.',
      storage: 'Dəniz məhsullu pasta dərhal servis ediləndə ən yaxşıdır. Qalığı tez soyudub ən çox 1 gün saxlayın və az bulyonla yumşaq qızdırın.',
    },
  },
  'strapatsada-greek-tomato-eggs': {
    en: {
      taste: 'Strapatsada is juicy and savoury, with concentrated ripe tomato, softly set eggs, salty feta and the herbal edge of oregano.',
      technique: 'Reduce the grated tomatoes until their watery phase has mostly disappeared before adding eggs. This keeps the finished scramble creamy, not soupy.',
      substitution: 'Use well-drained canned whole tomatoes outside tomato season. Crush them finely and allow extra reduction time before the eggs go in.',
      avoid: 'Do not cook the eggs until they look fully dry in the pan. Fold slowly over low heat and stop while glossy; residual heat completes the set.',
      storage: 'The tomato base can be refrigerated for 3 days. For the best texture, reheat the base and add fresh eggs only when serving.',
    },
    az: {
      taste: 'Strapatsada qatılaşmış yetişmiş pomidor, yumşaq yumurta, duzlu feta və mərzənin ot ətrini birləşdirən şirəli gündəlik yeməkdir.',
      technique: 'Yumurta əlavə etməzdən əvvəl sürtgəcdən keçirilmiş pomidorun sulu hissəsini əsasən buxarlandırın. Beləliklə nəticə sulu yox, kremli qalır.',
      substitution: 'Pomidor mövsümü deyilsə, yaxşı süzülmüş bütöv konserv pomidor istifadə edin. Xırda əzin və yumurtadan əvvəl daha uzun qatılaşdırın.',
      avoid: 'Yumurtanı tavada tam quru görünənə qədər bişirməyin. Zəif odda yavaş qatlayın və hələ parlaq ikən dayandırın; qalıq istilik bişirməni tamamlayır.',
      storage: 'Pomidor bazasını 3 gün soyuducuda saxlamaq olar. Ən yaxşı tekstura üçün bazanı qızdırıb yumurtanı yalnız servis zamanı əlavə edin.',
    },
  },
  'shiro-wat-ethiopian-chickpea-stew': {
    en: {
      taste: 'Shiro wat is smooth, earthy and warmly spiced, with chickpea flour carrying the heat of berbere and the round richness of niter kibbeh.',
      technique: 'Whisk the flour with cool water first, then stream the slurry into the onion base. Frequent stirring during the simmer prevents lumps and scorching.',
      substitution: 'Finely milled plain chickpea flour works when a seasoned shiro blend is unavailable; adjust berbere and salt gradually because blends vary widely.',
      avoid: 'Do not rush the flour. A raw pulse taste means it needs more gentle simmering, while very high heat can catch the thick stew on the base of the pot.',
      storage: 'Refrigerate for up to 4 days. It thickens substantially when cold, so loosen slowly with hot water while reheating and stir from the bottom.',
    },
    az: {
      taste: 'Shiro wat hamar, torpaqvari və isti ədviyyatlıdır; noxud unu berberenin acısını və niter kibbeh yağının yumşaq zənginliyini daşıyır.',
      technique: 'Unu əvvəlcə soyuq su ilə çalın, sonra məhlulu soğan bazasına nazik axınla əlavə edin. Bişmə zamanı tez-tez qarışdırmaq topaq və yanmanın qarşısını alır.',
      substitution: 'Hazır ədviyyatlı shiro qarışığı yoxdursa, incə çəkilmiş sadə noxud unu işləyir; qarışıqlar çox fərqləndiyi üçün berbere və duzu tədricən artırın.',
      avoid: 'Unu tələsdirməyin. Çiy paxla dadı daha çox zəif qaynama tələb edir, çox güclü istilik isə qatı güveci qazanın dibində yandıra bilər.',
      storage: 'Soyuducuda 4 gün saxlayın. Soyuyanda xeyli qatılaşır; qızdırarkən isti suyu yavaş əlavə edib dibdən qarışdırın.',
    },
  },
  'acorda-alentejana-portuguese-bread-soup': {
    en: {
      taste: 'Açorda alentejana is garlic-forward, grassy with coriander and rich with olive oil, while vinegar and a soft poached egg keep the bread broth lively.',
      technique: 'Pound garlic, coriander stems and salt into a paste directly for the bowls. Pouring very hot broth over it releases aroma without dulling the fresh herb character.',
      substitution: 'A day-old open-crumb country loaf is ideal. If using fresh bread, dry the slices briefly in a low oven so they absorb broth without dissolving immediately.',
      avoid: 'Do not boil the herb paste for a long time or flood every bowl at once. Assemble to order so the bread softens but retains a little structure.',
      storage: 'Store broth and herb paste separately for up to 2 days. Poach fresh eggs and add bread only when serving; assembled açorda does not reheat well.',
    },
    az: {
      taste: 'Açorda alentejana sarımsaq önlü, keşnişdən yaşıl ətirli və zeytun yağı ilə zəngindir; sirkə və yumşaq poşe yumurta çörəkli bulyonu canlı saxlayır.',
      technique: 'Sarımsaq, keşniş saplağı və duzu kasalar üçün əzmə halına gətirin. Çox isti bulyonu üstünə tökmək təzə ot dadını öldürmədən ətri açır.',
      substitution: 'Bir günlük məsaməli kənd çörəyi idealdır. Təzə çörəkdirsə, bulyonu dərhal dağılmadan çəkməsi üçün dilimləri zəif sobada azca qurudun.',
      avoid: 'Göyərti əzməsini uzun qaynatmayın və bütün kasaları əvvəlcədən doldurmayın. Çörəyin yumşalıb bir qədər quruluş saxlaması üçün sifarişlə yığın.',
      storage: 'Bulyon və göyərti əzməsini ayrı-ayrı 2 gün saxlayın. Yumurta və çörəyi yalnız servisdə əlavə edin; yığılmış açorda yaxşı qızmır.',
    },
  },
  'hiyashi-chuka-japanese-cold-noodles': {
    en: {
      taste: 'Hiyashi chūka balances springy chilled noodles with sweet-sour soy dressing, sesame aroma and clean bands of cucumber, tomato, egg and chicken.',
      technique: 'Rinse the cooked noodles very thoroughly in cold water, rubbing gently to remove surface starch, then drain well so the dressing stays bright rather than diluted.',
      substitution: 'Fresh ramen gives the intended bounce; thin wheat noodles can work if cooked just firm and chilled immediately, though the texture will differ.',
      avoid: 'Do not dress the noodles long before eating. Keep dressing, noodles and toppings chilled separately and combine at the table to prevent softness and pooling liquid.',
      storage: 'Prepare dressing and toppings up to 2 days ahead. Cooked noodles are best the same day; toss with a trace of neutral oil if they must wait briefly.',
    },
    az: {
      taste: 'Hiyashi chūka elastik soyuq əriştəni şirin-turş soya sousu, küncüt ətri və xiyar, pomidor, yumurta, toyuğun təmiz zolaqları ilə balanslaşdırır.',
      technique: 'Bişmiş əriştəni səth nişastası çıxana qədər soyuq suda yaxşı yuyun, sonra tam süzün ki, sous durulmasın və parlaq qalsın.',
      substitution: 'Təzə ramen nəzərdə tutulan elastikliyi verir; nazik buğda əriştəsi bərk bişirilib dərhal soyudularsa işləyə bilər, amma tekstura fərqli olacaq.',
      avoid: 'Əriştəni yeməkdən çox əvvəl souslamayın. Yumşalma və qabda su yığılmaması üçün sous, əriştə və qarniri ayrı soyudub masada birləşdirin.',
      storage: 'Sous və qarnirləri 2 gün əvvəl hazırlamaq olar. Bişmiş əriştə həmin gün daha yaxşıdır; qısa gözləyəcəksə, çox az neytral yağla qarışdırın.',
    },
  },
};

export function getRecipeInsight(slug: string) {
  return recipeInsights[slug];
}

# Chef İlhamə — Search Growth Report

Tarix: 20 iyul 2026
Mənbə: Google Search Console, Web Search, son 3 ay (91 gün)

## İcra xülasəsi

Sayt artıq Google-da görünür və əsas artım problemi indekslənməmək deyil, mövcud page-one görünürlüğünün klikə çevrilməməsidir. Son 7 gündə 5,093 impression və 172 klik alınıb; CTR 3.38%-dir. Trafikin 90.6%-i impression, 94.5%-i klik səviyyəsində mobildən gəlir.

Bir həftədə 10× nəticə 50,930 impression və 1,720 klik deməkdir. Mövcud impression ilə 1,720 klik üçün 33.8% CTR lazım olardı; bu, orqanik axtarış üçün real və idarə edilə bilən həftəlik öhdəlik deyil. Google dəyişiklikləri crawl və yenidən emal etdikdən sonra ölçür, Search Console datası da adətən 2–3 gün gecikir. Buna görə 10× hədəf 30–90 günlük stretch trayektoriyası kimi saxlanılıb, ilk 7 gün üçün isə aşağıdakı ölçülə bilən diapazon qoyulub:

- 6,500–8,000 impression (+28–57%)
- 240–310 klik (+40–80%)
- ümumi CTR 3.7–4.2%
- Recipe Gallery CTR 0.28%-dən ən az 0.6%-ə doğru ilk hərəkət

Bu diapazon zəmanət deyil. Kod dəyişiklikləri implementasiya olunub; nəticənin ölçüsü Google crawl tempi, SERP rəqabəti və mövsümi tələbdən asılıdır.

## Etibarlı baseline

| Dövr | Klik | Impression | CTR | Gündəlik klik | Gündəlik impression |
|---|---:|---:|---:|---:|---:|
| Son 91 gün | 1,900 | 51,640 | 3.68% | 20.9 | 567.5 |
| Son 7 gün | 172 | 5,093 | 3.38% | 24.6 | 727.6 |
| Əvvəlki 7 gün | 157 | 4,997 | 3.14% | 22.4 | 713.9 |
| İlk 7 gün | 95 | 2,305 | 4.12% | 13.6 | 329.3 |

Son həftə ilk həftəyə nisbətən impression baxımından 2.21×, klik baxımından 1.81× böyüyüb. Əsas itki CTR-in 4.12%-dən 3.38%-ə düşməsidir.

### Cihazlar

| Cihaz | Klik | Impression | CTR | Orta mövqe |
|---|---:|---:|---:|---:|
| Mobile | 1,795 | 46,800 | 3.84% | 6.38 |
| Desktop | 95 | 4,554 | 2.09% | 7.31 |
| Tablet | 10 | 286 | 3.50% | — |

### Ölkələr

Azərbaycan 1,557 klik və 41,542 impression ilə əsas bazardır. Rusiya, Almaniya və Türkiyədə CTR 4–5% aralığındadır, amma həcmləri aşağıdır. ABŞ 1,663 impression və 1.32% CTR ilə ingilis səhifələri üçün ikinci mərhələ optimizasiya boşluğudur.

### Search appearance

| Növ | Klik | Impression | CTR | Orta mövqe |
|---|---:|---:|---:|---:|
| Recipe rich results | 1,105 | 27,301 | 4.05% | 6.61 |
| Recipe Gallery | 11 | 3,947 | 0.28% | 8.68 |

Recipe Gallery ən aydın texniki fürsətdir: görünürlük var, klik çevrilməsi demək olar ki, yoxdur.

## Ən böyük CTR fürsətləri

| Səhifə / query ailəsi | Impression | CTR | Mövqe | Problem |
|---|---:|---:|---:|---|
| yarpaq dolması | 7,369 | 2.05% | 7.17 | geniş görünürlük, zəif snippet |
| gürzə | 3,603 | 1.69% | 6.22 | `gurze` query-si 1,354 impression, 0 klik |
| yarpaq xəngəli | 1,906 | 0.73% | 8.09 | page-one görünürlük klikə çevrilmir |
| düşbərə | 1,657 | 0.72% | 7.62 | diakritikalı və diakritikasız query-lərdə aşağı CTR |
| qatlama | 1,489 | 1.54% | 5.72 | yüksək mövqeyə baxmayaraq zəif title promise |
| qovurma | 988 | 2.23% | 5.43 | mövqeyə görə aşağı CTR |
| bozbaş | 963 | 1.97% | 7.57 | snippet axtarış niyyətini cavablamır |
| EN piti | 865 | 0.69% | 6.82 | İngilis SERP-də zəif relevancy/CTR |

Search Console query cədvəli anonim və aşağı həcmli sorğuları tam göstərmir; query cəmlərinin chart cəmi ilə eyni olmaması normaldır.

## Coverage və rich-result audit əlavəsi

20 iyul Coverage export-u və giriş edilmiş canlı Search Console paneli birlikdə yoxlanıldı. Export-un son Page Indexing yenilənməsi 10 iyul, Recipe/Breadcrumb enhancement yenilənməsi 18 iyuldur.

### Page indexing səbəbləri

| Səbəb | Say | Canlı nümunələrin real mənası | Qərar |
|---|---:|---|---|
| Alternate page with proper canonical | 73 | `www.chef-ilhama.food/...` dublikatları | `www` host-u apex domain-ə 308 redirect edilir |
| Blocked by robots.txt | 2 | `/_next/static/media/*.woff2` fontları | render asset-ləri üçün `/_next/` bloku silindi |
| Not found (404) | 1 | köhnə `/resept/sorqogal-1` | mövcud `/resept/sorqogal` səhifəsinə 308 redirect əlavə edildi |
| Page with redirect | 1 | `http://chef-ilhama.food/` | düzgün HTTP→HTTPS davranışıdır, dəyişdirilmədi |
| Crawled — currently not indexed | 11 | 7 köhnə `?category=` filter URL-si, 3 font/favicon asset-i, 1 əlavə filter URL-si | crawlable filter linkləri düymə əsaslı client navigation-a çevrildi; bütün parametrli recipe kataloqları `X-Robots-Tag: noindex, follow` alır |

73 canonical səhifə müxtəlif dillərin problemi deyil; canlı nümunələr hamısının `www` host dublikatı olduğunu göstərdi. Buna görə locale səhifələrini kor-koranə silmək və ya index açmaq əvəzinə host səviyyəli konsolidasiya seçildi.

### Recipe və Breadcrumb enhancement

- Breadcrumbs: 54 valid, 0 invalid, son 90 gündə problem yoxdur.
- Recipes: 45 valid, 0 critical invalid.
- 45 recipe üçün addım şəkli/video tövsiyəsi var idi. Hər `HowToStep`-ə 4:3 ölçülü crawlable recipe image əlavə edildi.
- `HowToStep.url` artıq hər addım anchor-u ilə verilir; Search Console-un 18 iyul snapshot-u bu deploy-dan əvvəlki versiyanı göstərir.
- 6 köhnə ingredient-length xəbərdarlığı üçün schema ingredient və instruction mətnlərini trim edir, boş və bir simvolluq dəyərləri çıxarır.
- `aggregateRating`, `video` və `nutrition` məlumatları real data olmadığı üçün saxta şəkildə yaradılmadı.

## Implementasiya olunmuş dəyişikliklər

### 1. Axtarış niyyətli title və description sistemi

- Tarix mətnindən avtomatik kəsilən zəif meta description ləğv edildi.
- Hər recipe üçün ərzaq sayı, addım sayı, vaxt və faydanı bildirən unikal description yaradıldı.
- Yüksək impression/aşağı CTR olan 15 Azərbaycan səhifəsinə ayrıca, query-yə uyğun title verildi.
- Title-lar keyword stuffing etmədən “resept + konkret fayda/üsul” modeli ilə yazıldı.

### 2. Recipe Gallery və Google Images infrastrukturu

- Hər recipe şəkli üçün crawl edilə bilən üç sabit URL yaradıldı:
  - 1:1 — 1200×1200
  - 4:3 — 1200×900
  - 16:9 — 1200×675
- Server şəkli mərkəzdən kəsir, JPEG optimizasiya edir və uzun CDN cache header-i verir.
- Recipe JSON-LD artıq hər üç `ImageObject`-i ölçüləri ilə təqdim edir.
- Open Graph/Twitter üçün 16:9 şəkil istifadə olunur.
- XML sitemap hər recipe üçün hər üç şəkli göstərir.
- Kolleksiya cover şəkillərində mövcud olmayan lokal fayl URL-ləri real dinamik şəkillərlə əvəz edildi.

### 3. Mobil engagement və snippet məzmunu

- Hero daxilində “Reseptə keç” ikinci dərəcəli düymədən əsas CTA-ya çevrildi.
- Hər AZ/EN recipe səhifəsinə görünən “X necə hazırlanır?” quick-answer bloku əlavə edildi.
- Blok ərzaq sayı, addım sayı, vaxt və porsiyanı qısa cavabda göstərir; Google snippet üçün tarix paraqrafından daha uyğun məzmundur.
- Hero və quick-answer CTA-ları ayrıca GA4 event-ləri ilə ölçülür: `recipe_jump_to_method`, `location=hero|quick_answer`.
- Müəllif/brand etibarı üçün Chef İlhamə haqqında səhifəsinə görünən byline linki əlavə edildi.

### 4. Demand-led daxili link hub-ı

- `Evdə bişirmək üçün 12 klassik Azərbaycan resepti` kolleksiyası yaradıldı.
- Yarpaq dolması, piti, lülə kabab, gürzə, düşbərə, südlü aş, fisincan plov, göyərti qutabı, yarpaq xəngəli, qatlama, qovurma və bozbaş eyni crawlable hub-da birləşdirildi.
- Kolleksiya AZ və EN üçün ayrıca canonical/hreflang, ItemList schema, index səhifəsi və sitemap linki alır.
- Azərbaycan kolleksiyasının ItemList linklərinin səhvən `/en/recipe/...` göstərilməsi düzəldildi.

## 7 günlük əməliyyat planı

### Gün 0 — deploy və texniki doğrulama

- Build, TypeScript və lint keçirilib.
- Recipe, collection və üç image endpoint lokal production runtime-da 200 cavabı ilə yoxlanılıb.
- Deploy-dan sonra canlı `sitemap.xml`, `robots.txt`, prioritet recipe JSON-LD və şəkil response-ları smoke test edilməlidir.

### Gün 1 — Google-a prioritet siqnal

- Search Console URL Inspection ilə bu 10 URL üçün live test və request indexing:
  - yarpaq dolması
  - gürzə
  - düşbərə
  - yarpaq xəngəli
  - qatlama
  - qovurma
  - bozbaş
  - südlü aş
  - piti
  - Azərbaycan klassikləri kolleksiyası
- Sitemap yenidən submit edilməlidir. Recipe səhifələri üçün Google Indexing API istifadə edilməməlidir; API recipes üçün nəzərdə tutulmayıb.

### Gün 2 — SERP və rich result QA

- Rich Results Test-də 5 prioritet recipe URL yoxlanmalıdır.
- Hər Recipe entity-də üç şəkil, ingredient, instruction, totalTime, author və dateModified görünməlidir.
- GSC enhancement report-da invalid recipe item yaranarsa dərhal rollback deyil, konkret field düzəlişi edilməlidir.

### Gün 3–4 — ilk crawl siqnalları

- GSC Pages və Search appearance datalarında recipe gallery impression trendi izlənməlidir.
- GA4-də `recipe_view → recipe_jump_to_method → ingredient_check → step_complete` funnel qurulmalıdır.
- Əsas engagement göstəricisi: recipe view-lərin neçə faizi method-a keçir. İlk hədəf 25%+, daha sonra 35%+.

### Gün 5–7 — ölçmə və qərar

- GSC compare: son 7 gün vs əvvəlki 7 gün; ayrıca page və query export.
- Brand query-ləri ayrıca, non-brand recipe query-ləri ayrıca ölçülməlidir.
- Snippet title testinin qalibi yalnız ən azı 200 impression görən URL-lərdə qiymətləndirilməlidir.
- Mövqeyi stabil qalıb CTR-i artan title pattern qalib sayılır; mövqe ciddi dəyişibsə nəticə qarışıqdır və test uzadılır.

## 30–90 günlük 10× trayektoriyası

1. İlk 15 CTR səhifəsində yeni snippet sisteminin qaliblərini bütün AZ recipe-lərə yaymaq.
2. Hər həftə GSC-də page-one mövqeli, CTR-i gözləniləndən aşağı 5 URL seçmək və yalnız həmin cluster-i yeniləmək.
3. Azərbaycan mətbəxi daxilində ayrıca people-first hub-lar qurmaq: xəmir yeməkləri, plovlar, şorbalar, qutablar. Thin filter səhifələri yaratmamaq.
4. Hər prioritet recipe-də orijinal chef note, uğursuzluq səbəbi, tekstura siqnalı, saxlama və servis məsləhəti əlavə etmək. Generik AI mətni ilə miqyaslama etməmək.
5. İngilis bazarında ABŞ impression alan səhifələri ayrıca localization və title testinə salmaq; Azərbaycan title-larını tərcümə etməklə kifayətlənməmək.
6. Hər ay image sitemap və Recipe Gallery performansını ayrıca ölçmək; gallery üçün şəkil kadrını CTR testinin bir hissəsinə çevirmək.
7. 50 nadir qlobal recipe üçün ölkə/texnika hub-larını real daxili link və redaksiya məzmunu ilə genişləndirmək.

## Ölçmə paneli

| KPI | Baseline | 7 günlük qərar sərhədi | 30–90 günlük istiqamət |
|---|---:|---:|---:|
| Weekly clicks | 172 | 240–310 | 1,000–1,720 |
| Weekly impressions | 5,093 | 6,500–8,000 | 25,000–50,930 |
| Overall CTR | 3.38% | 3.7–4.2% | 4.0%+ həcmdə sabit |
| Recipe Gallery CTR | 0.28% | 0.6% istiqamətində | 1.5–3.0% |
| Mobile click share | 94.5% | qorunur | əsas UX prioriteti |
| Method-start rate | yeni event | 25%+ | 35%+ |
| Ingredient interaction | mövcud event | funnel baseline | aylıq artım |

## Doğrulama nəticəsi

- `npx tsc --noEmit`: keçdi
- Dəyişdirilən 10 TypeScript/TSX faylı üçün targeted ESLint: keçdi
- Repo-wide `npm run lint`: Prisma build-dən sonra `src/generated` vendor kodunu və taskdan əvvəl mövcud FR/IT hüquqi səhifələrini də lint etdiyi üçün baseline xətaları verir; bu dəyişikliklərdə yeni lint xətası yoxdur
- `npm run build`: keçdi, 145/145 statik səhifə
- `/resept/yarpaq-dolmasi`: 200; focused title, quick answer və üç şəkil nisbəti HTML-də təsdiqləndi
- `/kolleksiyalar/azerbaijani-classic-recipes`: 200; yeni hub təsdiqləndi
- `/media/recipes/yarpaq-dolmasi/1x1.jpg`: 200, image/jpeg, 1200×1200
- `/media/recipes/yarpaq-dolmasi/4x3.jpg`: 200, image/jpeg, 1200×900
- `/media/recipes/yarpaq-dolmasi/16x9.jpg`: 200, image/jpeg, 1200×675
- `www.chef-ilhama.food/resept/piti`: lokal production smoke test-də 308 → apex URL
- `/resept/sorqogal-1`: 308 → `/resept/sorqogal`
- `/reseptler?category=Şorba`: 200 və `X-Robots-Tag: noindex, follow`
- Düşbərə Recipe JSON-LD: 6/6 addımda `url` və 4:3 `image`, 11 təmiz ingredient, 3 əsas image ratio
- Canlı Search Console: Recipes 45 valid / 0 invalid; Breadcrumbs 54 valid / 0 invalid

## Bütün dillər üzrə yekun SEO hardening

- 16 dilin 112 əsas route-u və AZ/EN editorial route-ları eyni canonical/hreflang generatoruna bağlandı.
- `x-default` artıq recipes, services, about, contact, privacy və terms səhifələrində səhvən ana səhifəyə deyil, həmin səhifənin ingilis ekvivalentinə işarə edir.
- Locale səhifələrinin Open Graph və Twitter metadata-sında şəkil boşluğu qalmır; xüsusi şəkil verilmədikdə 1200×630 brand preview avtomatik əlavə olunur.
- Statik locale title-ları root template ilə ikinci dəfə brand suffix almır; SERP title duplication aradan qaldırılıb.
- Sitemap DB-nin qısa fasiləsində reseptləri itirmir: canlı DB əsas mənbədir, boş cavabda 85 mövcud recipe slug üçün etibarlı fallback işləyir.
- `scripts/audit-seo.mjs` və `npm run seo:audit` əlavə edildi. Audit sitemap URL-lərində status, title, description, indexability, canonical, hreflang/x-default, Open Graph, JSON-LD və Recipe HowToStep sahələrini yoxlayır.
- Lokal production build-də 130 indexable statik sitemap səhifəsi yoxlanıldı: **0 error, 0 warning**.
- Məhdud lokal şəbəkədə Supabase və Google Fonts çıxışı olmadığı üçün build testində font response-u lokal mock edildi; source kod dəyişdirilmədən webpack production build 145/145 səhifə ilə keçdi. Vercel build-i real şəbəkə və production DB ilə ayrıca yoxlanmalıdır.

## İstinad prinsipləri

İmplementasiya Google-un Recipe structured data, snippet, image SEO, crawlable links və people-first content sənədlərinə uyğun qurulub:

- https://developers.google.com/search/docs/appearance/structured-data/recipe
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://support.google.com/webmasters/answer/17011259
- https://support.google.com/webmasters/answer/96568

Tavily OAuth yeni hesabla uğurla tamamlandı, lakin həmin hesabın research request-i də plan usage limitinə düşdü. Buna görə qərarlar üçün rəsmi Google mənbələri və birbaşa Search Console export-ları əsas götürüldü.

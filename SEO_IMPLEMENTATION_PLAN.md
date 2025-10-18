# SEO İmplementasiya Planı - Chef İlhama

## İMMEDİAT FƏALİYYƏTLƏR (1-7 Gün)

### 1. Texniki SEO Prioritetləri

**Meta Tags Update (Day 1-2):**
```html
<!-- Ana Səhifə -->
<title>Chef İlhama - Professional Aşpaz Xidməti Bakı | Keterinq</title>
<meta name="description" content="Professional aşpaz xidməti Bakıda. 10+ il təcrübə, şəxsi aşpaz və keterinq. Banket, toy, korporativ tədbirlər. Sifariş: +994 10 379 45 77">
<meta name="keywords" content="aşpaz Bakı, şəxsi aşpaz, keterinq xidməti, banket aşpazı, toy yeməkləri">
<link rel="canonical" href="https://chef-ilhama.food/">
<meta property="og:title" content="Chef İlhama - Professional Aşpaz Xidməti Bakı">
<meta property="og:description" content="Bakıda ən yaxşı aşpaz xidməti. Şəxsi aşpaz evə, keterinq, banket təşkili.">
<meta property="og:url" content="https://chef-ilhama.food/">
<meta property="og:type" content="website">
<meta property="og:image" content="https://chef-ilhama.food/images/chef-ilhama-og.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Structured Data Implementation (Day 2-3):**
```javascript
// LocalBusiness JSON-LD (add to homepage)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Chef İlhama",
  "description": "Professional aşpaz və keterinq xidməti Bakıda",
  "url": "https://chef-ilhama.food",
  "telephone": "+994103794577",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Bakı",
    "addressCountry": "AZ"
  },
  "geo": {
    "@type": "GeoCoordinates", 
    "latitude": "40.4093",
    "longitude": "49.8671"
  },
  "areaServed": ["Bakı", "Sumqayıt"],
  "serviceType": ["Personal Chef", "Catering Service"],
  "priceRange": "50-500 AZN"
};
```

### 2. Google Business Profile Setup (Day 3-4)

**Profile Information:**
- Business Name: Chef İlhama - Professional Aşpaz Xidməti
- Category: Caterer (Primary), Personal Chef (Secondary)
- Phone: +994 10 379 45 77
- Website: https://chef-ilhama.food
- Service Areas: Bakı, Abşeron rayonu, Sumqayıt
- Hours: Monday-Sunday 8:00 AM - 10:00 PM

**Photos to Upload:**
1. Professional chef photo (profile)
2. Food preparation shots (5-10)
3. Event/catering examples (5-10) 
4. Kitchen/workspace (3-5)
5. Logo variations (2-3)

### 3. Core Web Vitals Optimization (Day 4-7)

**Critical Optimizations:**
```javascript
// Image optimization
<Image
  src="/images/chef-ilhama-hero.webp"
  alt="Chef İlhama - Professional aşpaz Bakıda"
  width={800}
  height={600}
  priority
  placeholder="blur"
/>

// Font optimization
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

// Critical CSS inline
<style>{criticalCSS}</style>
```

## MƏZİN PLAN (8-30 Gün)

### Həftə 2-3: Əsas Səhifələr

**1. Aşpaz Xidməti Səhifəsi (/aspaz-xidmeti)**
```html
<h1>Professional Aşpaz Xidməti Bakıda - Chef İlhama</h1>
<h2>Şəxsi Aşpaz Evə Çağırma Xidməti</h2>
<h2>Banket və Məclis Aşpazı</h2>
<h2>Aşpaz Xidməti Qiymətləri</h2>
<h2>Niyə Chef İlhamanı Seçməlisiniz?</h2>
```

**Content (300 söz):**
Bakıda **professional aşpaz xidməti** axtarırsınız? Chef İlhama komandası 10+ illik təcrübə ilə sizə ən yüksək keyfiyyətli xidmət təqdim edir.

**Xidmət növlərimiz:**
- **Şəxsi aşpaz evə** çağırma
- Banket və toy aşpazı  
- Korporativ tədbir aşpazı
- Gündəlik ev aşpazı

**Aşpaz qiymətlərimiz** şəffaf və ədalətlidir. Saatlıq xidmət 25 AZN-dən, gündəlik paket 150 AZN-dən başlayır. **Aşpaz kirayə** müddəti minimum 4 saatdır.

Bakı ərazisində **aşpaz sifarişi** üçün +994 10 379 45 77 zəng edin.

**2. Keterinq Səhifəsi (/keterinq)**
- Target: keterinq, catering Bakı, keterinq qiyməti
- 400+ söz məzmun
- Event types, pricing table, sample menus

**3. Reseptlər Ana Səhifəsi (/reseptler)**
- Target: Azərbaycan reseptləri, milli yeməklər
- Recipe categories, featured recipes
- Search functionality

### Həftə 4: Resept Səhifələri

**Priority Recipes:**
1. Düşbərə Resepti (/reseptler/dusbere-resepti)
2. Plov Shah Resepti (/reseptler/shah-plov-resepti)
3. Dolma Resepti (/reseptler/dolma-resepti)
4. Piti Resepti (/reseptler/piti-resepti)
5. Küftə Bozbaş Resepti (/reseptler/kufte-bozbash-resepti)

**Recipe Template:**
```html
<article itemscope itemtype="https://schema.org/Recipe">
  <h1 itemprop="name">Düşbərə Resepti - Ənənəvi Azərbaycan Yeməyi</h1>
  
  <div class="recipe-meta">
    <span itemprop="prepTime" content="PT45M">Hazırlıq: 45 dəq</span>
    <span itemprop="cookTime" content="PT20M">Bişirmə: 20 dəq</span>
    <span itemprop="recipeYield">4 nəfər</span>
  </div>
  
  <img itemprop="image" src="/images/dusbere-recipe.jpg" alt="Düşbərə resepti - addım-addım hazırlama">
  
  <div itemprop="description">
    Ənənəvi Azərbaycan düşbərə resepti ev şəraitində addım-addım hazırlama təlimatı.
  </div>
  
  <h2>Lazımi Məhsullar</h2>
  <ul itemprop="recipeIngredient">
    <li>2 stəkan un</li>
    <li>1 ədəd yumurta</li>
    <!-- ... -->
  </ul>
  
  <h2>Hazırlama Qaydası</h2>
  <ol itemprop="recipeInstructions">
    <li>Unun içərisinə yumurta və duzu əlavə edin...</li>
    <!-- ... -->
  </ol>
</article>
```

## LINK BUILDİNG STRATEGİYASI (15-60 Gün)

### Local Citations

**Priority Directories:**
1. Azerbaijan.az business directory
2. Bizim.az local listings
3. Baku.ws restaurant listings
4. Chamber of Commerce Azerbaijan
5. Restaurant.az chef listings

**Submission Template:**
- Business Name: Chef İlhama - Professional Aşpaz Xidməti  
- Phone: +994 10 379 45 77
- Website: https://chef-ilhama.food
- Category: Personal Chef, Catering Service
- Description: "Bakıda professional aşpaz və keterinq xidməti. 10+ il təcrübə."

### Content Partnerships

**Target Sites:**
1. Azerbaijani food blogs
2. Local lifestyle magazines  
3. Wedding planning sites
4. Cooking enthusiast groups
5. Local event venues

**Pitch Template:**
Subject: Azərbaycan Mətbəxi Məqaləsi Təklifi

Salam,

Chef İlhama olaraq, [SITE NAME] saytınız üçün Azərbaycan mətbəxi haqqında dəyərli məzmun hazırlamaq istəyirik. 

Təklif etdiyimiz mövzular:
- "Ənənəvi Azərbaycan Yeməkləri və Onların Tarixi"
- "Evdə Professional Düşbərə Hazırlama Sirləri" 
- "Toy Menyusu Seçimi - Mütəxəssis Tövsiyələri"

Bu məqalələr oxucularınıza həqiqətən dəyərli olacaq və professional fotoşəkillər də daxil edəcəyik.

Maraqlanırsınızsa, əlaqə saxlayaq.

Hörmətlə,
Chef İlhama

### Social Media Strategy

**Platform Priorities:**
1. **Instagram (@chef.ilhama)**
   - Daily food photography
   - Story highlights: Reseptlər, Keterinq, Behind-scenes
   - IGTV recipe tutorials

2. **Facebook (Chef İlhama)**
   - Event photos and testimonials
   - Recipe posts with links to website
   - Local community engagement

3. **YouTube (Chef İlhama Azerbaijan)**
   - Recipe tutorial videos
   - Cooking tips and tricks
   - Client event showcases

**Content Calendar Template:**
```
Monday: Resept Monday - Feature traditional recipe
Tuesday: Tips Tuesday - Cooking technique or tip  
Wednesday: Work Wednesday - Behind-the-scenes content
Thursday: Throwback Thursday - Historical Azeri dishes
Friday: Feature Friday - Client testimonial/event
Saturday: Saturday Special - Weekend cooking project
Sunday: Sunday Stories - Personal chef journey content
```

## LOKAL SEO KAMPANYA (30-90 Gün)

### Review Generation Strategy

**Review Request Email Template:**
Mövzu: Chef İlhama Xidmətiniz Haqqında Rəy

Hörmətli [NAME],

Son vaxtlar sizin üçün hazırladığımız [EVENT/SERVICE] xidmətindən razı qaldığınızı ümid edirik.

Bizim üçün çox dəyərli olacaq, Google-da qısa rəy yazasınız:
[Google Review Link]

Bu, digər müştərilərə keyfiyyətli xidmət seçməkdə kömək edəcək.

Təşəkkür edirik!
Chef İlhama Komandası

### Local Link Building

**Target Local Sites:**
1. Baku restaurant guides
2. Azerbaijan tourism sites  
3. Local event venue websites
4. Food festival organizer sites
5. Cooking school partnerships

**Outreach Template:**
Subject: Yerli Aşpaz Xidməti Tərəfdaşlığı

Salam,

[SITE NAME] saytınızda Bakı üzrə restaurant və yemək xidmətləri siyahısı gördüm. 

Chef İlhama olaraq, professional aşpaz və keterinq xidməti göstəririk. 10+ il təcrübəmizlə Bakıda tanınmış brendiik.

Saytınızın oxucuları üçün faydalı ola biləcək xidmətlərimiz:
- Şəxsi aşpaz evə
- Banket və toy keterinq  
- Korporativ tədbir yeməkləri

Siyahınıza əlavə etmək istəyirsinizsə, əlaqə saxlayaq.

Hörmətlə,
Chef İlhama

## MONİTORİNQ VƏ ANALYZ (Davamlı)

### Google Search Console Setup

**Key Reports to Monitor:**
- Performance: Query data for target keywords
- Coverage: Indexing status of new pages
- Core Web Vitals: Performance metrics
- Mobile Usability: Mobile optimization issues

### Google Analytics 4 Goals

**Conversion Goals:**
1. Contact form submission
2. Phone number clicks  
3. WhatsApp message initiation
4. Quote request form
5. Recipe page engagement (2+ minutes)

**Custom Events:**
```javascript
// Phone click tracking
document.querySelector('[href^="tel:"]').addEventListener('click', () => {
  gtag('event', 'phone_click', {
    'event_category': 'Contact',
    'event_label': 'Phone Number'
  });
});

// Recipe completion tracking  
window.addEventListener('scroll', () => {
  if (window.scrollY / document.body.scrollHeight > 0.8) {
    gtag('event', 'recipe_completion', {
      'event_category': 'Engagement',
      'event_label': document.title
    });
  }
});
```

### Rank Tracking Setup

**Primary Keywords to Track:**
- aşpaz (Position #1 target)
- aşpaz Bakı (Position #1 target)  
- şəxsi aşpaz (Position #1-3 target)
- keterinq (Position #1-3 target)
- Azərbaycan reseptləri (Position #1-5 target)

**Tracking Tools:**
- Google Search Console (free)
- SEMrush/Ahrefs (paid, more detailed)
- SERPWatcher (budget option)

### Competitor Analysis

**Main Competitors:**
1. Local catering companies in Baku
2. Personal chef services  
3. Recipe websites in Azerbaijani
4. Restaurant delivery services

**Monthly Analysis:**
- Competitor keyword rankings
- New content published
- Backlink acquisition
- Social media activity
- Local search visibility

## SUCCESS METRİKLƏRİ

### 30 Gün Hədəfləri:
- **Organic Traffic:** +50% artım
- **Keyword Rankings:** 5+ açar söz top-20-də
- **Local Visibility:** Google My Business-də görünmə
- **Technical Score:** 90+ PageSpeed, 0 critical issues

### 60 Gün Hədəfləri:  
- **Organic Traffic:** +100% artım
- **Keyword Rankings:** 10+ açar söz top-10-da
- **Lead Generation:** 20+ monthly inquiries  
- **Backlinks:** 15+ quality local links

### 90 Gün Hədəfləri:
- **Organic Traffic:** +200% artım  
- **Keyword Rankings:** 5+ açar söz top-3-də
- **Market Position:** Top local search results
- **Revenue Impact:** Measurable business growth from SEO

Bu implementasiya planı sistemli şəkildə icra edilərsə, chef-ilhama.food saytı Azərbaycan bazarında aşpaz xidməti və reseptlər üzrə dominant mövqeyə çatacaq.
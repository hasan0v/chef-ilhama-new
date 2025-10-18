# Analytics & Tracking Setup Guide - Chef İlhamə

## 📊 GOOGLE ANALYTICS 4 SETUP

### Step 1: Create GA4 Property
1. Go to https://analytics.google.com/
2. Click "Create Account"
3. **Account Name:** Chef İlhamə Business
4. **Property Name:** chef-ilhama.food
5. **Industry:** Food & Beverage
6. **Business Size:** Small Business
7. **Data Stream:** Web → https://chef-ilhama.food

### Step 2: Install GA4 Code
**Your Measurement ID:** G-XXXXXXXXX (replace in layout.tsx)

Replace this in `/src/app/layout.tsx`:
```javascript
// Replace G-YOUR-GA4-ID with your actual measurement ID
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXX"></script>
```

### Step 3: Configure Enhanced Ecommerce (Service Bookings)
```javascript
// Track service inquiries as conversions
gtag('event', 'service_inquiry', {
  event_category: 'engagement',
  event_label: 'catering_request',
  value: 1
});

// Track WhatsApp clicks
gtag('event', 'whatsapp_click', {
  event_category: 'contact',
  event_label: 'whatsapp_button',
  value: 1
});
```

### Step 4: Set Up Goals & Conversions

**Primary Conversions:**
1. **WhatsApp Click** (Most Important)
   - Event Name: `whatsapp_click`
   - Category: Contact
   - Value: High priority

2. **Phone Call Click**
   - Event Name: `phone_click`
   - Category: Contact
   - Value: High priority

3. **Services Page View**
   - Event Name: `page_view`
   - Page: `/xidmetler`
   - Value: Medium priority

4. **Contact Form Submit**
   - Event Name: `form_submit`
   - Category: Lead Generation
   - Value: High priority

### Step 5: Enhanced Tracking for Chef Business

**Custom Dimensions:**
- **Dimension 1:** Service Type (personal_chef, catering, wedding)
- **Dimension 2:** Location (baku, sumgayit, absheron)
- **Dimension 3:** Event Size (1-10, 11-50, 50+)
- **Dimension 4:** Meal Category (breakfast, lunch, dinner, full_event)

**Custom Metrics:**
- **Metric 1:** Inquiry Value (estimated booking value)
- **Metric 2:** Service Duration (hours)
- **Metric 3:** Guest Count

## 🔍 GOOGLE SEARCH CONSOLE SETUP

### Step 1: Verify Property
1. Go to https://search.google.com/search-console/
2. Add Property: https://chef-ilhama.food
3. **Verification Method:** HTML meta tag (already added to layout.tsx)
4. **Alternative:** Upload HTML file to public folder

### Step 2: Submit Sitemap
1. In Search Console → Sitemaps
2. Add sitemap URL: https://chef-ilhama.food/sitemap.xml
3. Monitor indexing status

### Step 3: Configure Alerts
**Set up email alerts for:**
- New security issues
- Significant traffic changes
- Manual actions
- New high-priority issues

### Step 4: Key Pages to Monitor
**Priority Pages:**
1. Homepage (/)
2. Services (/xidmetler)
3. Recipe pages (/resept/[slug])
4. About page (/haqqinda)
5. Contact page (/elaqe)

## 📱 WHATSAPP CLICK TRACKING

### Implementation Code
Add to WhatsApp buttons:
```javascript
const trackWhatsAppClick = (source) => {
  // Google Analytics
  gtag('event', 'whatsapp_click', {
    event_category: 'contact',
    event_label: source,
    value: 1
  });
  
  // Optional: Facebook Pixel
  fbq('track', 'Contact', {
    content_name: 'WhatsApp Click',
    content_category: 'Contact',
    source: source
  });
};
```

### WhatsApp Link Optimization
**Current:** https://wa.me/994103794577
**Enhanced:** https://wa.me/994103794577?text=Salam%20Chef%20İlhamə,%20aşpaz%20xidməti%20haqqında%20məlumat%20almaq%20istəyirəm

## 📞 PHONE CALL TRACKING

### Google Ads Call Tracking
```javascript
// Track phone clicks
const trackPhoneClick = () => {
  gtag('event', 'phone_click', {
    event_category: 'contact',
    event_label: 'header_phone',
    value: 1
  });
};
```

### Call Tracking Service (Optional)
**Recommended:** CallRail or similar service for Azerbaijan
- Provides unique tracking numbers
- Records call quality and duration
- Integrates with Google Analytics

## 🎯 CONVERSION TRACKING IMPLEMENTATION

### Add to Homepage (FAQ WhatsApp Button)
```javascript
onClick={() => {
  // Track conversion
  gtag('event', 'conversion', {
    send_to: 'AW-CONVERSION-ID/CONVERSION-LABEL',
    event_category: 'contact',
    event_label: 'faq_whatsapp'
  });
  
  trackWhatsAppClick('homepage_faq');
  window.open('https://wa.me/994103794577?text=Salam%20Chef%20İlhamə,%20sualım%20var', '_blank');
}}
```

### Add to Services Page
```javascript
onClick={() => {
  gtag('event', 'service_inquiry', {
    event_category: 'lead',
    event_label: 'services_page',
    service_type: selectedService,
    event_size: eventSize,
    value: estimatedValue
  });
  
  trackWhatsAppClick('services_page');
}}
```

## 📈 KEY PERFORMANCE INDICATORS (KPIs)

### Primary Metrics
1. **Organic Search Traffic** - Target: 500+ monthly by Month 1
2. **WhatsApp Clicks** - Target: 50+ monthly by Month 1
3. **Phone Calls** - Target: 20+ monthly by Month 1
4. **Services Page Views** - Target: 200+ monthly
5. **Average Session Duration** - Target: 2+ minutes
6. **Bounce Rate** - Target: <60%

### Local SEO Metrics
1. **Google My Business Views** - Target: 1000+ monthly
2. **Direction Requests** - Target: 100+ monthly
3. **Local Search Rankings** - Target: Top 3 for "aşpaz Bakı"
4. **Review Rating** - Target: 4.8+ stars
5. **Review Count** - Target: 50+ reviews by Month 3

### Conversion Metrics
1. **Contact Form Conversions** - Target: 3% conversion rate
2. **WhatsApp Conversion Rate** - Target: 5% of total traffic
3. **Cost Per Lead** - Target: <10 AZN (if using paid ads)
4. **Customer Lifetime Value** - Track average booking values

## 🔔 ALERT SETUP

### Google Analytics Alerts
**Set up custom alerts for:**
1. **Traffic Drop >30%** (weekly check)
2. **Conversion Drop >50%** (daily check)
3. **New High-Value Pages** (pages getting >100 views)
4. **Unusual Geographic Traffic** (detect bot traffic)

### Search Console Alerts
**Monitor weekly:**
1. **Indexing Issues** - New pages not indexed
2. **Security Issues** - Malware or hacking attempts
3. **Manual Actions** - Google penalties
4. **Performance Changes** - Ranking drops

## 📊 REPORTING DASHBOARD

### Weekly Reports
**Every Monday, review:**
1. Organic traffic trends
2. Top performing pages
3. Keyword ranking changes
4. Conversion performance
5. WhatsApp/phone inquiries

### Monthly Business Review
**Track business impact:**
1. New customer inquiries from SEO
2. Revenue attribution to organic search
3. Seasonal trends and opportunities
4. Competitor analysis
5. Content performance

## 🚀 ADVANCED TRACKING (Month 2+)

### Facebook Pixel Integration
```javascript
// Add to layout.tsx
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'YOUR_PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### Heat Mapping (Optional)
**Tools:** Hotjar or Microsoft Clarity
- Track user behavior on key pages
- Identify optimization opportunities
- A/B test button placements

## ✅ IMPLEMENTATION CHECKLIST

### Day 4 Tasks:
- [ ] Create Google Analytics 4 account
- [ ] Update measurement ID in layout.tsx
- [ ] Verify Google Search Console
- [ ] Submit sitemap
- [ ] Set up conversion goals
- [ ] Implement WhatsApp click tracking
- [ ] Configure alerts and reports

### Week 1 Validation:
- [ ] Confirm GA4 data collection
- [ ] Verify Search Console indexing
- [ ] Test conversion tracking
- [ ] Check mobile analytics
- [ ] Validate phone/WhatsApp tracking

### Success Metrics (7 Days):
- [ ] GA4 shows daily visitors
- [ ] Search Console shows impressions
- [ ] Conversion events fire correctly
- [ ] No tracking errors in console
- [ ] Reports generating properly

---

**CRITICAL:** Complete GA4 setup today to start collecting data immediately. Historical data cannot be recovered once lost.
export const DEFAULT_WHATSAPP_MESSAGE = "Salam Chef İlhamə, aşpaz xidməti haqqında məlumat almaq istəyirəm";

export const siteConfig = {
  name: "Chef İlhamə",
  shortName: "Chef İlhamə",
  title: "Chef İlhamə - Azərbaycan Mətbəxi Reseptləri",
  description:
    "Azərbaycan mətbəxinin bölgəvi dadlarını reseptlərlə kəşf edin. Chef İlhamənin seçilmiş resept kolleksiyası, catering və şəxsi aşpaz xidmətləri.",
  // Vercel currently serves the www host as the primary domain. Keeping every
  // canonical URL on that host prevents the apex/www redirect loop that would
  // otherwise make pages unavailable to users and crawlers.
  url: "https://www.chef-ilhama.food",
  email: "info@chef-ilhama.food",
  phoneDisplay: "+994 77 614 11 74",
  phoneHref: "tel:+994776141174",
  whatsappNumber: "994776141174",
  instagram: "https://www.instagram.com/chef.ilhama",
  facebook: "https://www.facebook.com/chef.ilhama.baku",
  serviceAreas: ["Bakı", "Sumqayıt", "Abşeron"],
  hours: "Hər gün 08:00 - 22:00",
};

export const mainNavigation = [
  { name: "Ana Səhifə", href: "/" },
  { name: "Reseptlər", href: "/reseptler" },
  { name: "Xidmətlər", href: "/xidmetler" },
  { name: "Haqqında", href: "/haqqinda" },
  { name: "Əlaqə", href: "/elaqe" },
] as const;

export const legalNavigation = [
  { name: "Məxfilik", href: "/privacy" },
  { name: "Şərtlər", href: "/terms" },
] as const;

export function getWhatsAppHref(message = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

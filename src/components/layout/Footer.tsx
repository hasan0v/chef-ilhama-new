import Link from 'next/link';
import { ChefHat, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { name: 'Ana Səhifə', href: '/' },
    { name: 'Reseptlər', href: '/reseptler' },
    { name: 'Haqqında', href: '/haqqinda' },
    { name: 'Əlaqə', href: '/elaqe' }
  ];



  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-red-500" />
              <span className="font-bold text-xl">Chef İlhamə</span>
            </div>
            <p className="text-gray-300 text-sm">
              Bakıda professional şəxsi aşpazı. Katerinq xidməti, toy yeməkləri, 
              şirkət tədbirləri üçün 15+ il təcrübə ilə xidmətinizdəyik.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/chef.ilhama" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/994103794577" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors" title="WhatsApp">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Xidmətlərimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/xidmetler" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Şəxsi Aşpaz Xidməti
                </Link>
              </li>
              <li>
                <Link href="/xidmetler" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Katerinq Xidməti
                </Link>
              </li>
              <li>
                <Link href="/xidmetler" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Toy Yeməkləri
                </Link>
              </li>
              <li>
                <Link href="/xidmetler" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Korporativ Tədbirlər
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sürətli Linklər</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Əlaqə</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-500" />
                <a href="mailto:info@chef-ilhama.food" className="text-gray-300 hover:text-white text-sm transition-colors">
                  info@chef-ilhama.food
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-green-500" />
                <a href="https://wa.me/994103794577" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-green-400 text-sm transition-colors">
                  +994 10 379 45 77 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-gray-300 text-sm">Bakı, Sumqayıt, Abşeron</span>
              </div>
              <div className="mt-4">
                <a href="https://wa.me/994103794577?text=Salam%20Chef%20İlhamə,%20aşpaz%20xidməti%20haqqında%20məlumat%20almaq%20istəyirəm" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
                  <Phone className="h-4 w-4 mr-2" />
                  WhatsApp ilə Əlaqə
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Chef İlhamə. Bütün hüquqlar qorunur.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">
                Məxfilik Siyasəti
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">
                İstifadə Şərtləri
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
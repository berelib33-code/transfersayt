import React from 'react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, DEFAULT_SUBSCRIBER_EMAIL } from '../types';
import { Logo } from './Logo';
import { 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  Lock,
  Building2
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000 } from '../utils/calculator';
import { WhatsAppLogo } from './WhatsAppLogo';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Valyuta köçürməsi üçün müraciət edirəm.'
  )}`;

  return (
    <footer className="bg-[#07090D] border-t border-white/[0.08] text-[#9CA3AF] text-xs pt-12 sm:pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info with Flags */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" spinning={true} onClick={() => onNavigate('home')} />
            <p className="text-[#9CA3AF] text-xs sm:text-sm leading-relaxed max-w-sm">
              <strong className="text-[#F5F7FA]">{FOUNDER_NAME}</strong> rəhbərliyi ilə <strong className="text-[#00F5D4]">«{SLOGAN}»</strong> prinsipi əsasında Türkiyə və Azərbaycan arasında yalnız TRY ⇄ AZN valyuta mübadiləsi və sürətli pul transferi platforması.
            </p>

            <div className="p-4 rounded-xl bg-[#10151D] border border-white/[0.08] space-y-1.5 text-[11px] max-w-sm">
              <div className="text-[#00F5D4] font-bold flex items-center gap-1.5 pb-1 border-b border-white/[0.06]">
                <span>🇹🇷</span>
                <span>Rəsmi Məzənnə Şərtləri:</span>
                <span>🇦🇿</span>
              </div>
              <div>• Minimum göndəriş: <strong className="text-[#F5F7FA] font-mono">1,000 ₺</strong> (Aşağı qəbul edilmir)</div>
              <div>• 1,000 ₺ – 31,000 ₺: <strong className="text-[#00F5D4] font-mono">1,000 ₺ = {RATE_STANDARD_PER_1000.toFixed(2)} ₼</strong></div>
              <div>• 31,000 ₺-dən yuxarı: <strong className="text-[#8B5CF6] font-mono">1,000 ₺ = {RATE_VIP_PER_1000.toFixed(2)} ₼ VIP ⭐</strong></div>
              <div>• Komissiya: <strong className="text-[#00F5D4] font-mono">Hər 1,000 ₺ üçün cəmi 20 ₺</strong></div>
            </div>
          </div>

          {/* Quick Page Links */}
          <div className="space-y-3">
            <h4 className="text-[#F5F7FA] font-bold text-xs uppercase tracking-wider">Naviqasiya</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Əsas Səhifə
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  TRY ⇄ AZN Kalkulyator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Haqqımızda
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('who-we-are')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Biz Kimik?
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Fəaliyyət İlləri & Tarixçə
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Sual-Cavab (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#00F5D4] transition cursor-pointer"
                >
                  Əlaqə & İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Banks */}
          <div className="space-y-3">
            <h4 className="text-[#F5F7FA] font-bold text-xs uppercase tracking-wider">Əsas Banklar</h4>
            <ul className="space-y-1.5 text-[11px] text-[#9CA3AF]">
              <li>🇦🇿 Kapital Bank / Birbank</li>
              <li>🇦🇿 PAŞA Bank</li>
              <li>🇦🇿 ABB (Beynəlxalq Bank)</li>
              <li>🇦🇿 Leobank & Unibank</li>
              <li>🇹🇷 Ziraat Bankası</li>
              <li>🇹🇷 Türkiye İş Bankası</li>
              <li>🇹🇷 Garanti BBVA</li>
              <li>🇹🇷 VakıfBank & YapıKredi</li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="space-y-3">
            <h4 className="text-[#F5F7FA] font-bold text-xs uppercase tracking-wider">Əlaqə Xətti (24/7)</h4>
            <div className="space-y-2.5">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#F5F7FA] hover:text-[#00F5D4] font-mono font-bold text-sm transition"
              >
                <PhoneCall className="w-4 h-4 text-[#00F5D4]" />
                <span>{WHATSAPP_PHONE}</span>
              </a>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl btn-whatsapp-premium text-xs font-bold transition"
              >
                <WhatsAppLogo className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp ilə Əlaqə</span>
              </a>

              <div className="pt-2 text-[11px] text-[#9CA3AF] space-y-1 border-t border-white/[0.06]">
                <div>Rəsmi Bildiriş:</div>
                <div className="font-mono text-[#00F5D4] font-bold">{DEFAULT_SUBSCRIBER_EMAIL}</div>
                <div className="text-[#00F5D4] font-medium">WhatsApp və SMS bildirişi aktivdir ✓</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9CA3AF]">
          <div>
            © {new Date().getFullYear()} MIHValyuta.com — {FOUNDER_NAME}. Bütün hüquqlar qorunur. Türkiyə ⇄ Azərbaycan rəsmi valyuta xidməti.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#00F5D4]">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-bit SSL Təhlükəsizlik
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-[#8B5CF6]">
              <Clock className="w-3.5 h-3.5" /> 5–15 Dəqiqəyə Hesabda
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

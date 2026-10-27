import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Target, 
  Eye, 
  CheckCircle2, 
  FileText, 
  Lock, 
  Clock, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface AboutPageProps {
  onNavigate: (page: NavPage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Xidmətləriniz haqqında məlumat almaq istəyirəm.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#e5c07b] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Türkiyə və Azərbaycan Arasında{' '}
          <span className="text-[#e5c07b]">
            Maliyyə Körpüsü
          </span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          MIHValyuta.com — İmamverdi Məmmədov rəhbərliyi ilə 8 ildən artıqdır ki, yalnız TRY ⇄ AZN valyuta mübadiləsi və pul transferi xidmətləri göstərən aparıcı platformadır.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3.5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center border border-[#d4af37]/20">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Missiyamız</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Türkiyə və Azərbaycan arasında valyuta mübadiləsini və pul köçürməsini ən sürətli, ən sərfəli və gizli komissiyasız təmin etmək. 1,000 ₺-dən başlayan məbləğləri bank növbəsi gözləmədən 5–15 dəqiqə ərzində kartdan karta və ya nağd şəkildə çatdırmaq.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3.5 shadow-xl">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-white">Baxışımız (Vizyonumuz)</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Regionun ən etibarlı («Güvənin Ünvanı») rəqəmsal valyuta platformasına çevrilmək. Canlı məzənnələrimiz (1,000 ₺ = 33.10 ₼, 31,000 ₺+ = 33.50 ₼ VIP) və şəffaf 20 ₺ komissiya modelimizlə müştəri məmnuniyyətini 100% səviyyəsində qorumaq.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Fəaliyyətimizin Əsas Qaydaları
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Müştərilərimizin bizə etibar etməsinin başlıca səbəbləri
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-2.5">
            <div className="p-2 rounded-lg bg-[#d4af37]/10 text-[#d4af37] w-fit">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Yalnız TRY ⇄ AZN İxtisası</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Biz başqa valyutalara bölünmürük. Yalnız Türkiyə Lirəsi və Azərbaycan Manatı üzrə ən yüksək məzənnəni və ən sürətli çatdırılmanı təmin edirik.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 w-fit">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Dəqiq Komissiya (20 ₺)</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Bizdə heç bir gizli xərc yoxdur: Hər 1,000 ₺ üçün cəmi 20 ₺ xidmət haqqı tutulur. Saytda nə hesablayırsınızsa, kartınıza o çatır.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 w-fit">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">5–15 Dəqiqəyə Təhvil</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Bankların günlərlə çəkən SWIFT prosesləri əvəzinə, kartdan-karta birbaşa ödənişlə ən geci 15 dəqiqə ərzində vəsaitiniz hesabınızdadır.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Bottom Banner */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#080d19] border border-white/10 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Hesablayın və Dərhal Köçürün
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Kalkulyatorda göndərəcəyiniz məbləği hesablayın və WhatsApp vasitəsilə 5 dəqiqəyə köçürmənizi başladın.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('calculator')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4af37] text-slate-950 font-bold text-xs sm:text-sm hover:bg-[#e5c07b] transition cursor-pointer"
          >
            Kalkulyatora Keç
          </button>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs sm:text-sm hover:bg-[#20ba59] transition cursor-pointer"
          >
            <WhatsAppLogo className="w-4 h-4 fill-white" />
            <span>WhatsApp ilə Əlaqə</span>
          </a>
        </div>
      </div>
    </div>
  );
};

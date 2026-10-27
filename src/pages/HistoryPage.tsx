import React from 'react';
import { 
  History, 
  Calendar, 
  Award, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface HistoryPageProps {
  onNavigate: (page: NavPage) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Xidmətləriniz haqqında ətraflı məlumat almaq istəyirəm.`
  )}`;

  const milestones = [
    {
      year: '2018',
      title: 'Fəaliyyətin Başlanğıcı və İlk Körpü',
      desc: 'İmamverdi Məmmədov tərəfindən İstanbul və Bakı arasında tələbələr, ailələr və ticarətçilər üçün ilk etibarlı valyuta mübadiləsi xidməti təşkil edildi.',
    },
    {
      year: '2020',
      title: 'Pandemiya Dövranı & Rəqəmsal Kartdan-Karta İnqilabı',
      desc: 'Bank filiallarının bağlandığı və sərhədlərin məhdudlaşdığı dövrdə Birbank, Kapital və Ziraat FAST sistemləri ilə 10 dəqiqəlik kartdan-karta sisteminə tam keçid edildi.',
    },
    {
      year: '2022',
      title: '31,000 ₺ VIP Məzənnə Şəbəkəsinin Qurulması',
      desc: 'Böyük həcmli köçürmələr üçün xüsusi VIP məzənnə modeli (1,000 ₺ = 33.50 ₼) və hər 1,000 ₺-yə sabit 20 ₺ komissiya standartı təsdiqləndi.',
    },
    {
      year: '2024–2026',
      title: 'MIHValyuta.com Rəsmi Portalı və Avtomatlaşdırılmış Qaydalar',
      desc: 'Rəsmi veb-platforma istifadəyə verildi. Gündəlik yüzlərlə uğurlu əməliyyat, 24/7 rəsmi WhatsApp xətti və 100% zəmanətli mübadilə sistemi.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#e5c07b] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Fəaliyyət İlləri &{' '}
          <span className="text-[#e5c07b]">
            Tarixçəmiz
          </span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          İllər ərzində formalaşmış sarsılmaz güvən, minlərlə məmnun müştəri və Türkiyə–Azərbaycan arasında fasiləsiz maliyyə xidməti yolu.
        </p>
      </div>

      {/* Milestones Timeline */}
      <div className="max-w-4xl mx-auto space-y-6">
        {milestones.map((item, idx) => (
          <div
            key={idx}
            className="p-6 sm:p-7 rounded-2xl bg-[#090f1d] border border-white/10 space-y-2.5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-[#d4af37]/15 text-[#e5c07b] font-mono font-bold text-xs sm:text-sm border border-[#d4af37]/30">
                {item.year}
              </span>
              <span className="text-emerald-400 text-xs font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Uğurla tamamlandı</span>
              </span>
            </div>
            <h3 className="text-lg font-bold text-white pt-1">{item.title}</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#080d19] border border-white/10 text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Siz də Güvənin Ünvanını Seçin
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          İstənilən məbləğdə pul köçürməsi üçün bizimlə dərhal əlaqə saxlayın və 15 dəqiqəyə vəsaitinizi təhvil alın.
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
            <span>WhatsApp: {WHATSAPP_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

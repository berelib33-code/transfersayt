import React from 'react';
import { 
  Users, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Briefcase, 
  Globe,
  Headphones,
  Sparkles
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface WhoWeArePageProps {
  onNavigate: (page: NavPage) => void;
}

export const WhoWeArePage: React.FC<WhoWeArePageProps> = ({ onNavigate }) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com) komandası! Sizə sualım var.`
  )}`;

  const teamDepartments = [
    {
      title: 'Türkiyə-Azərbaycan Valyuta Şöbəsi',
      desc: 'İstanbul və Bakı bazarlarında yalnız TRY ⇄ AZN məzənnələrini anbaan izləyən və müştərilərə ən yüksək məzənnəni təmin edən mütəxəssislər.',
      icon: <Briefcase className="w-5 h-5 text-[#d4af37]" />,
      members: '6 mütəxəssis',
    },
    {
      title: 'Banklarla Əlaqələr Mərkəzi',
      desc: 'Kapital Bank (Birbank), PAŞA Bank, Unibank, AccessBank, Ziraat Bankası, İş Bankası və Vakıf Katılım ilə operativ hesablaşmaları təmin edən qrup.',
      icon: <Globe className="w-5 h-5 text-emerald-400" />,
      members: '8 koordinator',
    },
    {
      title: '24/7 Canlı WhatsApp Xidməti',
      desc: 'Günün istənilən saatında müştərilərin müraciətlərini qəbul edən, hesablamaları təsdiqləyən və rəsmi dekontları dərhal çatdıran qaynar xətt.',
      icon: <Headphones className="w-5 h-5 text-teal-400" />,
      members: '24/7 Növbəli Heyət',
    },
    {
      title: 'Təhlükəsizlik və Zəmanət Şöbəsi',
      desc: 'Hər bir köçürmənin hüquqi normalara və bank standartlarına uyğunluğunu yoxlayan təhlükəsizlik departamenti.',
      icon: <ShieldCheck className="w-5 h-5 text-indigo-400" />,
      members: '4 auditor',
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
          Biz Kimik?{' '}
          <span className="text-[#e5c07b]">
            Komandamız və Dəyərlərimiz
          </span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          MIHValyuta.com komandası — Türkiyə və Azərbaycan arasında valyuta mübadiləsini və pul transferini şəxsi zəmanət və yüksək məsuliyyətlə icra edən peşəkarlardan ibarətdir.
        </p>
      </div>

      {/* Founder Profile Card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#090f1d] border border-white/10 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#e5c07b] to-white p-1 shrink-0 shadow-xl">
            <div className="w-full h-full rounded-full bg-[#060a14] flex items-center justify-center font-bold text-xl sm:text-2xl text-[#e5c07b]">
              İM
            </div>
          </div>

          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Platformanın Təsisçisi və Rəhbəri</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {FOUNDER_NAME}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              "Bizim fəaliyyətimizin təməlində tək bir prinsip dayanır — <strong>{SLOGAN}</strong>. Türkiyədən Azərbaycana və ya Bakıdan Türkiyəyə köçürülən hər bir qəpik və lirə mənim şəxsi zəmanətim altındadır. Heç bir vasitəçi olmadan, ən dürüst məzənnə ilə xalqımıza xidmət edirik."
            </p>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            İxtisaslaşmış Şöbələrimiz
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Hər bir köçürmənin 5–15 dəqiqə ərzində tamamlanması üçün arxa planda çalışan komandamız
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {teamDepartments.map((dept, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-white/[0.05] w-fit">
                  {dept.icon}
                </div>
                <span className="text-[11px] font-mono text-slate-400 bg-white/[0.05] px-2.5 py-1 rounded-md">
                  {dept.members}
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{dept.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{dept.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

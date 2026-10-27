import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface FaqPageProps {
  onNavigate: (page: NavPage) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Bir sualım var.'
  )}`;

  const faqs = [
    {
      q: 'Bakıdan Türkiyəyə (AZN → TRY) məzənnə neçədir?',
      a: 'Bakıdan Türkiyəyə pul göndərdikdə məzənnə: 34 Manat = 1,000 ₺ təşkil edir. Hər 34 AZN üçün sizə 1,000 TL verilir. Komissiya hər 1,000 ₺ üçün 20 ₺ tutulur.',
    },
    {
      q: 'Türkiyədən Bakıya (TRY → AZN) məzənnə və komissiya necə hesablanır?',
      a: 'Türkiyədən Bakıya köçürmələrdə: 1,000 ₺ = 33.10 ₼ (33 manat 10 qəpik) hesablanır. Əgər məbləğ 31,000 ₺-dən çoxdursa, xüsusi VIP 33.50 ₼ (33 manat 50 qəpik) tətbiq olunur. Komissiya hər 1,000 ₺ üçün 20 ₺ tutulur.',
    },
    {
      q: 'Minimum pul göndərişi məbləği nə qədərdir?',
      a: 'Sistemimizdə minimum göndəriş məbləği 1,000 ₺-dir. 1,000 ₺-dən aşağı pul göndərmək qətiyyən mümkün deyil. 1,000 ₺ və yuxarı istənilən məbləğ limitsiz şəkildə qəbul olunur.',
    },
    {
      q: 'Komissiya haqqı nə qədərdir? Əlavə gizli xərc varmı?',
      a: 'Xeyr, heç bir gizli xərc yoxdur! Komissiya hər 1,000 ₺ üçün cəmi 20 ₺ təşkil edir. Məsələn: 5,000 ₺ üçün 100 ₺, 10,000 ₺ üçün 200 ₺, 31,000 ₺ üçün 620 ₺ tutulur. Saytımızdakı kalkulyatorda gördüyünüz xalis məbləğ tam olaraq hesabınıza çatır.',
    },
    {
      q: 'Pul kartıma nə qədər vaxta oturacaq?',
      a: 'Bütün əməliyyatlar ödəniş təsdiqləndiyi andan etibarən 5–15 dəqiqə ərzində icra edilir. Birbank, Kapital Bank, ABB, Leobank və ya Türkiyə banklarına dərhal daxil olur.',
    },
    {
      q: 'Hansı Azərbaycan bankları və kartları dəstəklənir?',
      a: 'Azərbaycanın bütün bank kartları dəstəklənir: Kapital Bank (Birbank), ABB (Azərbaycan Beynəlxalq Bankı), Leobank, PAŞA Bank, AccessBank, Bank Respublika və digərləri. Kart nömrənizi (16 rəqəm) təqdim etməyiniz kifayətdir.',
    },
    {
      q: 'Türkiyədə hansı banklardan ödəniş qəbul edirsiniz?',
      a: 'Türkiyənin bütün əsas bankları: Ziraat Bankası, Türkiye İş Bankası, Garanti BBVA, VakıfBank, Yapı Kredi, QNB Finansbank və FAST ani köçürmə sistemi ilə 7/24 qəbul edilir.',
    },
    {
      q: 'Nağd şəkildə təhvil almaq və ya ödəmək mümkündürmü?',
      a: 'Bəli, Bakı və İstanbuldakı əlaqə mərkəzlərimizdə həm nağd ödəniş etmək, həm də nağd valyutanı təhvil almaq mümkündür. Zəhmət olmasa ofisə yaxınlaşmazdan öncə WhatsApp vasitəsilə rezervasiya edin.',
    },
    {
      q: 'Əməliyyatı necə rəsmiləşdirirsiniz və qəbz verirsinizmi?',
      a: 'Bütün köçürmələr rəsmi bank kanalları vasitəsilə icra edilir və əməliyyat tamamlanan kimi rəsmi bank çıxarışı (dekont / qəbz) dərhal WhatsApp vasitəsilə sizə təqdim edilir.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#e5c07b] text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>Şəffaf və Rəsmi Qaydalar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Tez-tez Verilən Suallar
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl mx-auto">
          Valyuta köçürməsi, məzənnələr, komissiya və icraat müddəti ilə bağlı ən vacib sualların cavabları.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#090f1d] border border-white/10 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-white hover:text-[#e5c07b] transition cursor-pointer gap-4"
              >
                <span>{faq.q}</span>
                <span className="p-1 rounded-lg bg-white/[0.05] text-slate-400 shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Direct Contact Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#080d19] border border-white/10 text-center space-y-4">
        <h3 className="text-lg sm:text-xl font-bold text-white">
          Sualınıza cavab tapmadınız?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          İmamverdi Məmmədov ilə 7/24 birbaşa WhatsApp vasitəsilə əlaqə saxlayaraq dəqiq cavab ala bilərsiniz.
        </p>
        <div>
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm shadow-md transition"
          >
            <WhatsAppLogo className="w-4 h-4 fill-white" />
            <span>WhatsApp ilə Sual Ver: {WHATSAPP_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Calculator } from '../components/Calculator';
import { 
  Calculator as CalcIcon, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Percent,
  Clock,
  Building2
} from 'lucide-react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME } from '../types';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000 } from '../utils/calculator';

interface CalculatorPageProps {
  onNavigate: (page: NavPage) => void;
}

export const CalculatorPage: React.FC<CalculatorPageProps> = ({
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10 sm:space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[#e5c07b] text-xs font-semibold">
          <CalcIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>TRY ⇄ AZN Dəqiq Hesablama Mərkəzi</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Türkiyə Lirəsi & Manat{' '}
          <span className="text-[#e5c07b]">
            Kalkulyatoru
          </span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          Köçürmək istədiyiniz məbləği daxil edin. Minimum 1,000 ₺ şərtinə uyğun olaraq 33.10 və ya 33.50 VIP kursu və hər 1,000 ₺-yə 20 ₺ komissiya anında hesablanacaq.
        </p>
      </div>

      {/* Main Full Calculator */}
      <div className="max-w-3xl mx-auto">
        <Calculator initialAmount={15000} />
      </div>

      {/* Comparison: MIHValyuta vs Regular Banks */}
      <div className="p-6 sm:p-10 rounded-2xl bg-[#080d19] border border-white/10 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            MIHValyuta ({FOUNDER_NAME}) vs Standart Bank Köçürmələri
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Niyə minlərlə müştəri bankların uzun SWIFT gözləmələri yerinə bizi seçir?
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#0c1424] text-slate-300 uppercase text-xs font-semibold">
              <tr>
                <th className="py-3.5 px-5">Xüsusiyyət</th>
                <th className="py-3.5 px-5 bg-[#d4af37]/10 text-[#e5c07b] font-bold border-x border-[#d4af37]/20">
                  MIHValyuta.com
                </th>
                <th className="py-3.5 px-5 text-slate-400">Ənənəvi Banklar (SWIFT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05] text-slate-300">
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Dəstəklənən Valyuta</td>
                <td className="py-3.5 px-5 font-bold text-emerald-400 bg-[#d4af37]/5 border-x border-[#d4af37]/20">
                  Yalnız və yalnız TRY ⇄ AZN (Dəqiq ixtisaslaşma)
                </td>
                <td className="py-3.5 px-5 text-slate-400">Kəsişən valyuta və konvertasiya itkisi</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Məzənnə Şəffaflığı</td>
                <td className="py-3.5 px-5 font-bold text-[#e5c07b] bg-[#d4af37]/5 border-x border-[#d4af37]/20 font-mono">
                  1,000 ₺ = 33.10 ₼ | 31k+ = 33.50 ₼ VIP
                </td>
                <td className="py-3.5 px-5 text-slate-400">Gözlənilməz komissiyalar və aşağı kurs</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Komissiya Haqqı</td>
                <td className="py-3.5 px-5 font-bold text-emerald-400 bg-[#d4af37]/5 border-x border-[#d4af37]/20 font-mono">
                  Hər 1,000 ₺ üçün cəmi 20 ₺ (Gizli xərc yoxdur)
                </td>
                <td className="py-3.5 px-5 text-slate-400">%3–%7 gizli komissiya + vasitəçi bank xərci</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">İcraat Sürəti</td>
                <td className="py-3.5 px-5 font-bold text-emerald-400 bg-[#d4af37]/5 border-x border-[#d4af37]/20 font-mono">
                  5 – 15 Dəqiqəyə kartdan-karta
                </td>
                <td className="py-3.5 px-5 text-slate-400">2 – 5 iş günü</td>
              </tr>
              <tr>
                <td className="py-3.5 px-5 font-semibold text-white">Rəsmi WhatsApp Xətti</td>
                <td className="py-3.5 px-5 font-bold text-[#e5c07b] bg-[#d4af37]/5 border-x border-[#d4af37]/20 font-mono">
                  {WHATSAPP_PHONE}
                </td>
                <td className="py-3.5 px-5 text-slate-400">Filial növbəsi və ya robot çağrı mərkəzi</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Calculation Examples */}
      <div className="space-y-6">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white text-center">
          Dəqiq Hesablama Nümunələri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">1,000 ₺ (Minimum Limit)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">33.10 qəpik</span>
            </div>
            <div className="text-2xl font-black text-white font-mono tabular-nums">1,000 ₺</div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2.5 border-t border-white/[0.06]">
              <div>Komissiya (hər 1000-ə 20 ₺): <strong className="text-[#e5c07b] font-mono">20 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-slate-200 font-mono">980 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-emerald-400 font-mono">~32.44 AZN</strong></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f1d] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">10,000 ₺ Sifariş</span>
              <span className="text-xs px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 font-mono">33.10 qəpik</span>
            </div>
            <div className="text-2xl font-black text-white font-mono tabular-nums">10,000 ₺</div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2.5 border-t border-white/[0.06]">
              <div>Komissiya (10 × 20 ₺): <strong className="text-[#e5c07b] font-mono">200 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-slate-200 font-mono">9,800 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-emerald-400 font-mono">~324.38 AZN</strong></div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#090f1d] border border-[#d4af37]/40 space-y-3 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[#d4af37] text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-bl-lg">
              VIP KURS ⭐
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#e5c07b]">50,000 ₺ (Böyük Həcm)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#e5c07b] font-mono font-bold">33.50 qəpik</span>
            </div>
            <div className="text-2xl font-black text-white font-mono tabular-nums">50,000 ₺</div>
            <div className="text-xs text-slate-400 space-y-1.5 pt-2.5 border-t border-white/[0.06]">
              <div>Komissiya (50 × 20 ₺): <strong className="text-[#e5c07b] font-mono">1,000 ₺</strong></div>
              <div>Xalis Lirə: <strong className="text-slate-200 font-mono">49,000 ₺</strong></div>
              <div>Təhvil alınacaq: <strong className="text-emerald-400 font-mono">~1,641.50 AZN</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Calculator } from '../components/Calculator';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, Subscriber } from '../types';
import { 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  UserCheck, 
  Zap, 
  Award, 
  Percent, 
  Check 
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000, RATE_AZN_TO_TRY } from '../utils/calculator';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

interface HomePageProps {
  onNavigate: (page: NavPage) => void;
  onOpenAuth: () => void;
  currentSubscriber: Subscriber | null;
}

interface RecentTransfer {
  id: string;
  from: string;
  to: string;
  amount: string;
  payout: string;
  bankPair: string;
  timeAgo: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuth,
  currentSubscriber,
}) => {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Valyuta dəyişmək istəyirəm.'
  )}`;

  const azerbaijanBanks = [
    { name: 'Kapital Bank (Birbank)', status: 'Ani 24/7' },
    { name: 'PAŞA Bank', status: 'Ani 24/7' },
    { name: 'ABB (Beynəlxalq Bank)', status: 'Ani 24/7' },
    { name: 'Leobank (Unibank)', status: 'Ani 24/7' },
    { name: 'AccessBank', status: 'Aktiv' },
    { name: 'Bank Respublika', status: 'Aktiv' },
  ];

  const turkeyBanks = [
    { name: 'Ziraat Bankası', status: 'FAST / Ani' },
    { name: 'Türkiye İş Bankası', status: 'FAST / Ani' },
    { name: 'Garanti BBVA', status: 'FAST / Ani' },
    { name: 'Vakıf Katılım / VakıfBank', status: 'FAST / Ani' },
    { name: 'YapıKredi', status: 'FAST / Ani' },
    { name: 'QNB Finansbank', status: 'FAST / Ani' },
  ];

  const recentTransfers: RecentTransfer[] = [
    { id: '1', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '8,000 ₺', payout: '264.80 ₼', bankPair: 'Ziraat ➔ Birbank', timeAgo: '2 dəq əvvəl' },
    { id: '2', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '35,000 ₺ (VIP)', payout: '1,172.50 ₼', bankPair: 'İş Bankası ➔ PAŞA Bank', timeAgo: '6 dəq əvvəl' },
    { id: '3', from: '🇦🇿 Bakı', to: '🇹🇷 Türkiyə', amount: '102 ₼', payout: '3,000 ₺', bankPair: 'Birbank ➔ Garanti BBVA', timeAgo: '11 dəq əvvəl' },
    { id: '4', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '15,000 ₺', payout: '496.50 ₼', bankPair: 'VakıfBank ➔ ABB', timeAgo: '17 dəq əvvəl' },
    { id: '5', from: '🇹🇷 Türkiyə', to: '🇦🇿 Bakı', amount: '50,000 ₺ (VIP)', payout: '1,675.00 ₼', bankPair: 'YapıKredi ➔ Leobank', timeAgo: '24 dəq əvvəl' },
  ];

  return (
    <div className="space-y-12 sm:space-y-20 py-4 sm:py-10">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Brand Statement & Authentic Value Proposition */}
          <div className="lg:col-span-5 space-y-6 text-left">
            {/* Founder Seal Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151B25] border border-white/[0.08] text-[#00F5D4] text-xs font-bold shadow-md">
              <span className="text-sm">🇹🇷</span>
              <span className="tracking-wide text-[#F5F7FA]">{FOUNDER_NAME} — <span className="text-[#00F5D4]">{SLOGAN}</span></span>
              <span className="text-sm">🇦🇿</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#F5F7FA] tracking-tight leading-[1.12]">
                Türkiyə ⇄ Azərbaycan{' '}
                <span className="block text-[#00F5D4]">
                  Sürətli Pul Transferi
                </span>
              </h1>
              <p className="text-[#9CA3AF] text-xs sm:text-base leading-relaxed">
                Türk Lirəsi (₺) və Azərbaycan Manatı (₼) arasında vasitəçisiz, ən sərfəli məzənnə ilə birbaşa kartdan-karta transfer. Cəmi <strong className="text-[#F5F7FA] font-bold">5–15 dəqiqəyə</strong> təhlükəsiz çatdırılma!
              </p>
            </div>

            {/* Official Conditions Terminal Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#10151D] border border-white/[0.08] space-y-3.5 shadow-2xl">
              <div className="text-[11px] font-bold text-[#F5F7FA] uppercase tracking-wider flex items-center justify-between pb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-1.5 font-mono">
                  <Zap className="w-3.5 h-3.5 text-[#00F5D4]" />
                  <span>Rəsmi Məzənnə Şərtləri</span>
                </div>
                <span className="text-[#00F5D4] font-mono text-[10px] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/30 font-bold">
                  DƏQİQ MƏLUMAT
                </span>
              </div>

              {/* Rate 1 */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#9CA3AF] font-semibold flex items-center gap-2">
                  <span>🇹🇷➔🇦🇿</span>
                  <span className="text-[#F5F7FA]">1,000 ₺ – 31,000 ₺</span>
                </span>
                <span className="font-mono font-bold text-[#00F5D4] bg-[#07090D] px-3 py-1 rounded-lg border border-white/[0.08] tabular-nums">
                  1,000 ₺ = {RATE_STANDARD_PER_1000.toFixed(2)} ₼
                </span>
              </div>

              {/* Rate 2 VIP */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#8B5CF6] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>31,000 ₺-dən yuxarı VIP</span>
                </span>
                <span className="font-mono font-black text-[#8B5CF6] bg-[#8B5CF6]/15 px-3 py-1 rounded-lg border border-[#8B5CF6]/35 tabular-nums">
                  1,000 ₺ = {RATE_VIP_PER_1000.toFixed(2)} ₼ ⭐
                </span>
              </div>

              {/* Rate 3 */}
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#9CA3AF] font-semibold flex items-center gap-2">
                  <span>🇦🇿➔🇹🇷</span>
                  <span className="text-[#F5F7FA]">Bakıdan Türkiyəyə</span>
                </span>
                <span className="font-mono font-bold text-[#00A8FF] bg-[#07090D] px-3 py-1 rounded-lg border border-white/[0.08] tabular-nums">
                  34 ₼ = 1,000 ₺
                </span>
              </div>

              {/* Transparent Commission & Limit */}
              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                <span className="text-[#9CA3AF]">Xidmət Komissiyası:</span>
                <span className="font-bold text-[#00F5D4]">
                  Hər 1,000 ₺ üçün cəmi 20 ₺
                </span>
              </div>

              <div className="text-[11px] text-[#9CA3AF] bg-[#151B25] p-2.5 rounded-xl border border-white/[0.08] text-center font-medium">
                ⚠️ <strong className="text-[#F5F7FA]">Minimum Limit:</strong> 1,000 ₺ (1,000 ₺ və üzəri istənilən məbləğ limitsizdir).
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 btn-whatsapp-premium py-3.5 px-6 rounded-xl text-sm font-bold flex items-center justify-center cursor-pointer"
              >
                <WhatsAppLogo className="w-5 h-5 fill-white shrink-0 mr-2" />
                <span>WhatsApp: {WHATSAPP_PHONE}</span>
              </a>

              {!currentSubscriber && (
                <button
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto btn-dark-elevated py-3.5 px-5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-[#00F5D4]" />
                  <span>Giriş / Abunə</span>
                </button>
              )}
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-left">
              <div className="p-3 rounded-xl bg-[#10151D] border border-white/[0.08]">
                <div className="text-lg sm:text-xl font-black text-[#00F5D4] font-mono tabular-nums">100%</div>
                <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] mt-0.5">Şəxsi Zəmanət</div>
              </div>
              <div className="p-3 rounded-xl bg-[#10151D] border border-white/[0.08]">
                <div className="text-lg sm:text-xl font-black text-[#8B5CF6] font-mono tabular-nums">5–15 Dəq</div>
                <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] mt-0.5">Kartdan-Karta</div>
              </div>
              <div className="p-3 rounded-xl bg-[#10151D] border border-white/[0.08]">
                <div className="text-lg sm:text-xl font-black text-[#00A8FF] font-mono tabular-nums">20 ₺</div>
                <div className="text-[10px] sm:text-[11px] text-[#9CA3AF] mt-0.5">Hər 1k ₺ üçün</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Calculator */}
          <div className="lg:col-span-7">
            <Calculator />
          </div>
        </div>
      </section>

      {/* 2. Live Transfer Activity Feed (Real-time proof) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0D1117] border border-white/[0.08]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00F5D4]"></span>
              </span>
              <span className="text-xs font-bold text-[#F5F7FA] tracking-wide uppercase font-mono">
                Son İcra Edilən Köçürmələr (Canlı Ticker)
              </span>
            </div>
            <span className="text-[11px] text-[#9CA3AF] font-mono">
              Orta icraat müddəti: <strong className="text-[#00F5D4]">7–10 dəqiqə</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-3">
            {recentTransfers.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#10151D] border border-white/[0.08] space-y-1.5"
              >
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#9CA3AF] font-medium">{item.from} ➔ {item.to}</span>
                  <span className="text-[#00F5D4] font-mono text-[10px] bg-[#00F5D4]/10 px-1.5 py-0.5 rounded border border-[#00F5D4]/30 font-bold">
                    Təsdiqləndi
                  </span>
                </div>
                <div className="flex items-baseline justify-between font-mono">
                  <span className="text-xs font-bold text-[#F5F7FA]">{item.amount}</span>
                  <span className="text-xs font-bold text-[#00F5D4]">{item.payout}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] pt-1 border-t border-white/[0.06]">
                  <span>{item.bankPair}</span>
                  <span className="font-mono">{item.timeAgo}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Transparent Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B25] border border-white/[0.08] text-[#00F5D4] text-xs font-bold">
            <Percent className="w-3.5 h-3.5" />
            <span>Niyə MIHValyuta?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
            Şəffaf Müqayisə Cədvəli
          </h2>
          <p className="text-[#9CA3AF] text-xs sm:text-sm">
            Bankların gizli komissiyaları və günlərlə gözləmə yerinə dərhal kartdan-karta xidmət
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-[#10151D] border border-white/[0.08] shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0D1117] text-[#9CA3AF] font-semibold border-b border-white/[0.08]">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Xidmət Meyarı</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#00F5D4] bg-[#00F5D4]/10 border-x border-[#00F5D4]/25 font-bold">
                    MIHValyuta (İmamverdi M.)
                  </th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#9CA3AF]">Standart Bank (SWIFT)</th>
                  <th className="py-3.5 px-4 sm:px-6 text-[#9CA3AF]">Ənənəvi Pul Köçürmələri</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-[#9CA3AF]">
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#F5F7FA]">İcraat Sürəti</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#00F5D4] bg-[#00F5D4]/5 border-x border-[#00F5D4]/25 font-mono">
                    ⚡ 5 – 15 Dəqiqə (Kartdan-karta)
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">1 – 3 İş Günü</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">1 – 2 Saat</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#F5F7FA]">Xidmət Komissiyası</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#F5F7FA] bg-[#00F5D4]/5 border-x border-[#00F5D4]/25 font-mono">
                    Hər 1,000 ₺ üçün cəmi 20 ₺
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">80 – 150 ₺ + Bank xərcləri</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">%4 – %8 Gizli faiz</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#F5F7FA]">Tətbiq Olunan Kurs</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#00F5D4] bg-[#00F5D4]/5 border-x border-[#00F5D4]/25 font-mono">
                    33.10 ₼ / VIP 33.50 ₼ (Sərfəli)
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">Aşağı rəsmi bank alışı</td>
                  <td className="py-3.5 px-4 sm:px-6 font-mono">Ən aşağı bazar kursu</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#F5F7FA]">Sənədləşmə & Qeydiyyat</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#F5F7FA] bg-[#00F5D4]/5 border-x border-[#00F5D4]/25">
                    Sadəcə kart nömrəsi və WhatsApp
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">Şöbəyə getmək, bəyannamə, növbə</td>
                  <td className="py-3.5 px-4 sm:px-6">Fiziki ofis, pasport yoxlanışı</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#F5F7FA]">Müştəri Dəstəyi</td>
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-[#00F5D4] bg-[#00F5D4]/5 border-x border-[#00F5D4]/25">
                    24/7 İmamverdi Məmmədov ilə birbaşa
                  </td>
                  <td className="py-3.5 px-4 sm:px-6">Avtomatik robotlar, uzun gözləmə</td>
                  <td className="py-3.5 px-4 sm:px-6">Məhdud iş saatları</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. Two Distinct Transfer Directions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-1.5 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B25] border border-white/[0.08] text-[#00F5D4] text-xs font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>İki İstiqamətli Şəffaf Xidmət</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
            Köçürmə Qaydaları və Şərtlər
          </h2>
          <p className="text-[#9CA3AF] text-xs sm:text-sm">
            Heç bir gizli xərc və vasitəçi olmadan, dəqiq məzənnələrlə birbaşa təhvil
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {/* Card 1: Türkiyədən Azərbaycana */}
          <div className="p-6 rounded-2xl bg-[#10151D] border border-white/[0.08] hover:border-[#00F5D4]/40 shadow-xl transition space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🇹🇷</span>
                <span className="text-[#9CA3AF] font-bold">➔</span>
                <span className="text-3xl">🇦🇿</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] border border-[#00F5D4]/30 font-mono">
                Sürətli Göndəriş
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">Türkiyədən Azərbaycana</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Ziraat, İş Bankası, Garanti, VakıfBank və digər Türk banklarından dərhal Azərbaycan kartlarına köçürmə
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#07090D] border border-white/[0.08] space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Minimum Məbləğ:</span>
                <span className="font-bold text-[#F5F7FA]">1,000 ₺ (Limitsiz)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">1,000 ₺ – 31,000 ₺:</span>
                <span className="font-bold text-[#00F5D4] tabular-nums">1,000 ₺ = 33.10 ₼</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">31,000 ₺+ VIP:</span>
                <span className="font-bold text-[#8B5CF6] tabular-nums">1,000 ₺ = 33.50 ₼ ⭐</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-white/[0.06]">
                <span className="text-[#9CA3AF]">Komissiya:</span>
                <span className="font-bold text-[#00F5D4]">Hər 1,000 ₺-yə 20 ₺</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Salam! Türkiyədən Azərbaycana pul göndərmək istəyirəm.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp-premium py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>Türkiyədən Göndər (WhatsApp)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Card 2: Azərbaycandan Türkiyəyə */}
          <div className="p-6 rounded-2xl bg-[#10151D] border border-white/[0.08] hover:border-[#00A8FF]/40 shadow-xl transition space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">🇦🇿</span>
                <span className="text-[#9CA3AF] font-bold">➔</span>
                <span className="text-3xl">🇹🇷</span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#00A8FF]/15 text-[#00A8FF] border border-[#00A8FF]/30 font-mono">
                Sürətli Təhvil
              </span>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">Azərbaycandan Türkiyəyə</h3>
              <p className="text-xs text-[#9CA3AF] mt-1">
                Kapital Bank, Birbank, ABB və Leobank hesablarınızdan Türkiyədəki istənilən karta çatdırılma
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#07090D] border border-white/[0.08] space-y-2 text-xs sm:text-sm font-mono">
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">İcraat Müddəti:</span>
                <span className="font-bold text-[#00F5D4]">5 – 15 Dəqiqə</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Tətbiq Edilən Kurs:</span>
                <span className="font-bold text-[#F5F7FA] tabular-nums">34 Manat = 1,000 ₺</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9CA3AF]">Komissiya Haqqı:</span>
                <span className="font-bold text-[#00F5D4]">Hər 1,000 ₺ üçün 20 ₺</span>
              </div>
              <div className="flex justify-between pt-1.5 border-t border-white/[0.06]">
                <span className="text-[#9CA3AF]">Türkiyə Bankları:</span>
                <span className="font-bold text-[#F5F7FA]">Bütün Türk banklarına ani FAST</span>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent('Salam! Azərbaycandan Türkiyəyə pul göndərmək istəyirəm.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-whatsapp-premium py-3.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>Azərbaycandan Göndər (WhatsApp)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. Visual 3-Step Guide */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
              3 Sadə Addımda Pul Köçürməsi
            </h2>
            <p className="text-[#9CA3AF] text-xs sm:text-sm">
              Mürəkkəb bank prosedurlarına və növbələrə ehtiyac yoxdur
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-xl bg-[#10151D] border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00F5D4]/20 text-[#00F5D4] font-mono font-black flex items-center justify-center text-sm border border-[#00F5D4]/40">
                1
              </div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Məbləği Hesablayın</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Kalkulyatorda məbləği yazın. Dəqiq kurs və hər 1,000 ₺-yə 20 ₺ komissiya anında hesablanır.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-xl bg-[#10151D] border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#8B5CF6]/20 text-[#8B5CF6] font-mono font-black flex items-center justify-center text-sm border border-[#8B5CF6]/40">
                2
              </div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">WhatsApp-a Yazın</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                "WhatsApp ilə Əlaqə" düyməsinə klikləyərək birbaşa İmamverdi Məmmədov ilə əlaqə saxlayın və rekvizitləri əldə edin.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-xl bg-[#10151D] border border-white/[0.08] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-[#00A8FF]/20 text-[#00A8FF] font-mono font-black flex items-center justify-center text-sm border border-[#00A8FF]/40">
                3
              </div>
              <h3 className="text-sm font-bold text-[#F5F7FA]">Kartınıza Təhvil Alın</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Cəmi 5–15 dəqiqə ərzində vəsait Azərbaycan və ya Türkiyə kartınıza rəsmi zəmanətli şəkildə daxil olur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Banks Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0D1117] border border-white/[0.08] space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B25] border border-white/[0.08] text-[#00F5D4] text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>Geniş Bank Şəbəkəsi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#F5F7FA] tracking-tight">
              Bütün Əsas Banklarla Ani Əlaqə
            </h2>
            <p className="text-[#9CA3AF] text-xs sm:text-sm">
              Türkiyə və Azərbaycanın bütün rəsmi bank kartlarına və hesablarına sürətli köçürmə
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {/* Azerbaijan Banks */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#00F5D4] flex items-center gap-2 uppercase tracking-wider font-mono">
                <span>🇦🇿</span>
                <span>Azərbaycan Bankları:</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {azerbaijanBanks.map((bank, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[#10151D] border border-white/[0.08] flex items-center justify-between text-xs text-[#F5F7FA]"
                  >
                    <span className="font-semibold truncate">{bank.name}</span>
                    <span className="text-[10px] text-[#00F5D4] font-mono shrink-0 pl-1">{bank.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Turkey Banks */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#8B5CF6] flex items-center gap-2 uppercase tracking-wider font-mono">
                <span>🇹🇷</span>
                <span>Türkiyə Bankları:</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {turkeyBanks.map((bank, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[#10151D] border border-white/[0.08] flex items-center justify-between text-xs text-[#F5F7FA]"
                  >
                    <span className="font-semibold truncate">{bank.name}</span>
                    <span className="text-[10px] text-[#8B5CF6] font-mono shrink-0 pl-1">{bank.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Founder's Guarantee Seal & Hotline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#151B25] to-[#0D1117] border border-white/[0.08] text-center space-y-5 shadow-2xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00F5D4]/15 border border-[#00F5D4]/30 text-[#00F5D4] text-xs font-bold">
            <ShieldCheck className="w-4 h-4 text-[#00F5D4]" />
            <span>RƏSMİ ŞƏXSİ ZƏMANƏT</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-[#F5F7FA] tracking-tight">
              {FOUNDER_NAME} — {SLOGAN}
            </h2>
            <p className="text-[#9CA3AF] text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              Hər bir köçürmə şəxsi məsuliyyət və tam dürüstlük prinsiplərinə əsaslanır. İstənilən sualınız və ya böyük həcmli köçürmələr üçün 24/7 birbaşa əlaqə saxlaya bilərsiniz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto btn-whatsapp-premium py-3.5 px-8 rounded-xl text-base font-black shadow-xl flex items-center justify-center cursor-pointer"
            >
              <WhatsAppLogo className="w-5 h-5 fill-white shrink-0 mr-2" />
              <span>WhatsApp ilə Əlaqə: {WHATSAPP_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

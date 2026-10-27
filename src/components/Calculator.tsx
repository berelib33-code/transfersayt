import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  calculateExchange, 
  buildWhatsAppExchangeUrl, 
  RATE_STANDARD_PER_1000, 
  RATE_VIP_PER_1000, 
  MIN_TL_AMOUNT,
} from '../utils/calculator';
import { 
  ArrowRightLeft, 
  AlertTriangle, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  Banknote,
  Receipt,
  Zap,
} from 'lucide-react';
import { WHATSAPP_PHONE, FOUNDER_NAME } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';

interface CalculatorProps {
  initialAmount?: number;
  initialFrom?: 'TRY' | 'AZN';
  initialTo?: 'TRY' | 'AZN';
  className?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({
  initialAmount = 5000,
  initialFrom = 'TRY',
  initialTo = 'AZN',
  className = '',
}) => {
  const [fromAmount, setFromAmount] = useState<number>(initialAmount);
  const [fromCurrency, setFromCurrency] = useState<'TRY' | 'AZN'>(initialFrom);
  const [toCurrency, setToCurrency] = useState<'TRY' | 'AZN'>(initialTo);
  const [copied, setCopied] = useState(false);

  // Exact exchange calculation (TRY ⇄ AZN only)
  const calc = useMemo(() => {
    return calculateExchange(fromAmount, fromCurrency, toCurrency);
  }, [fromAmount, fromCurrency, toCurrency]);

  const selectDirection = (from: 'TRY' | 'AZN') => {
    if (from === 'TRY') {
      setFromCurrency('TRY');
      setToCurrency('AZN');
      if (fromAmount < MIN_TL_AMOUNT || fromAmount === 100) {
        setFromAmount(5000);
      }
    } else {
      setFromCurrency('AZN');
      setToCurrency('TRY');
      if (fromAmount > 2000) {
        setFromAmount(100);
      }
    }
  };

  const handleSwapCurrencies = () => {
    if (fromCurrency === 'TRY') {
      selectDirection('AZN');
    } else {
      selectDirection('TRY');
    }
  };

  const presetAmountsTRY = [
    { label: '1,000 ₺ (Min)', value: 1000 },
    { label: '3,000 ₺', value: 3000 },
    { label: '5,000 ₺', value: 5000 },
    { label: '10,000 ₺', value: 10000 },
    { label: '20,000 ₺', value: 20000 },
    { label: '31,000 ₺ (VIP ⭐)', value: 31000 },
    { label: '50,000 ₺', value: 50000 },
  ];

  const presetAmountsAZN = [
    { label: '34 ₼ (=1k ₺)', value: 34 },
    { label: '100 ₼', value: 100 },
    { label: '200 ₼', value: 200 },
    { label: '500 ₼', value: 500 },
    { label: '1,000 ₼', value: 1000 },
    { label: '2,000 ₼', value: 2000 },
  ];

  const handleCopySummary = () => {
    const text = `MIHValyuta.com (${FOUNDER_NAME}) Valyuta Hesablaması:\n• İstiqamət: ${calc.fromCurrency === 'TRY' ? 'Türkiyədən Azərbaycana' : 'Azərbaycandan Türkiyəyə'}\n• Göndərilən: ${calc.fromAmount.toLocaleString('az-AZ')} ${calc.fromCurrency}\n• Məzənnə: ${calc.rateDescription}\n• Komissiya: ${calc.commissionTL} ₺ (Hər 1,000 ₺-yə 20 ₺)\n• Xalis Alınacaq: ~${calc.receivedAmount.toLocaleString('az-AZ', { minimumFractionDigits: 2 })} ${calc.toCurrency}\n• İcraat: 5-15 dəqiqə\n• Əlaqə WhatsApp: ${WHATSAPP_PHONE}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const whatsappUrl = buildWhatsAppExchangeUrl(calc);

  // VIP Threshold progress calculation
  const vipThreshold = 31000;
  const isVipEligible = fromCurrency === 'TRY' && fromAmount >= vipThreshold;
  const vipProgressPercent = fromCurrency === 'TRY' ? Math.min(100, Math.round((fromAmount / vipThreshold) * 100)) : 0;
  const remainingForVip = Math.max(0, vipThreshold - fromAmount);

  return (
    <div
      className={`relative rounded-2xl sm:rounded-3xl bg-[#10151D] border border-white/[0.08] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.85)] p-4 sm:p-6 md:p-8 space-y-6 ${className}`}
    >
      {/* Precision Neon Top Edge Accent */}
      <div className="absolute top-0 inset-x-0 h-[2px] rounded-t-2xl sm:rounded-t-3xl bg-gradient-to-r from-[#00F5D4] via-[#8B5CF6] to-[#00A8FF]" />

      {/* Terminal Title & Copy Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] text-xs font-bold mb-1 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping" />
            <span className="tracking-wide">TRY ⇄ AZN HESABLAMA</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#F5F7FA] tracking-tight">
            Valyuta Mübadiləsi Kalkulyatoru
          </h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="self-start sm:self-auto btn-dark-elevated px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span className="text-[#00F5D4] font-bold">Kopyalandı!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span>Nəticəni Kopyala</span>
            </>
          )}
        </button>
      </div>

      {/* Step 1: Direction Segmented Switcher */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider">
            1. Köçürmə İstiqaməti
          </label>
          <button
            type="button"
            onClick={handleSwapCurrencies}
            className="btn-dark-elevated text-xs text-[#00F5D4] px-3 py-1 rounded-full flex items-center gap-1.5 border border-[#00F5D4]/30 cursor-pointer"
          >
            <ArrowRightLeft className="w-3 h-3 text-[#00F5D4]" />
            <span>İstiqaməti Dəyiş</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card: TRY -> AZN */}
          <button
            type="button"
            onClick={() => selectDirection('TRY')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
              fromCurrency === 'TRY'
                ? 'bg-[#151B25] border-[#00F5D4] shadow-[0_0_20px_rgba(0,245,212,0.15)] ring-1 ring-[#00F5D4]/40'
                : 'bg-[#0D1117] border-white/[0.08] hover:border-white/20 text-[#9CA3AF]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇹🇷</span>
                <span className="text-[#9CA3AF] font-bold">➔</span>
                <span className="text-2xl">🇦🇿</span>
              </div>
              {fromCurrency === 'TRY' && (
                <span className="px-2 py-0.5 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] text-[10px] font-bold border border-[#00F5D4]/30 font-mono">
                  SEÇİLDİ
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-[#F5F7FA]">Türkiyədən Azərbaycana</div>
            <div className="text-xs font-mono font-bold text-[#00F5D4] mt-1 tabular-nums">
              1,000 ₺ = 33.10 ₼
            </div>
            <div className="text-[11px] text-[#9CA3AF] mt-0.5">
              31,000 ₺+ üçün: <span className="text-[#8B5CF6] font-bold">33.50 ₼ VIP ⭐</span>
            </div>
          </button>

          {/* Card: AZN -> TRY */}
          <button
            type="button"
            onClick={() => selectDirection('AZN')}
            className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative ${
              fromCurrency === 'AZN'
                ? 'bg-[#151B25] border-[#00A8FF] shadow-[0_0_20px_rgba(0,168,255,0.15)] ring-1 ring-[#00A8FF]/40'
                : 'bg-[#0D1117] border-white/[0.08] hover:border-white/20 text-[#9CA3AF]'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇦🇿</span>
                <span className="text-[#9CA3AF] font-bold">➔</span>
                <span className="text-2xl">🇹🇷</span>
              </div>
              {fromCurrency === 'AZN' && (
                <span className="px-2 py-0.5 rounded-full bg-[#00A8FF]/15 text-[#00A8FF] text-[10px] font-bold border border-[#00A8FF]/30 font-mono">
                  SEÇİLDİ
                </span>
              )}
            </div>
            <div className="text-sm font-bold text-[#F5F7FA]">Azərbaycandan Türkiyəyə</div>
            <div className="text-xs font-mono font-bold text-[#00A8FF] mt-1 tabular-nums">
              34 ₼ = 1,000 ₺
            </div>
            <div className="text-[11px] text-[#9CA3AF] mt-0.5">
              Türk bank kartlarına birbaşa təhvil
            </div>
          </button>
        </div>
      </div>

      {/* Step 2: Amount Entry Box */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider block">
          2. Göndərilən Məbləğ
        </label>

        {/* Input Box with Nested Dark Layer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#07090D] border border-white/[0.08] focus-within:border-[#00F5D4] transition-all space-y-2">
          <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
            <span className="font-semibold text-[#F5F7FA]">
              {fromCurrency === 'TRY' ? '🇹🇷 Türk Lirəsi (₺)' : '🇦🇿 Azərbaycan Manatı (₼)'}
            </span>
            <span className="font-mono text-[#00F5D4] bg-[#00F5D4]/10 px-2 py-0.5 rounded font-bold border border-[#00F5D4]/30">
              {fromCurrency === 'TRY' ? 'Min: 1,000 ₺' : 'Min: 34 ₼'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <input
              type="number"
              min="0"
              step="any"
              inputMode="decimal"
              value={fromAmount === 0 ? '' : fromAmount}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setFromAmount(isNaN(val) ? 0 : val);
              }}
              placeholder={fromCurrency === 'TRY' ? '5000' : '200'}
              className="w-full bg-transparent text-3xl sm:text-4xl md:text-5xl font-black text-[#F5F7FA] focus:outline-none font-mono tracking-tight tabular-nums placeholder-[#9CA3AF]/30"
            />
            <div className="shrink-0 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#151B25] border border-white/[0.08] text-[#F5F7FA] font-bold text-xs sm:text-base font-mono">
              {fromCurrency === 'TRY' ? '₺ TRY' : '₼ AZN'}
            </div>
          </div>
        </div>

        {/* VIP Threshold Meter (Only for TRY) */}
        {fromCurrency === 'TRY' && (
          <div className="p-3 sm:p-3.5 rounded-xl bg-[#151B25] border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 font-bold text-[#F5F7FA]">
                <Sparkles className="w-3.5 h-3.5 text-[#8B5CF6]" />
                <span>31,000 ₺ VIP Məzənnə Həddi (33.50 ₼)</span>
              </span>
              {isVipEligible ? (
                <span className="text-[#00F5D4] font-bold font-mono text-[11px] bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/30">
                  VIP AKTİVDİR (+40 qəpik/1k)
                </span>
              ) : (
                <span className="text-[#9CA3AF] font-mono text-[11px]">
                  Qalır: <strong className="text-[#F5F7FA]">{remainingForVip.toLocaleString('az-AZ')} ₺</strong>
                </span>
              )}
            </div>

            <div className="h-2 w-full rounded-full bg-[#07090D] overflow-hidden border border-white/[0.06]">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  isVipEligible ? 'bg-gradient-to-r from-[#00F5D4] to-[#8B5CF6]' : 'bg-gradient-to-r from-slate-600 to-[#8B5CF6]'
                }`}
                style={{ width: `${vipProgressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Minimum 1,000 TL Alert */}
        {fromCurrency === 'TRY' && fromAmount > 0 && fromAmount < MIN_TL_AMOUNT && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <strong className="block font-bold text-white">
                Minimum hədd 1,000 ₺-dir!
              </strong>
              <span className="text-[12px] opacity-90">
                1,000 ₺-dən aşağı pul göndərmək qəbul edilmir. 1,000 ₺ və üzəri istənilən məbləğ tam limitsizdir.
              </span>
            </div>
          </div>
        )}

        {/* Presets Row */}
        <div className="space-y-1.5">
          <div className="text-[11px] text-[#9CA3AF] font-medium">Sürətli məbləğ seçimləri:</div>
          <div className="flex flex-wrap gap-2">
            {(fromCurrency === 'TRY' ? presetAmountsTRY : presetAmountsAZN).map((preset) => {
              const isSelected = fromAmount === preset.value;
              return (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setFromAmount(preset.value)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#00F5D4] text-[#07090D] shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                      : 'bg-[#151B25] hover:bg-[#1c2432] text-[#F5F7FA] border border-white/[0.08]'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step 3: Financial Receipt Breakdown */}
      <div className="space-y-3">
        <label className="text-xs font-bold text-[#9CA3AF] uppercase tracking-wider block flex items-center gap-1.5">
          <Receipt className="w-3.5 h-3.5 text-[#00F5D4]" />
          <span>3. Hesablama və Təhvil Qəbzi</span>
        </label>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#07090D] border border-white/[0.08] space-y-3 shadow-inner">
          {/* Rate Row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] text-xs sm:text-sm">
            <div>
              <span className="text-[#9CA3AF] font-medium">Tətbiq Edilən Məzənnə:</span>
              <span className="block text-[11px] text-[#9CA3AF]/70 mt-0.5">{calc.rateDescription}</span>
            </div>
            <div className="text-right">
              <span className="font-mono font-bold text-[#F5F7FA] text-sm sm:text-base tabular-nums">
                {fromCurrency === 'TRY'
                  ? `1,000 ₺ = ${calc.appliedRatePer1000.toFixed(2)} ₼`
                  : `34 ₼ = 1,000 ₺`}
              </span>
              {calc.isVipTier && (
                <span className="block text-[11px] text-[#8B5CF6] font-bold">
                  ⭐ 31k+ VIP Məzənnə
                </span>
              )}
            </div>
          </div>

          {/* Commission Row */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.08] text-xs sm:text-sm">
            <div>
              <span className="text-[#9CA3AF] font-medium">Xidmət Komissiyası:</span>
              <span className="block text-[11px] text-[#9CA3AF]/70 mt-0.5">
                Hər 1,000 ₺ üçün cəmi 20 ₺
              </span>
            </div>
            <div className="text-right font-mono font-bold text-[#00F5D4] text-sm sm:text-base tabular-nums">
              <span>{calc.commissionTL.toLocaleString('az-AZ')} ₺</span>
            </div>
          </div>

          {/* Final Payout Amount Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <div>
              <span className="text-sm sm:text-base font-extrabold text-[#F5F7FA] block">
                {toCurrency === 'AZN' ? 'Kartınıza Daxil Olacaq Məbləğ:' : 'Türkiyədə Təhvil Veriləcək Məbləğ:'}
              </span>
              <span className="text-xs text-[#00F5D4] flex items-center gap-1 font-semibold mt-0.5">
                <Clock className="w-3.5 h-3.5" />
                <span>5 – 15 Dəqiqə ərzində kartdan karta</span>
              </span>
            </div>

            <div className="text-left sm:text-right">
              {calc.isValidMin ? (
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#00F5D4] font-mono tracking-tight block tabular-nums">
                  ~{calc.receivedAmount.toLocaleString('az-AZ', { minimumFractionDigits: 2 })} {calc.toCurrency === 'AZN' ? '₼' : '₺'}
                </span>
              ) : (
                <span className="text-xs text-rose-400 font-mono font-bold">
                  Ən azı 1,000 ₺ tələb olunur
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step 4: WhatsApp Action Button */}
      <div className="pt-1">
        {calc.isValidMin ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full btn-whatsapp-premium py-4 px-6 rounded-2xl text-base sm:text-lg font-black shadow-xl flex items-center justify-center cursor-pointer"
          >
            <WhatsAppLogo className="w-5 h-5 sm:w-6 sm:h-6 fill-white shrink-0 mr-2.5" />
            <span>WhatsApp ilə Dərhal Əlaqə Saxla</span>
            <span className="hidden md:inline ml-3 bg-black/25 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold">
              {WHATSAPP_PHONE}
            </span>
          </a>
        ) : (
          <div className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-[#0D1117] border border-white/[0.08] text-[#9CA3AF] font-bold text-sm cursor-not-allowed">
            <AlertTriangle className="w-4 h-4 text-[#8B5CF6]" />
            <span>Mübadilə üçün minimum 1,000 ₺ daxil edin</span>
          </div>
        )}
      </div>

      {/* Trust & Guarantee Bottom Seal */}
      <div className="pt-2 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9CA3AF]">
        <div className="flex items-center gap-2 text-[#00F5D4] font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>İmamverdi Məmmədov — Rəsmi Güvən Zəmanəti</span>
        </div>
        <div className="flex items-center gap-2 text-[#9CA3AF] font-mono text-[11px]">
          <span>Birbank</span> • <span>Kapital</span> • <span>ABB</span> • <span>Ziraat</span> • <span>İş Bankası</span>
        </div>
      </div>
    </div>
  );
};

import { CalculationResult, WHATSAPP_RAW_NUMBER, WHATSAPP_PHONE } from '../types';

export const RATE_TRY_TO_AZN_STANDARD = 33.10; // Türkiyədən Bakıya: 1,000 ₺ = 33.10 ₼ (33 manat 10 qəpik)
export const RATE_TRY_TO_AZN_VIP = 33.50; // Türkiyədən Bakıya (31 min TL-dən yuxarı): 1,000 ₺ = 33.50 ₼ (33 manat 50 qəpik)
export const RATE_STANDARD_PER_1000 = RATE_TRY_TO_AZN_STANDARD;
export const RATE_VIP_PER_1000 = RATE_TRY_TO_AZN_VIP;
export const RATE_AZN_TO_TRY = 34.00; // Bakıdan Türkiyəyə: 34 Manat = 1,000 ₺
export const VIP_THRESHOLD = 31000; // 31,000 TL
export const MIN_TL_AMOUNT = 1000; // Minimum 1,000 TL
export const COMMISSION_PER_1000_TL = 20; // Hər 1,000 ₺ üçün 20 ₺ komissiya

/**
 * Calculates exchange strictly for TRY ⇄ AZN pair:
 * 1. Türkiyədən Bakıya (TRY → AZN):
 *    - 1,000 ₺ = 33.10 ₼ (33 manat 10 qəpik)
 *    - 31,000 ₺+ = 33.50 ₼ (33 manat 50 qəpik VIP)
 *    - Komissiya: Hər 1,000 ₺ üçün 20 ₺ tutulur.
 * 2. Bakıdan Türkiyəyə (AZN → TRY):
 *    - 34 Manat = 1,000 ₺ (Hər 34 AZN-ə 1,000 TL verilir)
 *    - Komissiya: Hər 1,000 ₺ üçün 20 ₺ tutulur.
 */
export function calculateExchange(
  fromAmount: number,
  fromCurrency: 'TRY' | 'AZN' = 'TRY',
  toCurrency: 'TRY' | 'AZN' = 'AZN'
): CalculationResult {
  const safeAmount = Math.max(0, fromAmount || 0);

  // Direction 1: TÜRKİYƏDƏN BAKIYA (TRY → AZN)
  if (fromCurrency === 'TRY') {
    const isValidMin = safeAmount >= MIN_TL_AMOUNT;
    const isVipTier = safeAmount > VIP_THRESHOLD;
    const appliedRatePer1000 = isVipTier ? RATE_TRY_TO_AZN_VIP : RATE_TRY_TO_AZN_STANDARD;
    const rateDescription = isVipTier
      ? 'Türkiyədən Bakıya: 1,000 ₺ = 33 manat 50 qəpik (33.50 ₼ VIP ⭐)'
      : 'Türkiyədən Bakıya: 1,000 ₺ = 33 manat 10 qəpik (33.10 ₼)';

    // Komissiya: Hər 1,000 ₺-yə 20 ₺ tutulur
    const commissionTL = Number(((safeAmount / 1000) * COMMISSION_PER_1000_TL).toFixed(2));
    const netTL = Math.max(0, safeAmount - commissionTL);

    // Çatacaq AZN: (netTL / 1000) * appliedRatePer1000
    const receivedAmount = Number(((netTL / 1000) * appliedRatePer1000).toFixed(2));

    return {
      fromAmount: safeAmount,
      fromCurrency: 'TRY',
      toCurrency: 'AZN',
      appliedRatePer1000,
      rateDescription,
      isVipTier,
      commissionTL,
      netTL: Number(netTL.toFixed(2)),
      receivedAmount,
      isValidMin,
      minAmountRequired: MIN_TL_AMOUNT,
    };
  }

  // Direction 2: BAKIDAN TÜRKİYƏYƏ (AZN → TRY)
  // User specified: "Bakıdan türkiyeye 34 manat 1000₺"
  // Hər 34 Manata 1,000 TL alınır!
  // Məs: 34 AZN verirsən -> 1,000 TL. Gross TL = (safeAmount / 34) * 1000
  const grossTL = (safeAmount / RATE_AZN_TO_TRY) * 1000;
  const isVipTier = grossTL > VIP_THRESHOLD;
  const appliedRatePer1000 = RATE_AZN_TO_TRY;
  const rateDescription = 'Bakıdan Türkiyəyə: 34 Manat = 1,000 ₺';

  // Komissiya: Hər 1,000 ₺ üçün 20 ₺ tutulur
  const commissionTL = Number(((grossTL / 1000) * COMMISSION_PER_1000_TL).toFixed(2));
  const netTL = Math.max(0, grossTL - commissionTL);
  const isValidMin = grossTL >= MIN_TL_AMOUNT;

  return {
    fromAmount: safeAmount,
    fromCurrency: 'AZN',
    toCurrency: 'TRY',
    appliedRatePer1000: RATE_AZN_TO_TRY,
    rateDescription,
    isVipTier,
    commissionTL,
    netTL: Number(grossTL.toFixed(2)),
    receivedAmount: Number(netTL.toFixed(2)),
    isValidMin,
    minAmountRequired: RATE_AZN_TO_TRY, // 34 AZN minimum = 1,000 TL
  };
}

export function buildWhatsAppExchangeUrl(calc: CalculationResult): string {
  const directionText = calc.fromCurrency === 'TRY'
    ? '🇹🇷 Türkiyədən 🇦🇿 Bakıya pul köçürməsi'
    : '🇦🇿 Bakıdan 🇹🇷 Türkiyəyə pul köçürməsi';

  const rateLine = calc.fromCurrency === 'TRY'
    ? `📊 Tətbiq Edilən Kurs: 1,000 ₺ = ${calc.appliedRatePer1000} ₼ (${calc.appliedRatePer1000 === 33.50 ? '33 manat 50 qəpik VIP' : '33 manat 10 qəpik'})`
    : `📊 Tətbiq Edilən Kurs: 34 Manat = 1,000 ₺`;

  const message = [
    `Salam, İmamverdi Məmmədov (MIHValyuta.com)! Valyuta dəyişmək istəyirəm.`,
    `--------------------------------`,
    `🔄 İstiqamət: ${directionText}`,
    `📌 Göndərilən Məbləğ: ${calc.fromAmount.toLocaleString('az-AZ')} ${calc.fromCurrency === 'TRY' ? '₺ (Türk Lirəsi)' : '₼ (Manat)'}`,
    rateLine,
    `🏷️ Xidmət Komissiyası: ${calc.commissionTL.toLocaleString('az-AZ')} ₺ (hər 1,000 ₺ üçün 20 ₺ tutulur)`,
    `🎯 Qəbul Ediləcək Xalis Məbləğ: ~${calc.receivedAmount.toLocaleString('az-AZ')} ${calc.toCurrency === 'AZN' ? '₼ (AZN)' : '₺ (TRY)'}`,
    `--------------------------------`,
    `Zəhmət olmasa kart və ya bank rekvizitlərini təqdim edin. Təşəkkür edirəm!`,
  ].join('\n');

  return `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function formatAZN(amount: number): string {
  return amount.toLocaleString('az-AZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' ₼';
}

export function formatTRY(amount: number): string {
  return amount.toLocaleString('az-AZ', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + ' ₺';
}

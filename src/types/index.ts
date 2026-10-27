export type NavPage = 
  | 'home' 
  | 'about' 
  | 'who-we-are' 
  | 'history' 
  | 'calculator' 
  | 'faq' 
  | 'contact';

export interface TryAznRate {
  pair: 'TRY/AZN' | 'AZN/TRY';
  title: string;
  minAmount: number;
  rateStandardPer1000: number; // 33.10 AZN (33 manat 10 qəpik)
  rateVipPer1000: number; // 33.50 AZN (33 manat 50 qəpik)
  standardRatePerUnit: number;
  vipRatePerUnit: number;
  commissionPer1000TL: number; // 20 TL
  vipThreshold: number; // 31,000 TL
  status: string;
  change24h: string;
}

export interface CalculationResult {
  fromAmount: number;
  fromCurrency: 'TRY' | 'AZN';
  toCurrency: 'TRY' | 'AZN';
  appliedRatePer1000: number; // 33.10 or 33.50
  rateDescription: string;
  isVipTier: boolean;
  commissionTL: number;
  netTL: number;
  receivedAmount: number;
  isValidMin: boolean;
  minAmountRequired: number;
}

export interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  loginTime: string;
  isVip?: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const WHATSAPP_PHONE = '+90 541 158 30 05';
export const WHATSAPP_RAW_NUMBER = '905411583005';
export const FOUNDER_NAME = 'İmamverdi Məmmədov';
export const SLOGAN = 'Güvənin Ünvanı';
export const DEFAULT_SUBSCRIBER_EMAIL = 'sysdmnn@gmail.com';
export const LOGO_IMAGE_URL = '/logo.jpg';

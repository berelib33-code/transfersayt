import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { formatPhoneDisplay } from '../utils/phone';

interface SmsOtpStepProps {
  phone: string;
  code: string;
  onCodeChange: (value: string) => void;
  onResend: () => void;
  resendBusy: boolean;
  retryAfterSec: number;
}

export const SmsOtpStep: React.FC<SmsOtpStepProps> = ({
  phone,
  code,
  onCodeChange,
  onResend,
  resendBusy,
  retryAfterSec,
}) => {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
        SMS təsdiq kodu <span className="text-rose-400">*</span>
      </label>
      <div className="relative">
        <ShieldCheck className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          required
          maxLength={8}
          value={code}
          onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, '').slice(0, 8))}
          placeholder="SMS-də gələn kod"
          className="w-full bg-[#07090D] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-[#F5F7FA] focus:outline-none focus:border-[#00F5D4] font-mono tracking-widest"
        />
      </div>
      <div className="flex items-center justify-between gap-2 mt-1">
        <p className="text-[11px] text-[#9CA3AF]">
          Kod {formatPhoneDisplay(phone)} nömrəsinə göndərildi
        </p>
        <button
          type="button"
          disabled={resendBusy || retryAfterSec > 0}
          onClick={onResend}
          className="text-[11px] font-semibold text-[#00F5D4] hover:text-[#00F5D4]/80 disabled:text-[#9CA3AF]/50 disabled:cursor-not-allowed cursor-pointer"
        >
          {retryAfterSec > 0 ? `Yenidən göndər (${retryAfterSec}s)` : 'Kodu yenidən göndər'}
        </button>
      </div>
    </div>
  );
};

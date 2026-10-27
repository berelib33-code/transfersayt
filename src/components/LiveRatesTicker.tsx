import React, { useEffect, useState } from 'react';
import { Clock, Sparkles, Zap } from 'lucide-react';
import { RATE_TRY_TO_AZN_STANDARD, RATE_TRY_TO_AZN_VIP, RATE_AZN_TO_TRY } from '../utils/calculator';

export const LiveRatesTicker: React.FC = () => {
  const [bakuTime, setBakuTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setBakuTime(
        now.toLocaleTimeString('az-AZ', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#050a14] border-b border-amber-500/25 text-xs py-1.5 px-3 sm:px-4 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Status Pill & Time */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>CANLI MƏZƏNNƏ</span>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-slate-400 text-[11px]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span className="font-mono text-slate-200">{bakuTime}</span>
          </div>
        </div>

        {/* Scrollable Rate Chips Strip */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
          {/* Türkiyədən Bakıya */}
          <div className="flex items-center gap-1 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-slate-800 text-[11px] sm:text-xs shrink-0">
            <span className="text-xs">🇹🇷➔🇦🇿</span>
            <span className="text-slate-400 font-medium">1,000 ₺ =</span>
            <span className="font-mono font-black text-emerald-400">
              {RATE_TRY_TO_AZN_STANDARD.toFixed(2)} ₼
            </span>
            <span className="hidden md:inline text-[10px] text-slate-500">(33m 10q)</span>
          </div>

          {/* Bakıdan Türkiyəyə */}
          <div className="flex items-center gap-1 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-amber-500/40 text-[11px] sm:text-xs shrink-0">
            <span className="text-xs">🇦🇿➔🇹🇷</span>
            <span className="text-amber-300 font-medium">34 ₼ =</span>
            <span className="font-mono font-black text-amber-300">
              1,000 ₺
            </span>
          </div>

          {/* Türkiyədən Bakıya VIP */}
          <div className="flex items-center gap-1 bg-gradient-to-r from-amber-950/40 to-slate-900 px-2.5 py-0.5 rounded-lg border border-amber-500/40 text-[11px] sm:text-xs shrink-0">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-amber-200 font-medium">31k+ VIP:</span>
            <span className="font-mono font-black text-amber-300">
              {RATE_TRY_TO_AZN_VIP.toFixed(2)} ₼
            </span>
          </div>

          {/* Commission: 20 TL */}
          <div className="flex items-center gap-1 bg-slate-900/90 px-2.5 py-0.5 rounded-lg border border-teal-500/40 text-teal-300 text-[11px] sm:text-xs shrink-0">
            <Zap className="w-3 h-3 text-teal-400" />
            <span>Komissiya: <strong className="text-white font-mono">20 ₺</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { Subscriber } from '../types';
import { RATE_TRY_TO_AZN_STANDARD, RATE_TRY_TO_AZN_VIP, RATE_AZN_TO_TRY } from '../utils/calculator';
import { Sparkles, UserCheck, ShieldCheck, Clock } from 'lucide-react';

interface LiveStatusBarProps {
  currentSubscriber: Subscriber | null;
  onOpenAuth: () => void;
}

export const LiveStatusBar: React.FC<LiveStatusBarProps> = ({
  currentSubscriber,
  onOpenAuth,
}) => {
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
    <div className="bg-[#07090D] border-b border-white/[0.08] text-xs py-2 px-3 sm:px-6 select-none relative z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Operational Status & Clocks */}
        <div className="flex items-center gap-2.5 overflow-x-auto scrollbar-none py-0.5">
          {/* Live System Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] font-bold text-[10px] sm:text-[11px] shrink-0 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F5D4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F5D4]"></span>
            </span>
            <span className="tracking-wide">CANLI FX</span>
          </div>

          {/* Time with Flag */}
          <div className="hidden sm:flex items-center gap-1.5 text-[#9CA3AF] text-[11px] font-mono shrink-0 pl-1">
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
            <span>Bakı/İstanbul:</span>
            <span className="text-[#F5F7FA] font-bold tabular-nums">{bakuTime}</span>
          </div>

          <div className="h-3 w-px bg-white/[0.08] hidden sm:block" />

          {/* Rate 1: Standard TRY -> AZN */}
          <div className="flex items-center gap-1.5 bg-[#10151D] px-3 py-1 rounded-lg border border-white/[0.08] text-[11px] text-[#F5F7FA] shrink-0 font-mono">
            <span>🇹🇷➔🇦🇿</span>
            <span className="text-[#9CA3AF]">1,000 ₺ =</span>
            <span className="font-bold text-[#00F5D4] tabular-nums">
              {RATE_TRY_TO_AZN_STANDARD.toFixed(2)} ₼
            </span>
          </div>

          {/* Rate 2: VIP 31k+ with Secondary Neon (#8B5CF6) */}
          <div className="flex items-center gap-1.5 bg-[#10151D] px-3 py-1 rounded-lg border border-[#8B5CF6]/35 text-[#F5F7FA] shrink-0 font-mono">
            <span className="inline-flex items-center gap-1 font-bold text-[#8B5CF6]">
              <Sparkles className="w-3 h-3 text-[#8B5CF6]" />
              <span>31k+ VIP:</span>
            </span>
            <span className="font-black text-[#8B5CF6] tabular-nums">
              {RATE_TRY_TO_AZN_VIP.toFixed(2)} ₼
            </span>
          </div>

          {/* Rate 3: AZN -> TRY */}
          <div className="flex items-center gap-1.5 bg-[#10151D] px-3 py-1 rounded-lg border border-white/[0.08] text-[11px] text-[#F5F7FA] shrink-0 font-mono">
            <span>🇦🇿➔🇹🇷</span>
            <span className="text-[#9CA3AF]">Bakıdan:</span>
            <span className="font-bold text-[#F5F7FA] tabular-nums">
              {RATE_AZN_TO_TRY.toFixed(0)} ₼ = 1,000 ₺
            </span>
          </div>

          {/* Commission Note */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#9CA3AF] bg-[#151B25] px-2.5 py-1 rounded-lg border border-white/[0.08] shrink-0 font-mono">
            <span>Komissiya:</span>
            <span className="font-bold text-[#00F5D4]">Hər 1,000 ₺-yə 20 ₺</span>
          </div>
        </div>

        {/* Right: Security & Subscriber Status */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden md:flex items-center gap-1 text-[11px] text-[#9CA3AF]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
            <span>Şəxsi Zəmanət</span>
          </div>

          {currentSubscriber ? (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 bg-[#00F5D4]/15 border border-[#00F5D4]/40 px-3 py-1 rounded-full text-[#00F5D4] font-bold text-[11px] cursor-pointer hover:bg-[#00F5D4]/25 transition"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span className="truncate max-w-[120px] font-mono">{currentSubscriber.name || currentSubscriber.phone || currentSubscriber.email}</span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 btn-dark-elevated px-3 py-1 rounded-full text-[#F5F7FA] font-semibold text-[11px] cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span>Daxil Ol</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

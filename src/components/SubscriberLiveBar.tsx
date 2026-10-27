import React from 'react';
import { Subscriber } from '../types';
import { UserCheck, Sparkles, Bell, CheckCircle2 } from 'lucide-react';

interface SubscriberLiveBarProps {
  currentSubscriber: Subscriber | null;
  subscribers: Subscriber[];
  onOpenAuth: () => void;
}

export const SubscriberLiveBar: React.FC<SubscriberLiveBarProps> = ({
  currentSubscriber,
  subscribers,
  onOpenAuth,
}) => {
  return (
    <div className="bg-gradient-to-r from-[#040811] via-[#071120] to-[#040811] border-b border-amber-500/20 py-1 px-3 sm:px-4 text-xs select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
        {/* Left: Abunə status & Flags */}
        <div className="flex items-center gap-2 shrink-0">
          {currentSubscriber ? (
            <div className="flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-emerald-300 font-semibold text-[11px] shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Daxil:</span>
              <strong className="font-mono text-white underline cursor-pointer" onClick={onOpenAuth}>
                {currentSubscriber.email}
              </strong>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 font-bold text-[11px] transition cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Abunə Ol</span>
            </button>
          )}

          {/* Quick Flag Pair */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/90 border border-slate-800 text-[10px] sm:text-[11px] text-slate-300 shrink-0">
            <span>🇹🇷 ⇄ 🇦🇿</span>
            <span className="hidden sm:inline font-semibold text-amber-300">Türkiyə ⇄ Azərbaycan</span>
          </div>
        </div>

        {/* Right: Notification & Registered admin notice */}
        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] shrink-0">
          <div className="flex items-center gap-1 text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-800">
            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="hidden sm:inline">Qeydiyyat:</span>
            <span className="font-mono font-bold text-amber-300">sysdmnn@gmail.com</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-teal-400 font-medium">
            <Bell className="w-3 h-3" />
            <span>Twilio Qoşulub ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
};

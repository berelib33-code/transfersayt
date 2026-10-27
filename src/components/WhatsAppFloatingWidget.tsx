import React, { useState } from 'react';
import { WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';
import { X } from 'lucide-react';

export const WhatsAppFloatingWidget: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Valyuta mübadiləsi və pul köçürməsi üçün müraciət edirəm. Zəhmət olmasa kömək edin.'
  )}`;

  return (
    <div className="hidden lg:flex fixed bottom-6 right-6 z-50 flex-col items-end gap-2 pointer-events-auto">
      {/* Popover Bubble */}
      {showTooltip && (
        <div className="relative bg-[#10151D] border border-white/[0.08] text-[#F5F7FA] text-xs py-2 px-3.5 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 max-w-xs">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-1.5 -left-1.5 bg-[#151B25] text-[#9CA3AF] hover:text-[#F5F7FA] rounded-full p-0.5 border border-white/[0.08] cursor-pointer"
            title="Bağla"
          >
            <X className="w-3 h-3" />
          </button>
          <div className="w-2 h-2 rounded-full bg-[#00F5D4] animate-ping shrink-0" />
          <div>
            <div className="font-bold text-[#00F5D4] flex items-center gap-1.5">
              <span>Canlı WhatsApp</span>
              <span className="text-[9px] bg-[#00F5D4]/15 text-[#00F5D4] px-1.5 py-0.2 rounded font-mono font-bold">24/7</span>
            </div>
            <div className="text-[11px] text-[#F5F7FA] font-mono font-bold">{WHATSAPP_PHONE}</div>
          </div>
        </div>
      )}

      {/* WhatsApp Circular Button */}
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp ilə Əlaqə"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#128C7E] hover:bg-[#25D366] text-white shadow-[0_8px_24px_rgba(0,245,212,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-[#00F5D4]/30"
        title={`WhatsApp ilə əlaqə: ${WHATSAPP_PHONE}`}
      >
        {/* Pulsing Outer Rings */}
        <span className="absolute -inset-1 rounded-full bg-[#00F5D4] opacity-25 animate-ping -z-10 group-hover:opacity-50" />
        <WhatsAppLogo className="w-7 h-7 fill-white" />
        {/* Status dot */}
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00F5D4] border-2 border-[#07090D]" />
      </a>
    </div>
  );
};

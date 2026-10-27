import React from 'react';
import { NavPage, Subscriber, WHATSAPP_RAW_NUMBER } from '../types';
import { WhatsAppLogo } from './WhatsAppLogo';
import { Calculator, Home, Menu, UserCheck } from 'lucide-react';

interface MobileBottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenAuth: () => void;
  onOpenMenu: () => void;
  currentSubscriber: Subscriber | null;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenAuth,
  onOpenMenu,
  currentSubscriber,
}) => {
  const whatsappUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Valyuta mübadiləsi üçün yazıram.'
  )}`;

  const itemClass = (active: boolean) =>
    `flex flex-col items-center justify-center gap-1 min-w-0 flex-1 py-1 text-[11px] font-bold transition-all cursor-pointer ${
      active ? 'text-[#00F5D4]' : 'text-[#9CA3AF] hover:text-[#F5F7FA]'
    }`;

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#07090D]/98 backdrop-blur-2xl border-t border-white/[0.08] pb-[env(safe-area-inset-bottom)] shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      <div className="grid grid-cols-5 h-16 items-center px-1">
        <button className={itemClass(currentPage === 'home')} onClick={() => onNavigate('home')}>
          <Home className="w-5 h-5" />
          <span>Əsas</span>
        </button>
        <button
          className={itemClass(currentPage === 'calculator')}
          onClick={() => onNavigate('calculator')}
        >
          <Calculator className="w-5 h-5" />
          <span>Hesabla</span>
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center -mt-5 cursor-pointer group"
        >
          <span className="w-13 h-13 rounded-full bg-[#128C7E] text-white shadow-[0_4px_20px_rgba(0,245,212,0.35)] flex items-center justify-center border-4 border-[#07090D] group-active:scale-90 transition-transform">
            <WhatsAppLogo className="w-6 h-6 fill-white" />
          </span>
          <span className="text-[10px] font-bold text-[#00F5D4] mt-0.5">WhatsApp</span>
        </a>
        <button className={itemClass(Boolean(currentSubscriber))} onClick={onOpenAuth}>
          <UserCheck className="w-5 h-5" />
          <span>{currentSubscriber ? 'Profil' : 'Giriş'}</span>
        </button>
        <button className={itemClass(false)} onClick={onOpenMenu}>
          <Menu className="w-5 h-5" />
          <span>Menyu</span>
        </button>
      </div>
    </nav>
  );
};

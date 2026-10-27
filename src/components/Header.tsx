import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavPage, WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, Subscriber } from '../types';
import { Logo } from './Logo';
import { WhatsAppLogo } from './WhatsAppLogo';
import {
  PhoneCall,
  Calculator,
  Users,
  History,
  Info,
  HelpCircle,
  Home,
  UserCheck,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { RATE_STANDARD_PER_1000, RATE_VIP_PER_1000, RATE_AZN_TO_TRY } from '../utils/calculator';

interface HeaderProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  currentSubscriber: Subscriber | null;
  onOpenAuth: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuChange: (open: boolean) => void;
}

const primaryItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Əsas', icon: <Home className="w-4 h-4" /> },
  { id: 'calculator', label: 'Valyuta Hesabla', icon: <Calculator className="w-4 h-4" /> },
];

const aboutItems: { id: NavPage; label: string; icon: React.ReactNode; hint: string }[] = [
  { id: 'about', label: 'Haqqımızda', icon: <Info className="w-4 h-4" />, hint: 'Platforma və zəmanət' },
  { id: 'who-we-are', label: 'Rəhbərlik', icon: <Users className="w-4 h-4" />, hint: 'İmamverdi Məmmədov və komanda' },
  { id: 'history', label: 'Təcrübə', icon: <History className="w-4 h-4" />, hint: 'Fəaliyyət illəri və etibar' },
];

const helpItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
  { id: 'faq', label: 'Suallar', icon: <HelpCircle className="w-4 h-4" /> },
  { id: 'contact', label: 'Əlaqə', icon: <PhoneCall className="w-4 h-4" /> },
];

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  currentSubscriber,
  onOpenAuth,
  mobileMenuOpen,
  onMobileMenuChange,
}) => {
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const aboutActive = aboutItems.some((item) => item.id === currentPage);

  const handleNavClick = (page: NavPage) => {
    onNavigate(page);
    onMobileMenuChange(false);
    setAboutOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setAboutOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAboutOpen(false);
        onMobileMenuChange(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    'Salam İmamverdi Məmmədov (MIHValyuta.com)! Valyuta mübadiləsi üçün əlaqə saxlayıram.'
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#07090D]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
      {/* Precision Neon Top Edge */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#00F5D4] via-[#8B5CF6] to-[#00A8FF]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem] gap-2 sm:gap-4">
          {/* Logo with Founder Identity */}
          <Logo
            size="md"
            spinning={true}
            onClick={() => handleNavClick('home')}
            className="hover:opacity-90 transition min-w-0"
          />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0D1117] p-1.5 rounded-full border border-white/[0.08]">
            {primaryItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/40 shadow-[0_0_12px_rgba(0,245,212,0.18)]'
                      : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B25]/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}

            {/* Dropdown for About */}
            <div className="relative" ref={aboutRef}>
              <button
                onClick={() => setAboutOpen((open) => !open)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  aboutActive
                    ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/40 shadow-[0_0_12px_rgba(0,245,212,0.18)]'
                    : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B25]/60'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  <span>Haqqımızda</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${aboutOpen ? 'rotate-180' : ''}`} />
                </span>
              </button>

              <AnimatePresence>
                {aboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-[calc(100%+8px)] left-0 w-64 rounded-2xl bg-[#10151D] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-2 z-50 backdrop-blur-2xl"
                  >
                    {aboutItems.map((item) => {
                      const isActive = currentPage === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition cursor-pointer ${
                            isActive
                              ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/30'
                              : 'text-[#F5F7FA] hover:bg-[#151B25]'
                          }`}
                        >
                          <span className={isActive ? 'text-[#00F5D4]' : 'text-[#8B5CF6]'}>{item.icon}</span>
                          <div className="flex-1 min-w-0">
                            <span className="block text-xs font-bold leading-tight">{item.label}</span>
                            <span className="block text-[10px] text-[#9CA3AF] truncate">
                              {item.hint}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {helpItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/40 shadow-[0_0_12px_rgba(0,245,212,0.18)]'
                      : 'text-[#9CA3AF] hover:text-[#F5F7FA] hover:bg-[#151B25]/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* User Profile / Login Button */}
            <button
              onClick={onOpenAuth}
              className={`hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition cursor-pointer btn-dark-elevated ${
                currentSubscriber
                  ? 'border-[#00F5D4]/50 text-[#00F5D4]'
                  : ''
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
              <span className="font-mono">
                {currentSubscriber
                  ? currentSubscriber.name?.split(' ')[0] || 'Profil'
                  : 'Giriş'}
              </span>
            </button>

            {/* Direct WhatsApp Callout */}
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Əlaqə"
              className="btn-whatsapp-premium px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold tracking-tight flex items-center"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white shrink-0 mr-1.5" />
              <span className="hidden sm:inline font-mono">{WHATSAPP_PHONE}</span>
              <span className="sm:hidden font-bold">WhatsApp</span>
            </a>

            {/* Custom Special Animated Hamburger Button */}
            <button
              onClick={() => onMobileMenuChange(!mobileMenuOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-[#10151D] border border-white/[0.08] flex flex-col items-center justify-center gap-1.5 p-2 transition cursor-pointer hover:border-[#00F5D4]/40 active:scale-95"
              aria-label={mobileMenuOpen ? 'Menyunu bağla' : 'Menyunu aç'}
              aria-expanded={mobileMenuOpen}
            >
              <span
                className={`w-5 h-[2px] bg-[#F5F7FA] rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[6px] !bg-[#00F5D4]' : ''
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#F5F7FA] rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-[2px] bg-[#F5F7FA] rounded-full transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[6px] !bg-[#00F5D4]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Special Animated Fullscreen / Spring Slide-Down Neo Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 bg-[#07090D]/90 backdrop-blur-2xl"
              onClick={() => onMobileMenuChange(false)}
            />

            {/* Drawer Container */}
            <motion.div
              initial={{ y: '-100%', opacity: 0.5 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 28, stiffness: 240 }}
              className="fixed inset-x-0 top-0 max-h-[92vh] overflow-y-auto bg-gradient-to-b from-[#0D1117] via-[#0D1117] to-[#07090D] border-b border-white/[0.08] px-5 pt-6 pb-8 shadow-[0_25px_60px_rgba(0,0,0,1)] rounded-b-3xl space-y-5"
            >
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4] animate-ping" />
                  <span className="text-xs font-mono font-bold text-[#F5F7FA] uppercase tracking-wider">
                    MIHValyuta FX Terminal
                  </span>
                </div>
                <button
                  onClick={() => onMobileMenuChange(false)}
                  className="px-3 py-1 rounded-full bg-[#151B25] text-[#9CA3AF] text-xs font-semibold hover:text-[#F5F7FA] border border-white/[0.08]"
                >
                  Bağla ✕
                </button>
              </div>

              {/* Live Rate Mini-Card in Hamburger */}
              <div className="p-3.5 rounded-2xl bg-[#10151D] border border-white/[0.08] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9CA3AF] font-medium flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#00F5D4]" />
                    <span>Canlı Məzənnə</span>
                  </span>
                  <span className="text-[#00F5D4] font-mono text-[10px] font-bold bg-[#00F5D4]/10 px-2 py-0.5 rounded border border-[#00F5D4]/30">
                    AKTİVDİR
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded-xl bg-[#07090D] border border-white/[0.08]">
                    <div className="text-[10px] text-[#9CA3AF]">1,000 ₺ (TRY)</div>
                    <div className="text-sm font-bold text-[#F5F7FA] tabular-nums">
                      {RATE_STANDARD_PER_1000.toFixed(2)} ₼
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-[#151B25] border border-[#8B5CF6]/35">
                    <div className="text-[10px] text-[#8B5CF6]">31k+ VIP ⭐</div>
                    <div className="text-sm font-black text-[#8B5CF6] tabular-nums">
                      {RATE_VIP_PER_1000.toFixed(2)} ₼
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Links Grid */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold px-1">
                  Əsas Naviqasiya
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {primaryItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`p-3.5 rounded-xl text-xs font-bold flex items-center justify-start gap-2.5 transition cursor-pointer ${
                          isActive
                            ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/40 shadow-[0_0_12px_rgba(0,245,212,0.2)]'
                            : 'bg-[#10151D] text-[#F5F7FA] border border-white/[0.08]'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Company & Guarantee Links */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold px-1">
                  Rəhbərlik və Şərtlər
                </p>
                <div className="grid grid-cols-1 gap-1.5">
                  {aboutItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                          isActive
                            ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/30'
                            : 'bg-[#10151D] text-[#F5F7FA] border border-white/[0.08]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={isActive ? 'text-[#00F5D4]' : 'text-[#8B5CF6]'}>{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Help & Contact */}
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider text-[#9CA3AF] font-bold px-1">
                  Dəstək
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {helpItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`p-3 rounded-xl text-xs font-bold flex items-center justify-start gap-2 transition cursor-pointer ${
                          isActive
                            ? 'bg-[#151B25] text-[#00F5D4] border border-[#00F5D4]/40'
                            : 'bg-[#10151D] text-[#F5F7FA] border border-white/[0.08]'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Quick Triggers */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    onMobileMenuChange(false);
                    onOpenAuth();
                  }}
                  className="w-full btn-dark-elevated py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-[#00F5D4]" />
                  <span>{currentSubscriber ? `Profil: ${currentSubscriber.name}` : 'Nömrə ilə giriş / Abunə'}</span>
                </button>
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-whatsapp-premium py-3.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2"
                >
                  <WhatsAppLogo className="w-4 h-4 fill-white" />
                  <span>Rəsmi WhatsApp: {WHATSAPP_PHONE}</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

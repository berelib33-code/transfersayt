import React, { useState } from 'react';
import { LOGO_IMAGE_URL, FOUNDER_NAME, SLOGAN } from '../types';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  spinning?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  spinning = true,
  className = '',
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 sm:w-10 sm:h-10',
    md: 'w-9 h-9 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-18 sm:h-18',
    xl: 'w-20 h-20 sm:w-24 sm:h-24',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Circular Rotating Logo Badge with Gold Halo */}
      <div className="relative group shrink-0">
        {/* Golden halo aura effect matching poster */}
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 rounded-full blur-[2px] opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse-subtle" />

        {/* Outer Ring & Rotating Badge */}
        <div
          className={`relative ${sizeClasses[size]} rounded-full p-[2px] bg-gradient-to-tr from-amber-300 via-amber-500 to-yellow-600 shadow-xl overflow-hidden`}
        >
          <div
            className={`w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out ${
              spinning ? 'animate-spin-slow' : ''
            }`}
            title={`${FOUNDER_NAME} - ${SLOGAN}`}
          >
            {/* Real Logo Image */}
            {!imageError ? (
              <img
                src={LOGO_IMAGE_URL}
                alt={`${FOUNDER_NAME} Logo`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                className={`w-full h-full object-cover rounded-full ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
              />
            ) : null}

            {/* Premium Gold Monogram Fallback Insignia from poster */}
            {(!imageLoaded || imageError) && (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-950 via-[#0a1424] to-amber-950/80 flex flex-col items-center justify-center border border-amber-400/50">
                <span className="font-black text-amber-300 tracking-tighter text-xs sm:text-sm font-serif leading-none">
                  İM
                </span>
                <span className="text-[5.5px] sm:text-[6.5px] text-amber-200/90 tracking-widest uppercase font-bold mt-0.5">
                  VALYUTA
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Brand Text with Flags */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-black tracking-tight bg-gradient-to-r from-amber-300 via-yellow-200 to-white bg-clip-text text-transparent text-sm sm:text-base lg:text-lg truncate">
              <span className="hidden sm:inline">İMAMVERDİ MƏMMƏDOV</span>
              <span className="sm:hidden">MIHValyuta</span>
            </span>
            <div className="flex items-center gap-0.5 text-xs shrink-0">
              <span title="Türkiyə">🇹🇷</span>
              <span title="Azərbaycan">🇦🇿</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-slate-300">
            <span className="text-amber-400 font-serif italic truncate">«Güvənin Ünvanı»</span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-emerald-400 font-bold tracking-wider">MIHValyuta.com</span>
          </div>
        </div>
      )}
    </div>
  );
};

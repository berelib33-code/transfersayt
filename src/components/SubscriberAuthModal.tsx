import React, { useEffect, useState } from 'react';
import { Subscriber } from '../types';
import { formatPhoneDisplay, normalizePhone } from '../utils/phone';
import { SmsOtpStep } from './SmsOtpStep';
import {
  Mail,
  X,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react';

interface SubscriberAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSubscriber: Subscriber | null;
  onLoginSuccess: (sub: Subscriber) => void;
  onLogout: () => void;
}

export const SubscriberAuthModal: React.FC<SubscriberAuthModalProps> = ({
  isOpen,
  onClose,
  currentSubscriber,
  onLoginSuccess,
  onLogout,
}) => {
  const [name, setName] = useState(currentSubscriber?.name || '');
  const [email, setEmail] = useState(currentSubscriber?.email || '');
  const [phone, setPhone] = useState(currentSubscriber?.phone || '+90 ');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [whatsappStatus, setWhatsappStatus] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpPhone, setOtpPhone] = useState('');
  const [retryAfterSec, setRetryAfterSec] = useState(0);

  useEffect(() => {
    if (retryAfterSec <= 0) return;
    const timer = window.setTimeout(() => setRetryAfterSec((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [retryAfterSec]);

  if (!isOpen) return null;

  const sendOtp = async (normalized: string) => {
    const res = await fetch('/api/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: normalized }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'SMS göndərilmədi');
    }
    setOtpPhone(normalized);
    setOtpStep(true);
    setRetryAfterSec(Number(data.retryAfterSec) || 45);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setWhatsappStatus('');

    if (!name.trim()) {
      setErrorMsg('Zəhmət olmasa ad və soyadınızı daxil edin');
      return;
    }

    const normalized = normalizePhone(phone);
    if (!normalized) {
      setErrorMsg('Düzgün mobil nömrə yazın. Məs: +90 541 158 30 05 və ya +994 50 123 45 67');
      return;
    }

    setLoading(true);
    try {
      if (!otpStep) {
        await sendOtp(normalized);
        setSuccessMsg('SMS ilə təsdiq kodu göndərildi.');
        return;
      }

      if (!otpCode || otpCode.replace(/\D/g, '').length < 4) {
        setErrorMsg('Telefonunuza gələn 4-6 rəqəmli kodu daxil edin');
        return;
      }

      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: normalized,
          email: email.trim() || undefined,
          otpCode: otpCode.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Qeydiyyat zamanı xəta baş verdi');
      }

      const sent = data.whatsappStatus === 'sent' || data.twilioStatus === 'sent';
      setWhatsappStatus(
        sent
          ? 'WhatsApp bildirişi sahibə göndərildi.'
          : 'Qeydiyyat alındı. WhatsApp bildirişi növbəyə yazıldı.'
      );
      setSuccessMsg(`Təbriklər ${name.split(' ')[0]}! Nömrənizlə giriş tamamlandı.`);
      onLoginSuccess(data.subscriber);
      setTimeout(() => {
        onClose();
      }, 1800);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Bağlantı xətası baş verdi.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#07090D]/85 backdrop-blur-md">
      <div className="w-full max-w-md max-h-[94vh] overflow-y-auto bg-[#10151D] border border-white/[0.08] rounded-t-3xl sm:rounded-2xl p-5 sm:p-7 shadow-2xl relative pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00F5D4] via-[#8B5CF6] to-[#00A8FF] rounded-t-3xl sm:rounded-t-2xl" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-[#151B25] text-[#9CA3AF] hover:text-[#F5F7FA] transition cursor-pointer"
          aria-label="Bağla"
        >
          <X className="w-5 h-5" />
        </button>

        {currentSubscriber ? (
          <div className="text-center space-y-5 pt-2">
            <div className="w-16 h-16 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F5D4]/15 text-[#00F5D4] font-semibold text-xs mb-2 border border-[#00F5D4]/30">
                <span className="w-2 h-2 rounded-full bg-[#00F5D4] animate-pulse" />
                <span>Aktiv Abunəçi</span>
              </div>
              <h3 className="text-xl font-bold text-[#F5F7FA]">{currentSubscriber.name}</h3>
              {currentSubscriber.phone && (
                <p className="text-sm font-mono text-[#00F5D4] mt-1">
                  {formatPhoneDisplay(currentSubscriber.phone)}
                </p>
              )}
              {currentSubscriber.email && !currentSubscriber.email.includes('@phone.mihvalyuta') && (
                <p className="text-xs font-mono text-[#9CA3AF] mt-0.5">{currentSubscriber.email}</p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[#07090D] border border-white/[0.08] text-xs text-left space-y-1.5">
              <div className="flex justify-between gap-3">
                <span className="text-[#9CA3AF]">Status</span>
                <span className="font-bold text-[#00F5D4]">Aktiv</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#9CA3AF]">Giriş</span>
                <span className="font-mono text-[#F5F7FA]">{currentSubscriber.loginTime}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#9CA3AF]">WhatsApp bildirişi</span>
                <span className="font-bold text-[#00F5D4]">Sahibə göndərilir</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl btn-neon-primary text-xs sm:text-sm cursor-pointer"
              >
                Tamam
              </button>
              <button
                onClick={onLogout}
                className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#151B25] hover:bg-rose-950/60 text-[#9CA3AF] hover:text-rose-300 border border-white/[0.08] text-xs font-semibold cursor-pointer transition"
              >
                <LogOut className="w-4 h-4" />
                Çıxış
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 pt-1">
            <div className="text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F5D4]/10 border border-[#00F5D4]/30 text-[#00F5D4] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mobil nömrə ilə giriş</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#F5F7FA]">Qeydiyyat və Giriş</h3>
              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                Nömrənizi daxil edin. Qeydiyyat tamamlanan kimi WhatsApp-a bildiriş ötürülür.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                  Ad və soyad <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Məs: Əli Əliyev"
                    className="w-full bg-[#07090D] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F5F7FA] focus:outline-none focus:border-[#00F5D4]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                  Mobil nömrə (WhatsApp) <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (otpStep) {
                        setOtpStep(false);
                        setOtpCode('');
                        setSuccessMsg('');
                      }
                    }}
                    placeholder="+90 541 158 30 05"
                    className="w-full bg-[#07090D] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F5F7FA] focus:outline-none focus:border-[#00F5D4] font-mono"
                  />
                </div>
                <p className="text-[11px] text-[#9CA3AF] mt-1">Türkiyə +90 və ya Azərbaycan +994</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#F5F7FA] mb-1">
                  Email <span className="text-[#9CA3AF] font-medium">(istəyə bağlı)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@numune.com"
                    className="w-full bg-[#07090D] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#F5F7FA] focus:outline-none focus:border-[#00F5D4] font-mono"
                  />
                </div>
              </div>

              {otpStep && (
                <SmsOtpStep
                  phone={otpPhone || normalizePhone(phone) || phone}
                  code={otpCode}
                  onCodeChange={setOtpCode}
                  resendBusy={loading}
                  retryAfterSec={retryAfterSec}
                  onResend={async () => {
                    setErrorMsg('');
                    setSuccessMsg('');
                    const normalized = normalizePhone(phone);
                    if (!normalized) {
                      setErrorMsg('Düzgün mobil nömrə yazın');
                      return;
                    }
                    setLoading(true);
                    try {
                      await sendOtp(normalized);
                      setOtpCode('');
                      setSuccessMsg('Yeni təsdiq kodu göndərildi.');
                    } catch (err: unknown) {
                      const message = err instanceof Error ? err.message : 'SMS göndərilmədi.';
                      setErrorMsg(message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
              )}

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{successMsg}</span>
                  </div>
                  {whatsappStatus && <p className="text-emerald-300 text-[11px]">{whatsappStatus}</p>}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl btn-neon-primary text-xs sm:text-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  otpStep ? 'Kod yoxlanılır...' : 'SMS göndərilir...'
                ) : (
                  <>
                    {otpStep ? 'Kodu təsdiqlə və qeydiyyat' : 'Nömrə ilə qeydiyyat'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-[#9CA3AF] text-center flex items-center justify-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00F5D4]" />
                <span>Sahibin WhatsApp-ına avtomatik bildiriş</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

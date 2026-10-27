import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck,
  Building,
  Copy,
  Check,
  UserCheck
} from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_RAW_NUMBER, FOUNDER_NAME, SLOGAN, DEFAULT_SUBSCRIBER_EMAIL } from '../types';
import { WhatsAppLogo } from '../components/WhatsAppLogo';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState(FOUNDER_NAME);
  const [phone, setPhone] = useState('+90 541 158 30 05');
  const [email, setEmail] = useState(DEFAULT_SUBSCRIBER_EMAIL);
  const [amount, setAmount] = useState('5,000 TL');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullMsg = [
      `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Əlaqə və sifariş forması:`,
      `Ad: ${name || 'Qeyd edilməyib'}`,
      `Email: ${email || 'Qeyd edilməyib'}`,
      `Telefon: ${phone || 'Qeyd edilməyib'}`,
      amount ? `Məbləğ: ${amount}` : '',
      message ? `Qeyd: ${message}` : '',
    ].filter(Boolean).join('\n');

    window.location.href = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(fullMsg)}`;
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(WHATSAPP_PHONE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_RAW_NUMBER}?text=${encodeURIComponent(
    `Salam ${FOUNDER_NAME} (MIHValyuta.com)! Sizinlə əlaqə saxlamaq istəyirəm.`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12 sm:space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[#e5c07b] text-xs font-semibold">
          <span>🇹🇷</span>
          <span>{FOUNDER_NAME} — {SLOGAN}</span>
          <span>🇦🇿</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Bizimlə <span className="text-[#e5c07b]">Əlaqə Saxlayın</span>
        </h1>
        <p className="text-slate-300 text-xs sm:text-base leading-relaxed">
          Valyuta sifarişi, rekvizit mübadiləsi və ya böyük həcmli köçürmələr üçün 7/24 rəsmi qaynar xəttimiz və WhatsApp xidmətimiz xidmətinizdədir.
        </p>
      </div>

      {/* Main Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information */}
        <div className="lg:col-span-5 space-y-5">
          {/* Official Phone Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#090f1d] border border-white/10 space-y-4 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#e5c07b] flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Rəsmi Qaynar Xətt
              </span>
              <button
                onClick={handleCopyPhone}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/[0.05] hover:bg-white/[0.1] px-2.5 py-1 rounded-lg border border-white/10 cursor-pointer transition"
                title="Nömrəni kopyala"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
            </div>

            <div className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
              {WHATSAPP_PHONE}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Türkiyə və Azərbaycan zəngləri, WhatsApp mesaj və səsli əlaqə üçün 7/24 aktivdir.
            </p>

            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>WhatsApp ilə Əlaqə Qur</span>
            </a>
          </div>

          {/* Quick info list */}
          <div className="p-6 rounded-2xl bg-[#090f1d] border border-white/10 space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">İş Saatları</span>
                <span className="text-slate-400 text-xs">Həftənin 7 günü, 24 saat fasiləsiz xidmət</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Rəsmi Email</span>
                <span className="text-slate-400 font-mono text-xs">{DEFAULT_SUBSCRIBER_EMAIL}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">Təhvil Nöqtələri</span>
                <span className="text-slate-400 text-xs">Bakı (Mərkəz) & İstanbul (Fatih / Taksim)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Direct WhatsApp Inquiry Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl bg-[#090f1d] border border-white/10 space-y-5 shadow-2xl"
          >
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Sürətli Sifariş və Müraciət Forması
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Formu doldurduqdan sonra məlumatlarınız birbaşa WhatsApp mesajı kimi göndəriləcək
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Ad və Soyad:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınızı daxil edin"
                  className="w-full bg-[#060a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Telefon / WhatsApp Nömrəniz:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+994..."
                  className="w-full bg-[#060a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-[#060a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Təxmini Məbləğ:</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Məs: 10,000 TL"
                  className="w-full bg-[#060a14] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Əlavə Qeyd və ya Sualınız:</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Valyuta mübadiləsi ilə bağlı qeydləriniz..."
                className="w-full bg-[#060a14] border border-white/10 rounded-xl p-3.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#d4af37] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm shadow-md transition cursor-pointer"
            >
              <WhatsAppLogo className="w-4 h-4 fill-white" />
              <span>WhatsApp ilə Göndər</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { RESTAURANT_INFO } from '../data/menuData';
import { Phone, MapPin, Clock, Download, MessageCircle, QrCode } from 'lucide-react';
import { downloadStandaloneHtmlFile } from '../utils/singleFileGenerator';
import { TajinLogo } from './TajinLogo';

interface FooterProps {
  onOpenQr?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQr }) => {
  return (
    <footer className="mt-16 bg-gradient-to-t from-[#090807] via-[#100e0c] to-[#141210] border-t border-amber-950/60 text-stone-300 pt-12 pb-24 sm:pb-12 px-4 relative overflow-hidden">
      {/* Background ambient decorative light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-amber-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-8 relative z-10">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-stone-900 border border-amber-500/30 flex items-center justify-center mb-3 shadow-xl shadow-amber-950/40 p-1.5">
            <TajinLogo size="100%" variant="gold" />
          </div>
          <h2 className="text-2xl font-black text-amber-100 font-alexandria">
            {RESTAURANT_INFO.name}
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            {RESTAURANT_INFO.tagline}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl text-xs">
          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-[#171412] hover:bg-[#1e1a17] border border-stone-800/80 hover:border-amber-500/40 flex flex-col items-center gap-1.5 transition-all group select-none"
            title="فتح الموقع في خرائط Google"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="font-semibold text-stone-200 group-hover:text-amber-300 transition-colors">
              العنوان
            </span>
            <span className="text-stone-400 leading-relaxed text-center">{RESTAURANT_INFO.address}</span>
            <span className="text-[10px] text-amber-400 font-bold mt-0.5 underline">
              خرائط Google ↗
            </span>
          </a>

          <div className="p-3.5 rounded-2xl bg-[#171412] border border-stone-800/80 flex flex-col items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-stone-200">مواعيد العمل</span>
            <span className="text-stone-400">{RESTAURANT_INFO.workingHours}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#171412] border border-stone-800/80 flex flex-col items-center gap-1.5">
            <Phone className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-stone-200">للطلبات وواتساب المطعم</span>
            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                dir="ltr"
                className="text-emerald-400 hover:text-emerald-300 font-mono font-bold flex items-center gap-1 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

        {/* Prominent Developer Credit as explicitly requested by user */}
        <div className="w-full max-w-md mx-auto py-5 px-6 rounded-2xl bg-gradient-to-r from-stone-900/80 via-amber-950/30 to-stone-900/80 border border-amber-500/30 shadow-xl shadow-amber-950/20">
          <p className="text-sm sm:text-base font-bold text-amber-200 font-alexandria tracking-wide flex items-center justify-center gap-2">
            <span>تم التطوير بواسطة مروان لهم ❤️</span>
          </p>
          <p className="text-[11px] text-stone-400 mt-1">
            تصميم وتطوير واجهات المستخدم التفاعلية المتطورة للمطاعم والكافيهات
          </p>

          {/* Contact Developer via WhatsApp */}
          <div className="mt-3.5 pt-3 border-t border-stone-800/80 flex flex-col items-center">
            <a
              href={RESTAURANT_INFO.developer.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all shadow-sm active:scale-95 group"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>تواصل مع المطور عبر الواتساب:</span>
              <span dir="ltr" className="font-mono text-emerald-200 group-hover:underline">
                {RESTAURANT_INFO.developer.whatsapp}
              </span>
            </a>
          </div>
        </div>

        {/* Actions: QR Code & Download File */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {onOpenQr && (
            <button
              onClick={onOpenQr}
              type="button"
              className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 border border-amber-600/40 hover:border-amber-400 transition-all shadow-sm active:scale-95"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>رمز الـ QR والرابط المباشر</span>
            </button>
          )}

          <button
            onClick={downloadStandaloneHtmlFile}
            type="button"
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-600/40 transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>تنزيل الملف</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-[11px] text-stone-600">
          جميع الحقوق محفوظة © {new Date().getFullYear()} {RESTAURANT_INFO.name}
        </div>
      </div>
    </footer>
  );
};

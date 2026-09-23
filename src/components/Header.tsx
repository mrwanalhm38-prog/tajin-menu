import React from 'react';
import { Search, X, QrCode, Phone, MapPin, Clock, Flame, ShoppingBag, Download, MessageCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/menuData';
import { downloadStandaloneHtmlFile } from '../utils/singleFileGenerator';
import { TajinLogo } from './TajinLogo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenQr: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  onOpenQr,
}) => {
  return (
    <header className="relative bg-gradient-to-b from-[#181512] via-[#12100e] to-[#0e0d0c] border-b border-amber-950/40 text-stone-200">
      {/* Top subtle golden ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-24 bg-amber-600/10 blur-3xl pointer-events-none" />

      {/* Top micro bar with contact & status */}
      <div className="border-b border-stone-800/40 px-4 py-1.5 text-xs text-stone-400">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              مفتوح الآن يستقبل طلباتكم
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-amber-500/80" />
              {RESTAURANT_INFO.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-emerald-500/20" />
              <span>واتساب المطعم:</span>
              <span dir="ltr" className="font-mono">{RESTAURANT_INFO.phone}</span>
            </a>
            <span className="text-stone-700 hidden xs:inline">•</span>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center gap-1 text-stone-300 hover:text-amber-400 transition-colors hidden sm:inline-flex"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span dir="ltr">{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Brand Section */}
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-right">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500/30 via-stone-900 to-amber-950/50 p-1 shadow-2xl shadow-amber-950/40 border border-amber-500/40 flex items-center justify-center">
                <div className="w-full h-full rounded-[13px] bg-[#161311] flex items-center justify-center relative overflow-hidden p-1">
                  <TajinLogo size="100%" variant="gold" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.5 text-[9px] font-bold bg-amber-500 text-stone-950 rounded-md shadow">
                فاخر
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-tight font-alexandria">
                  {RESTAURANT_INFO.name}
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  منيو إلكتروني تفاعلي
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-400 mt-1 flex items-center gap-1.5 justify-center sm:justify-start">
                <span>{RESTAURANT_INFO.tagline}</span>
                <span className="text-stone-600">•</span>
                <span className="text-amber-400/90 font-medium">مشويات على الفحم وأطباق بلدية</span>
              </p>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-stone-400 hover:text-amber-400 mt-1 flex items-center gap-1.5 justify-center sm:justify-start group transition-colors select-none"
                title="اضغط لفتح موقع المطعم في خدمة خرائط Google"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-500 group-hover:scale-110 transition-transform" />
                <span className="group-hover:underline underline-offset-2">{RESTAURANT_INFO.address}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-sans">
                  خرائط Google ↗
                </span>
              </a>
            </div>
          </div>

          {/* Quick Header Buttons */}
          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-center">
            {/* Download file button */}
            <button
              onClick={downloadStandaloneHtmlFile}
              type="button"
              className="px-3 py-2 rounded-xl bg-amber-950/30 hover:bg-amber-900/50 text-amber-300 border border-amber-600/40 hover:border-amber-400 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تنزيل الملف</span>
            </button>

            {/* QR Code button */}
            <button
              onClick={onOpenQr}
              type="button"
              className="px-3.5 py-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border border-stone-800 hover:border-amber-500/30 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="مشاركة المنيو ومسح QR"
            >
              <QrCode className="w-4 h-4 text-amber-400" />
              <span>مشاركة الـ QR</span>
            </button>

            {/* Cart trigger in header */}
            <button
              onClick={onOpenCart}
              type="button"
              className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-950/40 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>سلة الطلبات</span>
              {cartCount > 0 && (
                <span className="bg-stone-950 text-amber-400 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-amber-400/40">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Instant Search Bar */}
        <div className="mt-5 relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-amber-500 absolute right-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ابحث عن صنفك المفضل... (كباب، كفتة، حواوشي، مكرونة، قهوة)"
              className="w-full pr-10 pl-10 py-3 rounded-2xl bg-[#171412] text-stone-100 placeholder:text-stone-500 border border-amber-900/30 focus:border-amber-500/70 focus:outline-none focus:ring-2 focus:ring-amber-500/20 text-sm transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute left-3 p-1 rounded-full text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
                title="مسح البحث"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {searchQuery && (
            <div className="mt-2 text-xs text-amber-400/90 text-center flex items-center justify-center gap-1.5">
              <span>نتائج البحث عن: &ldquo;{searchQuery}&rdquo;</span>
              <button
                onClick={() => onSearchChange('')}
                className="underline hover:text-amber-200"
              >
                عرض كل الأصناف
              </button>
            </div>
          )}
        </div>

        {/* Feature Pills */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] text-stone-400">
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/60 border border-stone-800/80 flex items-center gap-1">
            <span className="text-amber-500">🔥</span> مشويات بلدي على الفحم
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/60 border border-stone-800/80 flex items-center gap-1">
            <span className="text-amber-500">⚖️</span> اختيار الأوزان والخبز
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-stone-900/60 border border-stone-800/80 flex items-center gap-1">
            <span className="text-emerald-500">💬</span> طلب مباشر بالواتساب
          </span>
        </div>
      </div>
    </header>
  );
};

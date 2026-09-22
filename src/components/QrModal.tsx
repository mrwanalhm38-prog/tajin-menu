import React, { useState, useEffect } from 'react';
import { X, QrCode, Copy, Check, Share2, ExternalLink, Download } from 'lucide-react';
import QRCode from 'qrcode';
import { RESTAURANT_INFO } from '../data/menuData';

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  // Get current active URL
  const currentUrl = typeof window !== 'undefined' && window.location?.href
    ? window.location.href
    : 'https://ais-pre-gzxfi2yhgo4vygbdykt3lt-525062708968.europe-west2.run.app';

  // Generate crisp, camera-optimized QR code using local qrcode engine
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    QRCode.toDataURL(currentUrl, {
      width: 480,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: {
        dark: '#141210',
        light: '#ffffff',
      },
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
        }
      })
      .catch((err) => {
        console.error('Error generating QR Code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${RESTAURANT_INFO.name} - منيو الكتروني`,
          text: `تصفح منيو ${RESTAURANT_INFO.name} واطلب مباشرة عبر الواتساب`,
          url: currentUrl,
        })
        .catch(() => {});
    } else {
      handleCopyLink();
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `tajin-menu-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm bg-[#161311] border border-amber-900/40 rounded-3xl shadow-2xl p-6 text-stone-100 text-center relative">
        <button
          onClick={onClose}
          type="button"
          aria-label="إغلاق"
          className="absolute top-4 left-4 p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-amber-200 font-alexandria">
          امسح الـ QR لفتح المنيو
        </h3>
        <p className="text-xs text-stone-400 mt-1 max-w-xs mx-auto">
          وجّه كاميرا الهاتف نحو الرمز لفتح المنيو الإلكتروني التفاعلي لمطعم {RESTAURANT_INFO.name}
        </p>

        {/* Guaranteed Working High-Contrast QR Code */}
        <div className="my-4 p-3 rounded-2xl bg-white border-2 border-amber-500/40 inline-block shadow-xl shadow-amber-950/30">
          {qrDataUrl ? (
            <img
              src={qrDataUrl}
              alt="رمز QR شغال لفتح منيو طاجين"
              className="w-48 h-48 mx-auto rounded-lg"
            />
          ) : (
            <div className="w-48 h-48 flex items-center justify-center text-stone-600 text-xs font-mono">
              جاري إنشاء الرمز...
            </div>
          )}
        </div>

        {/* Working Live Link Display Box with direct link and open button */}
        <div className="mb-4 p-2.5 rounded-xl bg-stone-900/90 border border-stone-800 flex items-center justify-between gap-2 text-right">
          <div className="flex-1 min-w-0">
            <span className="block text-[10px] text-amber-400 font-bold mb-0.5">
              رابط المنيو المباشر:
            </span>
            <span
              dir="ltr"
              className="block text-[11px] font-mono text-stone-300 truncate select-all"
              title={currentUrl}
            >
              {currentUrl}
            </span>
          </div>
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-colors"
            title="فتح الرابط في نافذة جديدة"
          >
            <span>فتح</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            type="button"
            className="flex-1 py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">تم النسخ!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ الرابط</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadQr}
            type="button"
            className="py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-stone-700"
            title="تنزيل صورة الرمز للطباعة"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>حفظ QR</span>
          </button>

          <button
            onClick={handleShare}
            type="button"
            className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/30 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>مشاركة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

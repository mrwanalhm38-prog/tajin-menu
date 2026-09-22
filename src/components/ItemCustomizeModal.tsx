import React, { useState, useEffect } from 'react';
import { MenuItem, PriceOption } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { X, Plus, Minus, Check, Sparkles } from 'lucide-react';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, option: PriceOption, quantity: number, notes?: string) => void;
}

const PRESET_NOTES = [
  'بدون بصل',
  'تسوية زيادة (ويل دن)',
  'طحينة زيادة',
  'شطة حارة زيادة 🌶️',
  'سلطة خضراء إضافية',
  'عيش بلدي سخن زيادة',
  'تسوية نص سوا (ميديوم)',
];

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const defaultOption = item.options.find((o) => o.isDefault) || item.options[0];
  const [selectedOption, setSelectedOption] = useState<PriceOption>(defaultOption);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  // Reset when item changes
  useEffect(() => {
    if (item) {
      const def = item.options.find((o) => o.isDefault) || item.options[0];
      setSelectedOption(def);
      setQuantity(1);
      setNotes('');
    }
  }, [item]);

  const handleAddPresetNote = (preset: string) => {
    if (!notes.includes(preset)) {
      setNotes((prev) => (prev ? `${prev}، ${preset}` : preset));
    }
  };

  const handleConfirm = () => {
    onAddToCart(item, selectedOption, quantity, notes.trim());
    onClose();
  };

  const totalPrice = selectedOption.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#161311] border border-amber-900/40 rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 text-stone-100 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-amber-200 font-alexandria">
                {item.arabicName}
              </h3>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-stone-400 mt-1">{item.description}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Selection */}
        {item.options.length > 1 && (
          <div className="mb-5">
            <label className="block text-xs font-semibold text-stone-300 mb-2">
              {item.pricingType === 'weight'
                ? 'اختر الوزن المناسب:'
                : item.pricingType === 'bread'
                ? 'اختر نوع الخبز:'
                : 'اختر الحجم:'}
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {item.options.map((opt) => {
                const isSelected = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`p-3 rounded-2xl text-right transition-all flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-amber-600/15 border-amber-500 text-amber-200 shadow-md ring-1 ring-amber-500'
                        : 'bg-[#1e1a16] border-stone-800 text-stone-300 hover:border-stone-700'
                    }`}
                  >
                    <span className="text-xs font-bold">{opt.name}</span>
                    <span className="text-sm font-extrabold text-amber-400 mt-1 font-alexandria">
                      {opt.price} {RESTAURANT_INFO.currency}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity Controller */}
        <div className="mb-5 p-3.5 rounded-2xl bg-[#1c1815] border border-stone-800/80 flex items-center justify-between">
          <span className="text-sm font-semibold text-stone-300">الكمية المطلوبة:</span>
          
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-base font-bold text-amber-300 font-alexandria">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notes & Instructions */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-stone-300 mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>ملاحظات خاصة للشيف (اختياري):</span>
          </label>

          {/* Quick preset chips */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {PRESET_NOTES.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handleAddPresetNote(preset)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/30 transition-colors"
              >
                + {preset}
              </button>
            ))}
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="مثال: يرجى وضع الطحينة في علبة منفصلة، بدون شطة، تسوية زيادة..."
            rows={2}
            className="w-full p-3 rounded-xl bg-[#12100e] border border-stone-800 text-stone-100 text-xs focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Total & Confirm Button */}
        <div className="pt-3 border-t border-stone-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-400 block">الإجمالي</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-amber-300 font-alexandria">
                {totalPrice}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {RESTAURANT_INFO.currency}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-stone-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>تأكيد الإضافة للسلة</span>
          </button>
        </div>

      </div>
    </div>
  );
};

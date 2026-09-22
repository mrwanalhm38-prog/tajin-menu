import React, { useState } from 'react';
import { MenuItem, PriceOption, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { Plus, Minus, Check, MessageSquarePlus, Clock } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, option: PriceOption, quantity: number, notes?: string) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onOpenCustomize: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onOpenCustomize,
}) => {
  // Find default or first option
  const defaultOption = item.options.find((o) => o.isDefault) || item.options[0];
  const [selectedOption, setSelectedOption] = useState<PriceOption>(defaultOption);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);

  // Check if this specific item + option is in cart
  const currentCartId = `${item.id}-${selectedOption.id}`;
  const existingCartItem = cartItems.find((ci) => ci.cartItemId === currentCartId);
  const quantityInCart = existingCartItem ? existingCartItem.quantity : 0;

  const handleQuickAdd = () => {
    onAddToCart(item, selectedOption, 1);
    setIsAddedFeedback(true);
    setTimeout(() => setIsAddedFeedback(false), 900);
  };

  return (
    <div className="group relative bg-gradient-to-b from-[#181512] to-[#13110f] rounded-2xl border border-stone-800/80 hover:border-amber-500/40 p-4 transition-all duration-200 shadow-md hover:shadow-xl hover:shadow-amber-950/20 flex flex-col justify-between">
      {/* Top row: Name, Badge, Time */}
      <div>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="text-base sm:text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors font-alexandria">
            {item.arabicName}
          </h3>

          {item.badge && (
            <span className="flex-shrink-0 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 whitespace-nowrap">
              {item.badge}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-stone-400 leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>

        {/* Preparation time if available */}
        {item.preparationTime && (
          <div className="flex items-center gap-1 text-[11px] text-stone-500 mb-3">
            <Clock className="w-3 h-3 text-amber-600/70" />
            <span>وقت التحضير المتوقع: {item.preparationTime}</span>
          </div>
        )}
      </div>

      {/* Dynamic Options Selector (Weights / Bread / Size) */}
      <div className="pt-2 border-t border-stone-800/60 mt-auto">
        {item.options.length > 1 && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1.5 font-medium">
              <span>
                {item.pricingType === 'weight'
                  ? 'اختر الوزن المطلوب:'
                  : item.pricingType === 'bread'
                  ? 'نوع الخبز:'
                  : 'الحجم:'}
              </span>
              <span className="text-amber-400/90 font-bold">
                {selectedOption.name}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {item.options.map((opt) => {
                const isSelected = selectedOption.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedOption(opt)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium transition-all text-center flex flex-col items-center justify-center ${
                      isSelected
                        ? 'bg-amber-500 text-stone-950 font-bold shadow-md shadow-amber-950/40 ring-1 ring-amber-400'
                        : 'bg-[#201c18] hover:bg-[#2a241f] text-stone-300 border border-stone-800/80'
                    }`}
                  >
                    <span className="truncate w-full">{opt.name}</span>
                    <span
                      className={`text-[10px] mt-0.5 ${
                        isSelected ? 'text-stone-900 font-black' : 'text-amber-400/80'
                      }`}
                    >
                      {opt.price} {RESTAURANT_INFO.currency}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pricing and Action Row */}
        <div className="flex items-center justify-between gap-3 pt-1">
          {/* Active Price */}
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-500">السعر</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-extrabold text-amber-300 font-alexandria">
                {selectedOption.price}
              </span>
              <span className="text-xs text-stone-400 font-medium">
                {RESTAURANT_INFO.currency}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            {/* Customization modal trigger (for adding special notes like no onions, etc) */}
            <button
              onClick={() => onOpenCustomize(item)}
              type="button"
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-300 border border-stone-800 transition-colors"
              title="تخصيص وإضافة ملاحظات للطلب"
            >
              <MessageSquarePlus className="w-4 h-4" />
            </button>

            {/* Quick Add / Quantity Controller */}
            {quantityInCart > 0 ? (
              <div className="flex items-center gap-1.5 bg-[#201b17] border border-amber-500/40 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(currentCartId, quantityInCart - 1)}
                  className="w-7 h-7 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 flex items-center justify-center transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-amber-300 font-alexandria">
                  {quantityInCart}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(currentCartId, quantityInCart + 1)}
                  className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:scale-95 text-stone-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/30 transition-all"
              >
                {isAddedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-stone-950 stroke-[3]" />
                    <span>تمت الإضافة!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span>أضف للطلب</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

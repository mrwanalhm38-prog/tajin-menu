import React from 'react';
import { OrderType } from '../types';
import { Utensils, Bike, ShoppingBag, Check } from 'lucide-react';

interface OrderTypeSelectorProps {
  selectedType: OrderType;
  onChange: (type: OrderType) => void;
  compact?: boolean;
}

export const OrderTypeSelector: React.FC<OrderTypeSelectorProps> = ({
  selectedType,
  onChange,
  compact = false,
}) => {
  const options: {
    type: OrderType;
    label: string;
    subLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    {
      type: 'hall',
      label: 'صالة',
      subLabel: 'تناول بالمطعم',
      icon: Utensils,
      accentColor: 'from-amber-500 to-amber-600',
    },
    {
      type: 'delivery',
      label: 'دليفري',
      subLabel: 'توصيل منازل',
      icon: Bike,
      accentColor: 'from-amber-500 to-amber-600',
    },
    {
      type: 'takeaway',
      label: 'تيك أواي',
      subLabel: 'استلام سريع',
      icon: ShoppingBag,
      accentColor: 'from-amber-500 to-amber-600',
    },
  ];

  if (compact) {
    return (
      <div className="bg-[#181512]/95 backdrop-blur-md p-1 rounded-2xl border border-amber-600/30 shadow-xl flex items-center justify-between gap-1 w-full select-none">
        {options.map(({ type, label, icon: Icon }) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange(type);
              }}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/20 ring-1 ring-amber-300'
                  : 'text-stone-300 hover:text-amber-200 hover:bg-stone-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-stone-950 stroke-[2.5]' : 'text-amber-400'}`} />
              <span className="font-alexandria tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-full select-none">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-amber-200 font-alexandria flex items-center gap-1.5">
          <span>طريقة استلام الطلب</span>
          <span className="text-[10px] text-amber-400 font-normal px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            حدد خيارك المفضل
          </span>
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {options.map(({ type, label, subLabel, icon: Icon }) => {
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={`relative p-3 rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-200 border cursor-pointer active:scale-95 group ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-500 to-amber-600 text-stone-950 border-amber-300 shadow-lg shadow-amber-600/30 scale-[1.02] ring-2 ring-amber-400/40'
                  : 'bg-[#181512] hover:bg-[#201c18] border-stone-800 hover:border-amber-600/40 text-stone-300'
              }`}
            >
              {/* Selected subtle check indicator */}
              {isSelected && (
                <div className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-stone-950/20 text-stone-950 flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              {/* Icon Container */}
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-transform duration-200 group-hover:scale-110 ${
                  isSelected
                    ? 'bg-stone-950/15 text-stone-950'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'stroke-[2.5]' : ''}`} />
              </div>

              {/* Label */}
              <span className={`text-xs font-black font-alexandria tracking-wide ${isSelected ? 'text-stone-950' : 'text-stone-100 group-hover:text-amber-200'}`}>
                {label}
              </span>

              {/* Sub-label */}
              <span className={`text-[10px] mt-0.5 font-medium ${isSelected ? 'text-stone-900/90 font-bold' : 'text-stone-400'}`}>
                {subLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React from 'react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId } from '../types';

interface CategoryNavProps {
  activeCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <nav className="sticky top-0 z-30 bg-[#12100e]/95 backdrop-blur-md border-b border-amber-950/40 py-2.5 px-4 shadow-xl">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = categoryCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              type="button"
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all duration-200 select-none ${
                isActive
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-stone-950 shadow-md shadow-amber-900/30 scale-[1.02]'
                  : 'bg-[#1b1714] text-stone-300 hover:text-amber-300 hover:bg-[#241f1a] border border-stone-800'
              }`}
            >
              <span className="text-base sm:text-lg leading-none">{cat.emoji}</span>
              <span className="whitespace-nowrap">{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  isActive
                    ? 'bg-stone-950/20 text-stone-950'
                    : 'bg-stone-800 text-stone-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

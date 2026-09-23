import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { CategoryNav } from './components/CategoryNav';
import { MenuItemCard } from './components/MenuItemCard';
import { CartDrawer } from './components/CartDrawer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { QrModal } from './components/QrModal';
import { Footer } from './components/Footer';
import { BackgroundWatermark } from './components/BackgroundWatermark';
import { OrderTypeSelector } from './components/OrderTypeSelector';
import { CATEGORIES, MENU_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { CategoryId, MenuItem, PriceOption, CartItem, OrderDetails } from './types';
import { ShoppingBag, ChevronLeft, Sparkles, Coffee } from 'lucide-react';

const LOCAL_STORAGE_CART_KEY = 'tajin_menu_cart_v1';
const LOCAL_STORAGE_ORDER_KEY = 'tajin_menu_order_v1';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('grills');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [drinkSubFilter, setDrinkSubFilter] = useState<'all' | 'espresso' | 'iced_coffee'>('all');

  // Load cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load order details from localStorage
  const [orderDetails, setOrderDetails] = useState<OrderDetails>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDER_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      orderType: 'hall',
      tableNumber: '',
      customerName: '',
      customerPhone: '',
      deliveryAddress: '',
      pickupTime: 'بعد ساعة',
      customPickupTime: '',
      notes: '',
    };
  });

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Save order details to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDER_KEY, JSON.stringify(orderDetails));
    } catch {}
  }, [orderDetails]);

  // Section references for smooth scrolling
  const sectionRefs = {
    grills: useRef<HTMLElement>(null),
    sandwiches: useRef<HTMLElement>(null),
    sides: useRef<HTMLElement>(null),
    beverages: useRef<HTMLElement>(null),
  };

  // Scroll to category section
  const handleSelectCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setSearchQuery(''); // clear search when navigating sections
    const ref = sectionRefs[categoryId];
    if (ref && ref.current) {
      const yOffset = -75; // compensate for sticky nav
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Intersection observer to track which category is in view
  useEffect(() => {
    if (searchQuery) return; // disable during active search

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (const cat of CATEGORIES) {
        const el = sectionRefs[cat.id]?.current;
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery]);

  // Add item to cart
  const handleAddToCart = (
    item: MenuItem,
    option: PriceOption,
    quantity: number,
    notes?: string
  ) => {
    const cartItemId = `${item.id}-${option.id}${notes ? `-${notes.trim()}` : ''}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            menuItem: item,
            selectedOption: option,
            quantity,
            notes: notes || undefined,
          },
        ];
      }
    });
  };

  // Update item quantity
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
    } else {
      setCartItems((prev) =>
        prev.map((ci) => (ci.cartItemId === cartItemId ? { ...ci, quantity: newQty } : ci))
      );
    }
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.cartItemId !== cartItemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filtered items based on search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return MENU_ITEMS;
    const query = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter(
      (item) =>
        item.arabicName.toLowerCase().includes(query) ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        (item.badge && item.badge.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<CategoryId, number> = {
      grills: 0,
      sandwiches: 0,
      sides: 0,
      beverages: 0,
    };
    filteredItems.forEach((item) => {
      counts[item.categoryId] = (counts[item.categoryId] || 0) + 1;
    });
    return counts;
  }, [filteredItems]);

  // Total items in cart
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Total price in cart
  const totalCartPrice = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.selectedOption.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-[#0e0d0c] text-stone-100 flex flex-col font-['Cairo',sans-serif] selection:bg-amber-600/30 selection:text-amber-200 relative overflow-x-hidden">
      {/* Quiet Professional Dark Watermark Logo in the Background - Clearly Visible */}
      <BackgroundWatermark opacity={0.16} />
      
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* Sticky Categories Navigation Bar */}
      <CategoryNav
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        categoryCounts={categoryCounts}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        
        {/* If searching, show search view */}
        {searchQuery ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-amber-200 font-alexandria flex items-center gap-2">
                <span>نتائج البحث</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  {filteredItems.length} صنف
                </span>
              </h2>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-16 bg-[#141210] rounded-3xl border border-stone-800 p-8">
                <p className="text-base text-stone-300 font-semibold mb-1">
                  لم يتم العثور على أصناف تطابق &ldquo;{searchQuery}&rdquo;
                </p>
                <p className="text-xs text-stone-500 mb-4">
                  جرب البحث بكلمات أخرى مثل: كباب، كفتة، مكرونة، حواوشي، موكا
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs"
                >
                  إعادة ضبط البحث
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    cartItems={cartItems}
                    onAddToCart={handleAddToCart}
                    onUpdateQuantity={handleUpdateQuantity}
                    onOpenCustomize={setCustomizingItem}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Normal Category Sections View */
          <div className="space-y-12">
            {CATEGORIES.map((cat) => {
              const items = filteredItems.filter((i) => i.categoryId === cat.id);
              if (items.length === 0) return null;

              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  ref={sectionRefs[cat.id]}
                  className="scroll-mt-20"
                >
                  {/* Category Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-5 border-b border-stone-800/80 gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl sm:text-3xl leading-none">{cat.emoji}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-xl sm:text-2xl font-black text-amber-100 font-alexandria">
                            {cat.name}
                          </h2>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-stone-900 text-stone-400 border border-stone-800 font-bold">
                            {items.length} صنف
                          </span>
                        </div>
                        <p className="text-xs text-stone-400 mt-0.5">{cat.description}</p>
                      </div>
                    </div>

                    {/* Drink Sub-category Filter Tabs */}
                    {cat.id === 'beverages' && (
                      <div className="flex items-center gap-1 bg-[#1a1714] p-1 rounded-xl border border-stone-800 text-xs">
                        <button
                          type="button"
                          onClick={() => setDrinkSubFilter('all')}
                          className={`px-3 py-1 rounded-lg transition-all ${
                            drinkSubFilter === 'all'
                              ? 'bg-amber-500 text-stone-950 font-bold'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          الكل
                        </button>
                        <button
                          type="button"
                          onClick={() => setDrinkSubFilter('espresso')}
                          className={`px-3 py-1 rounded-lg transition-all ${
                            drinkSubFilter === 'espresso'
                              ? 'bg-amber-500 text-stone-950 font-bold'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          إسبريسو ☕
                        </button>
                        <button
                          type="button"
                          onClick={() => setDrinkSubFilter('iced_coffee')}
                          className={`px-3 py-1 rounded-lg transition-all ${
                            drinkSubFilter === 'iced_coffee'
                              ? 'bg-amber-500 text-stone-950 font-bold'
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          قهوة مثلجة 🧊
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Items Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items
                      .filter((item) => {
                        if (cat.id !== 'beverages' || drinkSubFilter === 'all') return true;
                        return item.subCategory === drinkSubFilter;
                      })
                      .map((item) => (
                        <MenuItemCard
                          key={item.id}
                          item={item}
                          cartItems={cartItems}
                          onAddToCart={handleAddToCart}
                          onUpdateQuantity={handleUpdateQuantity}
                          onOpenCustomize={setCustomizingItem}
                        />
                      ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Bottom Cart Bar (Appears when cart has items) */}
      {cartItems.length > 0 && !isCartOpen && (
        <div className="fixed bottom-3 inset-x-0 z-40 px-3 sm:px-4 max-w-lg mx-auto flex flex-col gap-2">
          {/* Chic 3-option Order Type Selector (صالة - دليفري - تيك أواي) */}
          <div className="bg-[#141210]/95 backdrop-blur-md px-3 py-2 rounded-2xl border border-amber-600/40 shadow-2xl flex items-center justify-between gap-2.5">
            <span className="text-xs font-bold text-amber-200 font-alexandria shrink-0">
              نوع الطلب:
            </span>
            <div className="flex-1">
              <OrderTypeSelector
                selectedType={orderDetails.orderType}
                onChange={(type) =>
                  setOrderDetails((prev) => ({ ...prev, orderType: type }))
                }
                compact
              />
            </div>
          </div>

          {/* Main Checkout Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            type="button"
            className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-500 text-stone-950 shadow-2xl shadow-amber-950/60 border border-amber-300/40 flex items-center justify-between transition-all active:scale-98"
          >
            {/* Left: Cart badge & count */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-stone-950 text-amber-400 flex items-center justify-center font-black text-sm">
                {totalCartCount}
              </div>
              <div className="text-right">
                <span className="text-xs font-black block leading-tight">
                  طلب {orderDetails.orderType === 'hall' ? 'صالة' : orderDetails.orderType === 'delivery' ? 'دليفري' : 'تيك أواي'} جاهز
                </span>
                <span className="text-[11px] font-bold text-stone-900 opacity-90">
                  اضغط لإتمام الطلب بالواتساب
                </span>
              </div>
            </div>

            {/* Right: Total price & arrow */}
            <div className="flex items-center gap-2">
              <div className="flex items-baseline gap-1 bg-stone-950/15 px-3 py-1 rounded-xl">
                <span className="text-lg font-black font-alexandria">{totalCartPrice}</span>
                <span className="text-xs font-bold">{RESTAURANT_INFO.currency}</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-stone-950 text-amber-400 flex items-center justify-center">
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Item Customization Modal */}
      <ItemCustomizeModal
        item={customizingItem}
        isOpen={Boolean(customizingItem)}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        orderDetails={orderDetails}
        onUpdateOrderDetails={(patch) =>
          setOrderDetails((prev) => ({ ...prev, ...patch }))
        }
      />

      {/* QR Code Sharing Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />

      {/* Footer with Mandatory Developer Credit */}
      <Footer onOpenQr={() => setIsQrOpen(true)} />
    </div>
  );
}

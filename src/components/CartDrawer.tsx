import React, { useState } from 'react';
import { CartItem, OrderDetails, OrderType } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { openWhatsAppOrder, generateWhatsAppMessage } from '../utils/whatsapp';
import { OrderTypeSelector } from './OrderTypeSelector';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  Copy,
  Check,
  MapPin,
  ShoppingBag,
  Sparkles,
  Utensils,
  User,
  Phone,
  Clock,
  Bike,
  Heart,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  orderDetails: OrderDetails;
  onUpdateOrderDetails: (details: Partial<OrderDetails>) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderDetails,
  onUpdateOrderDetails,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.selectedOption.price * item.quantity,
    0
  );

  const handleCopyOrder = () => {
    const text = generateWhatsAppMessage(cartItems, orderDetails, subtotal);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    if (cartItems.length === 0) return;
    openWhatsAppOrder(cartItems, orderDetails, subtotal);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 left-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#141210] border-r border-amber-900/40 text-stone-100 flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-4 border-b border-stone-800 bg-[#191613] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-amber-100 font-alexandria">
                سلة الطلبات ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              {cartItems.length > 0 && (
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-[11px] text-red-400 hover:text-red-300 px-2 py-1 rounded-lg bg-red-950/30 border border-red-900/40 transition-colors"
                >
                  إفراغ السلة
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#1e1a16] border border-stone-800 flex items-center justify-center text-stone-500">
                  <ShoppingBag className="w-8 h-8 text-stone-600" />
                </div>
                <h3 className="text-base font-semibold text-stone-300">السلة فارغة حالياً</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  تصفح قائمة المشويات والساندوتشات وأضف أطباقك المفضلة بضغطة واحدة!
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold transition-all shadow"
                >
                  تصفح المنيو الآن
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Selection with modern chic design */}
                <div className="p-3.5 rounded-2xl bg-[#1a1613] border border-amber-900/40 shadow-lg space-y-3.5">
                  <OrderTypeSelector
                    selectedType={orderDetails.orderType}
                    onChange={(type) => onUpdateOrderDetails({ orderType: type })}
                  />

                  {/* ================= DELIVERY SECTION ================= */}
                  {orderDetails.orderType === 'delivery' && (
                    <div className="pt-3 border-t border-stone-800/80 space-y-3">
                      {/* Name and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>اسم المستلم:</span>
                            <span className="text-amber-500 text-[10px]">*</span>
                          </label>
                          <input
                            type="text"
                            value={orderDetails.customerName}
                            onChange={(e) => onUpdateOrderDetails({ customerName: e.target.value })}
                            placeholder="الاسم الكريم أو الثلاثي"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>رقم التليفون:</span>
                            <span className="text-amber-500 text-[10px]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={orderDetails.customerPhone}
                            onChange={(e) => onUpdateOrderDetails({ customerPhone: e.target.value })}
                            placeholder="010XXXXXXXX"
                            dir="ltr"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none text-right transition-colors"
                          />
                        </div>
                      </div>

                      {/* Detailed Address */}
                      <div>
                        <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-amber-400" />
                          <span>العنوان بالتفصيل:</span>
                          <span className="text-amber-500 text-[10px]">*</span>
                        </label>
                        <textarea
                          rows={2}
                          value={orderDetails.deliveryAddress}
                          onChange={(e) => onUpdateOrderDetails({ deliveryAddress: e.target.value })}
                          placeholder="المنطقة، الشارع، رقم العمارة، الطابق، الشقة، علامة مميزة..."
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none transition-colors resize-none leading-relaxed"
                        />
                      </div>

                      {/* Delivery fee note */}
                      <div className="p-3 rounded-xl bg-gradient-to-r from-amber-950/40 via-stone-900 to-amber-950/40 border border-amber-600/40 flex items-center gap-2.5 shadow-sm">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                          <Bike className="w-4 h-4 text-amber-400" />
                        </div>
                        <div className="text-right">
                          <span className="block text-xs font-bold text-amber-300">
                            🛵 سوف يتم تحديد ثمن التوصيل
                          </span>
                          <span className="text-[11px] text-stone-400">
                            يتم احتساب تكلفة التوصيل بدقة حسب العنوان والتأكيد معكم عبر الواتساب.
                          </span>
                        </div>
                      </div>

                      {/* Thank you message from Tajin */}
                      <div className="p-3 rounded-xl bg-[#14110e] border border-amber-500/25 text-center relative overflow-hidden shadow-inner">
                        <p className="text-xs font-bold text-amber-300 font-alexandria">
                          أسرة طاجين تشكركم لاختياركم لنا ❤️
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ================= TAKEAWAY SECTION ================= */}
                  {orderDetails.orderType === 'takeaway' && (
                    <div className="pt-3 border-t border-stone-800/80 space-y-3">
                      {/* Name and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>اسم المستلم:</span>
                            <span className="text-amber-500 text-[10px]">*</span>
                          </label>
                          <input
                            type="text"
                            value={orderDetails.customerName}
                            onChange={(e) => onUpdateOrderDetails({ customerName: e.target.value })}
                            placeholder="الاسم الكريم أو الثلاثي"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-amber-400" />
                            <span>رقم التليفون:</span>
                            <span className="text-amber-500 text-[10px]">*</span>
                          </label>
                          <input
                            type="tel"
                            value={orderDetails.customerPhone}
                            onChange={(e) => onUpdateOrderDetails({ customerPhone: e.target.value })}
                            placeholder="010XXXXXXXX"
                            dir="ltr"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none text-right transition-colors"
                          />
                        </div>
                      </div>

                      {/* Pickup Time Selection */}
                      <div>
                        <label className="block text-[11px] font-bold text-amber-300/90 mb-1.5 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>وقت الاستلام من المطعم:</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                          {['بعد نصف ساعة', 'بعد ساعة', 'بعد ساعتين', 'تحديد يدوي'].map((timeOption) => {
                            const isSelected = orderDetails.pickupTime === timeOption;
                            return (
                              <button
                                key={timeOption}
                                type="button"
                                onClick={() => onUpdateOrderDetails({ pickupTime: timeOption })}
                                className={`py-2 px-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 border transition-all active:scale-95 ${
                                  isSelected
                                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400 shadow-md ring-1 ring-amber-300'
                                    : 'bg-stone-900 text-stone-300 hover:text-amber-200 border-stone-800 hover:border-amber-600/40'
                                }`}
                              >
                                <span>{timeOption}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom manual time input */}
                        {orderDetails.pickupTime === 'تحديد يدوي' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              value={orderDetails.customPickupTime || ''}
                              onChange={(e) => onUpdateOrderDetails({ customPickupTime: e.target.value })}
                              placeholder="اكتب وقت الاستلام المفضل يدوياً (مثال: الساعة 7:30 مساءً)"
                              className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-amber-500/60 text-stone-200 text-xs focus:border-amber-400 focus:outline-none placeholder:text-stone-500 shadow-sm"
                            />
                          </div>
                        )}
                      </div>

                      {/* Thank you message from Tajin */}
                      <div className="p-3 rounded-xl bg-[#14110e] border border-amber-500/25 text-center relative overflow-hidden shadow-inner">
                        <p className="text-xs font-bold text-amber-300 font-alexandria">
                          أسرة طاجين تشكركم لاختياركم لنا ❤️
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ================= HALL / DINE-IN SECTION ================= */}
                  {orderDetails.orderType === 'hall' && (
                    <div className="pt-3 border-t border-stone-800/80 space-y-3">
                      {/* Table Number */}
                      <div>
                        <label className="block text-[11px] font-bold text-amber-300/90 mb-1 flex items-center gap-1">
                          <Utensils className="w-3.5 h-3.5 text-amber-400" />
                          <span>رقم الطاولة في الصالة:</span>
                          <span className="text-amber-500 text-[10px]">*</span>
                        </label>
                        <input
                          type="text"
                          value={orderDetails.tableNumber}
                          onChange={(e) => onUpdateOrderDetails({ tableNumber: e.target.value })}
                          placeholder="مثال: طاولة 5 أو 12"
                          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none"
                        />
                      </div>

                      {/* Name and Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-400 mb-1 flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-stone-400" />
                            <span>اسم العميل (اختياري):</span>
                          </label>
                          <input
                            type="text"
                            value={orderDetails.customerName}
                            onChange={(e) => onUpdateOrderDetails({ customerName: e.target.value })}
                            placeholder="الاسم الكريم"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-stone-400 mb-1 flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5 text-stone-400" />
                            <span>رقم الهاتف (اختياري):</span>
                          </label>
                          <input
                            type="tel"
                            value={orderDetails.customerPhone}
                            onChange={(e) => onUpdateOrderDetails({ customerPhone: e.target.value })}
                            placeholder="010XXXXXXXX"
                            dir="ltr"
                            className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none text-right"
                          />
                        </div>
                      </div>

                      {/* Thank you message from Tajin */}
                      <div className="p-3 rounded-xl bg-[#14110e] border border-amber-500/25 text-center relative overflow-hidden shadow-inner">
                        <p className="text-xs font-bold text-amber-300 font-alexandria">
                          أسرة طاجين تشكركم لاختياركم لنا ❤️
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  <span className="text-xs font-semibold text-stone-400 block px-1">
                    الأصناف المحددة:
                  </span>

                  {cartItems.map((item) => {
                    const itemTotal = item.selectedOption.price * item.quantity;
                    return (
                      <div
                        key={item.cartItemId}
                        className="p-3 rounded-2xl bg-[#191512] border border-stone-800 flex flex-col gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="text-xs sm:text-sm font-bold text-stone-100">
                              {item.menuItem.arabicName}
                            </h4>
                            <span className="inline-block mt-0.5 text-[11px] text-amber-400/90 font-medium bg-amber-500/10 px-1.5 py-0.5 rounded-md border border-amber-500/20">
                              {item.selectedOption.name}
                            </span>
                          </div>

                          <div className="text-left">
                            <span className="text-sm font-extrabold text-amber-300 font-alexandria">
                              {itemTotal} {RESTAURANT_INFO.currency}
                            </span>
                          </div>
                        </div>

                        {item.notes && (
                          <p className="text-[11px] text-stone-400 italic bg-stone-900/60 p-1.5 rounded-lg border border-stone-800/60">
                            ملاحظة: {item.notes}
                          </p>
                        )}

                        {/* Quantity and Delete Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-stone-800/40">
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.cartItemId)}
                            className="text-[11px] text-stone-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>حذف</span>
                          </button>

                          <div className="flex items-center gap-2 bg-stone-900 rounded-lg p-0.5 border border-stone-800">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center text-xs"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-5 text-center text-xs font-bold text-amber-300">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold flex items-center justify-center text-xs"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* General Order Notes */}
                <div>
                  <label className="block text-[11px] text-stone-400 mb-1">
                    ملاحظات عامة لكامل الطلب:
                  </label>
                  <textarea
                    value={orderDetails.notes}
                    onChange={(e) => onUpdateOrderDetails({ notes: e.target.value })}
                    placeholder="أي تعليمات إضافية للمطعم..."
                    rows={2}
                    className="w-full p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-200 text-xs focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-stone-800 bg-[#191613] space-y-3">
              {/* Total Calculation */}
              <div className="flex items-center justify-between text-stone-300">
                <span className="text-sm font-semibold">إجمالي الطلب:</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-amber-300 font-alexandria">
                    {subtotal}
                  </span>
                  <span className="text-xs text-stone-400 font-bold">
                    {RESTAURANT_INFO.currency}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                {/* Send via WhatsApp */}
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 active:scale-98 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <div className="flex flex-col items-center leading-tight">
                    <span>إرسال الطلب عبر واتساب المطعم</span>
                    <span dir="ltr" className="text-[11px] font-mono opacity-90 font-bold">
                      {RESTAURANT_INFO.phone}
                    </span>
                  </div>
                </button>

                {/* Copy order text */}
                <button
                  type="button"
                  onClick={handleCopyOrder}
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-stone-800 transition-colors"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">تم نسخ تفاصيل الطلب بنجاح!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-400" />
                      <span>نسخ نص الطلب للمشاركة</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[10px] text-center text-stone-500">
                سيتم فتح تطبيق الواتساب مباشرة مع كافة التفاصيل والأسعار جاهزة للإرسال
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

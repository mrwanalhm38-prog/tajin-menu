import { CartItem, OrderDetails } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

export function generateWhatsAppMessage(
  cartItems: CartItem[],
  orderDetails: OrderDetails,
  totalPrice: number
): string {
  const dateStr = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  let message = `🍽️ *طلب جديد من منيو ${RESTAURANT_INFO.name}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📅 *الوقت:* ${dateStr}\n`;

  if (orderDetails.orderType === 'hall') {
    message += `📍 *نوع الطلب:* داخل الصالة (طاولة رقم ${orderDetails.tableNumber || 'غير محدد'})\n`;
  } else if (orderDetails.orderType === 'takeaway') {
    message += `🥡 *نوع الطلب:* تيك أواي (استلام من المطعم)\n`;
  } else {
    message += `🛵 *نوع الطلب:* دليفري (توصيل منازل)\n`;
    if (orderDetails.deliveryAddress) {
      message += `🏠 *العنوان:* ${orderDetails.deliveryAddress}\n`;
    }
  }

  if (orderDetails.customerName) {
    message += `👤 *العميل:* ${orderDetails.customerName}\n`;
  }
  if (orderDetails.customerPhone) {
    message += `📞 *الهاتف:* ${orderDetails.customerPhone}\n`;
  }

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 *تفاصيل الطلبات:*\n\n`;

  cartItems.forEach((item, index) => {
    const itemTotal = item.selectedOption.price * item.quantity;
    message += `${index + 1}. *${item.menuItem.arabicName}*\n`;
    message += `   ▫️ الخيار/الوزن: ${item.selectedOption.name}\n`;
    message += `   ▫️ الكمية: ${item.quantity} × ${item.selectedOption.price} ${RESTAURANT_INFO.currency}\n`;
    message += `   ▫️ الإجمالي: ${itemTotal} ${RESTAURANT_INFO.currency}\n`;
    if (item.notes && item.notes.trim()) {
      message += `   ▫️ ملاحظة خاصة: ${item.notes.trim()}\n`;
    }
    message += `\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  if (orderDetails.notes && orderDetails.notes.trim()) {
    message += `📝 *ملاحظات عامة:* ${orderDetails.notes.trim()}\n`;
  }
  message += `💰 *إجمالي الفاتورة:* *${totalPrice} ${RESTAURANT_INFO.currency}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `✨ شكراً لاختياركم *${RESTAURANT_INFO.name}*!`;

  return message;
}

export function openWhatsAppOrder(
  cartItems: CartItem[],
  orderDetails: OrderDetails,
  totalPrice: number
) {
  const message = generateWhatsAppMessage(cartItems, orderDetails, totalPrice);
  const encoded = encodeURIComponent(message);
  const targetNumber = RESTAURANT_INFO.whatsappNumber.replace(/[^0-9]/g, '');
  const url = `https://wa.me/${targetNumber}?text=${encoded}`;
  window.open(url, '_blank');
}

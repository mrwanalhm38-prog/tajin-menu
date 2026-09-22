export type CategoryId = 'grills' | 'sandwiches' | 'sides' | 'beverages';

export type PricingType = 'weight' | 'bread' | 'size' | 'fixed';

export interface PriceOption {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  description: string;
  categoryId: CategoryId;
  subCategory?: string;
  pricingType: PricingType;
  options: PriceOption[];
  badge?: string; // e.g. "الأكثر طلباً", "توقيع طاجين", "مميز", "جديد"
  isSpicy?: boolean;
  preparationTime?: string;
}

export interface CartItem {
  cartItemId: string; // unique per item + option combination
  menuItem: MenuItem;
  selectedOption: PriceOption;
  quantity: number;
  notes?: string;
}

export type OrderType = 'hall' | 'takeaway' | 'delivery';

export interface OrderDetails {
  orderType: OrderType;
  tableNumber: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
}

export interface Category {
  id: CategoryId;
  name: string;
  iconName: string;
  emoji: string;
  description: string;
}

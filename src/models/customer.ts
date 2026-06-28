export interface AddressModel {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
  isDefault: boolean;
  label?: 'Home' | 'Office' | 'Other'; // Our custom addition mapped to Shopify tags or metafields
}

export interface OrderItemModel {
  id: string;
  title: string;
  variantTitle: string;
  quantity: number;
  price: string;
  currency: string;
  imageUrl?: string;
}

export interface OrderModel {
  id: string;
  orderNumber: string;
  processedAt: string;
  financialStatus: 'PAID' | 'PENDING' | 'REFUNDED' | 'VOIDED';
  fulfillmentStatus: 'UNFULFILLED' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'DELIVERED';
  totalPrice: string;
  currency: string;
  items: OrderItemModel[];
  shippingAddress?: AddressModel;
}

export interface CustomerModel {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: AddressModel[];
  orders: OrderModel[];
}

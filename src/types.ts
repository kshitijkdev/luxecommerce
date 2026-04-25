export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  desc: string;
  specs: Record<string, string>;
  badge: string | null;
}

export interface CartItem extends Product {
  qty: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing';
  items: Product[];
  total: number;
  tracking: string;
}

export interface User {
  name: string;
  email: string;
}

export type Screen =
  | 'signin'
  | 'items'
  | 'item_detail'
  | 'checkout'
  | 'payment'
  | 'payment_status'
  | 'orders';

export type PaymentStatus = 'success' | 'failed' | null;
export type NavTab = 'home' | 'cart' | 'orders' | 'profile';

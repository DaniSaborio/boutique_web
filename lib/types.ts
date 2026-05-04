export interface Product {
  id: string;
  name: string;
  price: number;
  category: "dresses" | "tops" | "bottoms" | "accessories";
  image: string;
  images?: string[];
  description: string;
  colors: string[];
  sizes: string[];
  featured: boolean;
  stock?: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

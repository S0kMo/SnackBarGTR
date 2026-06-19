// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Category {
  id: string;
  label: string;
  name: string;
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  paymentMethod: "scan" | "delivery";
  status: "pending" | "in_progress" | "completed" | "cancelled";
  createdAt: Date;
  reference: string;
}

// Firebase types
export interface FirebaseProduct extends Product {
  createdAt?: any;
  updatedAt?: any;
}

export interface FirebaseOrder extends Order {
  timestamp?: any;
}

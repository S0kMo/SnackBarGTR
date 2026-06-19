const API_URL = "https://snackbar-backend-g4h8.onrender.com/api";

import { Product, Category, Order, CartItem } from "@/types";

const API_URL = "http://localhost:5000/api";
const MENU_CACHE_TTL_MS = 1000 * 60 * 15;
const CATEGORY_CACHE_KEY = "snackbar_menu_categories_cache";
const PRODUCT_CACHE_KEY = "snackbar_menu_products_cache";

type CachedMenu<T> = {
  data: T;
  savedAt: number;
};

let categoriesCache: CachedMenu<Category[]> | null = null;
let productsCache: CachedMenu<Product[]> | null = null;

const isCacheFresh = (savedAt: number) =>
  Date.now() - savedAt < MENU_CACHE_TTL_MS;

const readCache = async <T>(key: string): Promise<CachedMenu<T> | null> => {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as CachedMenu<T>;
    if (!parsed || typeof parsed.savedAt !== "number") return null;

    return parsed;
  } catch {
    return null;
  }
};

const writeCache = async <T>(key: string, data: T) => {
  const payload: CachedMenu<T> = {
    data,
    savedAt: Date.now(),
  };

  await AsyncStorage.setItem(key, JSON.stringify(payload));
  return payload;
};

export interface TelegramUserData {
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
}

export interface FirestoreUser extends TelegramUserData {
  telegramId: number;
  gtrPoints: number;
  ecoStatus: string;
  protocol: string;
  createdAt: string;
  updatedAt: string;
}

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchProductsByCategory = async (
  categoryId: string,
): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products?category=${categoryId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const submitOrder = async (
  cartItems: CartItem[],
  userId: string,
  paymentMethod: string = "cash",
): Promise<{ success: boolean; orderId: string }> => {
  try {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        items: cartItems,
        total,
        paymentMethod,
      }),
    });

    const data = await response.json();
    return { success: data.success, orderId: data.orderId };
  } catch (error) {
    console.error("Error submitting order:", error);
    return { success: false, orderId: "" };
  }
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_URL}/orders/${userId}`);
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

// User Management
export const fetchUser = async (
  telegramId: number,
): Promise<FirestoreUser | null> => {
  try {
    const response = await fetch(`${API_URL}/users/${telegramId}`);
    if (response.status === 404) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const createOrUpdateUser = async (
  telegramId: number,
  userData: TelegramUserData,
): Promise<FirestoreUser | null> => {
  try {
    const response = await fetch(`${API_URL}/users/${telegramId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return null;
  }
};

export const updateUserProfile = async (
  telegramId: number,
  updates: {
    gtrPoints?: number;
    ecoStatus?: string;
    protocol?: string;
  },
): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/users/${telegramId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return false;
  }
};

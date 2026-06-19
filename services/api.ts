import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, Category, Order, CartItem } from "@/types";

const API_URL = "https://snackbar-backend-g4h8.onrender.com/api";
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

const readCache = async <T>(
  key: string,
): Promise<CachedMenu<T> | null> => {
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

export const fetchCategories = async (
  forceRefresh = false,
): Promise<Category[]> => {
  try {
    if (!forceRefresh && categoriesCache && isCacheFresh(categoriesCache.savedAt)) {
      return categoriesCache.data;
    }

    if (!forceRefresh) {
      const stored = await readCache<Category[]>(CATEGORY_CACHE_KEY);
      if (stored && isCacheFresh(stored.savedAt)) {
        categoriesCache = stored;
        return stored.data;
      }
    }

    const response = await fetch(`${API_URL}/categories`);
    if (!response.ok) {
      throw new Error(`Failed to fetch categories (${response.status})`);
    }

    const data = (await response.json()) as Category[];
    categoriesCache = await writeCache(CATEGORY_CACHE_KEY, data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);

    if (categoriesCache?.data?.length) {
      return categoriesCache.data;
    }

    const stored = await readCache<Category[]>(CATEGORY_CACHE_KEY);
    return stored?.data || [];
  }
};

export const fetchAllProducts = async (
  forceRefresh = false,
): Promise<Product[]> => {
  try {
    if (!forceRefresh && productsCache && isCacheFresh(productsCache.savedAt)) {
      return productsCache.data;
    }

    if (!forceRefresh) {
      const stored = await readCache<Product[]>(PRODUCT_CACHE_KEY);
      if (stored && isCacheFresh(stored.savedAt)) {
        productsCache = stored;
        return stored.data;
      }
    }

    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products (${response.status})`);
    }

    const data = (await response.json()) as Product[];
    productsCache = await writeCache(PRODUCT_CACHE_KEY, data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);

    if (productsCache?.data?.length) {
      return productsCache.data;
    }

    const stored = await readCache<Product[]>(PRODUCT_CACHE_KEY);
    return stored?.data || [];
  }
};

export const fetchProductsByCategory = async (
  categoryId: string,
  forceRefresh = false,
): Promise<Product[]> => {
  const products = await fetchAllProducts(forceRefresh);
  return products.filter((product) => product.category === categoryId);
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
      throw new Error(`Failed to fetch orders (${response.status})`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
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

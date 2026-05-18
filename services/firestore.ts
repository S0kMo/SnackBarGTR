import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { Product, Category, Order, CartItem } from "@/types";

// Replace with your Firebase config
const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID || "",
};

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

// Categories
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    return categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Products
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const productsSnapshot = await getDocs(collection(db, "products"));
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductsByCategory = async (
  categoryId: string,
): Promise<Product[]> => {
  try {
    const q = query(
      collection(db, "products"),
      where("category", "==", categoryId),
    );
    const productsSnapshot = await getDocs(q);
    return productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Orders
export const submitOrder = async (
  userId: string,
  items: CartItem[],
  paymentMethod: "scan" | "delivery",
): Promise<string> => {
  try {
    const orderData = {
      userId,
      items: items.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      })),
      total: items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
      paymentMethod,
      status: "pending",
      timestamp: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "orders"), orderData);
    return docRef.id;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};

export const fetchUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const q = query(collection(db, "orders"), where("userId", "==", userId));
    const ordersSnapshot = await getDocs(q);
    return ordersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

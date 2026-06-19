const API_URL =
  "http://snackbar-backend-elxekxcj3-s0kmos-projects.vercel.app/api";

import { CartItem, Category, Order, Product } from "@/types";

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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

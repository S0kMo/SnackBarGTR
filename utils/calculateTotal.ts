import { CartItem } from "@/types";

export const calculateCartTotal = (items: CartItem[]): number => {
  return items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
};

export const calculateSubtotal = (items: CartItem[]): number => {
  return calculateCartTotal(items);
};

export const generateOrderReference = (): string => {
  // Generate a 5-character reference like "5XVPQ"
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const formatPrice = (price: number): string => {
  return `$${price.toFixed(2)}`;
};

export const formatTotal = (total: number): string => {
  return `$${total.toFixed(2)}`;
};

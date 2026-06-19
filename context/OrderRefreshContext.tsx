import React, { createContext, useContext, useState } from "react";

interface OrderRefreshContextType {
  refreshToken: number;
  notifyOrdersUpdated: () => void;
}

const OrderRefreshContext = createContext<OrderRefreshContextType | undefined>(
  undefined,
);

export function OrderRefreshProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refreshToken, setRefreshToken] = useState(0);

  const notifyOrdersUpdated = () => {
    setRefreshToken((value) => value + 1);
  };

  return (
    <OrderRefreshContext.Provider
      value={{ refreshToken, notifyOrdersUpdated }}
    >
      {children}
    </OrderRefreshContext.Provider>
  );
}

export function useOrderRefresh() {
  const context = useContext(OrderRefreshContext);
  if (!context) {
    throw new Error("useOrderRefresh must be used within OrderRefreshProvider");
  }
  return context;
}

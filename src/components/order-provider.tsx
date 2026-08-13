"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { getMenuItem, type MenuItem } from "@/lib/menu";

type CartLine = { item: MenuItem; quantity: number };
type OrderContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  isCartOpen: boolean;
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((id: string) => {
    setQuantities((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }, []);

  const decrementItem = useCallback((id: string) => {
    setQuantities((current) => {
      const next = { ...current };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setQuantities((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  }, []);

  const lines = useMemo(
    () => Object.entries(quantities).flatMap(([id, quantity]) => {
      const item = getMenuItem(id);
      return item ? [{ item, quantity }] : [];
    }),
    [quantities],
  );
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const total = lines.reduce((sum, line) => sum + line.item.price * line.quantity, 0);

  const value = useMemo<OrderContextValue>(() => ({
    lines,
    count,
    total,
    isCartOpen,
    addItem,
    removeItem,
    decrementItem,
    clear: () => setQuantities({}),
    openCart: () => setIsCartOpen(true),
    closeCart: () => setIsCartOpen(false),
  }), [addItem, count, decrementItem, isCartOpen, lines, removeItem, total]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const value = useContext(OrderContext);
  if (!value) throw new Error("useOrder must be used inside OrderProvider");
  return value;
}

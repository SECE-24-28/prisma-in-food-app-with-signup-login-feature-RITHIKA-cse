"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";


export type CartItem = {
  foodId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  setItems: (items: CartItem[]) => void;
  addItem: (foodId: string, quantity?: number) => Promise<void>;
  updateQty: (foodId: string, quantity: number) => Promise<void>;
  removeItem: (foodId: string) => Promise<void>;
  subtotal?: number;
};

const CART_KEY = "foodapp:cart";

function isDemoMode() {
  return !process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL.trim() === "";
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem(CART_KEY);
    if (!saved) return [];
    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      localStorage.removeItem(CART_KEY);
      return [];
    }
  });

  const addItem = useCallback(async (foodId: string, quantity = 1) => {
    if (isDemoMode()) {
      setItems((prev) => {
        const updated = prev.some((p) => p.foodId === foodId)
          ? prev.map((p) => (p.foodId === foodId ? { ...p, quantity: p.quantity + quantity } : p))
          : [...prev, { foodId, quantity }];
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
        return updated;
      });
      toast.success("Added to cart");
      return;
    }

    setItems((prev) => {
      const existing = prev.find((p) => p.foodId === foodId);
      if (existing) return prev.map((p) => (p.foodId === foodId ? { ...p, quantity: p.quantity + quantity } : p));
      return [...prev, { foodId, quantity }];
    });

    try {
      toast.loading("Adding to cart...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed");
      setItems(data.cart?.items ?? []);
      toast.dismiss();
      toast.success("Added");
    } catch (e) {
      toast.dismiss();
      const msg = e instanceof Error ? e.message : "Failed to add";
      toast.error(msg);
    }

  }, []);

  const updateQty = useCallback(async (foodId: string, quantity: number) => {
    if (isDemoMode()) {
      const updated = items.map((p) => (p.foodId === foodId ? { ...p, quantity } : p)).filter((p) => p.quantity > 0);
      setItems(updated);
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      return;
    }

    setItems((prev) => prev.map((p) => (p.foodId === foodId ? { ...p, quantity } : p)));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed");
      setItems(data.cart?.items ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to update";
      toast.error(msg);
    }

  }, [items]);

  const removeItem = useCallback(async (foodId: string) => {
    if (isDemoMode()) {
      const updated = items.filter((p) => p.foodId !== foodId);
      setItems(updated);
      localStorage.setItem(CART_KEY, JSON.stringify(updated));
      toast.success("Removed from cart");
      return;
    }

    setItems((prev) => prev.filter((p) => p.foodId !== foodId));
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/cart/remove`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foodId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Failed");
      setItems(data.cart?.items ?? []);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Failed to remove";
      toast.error(msg);
    }

  }, [items]);

  const value = useMemo<CartContextValue>(() => ({ items, setItems, addItem, updateQty, removeItem }), [items, addItem, updateQty, removeItem]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
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

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  async function addItem(foodId: string, quantity = 1) {
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

  }

  async function updateQty(foodId: string, quantity: number) {
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

  }

  async function removeItem(foodId: string) {
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

  }

  const value = useMemo<CartContextValue>(() => ({ items, setItems, addItem, updateQty, removeItem }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


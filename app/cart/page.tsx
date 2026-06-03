"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/src/context/cart";

const formatINR = (value: number) => `₹${value.toFixed(0)}`;

const menuItems = [
  { id: "m1", name: "Spicy Burger", price: 249, emoji: "🍔" },
  { id: "m2", name: "Garden Wrap", price: 189, emoji: "🥗" },
  { id: "m3", name: "Crispy Fries", price: 99, emoji: "🍟" },
  { id: "m4", name: "Mango Smoothie", price: 129, emoji: "🥭" },
];

export default function CartPage() {
  const { items, updateQty, removeItem } = useCart();

  const cartItems = useMemo(
    () =>
      items.map((item) => {
        const product = menuItems.find((entry) => entry.id === item.foodId);
        return {
          ...item,
          name: product?.name ?? "Unknown item",
          price: product?.price ?? 0,
          emoji: product?.emoji ?? "🍽️",
        };
      }),
    [items]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 0 ? 35 : 0;
  const total = subtotal + deliveryFee;

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_40%,#f8fbff_100%)] text-slate-900">
      <header className="border-b border-sky-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-sky-900">Cravora</Link>
          <nav className="flex gap-2 text-sm">
            <Link href="/menu" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Menu</Link>
            <Link href="/cart" className="rounded-lg bg-sky-600 px-3 py-2 text-white">Cart</Link>
            <Link href="/login" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Login</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-[1.1fr_0.9fr] md:py-12">
        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold">Your cart</h1>
          <p className="mt-2 text-zinc-600">Review your items and adjust quantities before checkout.</p>

          <div className="mt-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-sky-200 bg-sky-50 p-8 text-center text-slate-600">
                Your cart is empty. Head to the menu to add a few tasty items.
              </div>
            ) : (
              cartItems.map((item) => (
                <article key={item.foodId} className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-sky-100 bg-sky-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{item.emoji}</div>
                    <div>
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-slate-500">{formatINR(item.price)} each</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => void updateQty(item.foodId, Math.max(1, item.quantity - 1))} className="h-9 w-9 rounded-full border border-zinc-200 text-lg">−</button>
                    <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => void updateQty(item.foodId, item.quantity + 1)} className="h-9 w-9 rounded-full border border-zinc-200 text-lg">+</button>
                    <button onClick={() => void removeItem(item.foodId)} className="rounded-xl bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100">Remove</button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>

        <aside className="rounded-3xl border border-sky-100 bg-[linear-gradient(180deg,#0f172a_0%,#1e3a8a_100%)] p-6 text-white shadow-xl">
          <h2 className="text-xl font-semibold">Order summary</h2>
          <div className="mt-6 space-y-3 text-sm text-zinc-200">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{formatINR(deliveryFee)}</span></div>
            <div className="border-t border-white/10 pt-3 text-base font-semibold flex justify-between"><span>Total</span><span>{formatINR(total)}</span></div>
          </div>
          <button className="mt-6 w-full rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-sky-900 hover:bg-sky-100">Proceed to checkout</button>
          <p className="mt-3 text-xs text-zinc-300">Demo checkout is ready for local preview. Connect your API later for real orders.</p>
        </aside>
      </section>
    </main>
  );
}

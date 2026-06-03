"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "@/src/context/cart";

const formatINR = (value: number) => `₹${value.toFixed(0)}`;

const menuItems = [
  {
    id: "m1",
    name: "Spicy Burger",
    category: "Burgers",
    price: 249,
    badge: "Best Seller",
    description: "Char-grilled beef patty, cheddar, tomato, pickles, and house sauce.",
    emoji: "🍔",
  },
  {
    id: "m2",
    name: "Garden Wrap",
    category: "Wraps",
    price: 189,
    badge: "Fresh",
    description: "Crisp vegetables, grilled chicken, and creamy herb dressing.",
    emoji: "🥗",
  },
  {
    id: "m3",
    name: "Crispy Fries",
    category: "Sides",
    price: 99,
    badge: "Hot",
    description: "Golden fries with sea salt and smoky paprika dusting.",
    emoji: "🍟",
  },
  {
    id: "m4",
    name: "Mango Smoothie",
    category: "Drinks",
    price: 129,
    badge: "Refreshing",
    description: "Blended mango, yogurt, and a touch of citrus for a cool finish.",
    emoji: "🥭",
  },
];

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const { addItem } = useCart();

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [activeCategory, query]);

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f8fbff_100%)] text-slate-900">
      <header className="border-b border-sky-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-sky-900">Cravora</Link>
          <nav className="flex gap-2 text-sm">
            <Link href="/menu" className="rounded-lg bg-sky-600 px-3 py-2 text-white">Menu</Link>
            <Link href="/cart" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Cart</Link>
            <Link href="/login" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Login</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:py-12">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_45%,#38bdf8_100%)] p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-100">Cravora menu</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Fresh favorites, quick checkout, and smooth ordering.</h1>
          <p className="mt-3 max-w-2xl text-zinc-200">Search, choose, and add delicious items to your cart in a few taps.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
            <label className="text-sm font-medium text-zinc-600">Search menu</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try burger, fries, smoothie..."
              className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none ring-0 transition focus:border-zinc-900"
            />
          </div>
          <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm">
            <div className="text-sm font-medium text-zinc-600">Categories</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-3 py-2 text-sm ${activeCategory === category ? "bg-sky-600 text-white" : "bg-sky-50 text-slate-700 hover:bg-sky-100"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <article key={item.id} className="rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">{item.category}</p>
                  <h2 className="mt-2 text-xl font-semibold">{item.name}</h2>
                  <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
                </div>
                <div className="text-3xl">{item.emoji}</div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div>
                  <div className="text-xs text-emerald-700">{item.badge}</div>
                  <div className="text-2xl font-semibold text-sky-900">{formatINR(item.price)}</div>
                </div>
                <button
                  onClick={() => void addItem(item.id, 1)}
                  className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Add to cart
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="rounded-3xl border border-dashed border-sky-200 bg-white/90 p-8 text-center text-slate-600">
            No menu items match your search. Try a different keyword or category.
          </div>
        )}
      </section>
    </main>
  );
}

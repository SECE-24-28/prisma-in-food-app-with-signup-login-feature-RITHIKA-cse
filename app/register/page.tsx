"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/src/context/auth";

export default function RegisterPage() {
  const { register, loading, user } = useAuth();
  const [form, setForm] = useState({ name: "Demo User", email: "demo@foodapp.dev", password: "demo123" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(form);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f8fbff_100%)] text-slate-900">
      <header className="border-b border-sky-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-sky-900">Cravora</Link>
          <nav className="flex gap-2 text-sm">
            <Link href="/menu" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Menu</Link>
            <Link href="/cart" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Cart</Link>
            <Link href="/login" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Login</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.05fr] md:py-14">
        <div className="rounded-3xl bg-[linear-gradient(160deg,#0f172a_0%,#1e3a8a_45%,#38bdf8_100%)] p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-100">Create account</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Get started with a fast, demo-ready profile.</h1>
          <p className="mt-3 text-zinc-200">This page uses the same local demo mode as the login page, so you can test the flow immediately.</p>
        </div>

        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          {user ? (
            <div className="rounded-2xl border border-sky-100 bg-sky-50 p-4 text-sky-900">You are already signed in as {user.email}.</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-700">Full name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" required />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" required />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Password</label>
                <input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} type="password" className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" required />
              </div>
              <button disabled={loading} className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:opacity-70">{loading ? "Creating account..." : "Create account"}</button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/src/context/auth";

export default function LoginPage() {
  const { login, user, logout, loading } = useAuth();
  const [email, setEmail] = useState("demo@foodapp.dev");
  const [password, setPassword] = useState("demo123");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_45%,#f8fbff_100%)] text-slate-900">
      <header className="border-b border-sky-100 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-sky-900">Cravora</Link>
          <nav className="flex gap-2 text-sm">
            <Link href="/menu" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Menu</Link>
            <Link href="/cart" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-sky-100">Cart</Link>
            <Link href="/login" className="rounded-lg bg-sky-600 px-3 py-2 text-white">Login</Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 md:grid-cols-[0.95fr_1.05fr] md:py-14">
        <div className="rounded-3xl bg-[linear-gradient(160deg,#0f172a_0%,#1e3a8a_45%,#38bdf8_100%)] p-8 text-white shadow-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-100">Welcome back</p>
          <h1 className="mt-3 text-3xl font-semibold md:text-4xl">Sign in to continue your order.</h1>
          <p className="mt-3 text-zinc-200">Demo mode is enabled by default, so you can explore the menu and cart without a live API.</p>
          <ul className="mt-6 space-y-3 text-sm text-zinc-200">
            <li>• Use any email and password to preview the login flow.</li>
            <li>• Cart data is stored locally in your browser for a smooth test experience.</li>
            <li>• Connect your backend later by setting NEXT_PUBLIC_API_BASE_URL.</li>
          </ul>
        </div>

        <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          {user ? (
            <div className="space-y-4">
              <div className="rounded-2xl bg-sky-50 p-4 text-sky-900 border border-sky-100">
                <p className="text-sm font-semibold">Logged in as {user.name}</p>
                <p className="text-sm">{user.email}</p>
              </div>
              <button onClick={() => logout()} className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700">Logout</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-700">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
              </div>
              <div>
                <label className="text-sm font-medium text-zinc-700">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required className="mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 outline-none focus:border-zinc-900" />
              </div>
              <button disabled={loading} className="w-full rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">{loading ? "Signing in..." : "Sign in"}</button>
              <p className="text-xs text-slate-500">Need an account? Create your profile on the signup page to unlock the same demo-ready ordering flow.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

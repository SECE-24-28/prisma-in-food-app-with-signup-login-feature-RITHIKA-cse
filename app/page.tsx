import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-sky-50 text-slate-900">
      <header className="border-b border-sky-100 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="Cravora logo"
              width={36}
              height={36}
              className="h-9 w-9 shrink-0"
              priority
            />
            <span className="font-semibold tracking-tight text-sky-900">Cravora</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              className="rounded-lg px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              href="/menu"
            >
              Menu
            </Link>
            <Link
              className="rounded-lg px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              href="/cart"
            >
              Cart
            </Link>
            <Link
              className="rounded-lg px-3 py-2 hover:bg-black/5 dark:hover:bg-white/10"
              href="/login"
            >
              Login
            </Link>
            <Link
              className="rounded-lg bg-sky-600 px-3 py-2 text-white hover:bg-sky-700"
              href="/register"
            >
              Register
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-4">
        <section className="py-14 md:py-20">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.35em] text-sky-700">Cravora • modern food ordering</p>
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl text-sky-950">
                Fresh meals, fast checkout, and a smoother food journey.
              </h1>
              <p className="max-w-prose text-pretty text-lg text-slate-600">
                Browse the menu, add favorites to your cart, sign up in seconds, and enjoy a light-blue, demo-ready experience built for quick ordering.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
                >
                  Browse Menu
                </Link>
                <Link
                  href="/my-orders"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:bg-black/30 dark:hover:bg-white/10"
                >
                  My Orders
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3 text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:bg-black/30 dark:hover:bg-white/10"
                >
                  Admin
                </Link>
              </div>

              <div className="grid gap-3 pt-2 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-medium">Fast checkout</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Smooth cart + totals.
                  </div>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-medium">Secure JWT auth</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Role-based access.
                  </div>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white/60 p-4 dark:border-white/10 dark:bg-white/5">
                  <div className="text-sm font-medium">Track delivery</div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    Timeline + statuses.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-sky-100 to-transparent" />
              <div className="rounded-[2rem] border border-sky-100 bg-white/90 p-6 shadow-lg shadow-sky-100 backdrop-blur">
                <h2 className="text-lg font-semibold">Quick start</h2>
                <ol className="mt-4 space-y-3 text-sm text-zinc-700 dark:text-zinc-200">
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                      1
                    </span>
                    Register & login
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                      2
                    </span>
                    Search and filter food
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                      3
                    </span>
                    Checkout & track order
                  </li>
                </ol>

                <div className="mt-6 flex gap-3">
                  <Link
                    href="/menu"
                    className="flex-1 rounded-xl bg-sky-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-sky-700"
                  >
                    Start ordering
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-xl border border-sky-200 px-4 py-3 text-center text-sm font-medium text-slate-700 hover:bg-sky-50"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-16">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Menu search",
                desc: "Find items quickly with search + category filters.",
              },
              {
                title: "Cart management",
                desc: "Update quantities, remove items, and checkout smoothly.",
              },
              {
                title: "Admin tools",
                desc: "Manage users, food, categories, and order status.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-sky-100 bg-white/90 p-5 shadow-sm"
              >
                <div className="text-sm font-semibold">{c.title}</div>
                <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-6 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
          <span>© {new Date().getFullYear()} Cravora</span>
          <span className="hidden sm:inline">
            Next.js 15 • MongoDB • JWT • Tailwind
          </span>
        </div>
      </footer>
    </div>
  );
}

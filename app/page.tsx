import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <header className="border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-black/30">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/next.svg"
              alt="Logo"
              width={28}
              height={28}
              className="dark:invert"
              priority
            />
            <span className="font-semibold tracking-tight">Food Ordering</span>
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
              className="rounded-lg px-3 py-2 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
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
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-5xl">
                Order your favorite food in minutes.
              </h1>
              <p className="max-w-prose text-pretty text-lg text-zinc-600 dark:text-zinc-300">
                Search, filter by category, add items to your cart, checkout
                securely, and track your order status in real-time.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
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
              <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-b from-black/5 to-transparent dark:from-white/10" />
              <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-white/15 dark:bg-black/30">
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
                    className="flex-1 rounded-xl bg-zinc-900 px-4 py-3 text-center text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                  >
                    Start ordering
                  </Link>
                  <Link
                    href="/about"
                    className="rounded-xl border border-black/10 px-4 py-3 text-center text-sm font-medium hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
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
                className="rounded-2xl border border-black/10 bg-white/60 p-5 dark:border-white/15 dark:bg-white/5"
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
          <span>© {new Date().getFullYear()} Food Ordering System</span>
          <span className="hidden sm:inline">
            Next.js 15 • MongoDB • JWT • Tailwind
          </span>
        </div>
      </footer>
    </div>
  );
}

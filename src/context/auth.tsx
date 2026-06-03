"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";

export type Role = "admin" | "customer";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: Role;
  phone?: string;
  address?: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    phone?: string;
    address?: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = "foodapp:token";

function isDemoMode() {
  return !process.env.NEXT_PUBLIC_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL.trim() === "";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  );
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    const saved = localStorage.getItem("foodapp:user");
    return saved ? (JSON.parse(saved) as User) : null;
  });
  const [loading, setLoading] = useState(false);

  const loadProfile = useCallback(async (t: string) => {
    if (isDemoMode()) {
      const saved = localStorage.getItem("foodapp:user");
      if (saved) {
        setUser(JSON.parse(saved) as User);
        return;
      }
      const fallback = {
        _id: "demo-user",
        name: "Demo Customer",
        email: "demo@foodapp.dev",
        role: "customer" as Role,
      };
      setUser(fallback);
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${t}` },
    });

    if (!res.ok) throw new Error("Failed to load profile");
    const data = (await res.json()) as { user: User };
    setUser(data.user);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      if (isDemoMode()) {
        const demoUser: User = {
          _id: "demo-user",
          name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          email,
          role: email.toLowerCase().includes("admin") ? "admin" : "customer",
        };
        const demoToken = `demo-${email.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem("foodapp:user", JSON.stringify(demoUser));
        setToken(demoToken);
        setUser(demoUser);
        toast.success("Demo login successful");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Login failed");

      const t = data.token as string;
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      await loadProfile(t);
      toast.success("Logged in");
    } finally {
      setLoading(false);
    }
  }, [loadProfile]);

  const register = useCallback(async (payload: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    phone?: string;
    address?: string;
  }) => {
    setLoading(true);
    try {
      if (isDemoMode()) {
        const demoUser: User = {
          _id: "demo-user",
          name: payload.name || payload.email.split("@")[0],
          email: payload.email,
          role: payload.role ?? "customer",
          phone: payload.phone,
          address: payload.address,
        };
        const demoToken = `demo-${payload.email.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;
        localStorage.setItem(TOKEN_KEY, demoToken);
        localStorage.setItem("foodapp:user", JSON.stringify(demoUser));
        setToken(demoToken);
        setUser(demoUser);
        toast.success("Demo account ready");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message ?? "Register failed");

      const t = data.token as string;
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
      await loadProfile(t);
      toast.success("Account created");
    } finally {
      setLoading(false);
    }
  }, [loadProfile]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("foodapp:user");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout]
  );



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


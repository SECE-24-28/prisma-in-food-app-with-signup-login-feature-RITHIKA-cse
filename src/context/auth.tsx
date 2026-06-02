"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  async function loadProfile(t: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? ""}/api/auth/profile`, {
      headers: { Authorization: `Bearer ${t}` },
    });

    if (!res.ok) throw new Error("Failed to load profile");
    const data = (await res.json()) as { user: User };
    setUser(data.user);
  }

  const login = async (email: string, password: string) => {

    setLoading(true);
    try {
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
  };

  const register = async (payload: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    phone?: string;
    address?: string;
  }) => {
    setLoading(true);
    try {
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
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register]
  );



  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}


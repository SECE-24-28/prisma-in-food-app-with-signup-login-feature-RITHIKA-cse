"use client";

import { Toaster } from "react-hot-toast";
import React from "react";
import { AuthProvider } from "@/src/context/auth";
import { CartProvider } from "@/src/context/cart";


export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
      </CartProvider>
    </AuthProvider>
  );
}


"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (handle: string) => void;
  removeFromWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("smartcart_wishlist");
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse wishlist from local storage", e);
      }
    }
  }, []);

  const addToWishlist = (handle: string) => {
    const newWishlist = [...wishlist, handle];
    setWishlist(newWishlist);
    localStorage.setItem("smartcart_wishlist", JSON.stringify(newWishlist));
  };

  const removeFromWishlist = (handle: string) => {
    const newWishlist = wishlist.filter((item) => item !== handle);
    setWishlist(newWishlist);
    localStorage.setItem("smartcart_wishlist", JSON.stringify(newWishlist));
  };

  const isInWishlist = (handle: string) => {
    if (!mounted) return false;
    return wishlist.includes(handle);
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}

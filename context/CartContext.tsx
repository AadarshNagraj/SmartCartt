"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useTransition,
} from "react";
import { Cart } from "@/services/shopify/types";
import {
  createCartAction,
  getCartAction,
  addToCartAction,
  updateCartLineAction,
  removeCartLineAction,
} from "@/app/actions/cart";

const CART_ID_KEY = "smartcart_cart_id";

interface CartContextValue {
  cart: Cart | null;
  cartId: string | null;
  isLoading: boolean;
  isPending: boolean;
  totalQuantity: number;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // ── Initialize: load cart ID from localStorage, fetch or create cart ──────
  useEffect(() => {
    let mounted = true;

    async function initCart() {
      try {
        const storedId = localStorage.getItem(CART_ID_KEY);

        if (storedId) {
          const existingCart = await getCartAction(storedId);
          if (existingCart && mounted) {
            setCart(existingCart);
            setCartId(storedId);
            setIsLoading(false);
            return;
          }
          // Cart has expired — clear stored ID and create new one
          localStorage.removeItem(CART_ID_KEY);
        }

        // Create a new cart (deferred until user actually adds something)
        if (mounted) {
          setCart(null);
          setCartId(null);
          setIsLoading(false);
        }
      } catch {
        if (mounted) setIsLoading(false);
      }
    }

    initCart();
    return () => { mounted = false; };
  }, []);

  const saveCartId = useCallback((id: string) => {
    localStorage.setItem(CART_ID_KEY, id);
    setCartId(id);
  }, []);

  // ── Add item ─────────────────────────────────────────────────────────────
  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      startTransition(async () => {
        try {
          const updated = await addToCartAction(cartId, variantId, quantity);
          setCart(updated);
          saveCartId(updated.id);
        } catch (err) {
          console.error("Failed to add item to cart:", err);
        }
      });
    },
    [cartId, saveCartId]
  );

  // ── Update quantity ───────────────────────────────────────────────────────
  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cartId) return;
      startTransition(async () => {
        try {
          const updated = await updateCartLineAction(cartId, lineId, quantity);
          setCart(updated);
        } catch (err) {
          console.error("Failed to update cart:", err);
        }
      });
    },
    [cartId]
  );

  // ── Remove item ───────────────────────────────────────────────────────────
  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cartId) return;
      startTransition(async () => {
        try {
          const updated = await removeCartLineAction(cartId, lineId);
          setCart(updated);
        } catch (err) {
          console.error("Failed to remove cart item:", err);
        }
      });
    },
    [cartId]
  );

  // ── Refresh cart (re-fetch from Shopify) ──────────────────────────────────
  const refreshCart = useCallback(async () => {
    if (!cartId) return;
    try {
      const updated = await getCartAction(cartId);
      setCart(updated);
    } catch {
      // ignore
    }
  }, [cartId]);

  const totalQuantity = cart?.totalQuantity ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        isPending,
        totalQuantity,
        addItem,
        updateItem,
        removeItem,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

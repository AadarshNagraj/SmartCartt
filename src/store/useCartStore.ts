import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartModel, CartLineModel as CartLine } from '@/commerce/models';
import { cartRepository } from '@/commerce/repositories/implementations/ShopifyCartRepository';
import { trackAddToCart, trackRemoveFromCart } from '@/lib/analytics';

interface CartState {
  cartId: string | null;
  cart: CartModel | null;
  isDrawerOpen: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCartId: (id: string | null) => void;
  setCart: (cart: CartModel | null) => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  
  // Cart Mutations (Optimistic)
  initializeCart: () => Promise<void>;
  addLine: (variant: import('@/commerce/models').ProductVariant & { product?: { handle: string; title: string } }, quantity: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      cart: null,
      isDrawerOpen: false,
      isLoading: true, // Start loading as the synchronizer will mount
      error: null,

      setCartId: (id) => set({ cartId: id }),
      setCart: (cart) => set({ cart, isLoading: false, error: null }),
      
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),

      initializeCart: async () => {
        const { cartId } = get();
        set({ isLoading: true, error: null });
        
        try {
          if (cartId) {
            try {
              const fetchedCart = await cartRepository.getCart(cartId);
              set({ cart: fetchedCart, isLoading: false });
              return;
            } catch {
              console.warn("Persisted cart is invalid or expired. Creating a new one...");
              // Fall through to create a new cart
            }
          }
          
          const newCart = await cartRepository.createCart();
          set({ cart: newCart, cartId: newCart.id, isLoading: false });
        } catch (err: unknown) {
          console.error("Cart Initialization Failed", err);
          set({ error: err instanceof Error ? err.message : String(err), isLoading: false });
        }
      },

      addLine: async (variant, quantity) => {
        let { cartId, cart } = get();
        const { initializeCart } = get();
        
        // Safety: Ensure cart exists before mutating
        if (!cartId || !cart) {
          await initializeCart();
          cartId = get().cartId;
          cart = get().cart;
          if (!cartId || !cart) throw new Error("Unable to initialize cart");
        }

        // Optimistic UI Update
        const tempLineId = `temp-${Date.now()}`;
        const tempLine: CartLine = {
          id: tempLineId,
          quantity,
          cost: {
            totalAmount: {
              amount: (parseFloat(variant.price.amount) * quantity).toFixed(2),
              currencyCode: variant.price.currencyCode
            }
          },
          merchandise: {
            id: variant.id,
            title: variant.title,
            price: variant.price,
            image: variant.image,
            availableForSale: variant.availableForSale,
            selectedOptions: variant.selectedOptions || [],
            product: variant.product || { handle: '', title: '' }
          }
        };

        const optimisticCart = recalculateTotals({
          ...cart,
          lines: [...cart.lines, tempLine]
        });

        set({ cart: optimisticCart, isDrawerOpen: true });

        // Sync with backend
        try {
          const updatedCart = await cartRepository.addLine(cartId, variant.id, quantity);
          set({ cart: updatedCart });
          trackAddToCart(variant, quantity);
        } catch (err: unknown) {
          // Automatic Cart Recovery
          const errorMessage = err instanceof Error ? err.message : String(err);
          if (errorMessage.includes('expired') || errorMessage.includes('not found') || errorMessage.includes('Invalid cart')) {
             console.warn("Cart operation failed due to invalid cart. Attempting recovery...");
             set({ cartId: null, cart: null });
             await initializeCart();
             const recoveredCartId = get().cartId;
             if (recoveredCartId) {
                try {
                  const finalCart = await cartRepository.addLine(recoveredCartId, variant.id, quantity);
                  set({ cart: finalCart });
                  return;
                } catch (recoveryErr) {
                  console.error("Cart recovery failed", recoveryErr);
                }
             }
          }
          
          // Rollback on failure
          set({ cart, error: "Failed to add item to cart" });
          // In a real app we might trigger a toast notification here
        }
      },

      updateLine: async (lineId, quantity) => {
        const { cartId, cart, initializeCart } = get();
        if (!cartId || !cart) return;

        // Optimistic Update
        const optimisticLines = cart.lines.map(line => {
          if (line.id === lineId) {
            return {
              ...line,
              quantity,
              cost: {
                totalAmount: {
                  amount: (parseFloat(line.merchandise.price.amount) * quantity).toFixed(2),
                  currencyCode: line.merchandise.price.currencyCode
                }
              }
            };
          }
          return line;
        });

        const optimisticCart = recalculateTotals({ ...cart, lines: optimisticLines });
        set({ cart: optimisticCart });

        // Sync with backend
        try {
          const updatedCart = await cartRepository.updateLine(cartId, lineId, quantity);
          set({ cart: updatedCart });
        } catch (err: unknown) {
           // Automatic Cart Recovery for update/remove is trickier since line IDs change, 
           // but normally carts expire after 30 days of inactivity. If it happens, we just fetch a new empty cart.
           const errorMessage = err instanceof Error ? err.message : String(err);
           if (errorMessage.includes('expired') || errorMessage.includes('not found')) {
             set({ cartId: null, cart: null });
             await initializeCart();
             return;
           }
          // Rollback
          set({ cart, error: "Failed to update item quantity" });
        }
      },

      removeLine: async (lineId) => {
        const { cartId, cart, initializeCart } = get();
        if (!cartId || !cart) return;

        // Optimistic Update
        const optimisticLines = cart.lines.filter(line => line.id !== lineId);
        const optimisticCart = recalculateTotals({ ...cart, lines: optimisticLines });
        set({ cart: optimisticCart });

        // Sync with backend
        const lineItem = cart.lines.find(l => l.id === lineId);
        
        try {
          const updatedCart = await cartRepository.removeLine(cartId, lineId);
          set({ cart: updatedCart });
          if (lineItem) {
            trackRemoveFromCart(lineItem);
          }
        } catch (err: unknown) {
           const errorMessage = err instanceof Error ? err.message : String(err);
           if (errorMessage.includes('expired') || errorMessage.includes('not found')) {
             set({ cartId: null, cart: null });
             await initializeCart();
             return;
           }
          // Rollback
          set({ cart, error: "Failed to remove item" });
        }
      }
    }),
    {
      name: 'smartcart-storage',
      // We strictly persist ONLY the cartId
      partialize: (state) => ({ cartId: state.cartId }),
    }
  )
);

// Helper for optimistic recalculations
function recalculateTotals(cart: CartModel): CartModel {
  let totalQuantity = 0;
  let subtotal = 0;

  cart.lines.forEach(line => {
    totalQuantity += line.quantity;
    subtotal += parseFloat(line.cost.totalAmount.amount);
  });

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return {
    ...cart,
    totalQuantity,
    cost: {
      subtotalAmount: { amount: subtotal.toFixed(2), currencyCode: "USD" },
      totalTaxAmount: { amount: tax.toFixed(2), currencyCode: "USD" },
      totalAmount: { amount: total.toFixed(2), currencyCode: "USD" }
    }
  };
}

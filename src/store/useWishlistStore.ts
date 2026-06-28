import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // array of product handles
  addItem: (handle: string) => void;
  removeItem: (handle: string) => void;
  hasItem: (handle: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (handle: string) => set((state) => {
        if (!state.items.includes(handle)) {
          return { items: [...state.items, handle] };
        }
        return state;
      }),
      
      removeItem: (handle: string) => set((state) => ({
        items: state.items.filter((item) => item !== handle),
      })),
      
      hasItem: (handle: string) => get().items.includes(handle),
      
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'smartcart-wishlist',
    }
  )
);

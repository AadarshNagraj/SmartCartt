import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  items: string[]; // array of product handles
  addRecentlyViewed: (handle: string) => void;
  clearRecentlyViewed: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      items: [],
      
      addRecentlyViewed: (handle: string) => set((state) => {
        const newItems = state.items.filter((item) => item !== handle);
        newItems.unshift(handle);
        
        // Limit history to the latest 10 products
        if (newItems.length > 10) {
          newItems.pop();
        }
        
        return { items: newItems };
      }),
      
      clearRecentlyViewed: () => set({ items: [] }),
    }),
    {
      name: 'smartcart-recently-viewed',
    }
  )
);

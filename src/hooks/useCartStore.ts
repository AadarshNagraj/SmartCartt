import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
  // Other Shopify item properties will go here later
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  itemCount: number;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  // Actions for future integrations
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  itemCount: 0,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    let newItems;
    if (existing) {
      newItems = state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i);
    } else {
      newItems = [...state.items, item];
    }
    return {
      items: newItems,
      itemCount: newItems.reduce((acc, curr) => acc + curr.quantity, 0)
    };
  }),
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter(i => i.id !== id);
    return {
      items: newItems,
      itemCount: newItems.reduce((acc, curr) => acc + curr.quantity, 0)
    };
  })
}));

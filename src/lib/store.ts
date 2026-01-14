import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category?: string;
    description?: string;
    stock: number;
    isActive: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product) => void;
    removeItem: (productId: string) => void;
    removeItemOne: (productId: string) => void;
    toggleCart: () => void;
    clearCart: () => void;
    total: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (product) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === product.id);

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        ),
                        isOpen: true,
                    });
                } else {
                    set({ items: [...items, { ...product, quantity: 1 }], isOpen: true });
                }
            },
            removeItem: (productId) => {
                const items = get().items;
                set({
                    items: items.filter((item) => item.id !== productId),
                });
            },
            removeItemOne: (productId) => {
                const items = get().items;
                const existingItem = items.find((item) => item.id === productId);

                if (existingItem && existingItem.quantity > 1) {
                    set({
                        items: items.map((item) =>
                            item.id === productId
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                    });
                } else {
                    set({
                        items: items.filter((item) => item.id !== productId),
                    });
                }
            },
            toggleCart: () => set({ isOpen: !get().isOpen }),
            clearCart: () => set({ items: [] }),
            total: () => {
                return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'detallosos-cart',
        }
    )
);

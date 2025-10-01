import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware'; 

export const useCartStore = create(
    devtools( 
        persist(
            (set) => ({
                cart: [],

                addToCart: (productToAdd) => {
                    set((state) => {
                        const exists = state.cart.find(item => item.id === productToAdd.id);

                        if (exists) {
                            if (exists.quantity < exists.stock) {
                                return {
                                    cart: state.cart.map(item =>
                                        item.id === productToAdd.id
                                            ? { ...item, quantity: item.quantity + 1 }
                                            : item
                                    ),
                                };
                            }
                            return state;
                        } else {
                            return {
                                cart: [...state.cart, { ...productToAdd, quantity: 1 }],
                            };
                        }
                    });
                },

                incrementQuantity: (id) => {
                    set((state) => ({
                        cart: state.cart.map(item => {
                            if (item.id === id && item.quantity < item.stock) {
                                return { ...item, quantity: item.quantity + 1 };
                            }
                            return item;
                        }),
                    }));
                },
                
                decrementQuantity: (id) => {
                    set((state) => ({
                        cart: state.cart.map(item => {
                            if (item.id === id && item.quantity > 1) {
                                return { ...item, quantity: item.quantity - 1 };
                            }
                            return item;
                        }),
                    }));
                },

                removeFromCart: (id) => {
                    set((state) => ({
                        cart: state.cart.filter(item => item.id !== id),
                    }));
                },
                
                clearCart: () => set({ cart: [] }),
            }),
            {
                name: 'shopping-cart',
            }
        )
    )
);
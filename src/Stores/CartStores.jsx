import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: JSON.parse(localStorage.getItem('cart')) || [],

  addToCart: (product) => set((state) => {
    const existingProduct = state.cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      state.cart.push({ ...product, quantity: product.quantity });
    }
    localStorage.setItem('cart', JSON.stringify(state.cart));
    return { cart: [...state.cart] };
  }),

  incrementQuantity: (productId) => set((state) => {
    const updatedCart = state.cart.map(item => {
      if (item.id === productId) {
        if (item.quantity < item.stock) {
          item.quantity += 1;
        }
      }
      return item;
    });
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  decrementQuantity: (productId) => set((state) => {
    const updatedCart = state.cart
      .map(item => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            return null;
          }
        }
        return item;
      })
      .filter(item => item !== null);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),

  removeFromCart: (productId) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
}));
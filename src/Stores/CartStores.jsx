import { create } from 'zustand';


export const useCartStore = create((set) => ({
    // Estado inicial
    cart: JSON.parse(localStorage.getItem('cart')) || [],

    // Función que se encarga de guardar el estado en localStorage después de cada acción
    setCartAndPersist: (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        set({ cart: newCart });
    },

    // 
    addToCart: (product) => set((state) => {
        const productQuantityToAdd = product.quantity || 1; 
        const existingProduct = state.cart.find((item) => item.id === product.id);

        let newCart;

        if (existingProduct) {
            newCart = state.cart.map(item => {
                if (item.id === product.id) {
                    // Crea un NUEVO objeto para el item (inmutabilidad)
                    return { 
                        ...item, 
                        // Verifica stock si el item ya tiene la propiedad 'stock'
                        quantity: Math.min(item.quantity + productQuantityToAdd, item.stock || Infinity)
                    };
                }
                return item;
            });
        } else {
            // Si es un nuevo producto: Añadirlo al carrito con la cantidad especificada
            // Crea un NUEVO array
            newCart = [...state.cart, { ...product, quantity: productQuantityToAdd }];
        }

        // Persistir y actualizar el estado
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    incrementQuantity: (productId) => set((state) => {
        const updatedCart = state.cart.map(item => {
            if (item.id === productId && item.quantity < item.stock) {
                // Crea un NUEVO objeto de ítem si la cantidad se incrementa
                return { ...item, quantity: item.quantity + 1 };
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
                        // Crea un NUEVO objeto de ítem
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    // Si la cantidad es 1, retorna 'null' para ser filtrado (eliminado)
                    return null; 
                }
                return item;
            })
            .filter(item => item !== null); // Elimina los ítems que retornaron 'null'
            
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),

    removeFromCart: (productId) => set((state) => {
        const updatedCart = state.cart.filter((item) => item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        return { cart: updatedCart };
    }),
}));
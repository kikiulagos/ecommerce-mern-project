import { create } from 'zustand';

// Función para inicializar el estado del usuario desde localStorage
const getUserFromStorage = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        console.error("Error al leer userInfo del localStorage:", error);
        return null;
    }
};


export const useUserStore = create((set) => ({
    // Estado inicial: Intenta cargar el usuario al iniciar la app
    userInfo: getUserFromStorage(),

    // Acción para guardar el usuario después del Login o Registro
    setUserInfo: (userData) => {
        set({ userInfo: userData });
        localStorage.setItem('userInfo', JSON.stringify(userData));
    },

    // Acción para cerrar la sesión
    logoutUser: () => {
        set({ userInfo: null });
        localStorage.removeItem('userInfo');
    },
}));
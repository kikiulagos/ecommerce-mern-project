import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import { useCartStore } from '../../Stores/CartStores';
import { useUserStore } from '../../Stores/UserStore';
import Logo from '../Logo/Logo';
import Navbar from '../Navbar/Navbar';
import Cart from '../Cart/Cart'

function HamburgerIcon({ isOpen, toggleMenu }) {
    return (
        <button 
            onClick={toggleMenu} 
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-300"
            aria-label="Abrir menú de navegación"
        >
            {isOpen ? (
                // Icono de cierre (X)
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            ) : (
                // Icono de hamburguesa
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
        </button>
    );
}

HamburgerIcon.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleMenu: PropTypes.func.isRequired,
};

// Componente de icono del carrito
function ShoppingCartIcon({ cartLength }) {
    return (
        <div className="relative cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart w-7 h-7 text-gray-700 hover:text-blue-600 transition duration-300">
                <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.6 12.42a2 2 0 0 0 2 1.58h9.72a2 2 0 0 0 2-1.58L23 6H6"/>
            </svg>
            {cartLength > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                    {cartLength}
                </span>
            )}
        </div>
    );
}

ShoppingCartIcon.propTypes = {
    cartLength: PropTypes.number.isRequired,
};


// Componente Header
export default function Header() {
    const { cart, removeFromCart } = useCartStore(); 
    const { userInfo } = useUserStore(); 
    const [isCartVisible, setIsCartVisible] = useState(false); 
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú móvil
    
    const cartRef = useRef(null);

    const toggleCartVisibility = () => {
        // Al abrir el carrito, cerramos el menú móvil
        setIsMenuOpen(false); 
        setIsCartVisible(!isCartVisible);
    };
    
    const toggleMenu = () => {
        // Al abrir el menú móvil, cerramos el carrito
        setIsCartVisible(false); 
        setIsMenuOpen(!isMenuOpen); // Función para alternar el menú
    }; 

    // Hook para cerrar el carrito al hacer click fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Cierra el carrito
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                setIsCartVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    // Función para cerrar el menú después de hacer clic en un enlace
    const handleNavigationClick = () => {
        setIsMenuOpen(false);
    };


    return (
        <>
            {/* Contenedor principal del Header: Fija el ancho máximo y padding para escritorio/móvil */}
            <header className="sticky top-4 z-50 mx-2 sm:mx-4 mt-4 p-3 sm:p-4 bg-white shadow-xl rounded-xl transition-colors duration-500">
                <div className="container mx-auto flex items-center justify-between">
                    
                    {/* Sección Izquierda: Logo y Navbar */}
                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="shrink-0"><Logo /></div>
                        {/* El Navbar fijo, visible solo en escritorio */}
                        <div className="hidden md:block"><Navbar onLinkClick={handleNavigationClick} /></div>
                    </div>
                    
                    {/* Sección Derecha: Iconos y Botones */}
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        
                        {/* Icono de Hamburguesa (visible solo en móvil) */}
                        <HamburgerIcon isOpen={isMenuOpen} toggleMenu={toggleMenu} />

                        {/* Saludo de Usuario y Enlace a Perfil */}
                        {userInfo && (
                            <Link 
                                to="/profile" 
                                className="px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition duration-300 whitespace-nowrap"
                                title="Ver Perfil"
                            >
                                Hola, {userInfo.name.split(' ')[0]}
                            </Link>
                        )}

                        {/* Icono del carrito */}
                        <div onClick={toggleCartVisibility}>
                             <ShoppingCartIcon cartLength={cart.length} />
                        </div>
                    </div>
                </div>

                {/* MENÚ MÓVIL DESPLEGABLE */}
                {/* Se muestra debajo del Header fijo, solo en pantallas pequeñas */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
                        <Navbar isMobileMenu={true} onLinkClick={handleNavigationClick} />
                        
                    </div>
                )}
            </header>

            {/* Dropdown del Carrito */}
            {isCartVisible && (
                <div 
                    ref={cartRef} 
                    className="fixed top-20 right-4 sm:right-8 z-[60] bg-white shadow-2xl w-72 sm:w-80 p-4 rounded-xl text-gray-900 transition duration-500 border border-gray-200"
                >
                    <Cart cartItems={cart} onRemoveFromCart={removeFromCart} onClose={() => setIsCartVisible(false)} />
                </div>
            )}
        </>
    );
}

Header.propTypes = {};

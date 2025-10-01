import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/**
 * @param {boolean} isMobileMenu Indica si se renderiza en modo móvil (columna).
 * @param {function} onLinkClick Función a ejecutar al hacer clic en un enlace (usado para cerrar el menú móvil).
 */
export default function Navbar({ isMobileMenu, onLinkClick }) {
    // Definición de los enlaces principales de la aplicación
    const navLinks = [
        { path: '/', label: 'Inicio' },
        { path: '/products', label: 'Productos' },
        { path: '/about', label: 'Nosotros' },
        { path: '/contact', label: 'Contacto' },
    ];

    // Clases base para el estilo de los enlaces
    const linkClasses = "px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition duration-300";

    // Determinamos las clases del contenedor basándonos en si es un menú móvil o de escritorio.
    const containerClasses = isMobileMenu 
        ? "flex flex-col space-y-2 w-full" // Estilo móvil: Columna, ocupa todo el ancho, con espaciado vertical
        : "flex space-x-4";             // Estilo escritorio: Fila, espaciado horizontal

    return (
        <nav className={containerClasses}>
            {navLinks.map((link) => (
                <Link
                    key={link.path}
                    to={link.path}
                    onClick={onLinkClick} // Cierra el menú móvil al hacer clic
                    className={`${linkClasses} ${isMobileMenu ? 'w-full text-lg text-left p-3' : ''}`}
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}

Navbar.propTypes = {
    isMobileMenu: PropTypes.bool,
    onLinkClick: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
    isMobileMenu: false,
};

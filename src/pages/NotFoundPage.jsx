import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100 text-gray-900 p-6">
            
            {/* Título de Error Grande y Dramático */}
            <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest mb-4">
                404
            </h1>

            {/* Mensaje principal */}
            <div className="bg-blue-600 px-4 py-1 text-sm rounded-lg text-white mb-6">
                PÁGINA NO ENCONTRADA
            </div>
            
            {/* Mensaje descriptivo */}
            <p className="text-xl text-gray-700 text-center mb-10 max-w-md">
                Lo sentimos, no pudimos encontrar la página que estás buscando.
                ¡No te preocupes! Siempre puedes volver a salvo.
            </p>

            {/* Botón de navegación */}
            <Link 
                to="/" 
                className="inline-block px-8 py-3 text-lg font-semibold text-white bg-black rounded-full shadow-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-black focus:ring-opacity-50"
            >
                Volver a la Página de Inicio
            </Link>
        </div>
    );
}

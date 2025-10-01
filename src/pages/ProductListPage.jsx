import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import { useCartStore } from '../Stores/useCartStore';
import { toast } from 'react-toastify';

// Componente individual para la tarjeta de producto
const ProductCard = ({ product }) => {
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart({
            id: product._id, 
            name: product.name,
            price: product.price,
            stock: product.stock,
            quantity: 1, 
        });
        toast.success(`${product.name} añadido al carrito.`);
    };
    
    const formattedPrice = product.price ? `$${product.price.toFixed(2)}` : '$0.00';
    const isAvailable = product.stock > 0;

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col">
            <div className="h-48 bg-gray-200 flex items-center justify-center p-4">
                <img 
                    src={product.img || `https://placehold.co/300x200/4F46E5/FFFFFF?text=${product.name.substring(0, 10).replace(' ', '+')}`} 
                    alt={product.name} 
                    className="object-cover w-full h-full rounded-lg"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/300x200/cccccc/333333?text=Producto" }}
                />
            </div>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-3 flex-grow">{product.description}</p>
                
                <div className="flex justify-between items-center mb-4 pt-2 border-t border-gray-100">
                    <span className="text-2xl font-extrabold text-indigo-600">{formattedPrice}</span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {isAvailable ? `En Stock (${product.stock})` : 'Agotado'}
                    </span>
                </div>
                
                <button
                    onClick={handleAddToCart}
                    disabled={!isAvailable}
                    className="w-full py-3 px-4 rounded-lg text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-150 ease-in-out shadow-md hover:shadow-lg"
                >
                    {isAvailable ? 'Añadir al Carrito' : 'Sin Stock'}
                </button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        img: PropTypes.string, 
    }).isRequired,
};


// Componente principal de la lista de productos
export default function ProductListPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsFromNode = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/products'); 

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status} - ${response.statusText || 'Error al conectar'}`);
                }

                const data = await response.json();
                
                setProducts(data); 

            } catch (err) {
                console.error("Error al cargar productos de Node/MongoDB:", err);
                setError(`Error al cargar los productos: ${err.message}. Verifica el servidor.`);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProductsFromNode();
    }, []); 


    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] bg-gray-100">
                <div className="flex flex-col items-center space-y-4 p-8 rounded-xl bg-white shadow-lg">
                    <svg className="animate-spin h-10 w-10 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-xl font-medium text-gray-700">Cargando productos...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[50vh] bg-gray-100">
                <div className="p-8 rounded-xl bg-red-50 border border-red-300 shadow-lg">
                    <p className="text-xl font-bold text-red-700">Error: {error}</p>
                    <p className="text-gray-600 mt-2">No se pudieron cargar los productos. Asegúrate de que tu servidor Node.js esté corriendo.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 pt-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-600 inline-block pb-2">
                Nuestros Productos
            </h1>
            
            {products.length === 0 ? (
                <div className="p-10 text-center bg-yellow-50 rounded-xl border-2 border-dashed border-yellow-300">
                    <p className="text-xl font-semibold text-yellow-800">No hay productos disponibles.</p>
                    <p className="text-gray-600 mt-2">Verifica la colección de productos en tu MongoDB.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} /> 
                    ))}
                </div>
            )}
        </div>
    );
}
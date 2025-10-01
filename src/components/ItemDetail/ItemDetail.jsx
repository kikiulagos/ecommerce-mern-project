import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loading/Loading.jsx';
import { useCartStore } from '../../Stores/CartStores'; 

export default function ItemDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCartStore();  

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:5000/api/products/${productId}`);
                if (!response.ok) throw new Error('Producto no encontrado');
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                setError('No se pudo cargar el producto.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const incrementQuantity = () => {
        if (product && quantity < product.stock) setQuantity(quantity + 1);
    };

    const precioTotal = product ? (product.discountPrice || product.price) * quantity : 0;

    const handleAddToCart = () => {
        if (!product) return;
        if (product.sizes && product.sizes.length > 0 && !selectedSize) {
            alert("Por favor, selecciona una talla antes de agregar al carrito.");
            return;
        }

        const productToAdd = {
            id: product._id,
            name: product.name,
            price: product.price,
            discountPrice: product.discountPrice,
            img: product.img,
            size: selectedSize, 
            quantity,
        };
        addToCart(productToAdd);
        alert(`${quantity} unidades de "${product.name}" ${selectedSize ? `con talla "${selectedSize}"` : ''} añadidas al carrito.`);
    };

    if (loading) return <div className='container mx-auto max-w-[1170px]'><Loading /></div>;
    if (error) return <div className='text-red-500 text-center mt-4'>{error}</div>;
    if (!product) return <div>Producto no encontrado.</div>;

    return (
        <div className='container mx-auto max-w-[1170px]'>
            <div className="grid grid-cols-2 pt-16 pb-24 gap-8">
                <div className="pr-5">
                    <img 
                        src={product.img} 
                        alt={`Imagen de ${product.name}`} 
                        className='w-full h-auto shadow-md transition-transform duration-300 transform hover:scale-105' 
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <h1 className='text-4xl font-semibold text-gray-900'>{product.name}</h1>
                        <p className='text-base text-gray-700 my-4'>{product.description}</p>
                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <h3 className='text-lg font-medium text-gray-800 mt-4'>Tallas disponibles:</h3>
                                <ul className='flex space-x-2 mt-2'>
                                    {product.sizes.map((size, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => setSelectedSize(size)}
                                                className={`border border-gray-400 w-12 h-12 flex justify-center items-center text-lg transition-colors duration-300 ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200'}`}
                                            >
                                                {size}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <p className='text-base text-gray-800 my-4'>Stock: <span className='font-semibold'>{product.stock}</span></p>
                    </div>
                    <div className="flex flex-col items-start">
                        <div className='flex items-center mb-4'>
                            <button onClick={decrementQuantity} className='border border-gray-300 text-lg px-3 py-1 transition duration-200 hover:bg-gray-200'>-</button>
                            <p className='text-lg mx-4'>{quantity}</p>
                            <button onClick={incrementQuantity} className='border border-gray-300 text-lg px-3 py-1 transition duration-200 hover:bg-gray-200'>+</button>
                        </div>
                        <p className='text-lg text-gray-800 my-2'>Precio unitario: <span className='font-semibold'>${product.discountPrice || product.price}</span></p>
                        {product.discountPrice && (
                            <p className='text-lg text-gray-800 my-2'>
                                <span className='line-through text-gray-500'>${product.price}</span> 
                                <span className='text-red-600'> ${product.discountPrice}</span>
                            </p>
                        )}
                        <p className='text-lg text-gray-800 my-2'>Precio Total: <span className='font-semibold'>${precioTotal}</span></p>
                        <button onClick={handleAddToCart} className='bg-gray-900 text-white text-lg px-4 py-2 transition duration-300 hover:bg-gray-800'>
                            Agregar al Carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

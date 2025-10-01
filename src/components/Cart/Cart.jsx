import { useCartStore } from '../../Stores/CartStores'; 
import { IoTrashOutline, IoAdd, IoRemove } from 'react-icons/io5'; 

export default function Cart() {
    // Obtener estado y acciones del store
    const { 
        cart, 
        incrementQuantity, 
        decrementQuantity, 
        removeFromCart 
    } = useCartStore();

    const handleIncrease = (id) => {
        incrementQuantity(id);
    };


    const handleRemove = (id) => {
        removeFromCart(id);
    };

    // Cálculo del Total
    const totalPrice = cart.reduce(
        (total, item) => {
            // Usa el precio base o con descuento si existe
            const priceToUse = item.discountPrice || item.price; 
            return total + priceToUse * item.quantity;
        },
        0
    );
    
    // Función para el botón de pago (se implementará con la autenticación)
    const handleCheckout = () => {
        alert("Procediendo al pago. ¡Falta implementar la autenticación y la pasarela!");
        // Aquí es donde navegarás a la página de Checkout.
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 pt-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-8 border-b-4 border-indigo-600 inline-block pb-2">
                Tu Carrito de Compras
            </h1>

            {cart.length === 0 ? (
                <div className="p-10 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                    <p className="text-2xl font-semibold text-gray-700">🛒 El carrito está vacío.</p>
                    <p className="text-gray-500 mt-2">¡Explora nuestros productos y añade algo!</p>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="lg:w-3/4 bg-white shadow-xl rounded-xl p-6 space-y-4 overflow-x-hidden"> 
                        {cart.map((item) => {
                            const priceToUse = item.discountPrice || item.price;
                            const subtotal = priceToUse * item.quantity;
                            const isAtMaxStock = item.quantity >= item.stock;

                            return (
                                <div 
                                    key={item.id} 
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
                                >
                                    <div className="flex items-start w-full sm:w-3/5 mb-3 sm:mb-0">
                                        <img
                                            src={item.img || "https://via.placeholder.jpg"}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-lg mr-4 border border-gray-200 flex-shrink-0"
                                        />
                                        
                                        <div className="flex-1 min-w-0"> 
                                            <p className="font-semibold text-lg text-gray-900 truncate">{item.name}</p>
                                            <p className={`text-xs font-medium ${isAtMaxStock ? 'text-red-500' : 'text-green-600'}`}>
                                                {isAtMaxStock ? `Stock Máximo: ${item.stock}` : `Stock: ${item.stock}`}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-2/5">
                                        
                                        <div className="flex items-center border border-gray-300 rounded-lg p-1 mr-4">
                                            <button
                                                onClick={() => decrementQuantity(item.id)}
                                                disabled={item.quantity <= 1}
                                                className={`p-1 text-lg rounded-full transition ${item.quantity <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                                            >
                                                <IoRemove />
                                            </button>
                                            <span className="px-3 font-semibold text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => handleIncrease(item.id, item.stock)}
                                                disabled={isAtMaxStock}
                                                className={`p-1 text-lg rounded-full transition ${isAtMaxStock ? 'text-gray-400 cursor-not-allowed' : 'text-indigo-600 hover:bg-indigo-50'}`}
                                            >
                                                <IoAdd />
                                            </button>
                                        </div>

                                        {/* Precio y Subtotal */}
                                        <div className="flex flex-col text-right mr-4">
                                            <span className="text-sm text-gray-500">Subtotal</span>
                                            <span className="text-lg font-bold text-indigo-700">${subtotal.toFixed(2)}</span>
                                        </div>

                                        {/* Botón Eliminar */}
                                        <button
                                            onClick={() => handleRemove(item.id)}
                                            className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                                            aria-label="Eliminar producto"
                                        >
                                            <IoTrashOutline className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Resumen del Pedido */}
                    <div className="lg:w-1/4">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-200 sticky top-4">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                                Resumen del Pedido
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal ({cart.length} artículos)</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-700 border-t pt-3">
                                    <span>Costo de Envío</span>
                                    <span className="font-semibold text-green-600">GRATIS</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold text-indigo-700 border-t border-indigo-300 pt-4">
                                    <span>Total Final</span>
                                    <span>${totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleCheckout}
                                className="w-full mt-6 py-3 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
                            >
                                Proceder al Pago
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
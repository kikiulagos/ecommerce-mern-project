import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { useCartStore } from '../../Stores/CartStores'; 

export default function Item({ id, name, price, discountPrice, img }) {
    const { cart } = useCartStore(); 

    const discountPercentage = discountPrice ? Math.round(((price - discountPrice) / price) * 100) : 0;

    const productInCart = cart.find(item => item.id === id);
    const quantity = productInCart ? productInCart.quantity : 0;

    return (
        <div className="relative flex flex-col items-center my-4 mx-auto px-4 py-4 border border-gray-200 rounded-lg shadow-lg w-[260px] text-center">
            <Link to={`/products/${id}`} className="w-full flex justify-center">
                <img 
                    src={img} 
                    alt={`Imagen de ${name}`} 
                    className="w-[200px] h-[200px] object-cover rounded-lg mb-4" 
                />
            </Link>

            {discountPrice && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    -{discountPercentage}% OFF
                </div>
            )}

            <Link 
                to={`/products/${id}`} 
                className="text-[20px] font-bold my-3 tracking-[4px] uppercase text-[#030303] hover:text-[rgb(100,99,95)]"
            >
                {name} {quantity > 0 && <span className="text-sm text-gray-500">x{quantity}</span>}
            </Link>

            <div className="text-[18px] font-bold mb-2">
                {discountPrice ? (
                    <>
                        <span className="text-gray-500 line-through mr-2">${price}</span>
                        <span className="text-red-600">${discountPrice}</span>
                    </>
                ) : (
                    <span className="text-black">${price}</span>
                )}
            </div>
        </div>
    );
}

Item.propTypes = {
    id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPrice: PropTypes.number,
    img: PropTypes.string.isRequired,
};

Item.defaultProps = {
    discountPrice: null,
};

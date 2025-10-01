import PropTypes from 'prop-types';
import Item from "../Item/Item"; 
import { useEffect, useState } from "react"; 
import Loading from "../Loading/Loading"; 

export default function ItemList({ products, selectedCategory, onAddToCart }) {
    const [fetchedProducts, setFetchedProducts] = useState([]); 
    const [loading, setLoading] = useState(!products); 
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!products) {
            setLoading(true);
            let url = 'http://localhost:5000/api/products';
            if (selectedCategory && selectedCategory !== 'Todos') {
                url = `http://localhost:5000/api/products/category/${encodeURIComponent(selectedCategory)}`;
            }

            fetch(url)
                .then(res => {
                    if (!res.ok) throw new Error('Error al obtener productos.');
                    return res.json();
                })
                .then(data => setFetchedProducts(data))
                .catch(() => setError('Error al cargar los productos.'))
                .finally(() => setLoading(false));
        } else {
            setFetchedProducts(products);
        }
    }, [products, selectedCategory]);

    const displayedProducts = products || fetchedProducts;

    return (
        <div>
            {loading && <Loading />} 
            {error && <div className="text-red-500">{error}</div>} 
            {!loading && !error && displayedProducts.length === 0 && (
                <div>No hay productos disponibles.</div>
            )}
            {!loading && !error && displayedProducts.length > 0 && (
                <div className="flex flex-wrap justify-start gap-4">
                    {displayedProducts.map((prod) => (
                        <Item 
                            key={prod._id} 
                            id={prod._id}   // <-- MongoDB _id
                            name={prod.name} 
                            price={prod.price} 
                            discountPrice={prod.discountPrice} 
                            img={prod.img} 
                            onAddToCart={() => onAddToCart(prod)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

ItemList.propTypes = {
    products: PropTypes.array,
    selectedCategory: PropTypes.string,
    onAddToCart: PropTypes.func 
};

ItemList.defaultProps = {
    products: null,
    selectedCategory: 'Todos',
    onAddToCart: () => {} 
};

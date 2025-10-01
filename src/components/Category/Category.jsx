import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import ItemList from "../ItemList/ItemList";

export default function ProductsCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            setLoading(true);
            setError(null);

            let url = 'http://localhost:5000/api/products';
            if (categoryId && categoryId !== 'Todos') {
                url = `http://localhost:5000/api/products/category/${encodeURIComponent(categoryId)}`;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error("Error al obtener los productos");
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los productos.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductsByCategory();
    }, [categoryId]);

    return (
        <div className="container mx-auto max-w-[1170px]">
            {loading && <Loading />}
            {error && <div className="text-red-500">{error}</div>}
            {!loading && !error && products.length === 0 && (
                <div>No hay productos en esta categoría.</div>
            )}
            {!loading && !error && products.length > 0 && (
                <>
                    <h2 className="text-2xl font-bold mb-4">{`Productos en la categoría: ${categoryId}`}</h2>
                    <ItemList products={products} />
                </>
            )}
        </div>
    );
}

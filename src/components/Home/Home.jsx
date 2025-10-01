import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Title from '../Title/Title';
import ItemList from "../ItemList/ItemList";
import { useCartStore } from '../../Stores/CartStores';
import Loading from '../Loading/Loading';
import './HomePage.css';

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCartStore();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/products');
                
                if (!res.ok) throw new Error('Error al obtener productos');
                
                const data = await res.json();
               
                const productArray = data.products || data; 

                // Verificamos que sea un array antes de establecer el estado
                if (Array.isArray(productArray)) {
                    setProducts(productArray);
                    setPopularProducts(productArray.slice(0, 5));
                } else {
                    throw new Error('Formato de datos de productos inválido');
                }
                
            } catch (err) {
                console.error(err);
                setError('Error al cargar los productos');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        alert(`Producto "${product.name}" añadido al carrito.`);
    };

    const slides = [
        { id: 1, image: 'https://cdn.pixabay.com/photo/2019/10/23/08/16/clothes-4570801_1280.jpg' },
        { id: 2, image: './slider2.jpg' },
        { id: 3, image: './slider3.jpg' },
    ];

    if (loading) return <div className="container mx-auto max-w-[1170px]"><Loading /></div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div>
            <Carousel>
                {slides.map((slide) => (
                    <Carousel.Item key={slide.id}>
                        <img
                            className="d-block w-100"
                            src={slide.image}
                            alt="Slide"
                        />
                    </Carousel.Item>
                ))}
            </Carousel>

            <Title
                text="En Oferta"
                level={1}
                className="text-5xl font-semibold mb-8 mt-12 text-black tracking-tight ml-6"
                style={{ letterSpacing: '0.05em' }}
            />
            <ItemList 
                products={products} 
                onAddToCart={handleAddToCart} 
            /> 

            <Title
                text="Productos Más Populares"
                level={2}
                className="text-4xl font-medium mb-6 mt-8 text-black tracking-tight ml-6"
                style={{ letterSpacing: '0.05em' }}
            />
            <ItemList 
                products={popularProducts} 
                onAddToCart={handleAddToCart} 
            /> 
        </div>
    );
}
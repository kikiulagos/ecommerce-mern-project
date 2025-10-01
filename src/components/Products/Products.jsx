import { useState, useEffect } from 'react';
import ItemList from '../ItemList/ItemList';
import CategoryList from '../CategoryList/CategoryList';
import Loading from '../Loading/Loading';

const DEFAULT_CATEGORIES = ['Todos', 'Ropa', 'Electrónica', 'Calzado', 'Accesorios'];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let url = 'http://localhost:5000/api/products';
        if (selectedCategory && selectedCategory !== 'Todos') {
          url = `http://localhost:5000/api/products/category/${encodeURIComponent(selectedCategory)}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener productos desde el servidor');
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError('Error al cargar productos. Revisa la consola para más detalles.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-[1170px] p-4">
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1170px] p-4">
      <h1 className="text-4xl font-semibold mb-6">Lista de Productos</h1>
      <CategoryList
        categories={DEFAULT_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <div className="mt-6">
        <ItemList products={products} selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}

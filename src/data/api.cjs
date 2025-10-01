const API_URL = "http://localhost:5000/api/products";

const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  return res.json();
};

const getProductByCategory = async (category) => {
  const res = await fetch(`${API_URL}/category/${category}`);
  if (!res.ok) throw new Error("Error al obtener productos por categoría");
  return res.json();
};

module.exports = { getProducts, getProductById, getProductByCategory };

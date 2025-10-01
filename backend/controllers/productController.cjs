const Product = require("../models/productModel.cjs");

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener productos por categoría
const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    img: req.body.img, // <-- ¡Cambiado de imageUrl a img!
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualiza los campos que se envíen en la solicitud
    if (req.body.name != null) product.name = req.body.name;
    if (req.body.description != null) product.description = req.body.description;
    if (req.body.price != null) product.price = req.body.price;
    if (req.body.category != null) product.category = req.body.category;
    if (req.body.stock != null) product.stock = req.body.stock;
    if (req.body.img != null) product.img = req.body.img; // <-- ¡Cambiado de imageUrl a img!

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await product.deleteOne();
    res.json({ message: "Producto eliminado con éxito" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById, 
  getProductByCategory, 
  createProduct,
  updateProduct,
  deleteProduct,
};
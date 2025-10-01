const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController.cjs");

// Rutas GET
router.get("/", getProducts); // Obtiene todos los productos
router.get("/:id", getProductById); // Obtiene un solo producto por ID
router.get("/category/:category", getProductByCategory); // Obtiene productos por categoría

router.post("/", createProduct); // Crea un nuevo producto
router.put("/:id", updateProduct); // Actualiza un producto por ID
router.delete("/:id", deleteProduct); // Elimina un producto por ID

module.exports = router;
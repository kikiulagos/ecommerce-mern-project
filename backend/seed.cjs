const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel.cjs");
const products = require("../src/data/products.cjs"); 

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB conectado, insertando productos...");
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Productos insertados ✅");
    process.exit();
  })
  .catch(err => console.error(err));
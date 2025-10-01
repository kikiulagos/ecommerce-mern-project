const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes.cjs");
const userRoutes = require("./routes/userRoutes.cjs");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// FUNCIÓN QUE CONECTA LA DB Y LUEGO INICIA EL SERVIDOR
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        
        // Inicia el servidor
        app.listen(PORT, () =>
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        );

    } catch (error) {
        console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); 
    }
};



//  Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true // Descomentar si usas cookies o sesiones (recomendado para auth)
}));

// Middlewares para parsear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser()); // Descomentar cuando implemente el manejo de JWT en cookies

//  Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

//  Ruta Raíz
app.get('/', (req, res) => {
    res.send('Servidor Express OK. Conexión a DB en proceso.');
});


connectDB();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/productRoutes.cjs");
const userRoutes = require("./routes/userRoutes.cjs");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// FUNCIÓN QUE CONECTA LA DB Y LUEGO INICIA EL SERVIDOR
const connectDB = async () => {
    try {
        // Conexión segura usando la variable de entorno
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        
        // Inicia el servidor SOLO si la conexión a la base de datos fue exitosa
        app.listen(PORT, () =>
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        );

    } catch (error) {
        console.error(`❌ Error al conectar a MongoDB: ${error.message}`);
        process.exit(1); // Sale del proceso si la conexión falla (muy importante)
    }
};


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(cors({origin: 'http://localhost:3000', credentials: true })); 
//app.use(cookieParser());

// Rutas de la API
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get('/', (req, res) => {
    res.send('Servidor Express OK. Conexión a DB en proceso.');
});


connectDB();
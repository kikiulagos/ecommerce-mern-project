const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.cjs");

const protect = asyncHandler(async (req, res, next) => {
  let token;

     if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
     ) {
    try {
    // Obtener el token de la cabecera
    token = req.headers.authorization.split(" ")[1];

     // Verificar el token
     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Obtener el usuario del token (sin la contraseña)
    // @ts-ignore
     req.user = await User.findById(decoded.id).select("-password");

     next();
    } catch (error) {
    console.error(error);
    res.status(401);
     throw new Error("Token no autorizado, fallo en la verificación");
    }
     }

    if (!token) {
    res.status(401);
    throw new Error("No autorizado, no hay token");
    }
});

module.exports = { protect };

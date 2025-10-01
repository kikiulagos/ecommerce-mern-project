const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser, 
    getUserProfile,
    updateUserProfile, 
} = require('../controllers/userController.cjs');
const { protect } = require('../middleware/authMiddleware.cjs');

// Rutas de autenticación
router.post('/', registerUser); 
router.post('/login', loginUser); 

// Ruta para Cerrar sesión
router.post('/logout', logoutUser); 

// Ruta privada para Perfil (GET y PUT)
router.route('/profile')
    .get(protect, getUserProfile) // Obtener perfil
    .put(protect, updateUserProfile); // 👈 ACTUALIZAR PERFIL

module.exports = router;
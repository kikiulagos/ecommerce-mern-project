const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.cjs');
const generateToken = require('../utils/generateToken.cjs');

// @desc  Registrar un nuevo usuario
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('El usuario ya existe');
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        generateToken(res, user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Datos de usuario no válidos');
    }
});

// @desc  Autenticar al usuario
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && 
        // @ts-ignore
        (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(401);
        throw new Error('Email o contraseña no válidos');
    }
});

// @desc  Cerrar sesión del usuario
// @route POST /api/users/logout
// @access Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Sesión cerrada con éxito' });
};

// @desc    Obtener el perfil de usuario
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    };

    res.status(200).json(user);
};

// @desc   Actualizar perfil de usuario
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById
    // @ts-ignore
    (req.user._id);

    if (user) {
        // Actualizar el nombre
        user.name = req.body.name || user.name;
        
        // Actualizar la contraseña solo si se proporciona
        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        });
    } else {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }
});

module.exports = { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile };
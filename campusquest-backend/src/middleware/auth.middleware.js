// src/middleware/auth.middleware.js
// Middleware que verifica el JWT en el header Authorization.
// Se usa en rutas protegidas que requieren estar autenticado.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // El token viene en el header: Authorization: Bearer <token>
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrae solo el token (sin la palabra "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // Verifica y decodifica el token usando el JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adjunta los datos del usuario al request para usarlos en el controlador
      // select('-password') excluye la contraseña del resultado
      req.user = await User.findById(decoded.id).select('-password');

      next();  // Pasa al siguiente middleware o controlador
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Token inválido o expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'No autorizado: token no encontrado' });
  }
};

module.exports = { protect };

// src/routes/location.routes.js

const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationById } = require('../controllers/location.controller');
const { protect } = require('../middleware/auth.middleware');

// protect es un middleware que verifica el JWT antes de permitir acceso
router.get('/', protect, getAllLocations);
router.get('/:locId', protect, getLocationById);

module.exports = router;
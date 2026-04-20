// src/controllers/location.controller.js
// Maneja las consultas de estaciones del campus.

const Location = require('../models/Location');

/**
 * GET /api/locations
 * Devuelve todas las estaciones del campus.
 * El cliente las usa para mostrar los marcadores en el mapa.
 */
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    // Si no hay ubicaciones en la BD, devolver datos de fallback
    if (locations.length === 0) {
      const fallbackLocations = [
        {
          loc_id: 'LOC_ENG_07',
          name: 'Facultad de Ingeniería',
          block: 7,
          floor: 1,
          location: { type: 'Point', coordinates: [-76.5485, 3.4021] },
        },
        {
          loc_id: 'LOC_LIB_03',
          name: 'Biblioteca Santiago Cadena Copete',
          block: 3,
          floor: 3,
          location: { type: 'Point', coordinates: [-76.5490, 3.4025] },
        },
        {
          loc_id: 'LOC_LAB_04',
          name: 'Edificio de Laboratorios',
          block: 4,
          floor: 2,
          location: { type: 'Point', coordinates: [-76.5488, 3.4030] },
        },
        {
          loc_id: 'LOC_WEL_00',
          name: 'Edificio de Bienestar',
          block: 0,
          floor: 1,
          location: { type: 'Point', coordinates: [-76.5492, 3.4035] },
        },
        {
          loc_id: 'LOC_REC_00',
          name: 'Edificio de Juegos y Recreación',
          block: 0,
          floor: 1,
          location: { type: 'Point', coordinates: [-76.5495, 3.4028] },
        },
      ];
      return res.status(200).json({ success: true, count: fallbackLocations.length, data: fallbackLocations });
    }
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/locations/:locId
 * Devuelve una estación específica por su loc_id.
 */
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findOne({ loc_id: req.params.locId });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Estación no encontrada' });
    }
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllLocations, getLocationById };
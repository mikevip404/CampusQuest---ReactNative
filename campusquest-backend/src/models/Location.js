// src/models/Location.js
// Corresponde a la colección `locations` del modelo de datos del gymkhana.
// Almacena cada estación del campus con su ubicación geoespacial.

const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  loc_id: {
    type: String,
    required: [true, 'El ID de ubicación es obligatorio'],
    unique: true,  // No puede haber dos estaciones con el mismo ID
    trim: true,    // Elimina espacios al inicio y al final
  },
  name: {
    type: String,
    required: [true, 'El nombre de la estación es obligatorio'],
  },
  block: {
    type: Number,
    required: true,
  },
  floor: {
    type: Number,
    default: 1,  // Si no se especifica piso, se asume planta baja
  },
  // GeoJSON Point: formato estándar para coordenadas geoespaciales en MongoDB.
  // Permite usar operadores como $near para calcular proximidad.
  location: {
    type: {
      type: String,
      enum: ['Point'],  // Solo aceptamos puntos, no líneas ni polígonos
      required: true,
    },
    coordinates: {
      type: [Number],   // [longitud, latitud] — IMPORTANTE: primero longitud en GeoJSON
      required: true,
    },
  },
}, {
  timestamps: true,  // Agrega automáticamente createdAt y updatedAt
});

// Índice 2dsphere: OBLIGATORIO para usar operadores geoespaciales de MongoDB
// como $near, $geoWithin, $geoIntersects.
LocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Location', LocationSchema);

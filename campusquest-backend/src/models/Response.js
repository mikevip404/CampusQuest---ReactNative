// src/models/Response.js
// Colección `responses`: registra cada intento de respuesta de un equipo.
// Incluye el geo_stamp (ubicación GPS del equipo al momento de responder)
// para el sistema de geofencing.

const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
  response_id: {
    type: String,
    required: true,
    unique: true,
  },
  team_id: {
    type: String,
    required: true,
  },
  q_id: {
    type: String,
    required: true,
  },
  // Texto literal que el equipo envió como respuesta
  submission: {
    type: String,
    required: true,
    trim: true,
  },
  // El backend determina si es correcta comparando con Question.answer
  is_correct: {
    type: Boolean,
    default: false,
  },
  // GeoJSON Point con la ubicación del equipo al enviar la respuesta.
  // Se usa para verificar que están físicamente en la estación correcta.
  geo_stamp: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],  // [longitud, latitud]
      required: true,
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

ResponseSchema.index({ geo_stamp: '2dsphere' });

module.exports = mongoose.model('Response', ResponseSchema);

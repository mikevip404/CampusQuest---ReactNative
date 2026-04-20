// src/models/Team.js
// Colección `teams`: gestiona cada equipo de 3 estudiantes,
// su progreso (estaciones completadas) y puntuación total.

const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  team_id: {
    type: String,
    required: true,
    unique: true,
  },
  team_name: {
    type: String,
    required: true,
    trim: true,
  },
  // Array de strings con los nombres o IDs de los miembros.
  // validate asegura que no haya más de 3 integrantes por equipo.
  members: {
    type: [String],
    validate: {
      validator: (arr) => arr.length <= 3,
      message: 'Un equipo no puede tener más de 3 integrantes',
    },
  },
  // Array de loc_id que el equipo ya ha completado correctamente.
  completed_stations: {
    type: [String],
    default: [],
  },
  total_score: {
    type: Number,
    default: 0,
    min: 0,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Team', TeamSchema);

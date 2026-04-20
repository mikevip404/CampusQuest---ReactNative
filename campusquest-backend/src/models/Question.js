// src/models/Question.js
// Colección `questions`: cada pregunta está vinculada a una estación (loc_id).
// Almacena el reto, la respuesta correcta y los puntos que otorga.

const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  q_id: {
    type: String,
    required: true,
    unique: true,
  },
  // Referencia a la estación donde se ubica esta pregunta.
  // Al usar ref: 'Location', Mongoose puede hacer populate() para traer
  // todos los datos de la estación en una sola consulta.
  loc_id: {
    type: String,
    required: true,
    ref: 'Location',
  },
  text: {
    type: String,
    required: [true, 'El texto de la pregunta es obligatorio'],
  },
  // La respuesta correcta se guarda en minúsculas para facilitar
  // la comparación sin importar cómo el usuario la escriba.
  answer: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  points: {
    type: Number,
    default: 10,
    min: [1, 'Los puntos mínimos son 1'],
  },
  // Tipo de reto: 'trivia' (pregunta directa), 'activity' (actividad física/grupal)
  type: {
    type: String,
    enum: ['trivia', 'activity'],
    default: 'trivia',
  },
}, { timestamps: true });

module.exports = mongoose.model('Question', QuestionSchema);

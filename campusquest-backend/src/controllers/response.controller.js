// src/controllers/response.controller.js
// Lógica de negocio más compleja: valida geofencing, evalúa respuestas
// y actualiza la puntuación del equipo.

const Response = require('../models/Response');
const Question = require('../models/Question');
const Team = require('../models/Team');
const Location = require('../models/Location');

/**
 * POST /api/responses
 * Body: { team_id, q_id, submission, coordinates: [lng, lat] }
 *
 * Flujo:
 * 1. Busca la pregunta para obtener loc_id y la respuesta correcta
 * 2. Busca la estación para verificar geofencing (radio 50m)
 * 3. Compara la respuesta del equipo con la correcta
 * 4. Guarda la respuesta en la BD
 * 5. Si es correcta, actualiza la puntuación y progreso del equipo
 */
const submitResponse = async (req, res) => {
  try {
    const { team_id, q_id, submission, coordinates } = req.body;

    // --- PASO 1: Obtener la pregunta ---
    const question = await Question.findOne({ q_id });
    if (!question) {
      return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
    }

    // --- PASO 2: Geofencing con operador $near de MongoDB ---
    // $near busca documentos cuyo campo 'location' esté cerca de las coordenadas dadas.
    // $maxDistance: 50 metros — el equipo debe estar físicamente en la estación.
    const nearbyLocation = await Location.findOne({
      loc_id: question.loc_id,
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates },  // Posición actual del equipo
          $maxDistance: 50,  // metros
        },
      },
    });

    if (!nearbyLocation) {
      return res.status(403).json({
        success: false,
        message: '⚠️ Debes estar en la estación para responder. Acércate más al edificio.',
      });
    }

    // --- PASO 3: Evaluar la respuesta ---
    // Comparación case-insensitive: limpiamos espacios y convertimos a minúsculas
    const normalizedSubmission = submission.trim().toLowerCase();
    const isCorrect = normalizedSubmission.includes(question.answer.toLowerCase());

    // --- PASO 4: Guardar el registro de respuesta ---
    const newResponse = await Response.create({
      response_id: `RES_${Date.now()}`,  // ID único basado en timestamp
      team_id,
      q_id,
      submission,
      is_correct: isCorrect,
      geo_stamp: { type: 'Point', coordinates },
    });

    // --- PASO 5: Si es correcta, actualizar el equipo ---
    if (isCorrect) {
      // $addToSet: agrega la estación al array solo si no está ya (evita duplicados)
      // $inc: incrementa el campo total_score en los puntos de la pregunta
      await Team.findOneAndUpdate(
        { team_id },
        {
          $addToSet: { completed_stations: question.loc_id },
          $inc: { total_score: question.points },
        },
        { new: true }  // Devuelve el documento actualizado
      );
    }

    res.status(201).json({
      success: true,
      is_correct: isCorrect,
      points_earned: isCorrect ? question.points : 0,
      message: isCorrect
        ? `✅ ¡Correcto! +${question.points} puntos`
        : '❌ Respuesta incorrecta. ¡Inténtalo de nuevo!',
      data: newResponse,
    });

  } catch (error) {
    console.error('Error en submitResponse:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { submitResponse };
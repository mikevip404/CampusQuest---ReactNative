// src/models/User.js
// Colección `users`: maneja las credenciales de los participantes.
// Las contraseñas NUNCA se guardan en texto plano; siempre se hashean con bcrypt.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
  },
  team_id: {
    type: String,
    ref: 'Team',  // Cada usuario pertenece a un equipo
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
}, { timestamps: true });

// Hook 'pre save': se ejecuta ANTES de guardar el documento.
// Si la contraseña fue modificada (o es nueva), la hasheamos.
// El factor de costo (saltRounds) de 12 es un buen balance entre
// seguridad y rendimiento.
UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// Método de instancia: compara la contraseña ingresada con el hash guardado.
// bcrypt.compare() hace la comparación de forma segura.
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);

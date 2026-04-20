// src/server.js
// Punto de entrada del backend. Configura Express, carga middlewares
// globales, registra las rutas y arranca el servidor.

// IMPORTANTE: dotenv.config() debe llamarse ANTES de cualquier otra cosa
// para que process.env esté disponible en todos los módulos.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Importar todas las rutas
const authRoutes = require('./routes/auth.routes');
const locationRoutes = require('./routes/location.routes');
// Importa las demás rutas según las vayas creando:
// const questionRoutes = require('./routes/question.routes');
// const teamRoutes = require('./routes/team.routes');
// const responseRoutes = require('./routes/response.routes');

// Conectar a MongoDB Atlas antes de iniciar el servidor
connectDB();

const app = express();

// ─── Middlewares Globales ─────────────────────────────────────────────────────

// cors(): permite que cualquier origen haga peticiones al backend.
// En producción, restringe el origen: cors({ origin: 'https://tu-dominio.com' })
app.use(cors());

// express.json(): parsea el body de las peticiones en formato JSON
// para que req.body esté disponible en los controladores.
app.use(express.json());

// Middleware de logging simple (útil para depuración en desarrollo)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ─── Registro de Rutas ────────────────────────────────────────────────────────
// Cada grupo de rutas tiene un prefijo base. Por ejemplo:
// authRoutes maneja /api/auth/login, /api/auth/register, etc.

app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
// app.use('/api/questions', questionRoutes);
// app.use('/api/teams', teamRoutes);
// app.use('/api/responses', responseRoutes);

// Ruta de salud: permite verificar que el servidor está corriendo
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.url} no encontrada` });
});

// ─── Iniciar el Servidor ──────────────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
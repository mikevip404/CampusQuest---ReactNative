// seed-locations.js
// Script para poblar la colección 'locations' con las estaciones del gymkhana.
// Ejecutar con: node src/seed-locations.js

require('dotenv').config();
const mongoose = require('mongoose');
const Location = require('./models/Location');

const connectDB = require('./config/db');

// Datos de las estaciones basados en el modelo del gymkhana
const locationsData = [
  {
    loc_id: 'LOC_ENG_07',
    name: 'Facultad de Ingeniería',
    block: 7,
    floor: 1,
    location: {
      type: 'Point',
      coordinates: [-76.5485, 3.4021], // [longitude, latitude]
    },
  },
  {
    loc_id: 'LOC_LIB_03',
    name: 'Biblioteca Santiago Cadena Copete',
    block: 3,
    floor: 3,
    location: {
      type: 'Point',
      coordinates: [-76.5490, 3.4025],
    },
  },
  {
    loc_id: 'LOC_LAB_04',
    name: 'Edificio de Laboratorios',
    block: 4,
    floor: 2,
    location: {
      type: 'Point',
      coordinates: [-76.5488, 3.4030],
    },
  },
  {
    loc_id: 'LOC_WEL_00',
    name: 'Edificio de Bienestar',
    block: 0,
    floor: 1,
    location: {
      type: 'Point',
      coordinates: [-76.5492, 3.4035],
    },
  },
  {
    loc_id: 'LOC_REC_00',
    name: 'Edificio de Juegos y Recreación',
    block: 0,
    floor: 1,
    location: {
      type: 'Point',
      coordinates: [-76.5495, 3.4028],
    },
  },
];

async function seedLocations() {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Limpiar la colección existente (opcional, para reiniciar)
    await Location.deleteMany({});
    console.log('Colección locations limpiada.');

    // Insertar los datos
    const locations = await Location.insertMany(locationsData);
    console.log(`✅ Insertadas ${locations.length} estaciones en la base de datos.`);

    // Cerrar conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada.');
  } catch (error) {
    console.error('❌ Error poblando locations:', error);
    process.exit(1);
  }
}

// Ejecutar el script
seedLocations();
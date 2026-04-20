# CampusQuest

Gymkhana Institucional de la Universidad Santiago de Cali - Citadela Pampalinda

## Descripción

CampusQuest es una aplicación móvil desarrollada para la Universidad Santiago de Cali que permite a los estudiantes participar en una gymkhana institucional. Los equipos compiten en desafíos que involucran ubicaciones específicas en el campus, respondiendo preguntas y completando tareas para ganar puntos.

La aplicación consta de:
- **Frontend**: Aplicación móvil React Native construida con Expo
- **Backend**: API REST desarrollada con Node.js, Express y MongoDB

## Características Principales

- **Autenticación de Usuarios**: Sistema de login seguro con JWT
- **Gestión de Equipos**: Creación y administración de equipos participantes
- **Desafíos Interactivos**: Preguntas y tareas geolocalizadas en el campus
- **Mapa Interactivo**: Integración con mapas para guiar a los equipos
- **Sistema de Puntuación**: Seguimiento de puntos en tiempo real
- **Interfaz Adaptativa**: Diseño responsivo para dispositivos móviles

## Tecnologías Utilizadas

### Backend
- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- bcryptjs para encriptación de contraseñas
- CORS para manejo de solicitudes cruzadas

### Frontend
- React Native
- Expo Framework
- React Navigation
- Axios para API calls
- React Native Maps
- Expo Secure Store para almacenamiento seguro
- TypeScript

## Instalación y Configuración

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB Atlas (o MongoDB local)
- Expo CLI

### Backend

1. Clona el repositorio y navega al directorio del backend:
   ```bash
   cd campusquest-backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del backend con las siguientes variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/campusquest
   JWT_SECRET=tu-secreto-jwt
   ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Frontend

1. Navega al directorio del frontend:
   ```bash
   cd campusquest-frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` con la URL del backend:
   ```
   EXPO_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

5. Escanea el código QR con la app Expo Go en tu dispositivo, o usa un emulador.

## Uso

1. **Login**: Los usuarios inician sesión con sus credenciales USC
2. **Exploración**: Navega por el mapa del campus para encontrar desafíos
3. **Equipos**: Únete o crea un equipo para competir
4. **Desafíos**: Responde preguntas y completa tareas en ubicaciones específicas
5. **Puntuación**: Revisa el ranking y puntos acumulados

## API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Ubicaciones
- `GET /api/locations` - Obtener todas las ubicaciones
- `POST /api/locations` - Crear nueva ubicación
- `GET /api/locations/:id` - Obtener ubicación específica

### Preguntas (planeado)
- `GET /api/questions` - Obtener preguntas
- `POST /api/questions` - Crear pregunta

### Equipos (planeado)
- `GET /api/teams` - Obtener equipos
- `POST /api/teams` - Crear equipo

### Respuestas (planeado)
- `POST /api/responses` - Enviar respuesta

## Desarrollo

### Estructura del Proyecto

```
campusquest/
├── campusquest-backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── package.json
│   └── .env
└── campusquest-frontend/
    ├── app/
    │   ├── (tabs)/
    │   └── _layout.tsx
    ├── components/
    ├── constants/
    ├── services/
    ├── assets/
    ├── package.json
    └── app.json
```

### Scripts Disponibles

#### Backend
- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor con nodemon

#### Frontend
- `npm start` - Inicia el servidor de desarrollo Expo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en web
- `npm run lint` - Ejecuta el linter

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

---

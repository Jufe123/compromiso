// @ts-nocheck
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const https = require('https');
const sequelize = require('./config/database.js');
const logger = require('./config/logger.js');
const path = require('path');

// Validación de variables de entorno
const requiredEnvVars = [
  'DATABASE_CLIENT', 'DATABASE_HOST', 'DATABASE_PORT',
  'DATABASE_NAME', 'DATABASE_USERNAME', 'DATABASE_PASSWORD'
];

requiredEnvVars.forEach(envVar => {
  if (!process.env[envVar]) {
    console.error(`Error: Falta la variable de entorno ${envVar}`);
    process.exit(1); // Salir si falta una variable importante
  }
});

// Importa los routers
const responsablesRouter = require('./src/api/responsable/routes/responsableRoutes.js');
const procesosRouter = require('./src/api/proceso/routes/Routesproceso.js');
const procedimientosRouter = require('./src/api/procedimiento/routes/procedimientoRoutes.js');
const areasRouter = require('./src/api/area/routes/areaRoutes.js');
const unidadesRouter = require('./src/api/unidad/routes/unidadRoutes.js');
const formatosRouter = require('./src/api/formato/routes/formatoRoutes.js');
const usuariosRouter = require('./src/api/usuario/routes/usuarioRoutes.js');

// Importa Swagger
const { swaggerDocs, swaggerSetup } = require('./swagger.js');

const app = express();
const port = process.env.PORT || 3001;

// Configura Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limita cada IP a 100 solicitudes por ventana
  message: 'Demasiadas solicitudes de esta IP, por favor intente de nuevo después de 15 minutos.'
});
app.use('/api/', apiLimiter);

// Configura CORS
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`Origen no permitido por CORS: ${origin}`));
    }
  },
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));

// Usa helmet para mayor seguridad
app.use(helmet());
app.use(helmet.frameguard({ action: 'deny' }));

// Parseo de JSON
app.use(express.json());

// Ruta para la raíz del servidor
app.get('/', (req, res) => {
  res.send('Bienvenido al API de Compromiso!');
});

// Documentación de la API con Swagger
app.use('/api-docs', swaggerDocs, swaggerSetup);

// Rutas de la API
app.use('/api/responsables', responsablesRouter);
app.use('/api/procesos', procesosRouter);
app.use('/api/procedimientos', procedimientosRouter);
app.use('/api/areas', areasRouter);
app.use('/api/unidades', unidadesRouter);
app.use('/api/formatos', formatosRouter);
app.use('/api/usuarios', usuariosRouter);

// Manejo de errores 404 (ruta no encontrada)
app.use((req, res, next) => {
  res.status(404).send('Ruta no encontrada');
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}, Ruta: ${req.originalUrl}`, { metadata: err });
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Verifica si los archivos de certificados existen
const keyPath = path.resolve(__dirname, 'localhost-key.pem');
const certPath = path.resolve(__dirname, 'localhost.pem');

let server;

if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
  const privateKey = fs.readFileSync(keyPath, 'utf8');
  const certificate = fs.readFileSync(certPath, 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  // Crea el servidor HTTPS
  server = https.createServer(credentials, app);
  console.log('Usando HTTPS');

  // Conexión a la base de datos y arranque del servidor HTTPS
  sequelize.authenticate()
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
      server.listen(port, () => {
        console.log(`Servidor HTTPS corriendo en https://localhost:${port}`);
      });
    })
    .catch(err => {
      console.error('Error al conectar con la base de datos:', err);
    });

} else {
  // Conexión a la base de datos y arranque del servidor HTTP
  sequelize.authenticate()
    .then(() => {
      console.log('Conexión exitosa a la base de datos');
      app.listen(port, () => {
        console.log(`Servidor HTTP corriendo en http://localhost:${port}`);
      });
    })
    .catch(err => {
      console.error('Error al conectar con la base de datos:', err);
    });
}

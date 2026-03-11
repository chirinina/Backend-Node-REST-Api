import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import usersRoutes from './routes/users.route.js';
import taskRoutes from './routes/task.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

// Configuración de __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(morgan('combined'));
app.use(express.json());

// Rutas de la API
app.use('/api/users', usersRoutes);
app.use('/api/login', authRoute);
app.use('/api/tasks', taskRoutes);

// Servir index.html desde la raíz del proyecto
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html')); // <<-- subir un nivel desde src
});

export default app;
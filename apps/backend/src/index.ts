import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import restaurantRoutes from './routes/restaurants.js';
import authRoutes from './routes/auth.js';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(express.json());

// Ruta principal
app.get('/', (_req, res) => res.send('Backend de EaTable funcionando 🚀'));

// Rutas de la API
app.use('/restaurants', restaurantRoutes);
app.use('/auth', authRoutes);

// Test de conexión a la base de datos
async function testDB(): Promise<void> {
  try {
    const result = await prisma.$queryRaw`SELECT 1`;
    console.log('Prisma DB connection OK:', result);
  } catch (err) {
    console.error('Error al conectar con Prisma:', err);
  }
}
testDB();

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

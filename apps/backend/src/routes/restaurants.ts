import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { buildRestaurantFilter } from '../utils/filters.js';
import { distanceKm } from '../utils/geo.js';

const router = Router();
const prisma = new PrismaClient();

// GET /restaurants
router.get('/', async (req, res) => {
  try {
    const filter = buildRestaurantFilter(req.query);
    let restaurants = await prisma.restaurant.findMany({ where: filter });

    // Filtro por ubicación
    const lat = parseFloat(req.query.lat as string);
    const lon = parseFloat(req.query.lon as string);
    let radius = parseFloat(req.query.radius as string) || 5; // km por defecto 5

    if (!isNaN(lat) && !isNaN(lon)) {
      restaurants = restaurants.filter(r => distanceKm(lat, lon, r.latitude, r.longitude) <= radius);
    }

    res.json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener restaurantes' });
  }
});

export default router;

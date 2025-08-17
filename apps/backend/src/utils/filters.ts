import { Prisma } from '@prisma/client';

export const buildRestaurantFilter = (query: any): Prisma.RestaurantWhereInput => {
  const filter: Prisma.RestaurantWhereInput = {};

  if (query.minRating) filter.rating = { gte: parseFloat(query.minRating) };
  if (query.maxPrice) filter.priceRange = { lte: parseInt(query.maxPrice) };
  if (query.vegetarian === 'true') filter.isVegetarian = true;
  if (query.vegan === 'true') filter.isVegan = true;
  if (query.typeOfFood) filter.typeOfFood = { contains: query.typeOfFood }; // sin mode

  // Alérgenos
  if (query.excludeAllergens) {
    const allergens = (query.excludeAllergens as string).split(',');
    filter.NOT = allergens.map(a => ({ allergens: { contains: a.trim() } })); // sin mode
  }

  return filter;
};

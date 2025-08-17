export interface FavoriteDish {
  restaurantId: string;
  restaurantName: string;
  restaurantType: string;
  restaurantRating: number;
  dishId: string;
  dishName: string;
  price: number;
  rating: number;
  allergens?: string[];
  ingredients?: string[];
}

const FAVORITES_KEY = 'favorites';

export const getFavorites = (): FavoriteDish[] => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavorites = (favorites: FavoriteDish[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const addDishFavorite = (
  restaurantId: string,
  restaurantName: string,
  restaurantType: string,
  restaurantRating: number,
  dish: {
    id: string;
    name: string;
    price: number;
    rating: number;
    allergens?: string[];
    ingredients?: string[];
  }
) => {
  const favorites = getFavorites();
  const exists = favorites.some(f => f.dishId === dish.id);
  if (!exists) {
    favorites.push({
      restaurantId,
      restaurantName,
      restaurantType,
      restaurantRating,
      dishId: dish.id,
      dishName: dish.name,
      price: dish.price,
      rating: dish.rating,
      allergens: dish.allergens,
      ingredients: dish.ingredients
    });
    saveFavorites(favorites);
  }
};

export const removeDishFavorite = (restaurantId: string, dishId: string) => {
  const favorites = getFavorites();
  const newFavs = favorites.filter(f => f.dishId !== dishId);
  saveFavorites(newFavs);
};

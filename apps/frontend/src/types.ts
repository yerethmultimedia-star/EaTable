// src/types.ts

export interface Dish {
  id: string;
  name: string;
  price: number;
  rating: number;
  ingredients: string[];
  allergens?: string[];
  type?: string; // Ejemplo: "Italiana", "Mexicana"
}

export interface Restaurant {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  hours?: string;
  rating?: number;
  type?: string; // Ejemplo: "Japonesa", "Vegana"
  dishes: Dish[];
}

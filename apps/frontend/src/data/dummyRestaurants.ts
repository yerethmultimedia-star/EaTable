export interface Dish {
  id: string;
  name: string;
  price: number;
  rating: number;
  allergens?: string[];
  ingredients?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  typeOfFood: string;
  rating: number;
  dishes: Dish[];
  distanceKm?: number;
  hours?: string;
  contact?: string;
}

export const dummyRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Trattoria',
    typeOfFood: 'Italiana',
    rating: 4.5,
    distanceKm: 1.2,
    hours: '10:00 - 22:00',
    contact: '555-1234',
    dishes: [
      { id: 'd1', name: 'Pasta Carbonara', price: 12, rating: 4.8, allergens: ['Gluten'], ingredients: ['Pasta', 'Bacon', 'Egg', 'Cheese'] },
      { id: 'd2', name: 'Pizza Margherita', price: 10, rating: 4.7, allergens: ['Gluten', 'Lactose'], ingredients: ['Dough', 'Tomato', 'Cheese', 'Basil'] }
    ]
  },
  {
    id: '2',
    name: 'Veggie Delight',
    typeOfFood: 'Vegetariana',
    rating: 4.2,
    distanceKm: 2.5,
    hours: '09:00 - 20:00',
    contact: '555-5678',
    dishes: [
      { id: 'd3', name: 'Quinoa Salad', price: 9, rating: 4.5, ingredients: ['Quinoa', 'Tomato', 'Avocado', 'Lettuce'] }
    ]
  }
];

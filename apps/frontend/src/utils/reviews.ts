// src/utils/reviews.ts
export interface Review {
  id: string;
  restaurantId: string;
  dishId?: string; // opcional
  name: string;
  comment: string;
  rating: number; // calificación general
  price: number;   // calificación precio
  service: number; // calificación atención
  quality: number; // calificación calidad
}

const REVIEWS_KEY = 'reviews';

export const getReviews = (): Review[] => {
  const stored = localStorage.getItem(REVIEWS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveReview = (review: Review) => {
  const reviews = getReviews();
  reviews.push(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
};

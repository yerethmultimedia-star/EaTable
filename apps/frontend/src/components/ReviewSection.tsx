import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import ReviewForm from './ReviewForm';
import { getReviews, Review } from '../utils/reviews';

interface ReviewSectionProps {
  restaurantId: string;
  dishId?: string;
  refreshKey?: number; // para forzar re-render desde parent
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ restaurantId, dishId, refreshKey }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = () => {
    const all = getReviews();
    const filtered = all.filter(r => r.restaurantId === restaurantId && (!dishId || r.dishId === dishId));
    setReviews(filtered);
  };

  useEffect(() => {
    loadReviews();
  }, [restaurantId, dishId, refreshKey]);

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Reseñas</h3>


      <IonList>
        {reviews.map(r => (
          <IonItem key={r.id}>
            <IonLabel>
              <p>{r.name}</p>
              <p>{r.comment}</p>
              <p>⭐ General: {r.rating} • Precio: {r.price} • Atención: {r.service} • Calidad: {r.quality}</p>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      <ReviewForm restaurantId={restaurantId} dishId={dishId} onReviewAdded={loadReviews} />
    </div>
  );
};

export default ReviewSection;

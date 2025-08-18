import React, { useState, useEffect } from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { getReviews, Review } from '../utils/reviews';

interface Props {
  restaurantId: string;
  dishId?: string; // opcional, si queremos reseñas de un platillo específico
  refreshKey?: string | number;
}

const ReviewList: React.FC<Props> = ({ restaurantId, dishId, refreshKey }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const allReviews = getReviews(); // usamos solo getReviews
    const filtered = allReviews.filter(
      r => r.restaurantId === restaurantId && (!dishId || r.dishId === dishId)
    );
    setReviews(filtered);
  }, [restaurantId, dishId, refreshKey]); // refresca cuando cambian estos valores

  if (reviews.length === 0) return <p>No hay reseñas aún.</p>;

  return (
    <IonList>
      {reviews.map(r => (
        <IonItem key={r.id}>
          <IonLabel>
            <h3>{r.comment}</h3>
            <p>Precio: {r.price} • Atención: {r.service} • Calidad: {r.quality} • ⭐ {r.rating}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default ReviewList;
  
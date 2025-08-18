import React, { useState } from 'react';
import { IonItem, IonLabel, IonButton, IonRange, IonTextarea } from '@ionic/react';
import { Review, saveReview } from '../utils/reviews';
import { v4 as uuidv4 } from 'uuid';

interface ReviewFormProps {
  restaurantId: string;
  dishId?: string;
  onReviewAdded: () => void; // callback para refrescar la lista de reseñas
}

const ReviewForm: React.FC<ReviewFormProps> = ({ restaurantId, dishId, onReviewAdded }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [price, setPrice] = useState(5);
  const [service, setService] = useState(5);
  const [quality, setQuality] = useState(5);

  const handleSubmit = () => {
    const newReview: Review = {
      id: uuidv4(),
      restaurantId,
      dishId,
      comment,
      rating,
      price,
      service,
      quality
    };
    saveReview(newReview);
    setComment('');
    setRating(5);
    setPrice(5);
    setService(5);
    setQuality(5);
    onReviewAdded(); // refresca la lista de reseñas
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '15px' }}>
      <IonItem>
        <IonLabel position="stacked">Comentario</IonLabel>
        <IonTextarea value={comment} onIonChange={e => setComment(e.detail.value!)} />
      </IonItem>

      <IonItem>
        <IonLabel>Calificación general: {rating}</IonLabel>
        <IonRange min={1} max={5} step={1} value={rating} onIonChange={e => setRating(e.detail.value as number)} />
      </IonItem>

      <IonItem>
        <IonLabel>Precio: {price}</IonLabel>
        <IonRange min={1} max={5} step={1} value={price} onIonChange={e => setPrice(e.detail.value as number)} />
      </IonItem>

      <IonItem>
        <IonLabel>Atención: {service}</IonLabel>
        <IonRange min={1} max={5} step={1} value={service} onIonChange={e => setService(e.detail.value as number)} />
      </IonItem>

      <IonItem>
        <IonLabel>Calidad: {quality}</IonLabel>
        <IonRange min={1} max={5} step={1} value={quality} onIonChange={e => setQuality(e.detail.value as number)} />
      </IonItem>

      <IonButton expand="full" onClick={handleSubmit} style={{ marginTop: '10px' }}>
        Agregar reseña
      </IonButton>
    </div>
  );
};

export default ReviewForm;

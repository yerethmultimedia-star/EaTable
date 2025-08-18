import React, { useState, useEffect } from "react";
import { IonButton, IonInput, IonItem, IonLabel, IonList } from "@ionic/react";

export interface Review {
  rating: number;
  comment: string;
}

interface ReviewSystemProps {
  entityId: string; // puede ser dishId o restaurantId
}

const ReviewSystem: React.FC<ReviewSystemProps> = ({ entityId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${entityId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [entityId]);

  const addReview = () => {
    if (!rating || !comment.trim()) return;
    const newReviews = [...reviews, { rating, comment }];
    setReviews(newReviews);
    localStorage.setItem(`reviews_${entityId}`, JSON.stringify(newReviews));
    setRating(0);
    setComment("");
  };

  return (
    <div style={{ marginTop: "10px", width: "100%" }}>
      <h4>Reseñas</h4>
      <IonList>
        {reviews.map((r, i) => (
          <IonItem key={i}>
            <IonLabel>
              ⭐ {r.rating} - {r.comment}
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      <IonItem>
        <IonLabel position="stacked">Calificación (1-5)</IonLabel>
        <IonInput
          type="number"
          value={rating}
          onIonChange={(e) => setRating(Number(e.detail.value))}
          min="1"
          max="5"
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Comentario</IonLabel>
        <IonInput
          value={comment}
          onIonChange={(e) => setComment(e.detail.value!)}
        />
      </IonItem>
      <IonButton expand="block" onClick={addReview}>
        Agregar Reseña
      </IonButton>
    </div>
  );
};

export default ReviewSystem;

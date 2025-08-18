import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import ReviewForm from './ReviewForm';
import ReviewList from './ReviewList';

interface Props {
  restaurantId: string;
  dishId: string;
  dishName: string;
}

const DishDetail: React.FC<Props> = ({ restaurantId, dishId, dishName }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{dishName}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{dishName}</h2>

        {/* Formulario para reseña de platillo */}
        <ReviewForm
          restaurantId={restaurantId}
          dishId={dishId}
          onReviewAdded={() => setRefreshKey(prev => prev + 1)}
        />

        {/* Lista de reseñas de este platillo */}
        <ReviewList restaurantId={restaurantId} dishId={dishId} refreshKey={refreshKey} />
      </IonContent>
    </IonPage>
  );
};

export default DishDetail;

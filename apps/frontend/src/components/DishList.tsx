import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Dish {
  id: string;
  name: string;
  price: number;
  rating: number;
}

interface Props {
  restaurantId: string;
  dishes: Dish[];
}

const DishList: React.FC<Props> = ({ restaurantId, dishes }) => {
  const history = useHistory();

  return (
    <IonList>
      {dishes.map(dish => (
        <IonItem
          key={dish.id}
          button
          onClick={() => history.push(`/restaurants/${restaurantId}/dishes/${dish.id}`)}
        >
          <IonLabel>
            <h2>{dish.name}</h2>
            <p>💵 {dish.price} | ⭐ {dish.rating}</p>
          </IonLabel>
        </IonItem>
      ))}
    </IonList>
  );
};

export default DishList;

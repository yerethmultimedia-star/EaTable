import React from 'react';
import { IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import { Dish } from '../data/dummyRestaurants';
import { addDishFavorite, removeDishFavorite, getFavorites } from '../utils/favorites';

interface DishListProps {
  dishes: Dish[];
  restaurantId: string;
  restaurantName: string;
  restaurantType: string;
  restaurantRating: number;
  favorites: string[]; // array de dishIds favoritos
  updateFavorites: () => void; // función para actualizar favoritos en el padre
}

const DishList: React.FC<DishListProps> = ({
  dishes,
  restaurantId,
  restaurantName,
  restaurantType,
  restaurantRating,
  favorites,
  updateFavorites
}) => {

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  const toggleFavorite = (dish: Dish) => {
    if (isFavorite(dish.id)) {
      removeDishFavorite(restaurantId, dish.id);
    } else {
      addDishFavorite(
        restaurantId,
        restaurantName,
        restaurantType,
        restaurantRating,
        dish
      );
    }
    updateFavorites();
  };

  return (
    <IonList>
      {dishes.map(d => (
        <IonItem key={d.id}>
          <IonLabel>
            <h3>{d.name} - ${d.price}</h3>
            <p>⭐ {d.rating}</p>
            {d.allergens && <p>Alérgenos: {d.allergens.join(', ')}</p>}
            {d.ingredients && <p>Ingredientes: {d.ingredients.join(', ')}</p>}
          </IonLabel>
          <IonButton
            color={isFavorite(d.id) ? 'danger' : 'primary'}
            onClick={() => toggleFavorite(d)}
          >
            {isFavorite(d.id) ? 'Eliminar' : 'Favorito'}
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default DishList;

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonButton, IonAccordion, IonAccordionGroup, IonIcon } from '@ionic/react';
import { bookmarkOutline, bookmark } from 'ionicons/icons';
import Filters from '../components/Filters';
import { dummyRestaurants, Dish } from '../data/dummyRestaurants';
import { getFavorites, addDishFavorite, removeDishFavorite } from '../utils/favorites';
import ReviewSection from '../components/ReviewSection';

const RestaurantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const restaurant = dummyRestaurants.find(r => r.id === id)!;

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [allergenFilter, setAllergenFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [favorites, setFavorites] = useState(getFavorites());
  //const [openDishId, setOpenDishId] = useState<string | null>(null);

  const allTypes = [restaurant.typeOfFood];
  const allAllergens = Array.from(new Set(restaurant.dishes.flatMap(d => d.allergens || [])));
  const allPrices = Array.from(new Set(restaurant.dishes.map(d => d.price)));
  const allRatings = Array.from(new Set(restaurant.dishes.map(d => Math.floor(d.rating))));

  const filteredDishes = restaurant.dishes.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && restaurant.typeOfFood !== typeFilter) return false;
    if (allergenFilter && d.allergens?.includes(allergenFilter)) return false;
    if (priceFilter && d.price !== priceFilter) return false;
    if (ratingFilter && Math.floor(d.rating) !== ratingFilter) return false;
    return true;
  });

  const isFavorite = (dishId: string) => favorites.some(f => f.dishId === dishId);

  const toggleFavorite = (dish: Dish) => {
    if (isFavorite(dish.id)) {
      removeDishFavorite(restaurant.id, dish.id);
    } else {
      addDishFavorite(
        restaurant.id,
        restaurant.name,
        restaurant.typeOfFood,
        restaurant.rating,
        dish
      );
    }
    setFavorites(getFavorites());
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{restaurant.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <Filters
          search={search}
          setSearch={setSearch}
          types={allTypes}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          allergens={allAllergens}
          allergenFilter={allergenFilter}
          setAllergenFilter={setAllergenFilter}
          prices={allPrices}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
          ratings={allRatings}
          ratingFilter={ratingFilter}
          setRatingFilter={setRatingFilter}
        />

        <IonAccordionGroup>
          {filteredDishes.map(d => (
            <IonAccordion key={d.id} value={d.id}>
              <IonItem slot="header">
                <IonLabel>
                  <h3>{d.name} - ${d.price}</h3>
                  <p>⭐ {d.rating}</p>
                </IonLabel>
                <IonButton color={isFavorite(d.id) ? 'danger' : 'primary'} onClick={() => toggleFavorite(d)}>
                  <IonIcon icon={isFavorite(d.id) ? bookmark : bookmarkOutline} />
                </IonButton>
              </IonItem>

              <div slot="content" style={{ padding: '0 10px 10px 10px' }}>
                {d.allergens && <p>Alérgenos: {d.allergens.join(', ')}</p>}
                {d.ingredients && <p>Ingredientes: {d.ingredients.join(', ')}</p>}
                <ReviewSection restaurantId={restaurant.id} dishId={d.id} />
              </div>
            </IonAccordion>
          ))}
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantDetail;

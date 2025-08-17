import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import Filters from '../components/Filters';
import { dummyRestaurants, Restaurant } from '../data/dummyRestaurants';

const RestaurantsDummy: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [allergenFilter, setAllergenFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const allTypes = Array.from(new Set(dummyRestaurants.map(r => r.typeOfFood)));
  const allAllergens = Array.from(new Set(dummyRestaurants.flatMap(r => r.dishes.flatMap(d => d.allergens || []))));
  const allPrices = Array.from(new Set(dummyRestaurants.flatMap(r => r.dishes.map(d => d.price))));
  const allRatings = Array.from(new Set(dummyRestaurants.flatMap(r => r.dishes.map(d => Math.floor(d.rating)))));

  const filtered = dummyRestaurants.filter(r => {
    if (typeFilter && r.typeOfFood !== typeFilter) return false;
    if (allergenFilter && r.dishes.some(d => d.allergens?.includes(allergenFilter))) return false;
    if (priceFilter && r.dishes.every(d => d.price !== priceFilter)) return false;
    if (ratingFilter && r.dishes.every(d => Math.floor(d.rating) !== ratingFilter)) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restaurantes</IonTitle>
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

        <IonList>
          {filtered.map(r => (
            <IonItem key={r.id} button onClick={() => history.push(`/restaurant/${r.id}`)}>
              <IonLabel>
                <h2>{r.name}</h2>
                <p>{r.typeOfFood} • ⭐ {r.rating}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default RestaurantsDummy;

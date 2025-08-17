import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonButton } from '@ionic/react';
import Filters from '../components/Filters';
import { getFavorites, removeDishFavorite, FavoriteDish } from '../utils/favorites';

const Favorites: React.FC = () => {
  const history = useHistory();
  const [favorites, setFavorites] = useState<FavoriteDish[]>(getFavorites());
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [allergenFilter, setAllergenFilter] = useState<string | null>(null);
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const allTypes = Array.from(new Set(favorites.map(f => f.restaurantType)));
  const allAllergens = Array.from(new Set(favorites.flatMap(f => f.allergens || [])));
  const allPrices = Array.from(new Set(favorites.map(f => f.price)));
  const allRatings = Array.from(new Set(favorites.map(f => Math.floor(f.rating))));

  const filtered = favorites.filter(f => {
    if (search && !f.dishName.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter && f.restaurantType !== typeFilter) return false;
    if (allergenFilter && f.allergens?.includes(allergenFilter)) return false;
    if (priceFilter && f.price !== priceFilter) return false;
    if (ratingFilter && Math.floor(f.rating) !== ratingFilter) return false;
    return true;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Favoritos</IonTitle>
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
          {filtered.map(f => (
            <IonItem key={f.dishId} button onClick={() => history.push(`/restaurant/${f.restaurantId}`)}>
              <IonLabel>
                <h2>{f.restaurantName}</h2>
                <p>{f.dishName} - ${f.price} • ⭐ {f.rating}</p>
                {f.allergens && <p>Alérgenos: {f.allergens.join(', ')}</p>}
                {f.ingredients && <p>Ingredientes: {f.ingredients.join(', ')}</p>}
              </IonLabel>
              <IonButton color="danger" onClick={() => { removeDishFavorite(f.restaurantId, f.dishId); setFavorites(getFavorites()); }}>
                Eliminar
              </IonButton>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;

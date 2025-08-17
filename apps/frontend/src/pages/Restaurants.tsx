import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonRow,
  IonCol
} from '@ionic/react';
import axios from 'axios';

interface Restaurant {
  id: string;
  name: string;
  typeOfFood: string;
  priceRange: number;
  rating: number;
  isVegetarian: boolean;
  isVegan: boolean;
  allergens?: string[];
  latitude?: number;
  longitude?: number;
  distanceKm?: number;
}

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [filters, setFilters] = useState({
    maxDistance: 5,
    typeOfFood: '',
    vegetarian: false,
    vegan: false,
    excludeAllergens: ''
  });
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Obtener ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        err => console.error('Error al obtener ubicación:', err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Obtener restaurantes desde el backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get<Restaurant[]>('http://localhost:3000/restaurants');
        const data = res.data;

        if (userLocation) {
          data.forEach(r => {
            if (r.latitude && r.longitude) {
              r.distanceKm = getDistanceFromLatLonInKm(
                userLocation.lat,
                userLocation.lng,
                r.latitude,
                r.longitude
              );
            }
          });
        }

        setRestaurants(data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [userLocation]);

  // Función para calcular distancia entre dos coordenadas
  const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radio de la tierra en km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number) => deg * (Math.PI / 180);

  // Filtrado en frontend
  const filteredRestaurants = restaurants.filter(r => {
    if (!r.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filters.typeOfFood && !r.typeOfFood.toLowerCase().includes(filters.typeOfFood.toLowerCase())) return false;
    if (filters.vegetarian && !r.isVegetarian) return false;
    if (filters.vegan && !r.isVegan) return false;
    if (filters.excludeAllergens) {
      const allergens = filters.excludeAllergens.split(',').map(a => a.trim().toLowerCase());
      if (r.allergens && r.allergens.some(a => allergens.includes(a.toLowerCase()))) return false;
    }
    if (r.distanceKm && r.distanceKm > filters.maxDistance) return false;
    return true;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restaurantes Cercanos</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {loading ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonList>
            {filteredRestaurants.map(r => (
              <IonItem key={r.id}>
                <IonLabel>
                  <h2>{r.name}</h2>
                  <p>{r.typeOfFood} • ${r.priceRange} • ⭐ {r.rating}</p>
                  <p>{r.isVegetarian ? 'Vegetariano' : ''} {r.isVegan ? 'Vegano' : ''}</p>
                  {r.distanceKm && <p>{r.distanceKm.toFixed(1)} km de ti</p>}
                  {r.allergens && <p>Alérgenos: {r.allergens.join(', ')}</p>}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Restaurants;

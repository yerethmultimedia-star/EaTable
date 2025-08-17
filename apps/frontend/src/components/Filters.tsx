import React from 'react';
import { IonSearchbar, IonChip, IonLabel } from '@ionic/react';

interface FiltersProps<T> {
  search: string;
  setSearch: (value: string) => void;
  typeFilter?: string | null;
  setTypeFilter?: (value: string | null) => void;
  types?: string[];
  allergenFilter?: string | null;
  setAllergenFilter?: (value: string | null) => void;
  allergens?: string[];
  priceFilter?: number | null;
  setPriceFilter?: (value: number | null) => void;
  prices?: number[];
  ratingFilter?: number | null;
  setRatingFilter?: (value: number | null) => void;
  ratings?: number[];
}

const Filters = <T extends unknown>({
  search, setSearch,
  typeFilter, setTypeFilter, types,
  allergenFilter, setAllergenFilter, allergens,
  priceFilter, setPriceFilter, prices,
  ratingFilter, setRatingFilter, ratings
}: FiltersProps<T>) => {
  return (
    <div style={{ padding: '10px' }}>
      <IonSearchbar value={search} onIonInput={e => setSearch(e.detail.value!)} placeholder="Buscar..." />

      {types && setTypeFilter && (
        <div style={{ marginTop: '10px' }}>
          <strong>Tipo de comida:</strong>
          {types.map(t => (
            <IonChip key={t} color={typeFilter === t ? 'primary' : 'medium'} onClick={() => setTypeFilter(typeFilter === t ? null : t)}>
              <IonLabel>{t}</IonLabel>
            </IonChip>
          ))}
        </div>
      )}

      {allergens && setAllergenFilter && (
        <div style={{ marginTop: '10px' }}>
          <strong>Excluir alérgeno:</strong>
          {allergens.map(a => (
            <IonChip key={a} color={allergenFilter === a ? 'danger' : 'medium'} onClick={() => setAllergenFilter(allergenFilter === a ? null : a)}>
              <IonLabel>{a}</IonLabel>
            </IonChip>
          ))}
        </div>
      )}

      {prices && setPriceFilter && (
        <div style={{ marginTop: '10px' }}>
          <strong>Precio:</strong>
          {prices.map(p => (
            <IonChip key={p} color={priceFilter === p ? 'primary' : 'medium'} onClick={() => setPriceFilter(priceFilter === p ? null : p)}>
              <IonLabel>${p}</IonLabel>
            </IonChip>
          ))}
        </div>
      )}

      {ratings && setRatingFilter && (
        <div style={{ marginTop: '10px' }}>
          <strong>Calificación:</strong>
          {ratings.map(r => (
            <IonChip key={r} color={ratingFilter === r ? 'primary' : 'medium'} onClick={() => setRatingFilter(ratingFilter === r ? null : r)}>
              <IonLabel>⭐ {r}</IonLabel>
            </IonChip>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filters;

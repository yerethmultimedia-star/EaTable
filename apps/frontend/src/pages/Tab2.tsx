import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router-dom';

/* Lista dummy de restaurantes */
const restaurantsDummy = [
  { id: '1', name: 'La Buena Mesa' },
  { id: '2', name: 'El Sabor del Mar' },
  { id: '3', name: 'Casa Vegana' }
];

const Tab2: React.FC = () => {
  const history = useHistory();

  const goToDetails = (id: string) => {
    history.push(`/restaurant/${id}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Restaurantes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          {restaurantsDummy.map(r => (
            <IonItem button key={r.id} onClick={() => goToDetails(r.id)}>
              <IonLabel>{r.name}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

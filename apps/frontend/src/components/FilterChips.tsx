import React from 'react';
import { IonChip, IonLabel, IonItemDivider } from '@ionic/react';

interface FilterChipsProps {
  title: string;
  options: string[];
  selected: string[];
  color?: string;
  onToggle: (option: string) => void;
}

const FilterChips: React.FC<FilterChipsProps> = ({ title, options, selected, color = 'primary', onToggle }) => {
  if (options.length === 0) return null;

  return (
    <>
      <IonItemDivider>{title}</IonItemDivider>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '0.5rem' }}>
        {options.map(option => (
          <IonChip
            key={option}
            color={selected.includes(option) ? color : 'light'}
            onClick={() => onToggle(option)}
            style={{ margin: '0.25rem' }}
          >
            <IonLabel>{option}</IonLabel>
          </IonChip>
        ))}
      </div>
    </>
  );
};

export default FilterChips;

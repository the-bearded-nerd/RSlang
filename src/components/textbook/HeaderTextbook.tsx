import React from 'react';
import { TypeSection } from '../interface/interfaces';
import './menuTextBook.css';

function HeaderTextbook({ typeSection, setIdHard, setNumberPage }: TypeSection) {
  const [item, newItem] = React.useState('Первый');
  const numberHard = [0, 1, 2, 3, 4, 5, 6];
  return (
    <ul className="menu">
      {typeSection.map((e, i) => (
        <button
          type="button"
          className={item === e ? `typeSection active` : 'typeSection'}
          onClick={() => {
            newItem(e);
            setIdHard(numberHard[i]);
            setNumberPage();
          }}
          key={e}
        >
          {e}
        </button>
      ))}
    </ul>
  );
}

export default HeaderTextbook;

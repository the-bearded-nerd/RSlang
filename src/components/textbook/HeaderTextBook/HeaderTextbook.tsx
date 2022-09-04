import React from 'react';
import Users from '../../../utils/Users/User';
import { TypeSection } from '../../interface/interfaces';
import './menuTextBook.css';

function HeaderTextbook({
  typeSection,
  setDifficultyLevel,
  setNumberPage,
  difficultyLevel,
}: TypeSection) {
  const resultAuthorizad = Users.isAuthorized();

  const numberHard = [0, 1, 2, 3, 4, 5, 6];
  return (
    <ul className="menu">
      {typeSection.map((e, i) => (
        <button
          disabled={i === 6 ? !resultAuthorizad : false}
          title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
          type="button"
          className={difficultyLevel === i ? `typeSection active` : 'typeSection'}
          onClick={() => {
            setDifficultyLevel(numberHard[i]);
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

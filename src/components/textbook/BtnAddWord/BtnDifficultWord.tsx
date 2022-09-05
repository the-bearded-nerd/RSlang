import React from 'react';
import Users from '../../../utils/Users/User';

import UsersWords from '../../../utils/UsersWords/UsersWords';
import ChangeDifficulty from '../../../utils/UsersWords/ChangeDifficulty';

import { PropsBtnWord } from '../../interface/interfaces';
import '../BtnStudiedWord/btnWord.css';

function BtnDifficultWord({
  objectWord,
  setUserAggregatedWords,
  classNameDifficulty,
}: PropsBtnWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameDifficulty.includes('hard');

  const textBtn = 'Сложное';

  return (
    <button
      disabled={wordActive || !resultAuthorizad}
      title={!resultAuthorizad ? 'Функция доступна только зарегистрированным пользователям' : ''}
      className="btn-Word"
      type="button"
      onClick={() => {
        ChangeDifficulty.setDifficult(objectWord.id);
        setUserAggregatedWords((prev) => [...prev, objectWord]);

        if (objectWord.userWord) {
          const result = objectWord.userWord;
          result.difficulty = 'hard';
        } else {
          const result = objectWord;
          result.userWord = {
            difficulty: 'hard',
          };
        }
      }}
    >
      {textBtn}
    </button>
  );
}

export default BtnDifficultWord;

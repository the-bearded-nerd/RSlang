import React from 'react';
import Users from '../../../utils/Users/User';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';

import UsersWords from '../../../utils/UsersWords/UserWords';
import { IdWord } from '../../interface/interfaces';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord({ objectWord, setUserAggregatedWords, className }: IdWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = className.includes('word active');

  const textBtn = wordActive ? 'Удалить из сложных слов' : 'Добавить сложное слово';

  return (
    <>
      <button
        disabled={!resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          UserAggregatedWords.getDifficultWords();
          if (wordActive) {
            setUserAggregatedWords((prev) => prev.filter((el) => el.word !== objectWord.word));

            UsersWords.resetDifficulty(objectWord.id);
          } else {
            setUserAggregatedWords((prev) => [...prev, objectWord]);

            UsersWords.setDifficult(objectWord.id);
          }
        }}
      >
        {textBtn}
      </button>
      ;
    </>
  );
}

export default BtnAddWord;

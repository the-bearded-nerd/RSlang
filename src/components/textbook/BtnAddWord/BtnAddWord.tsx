import React from 'react';
import Users from '../../../utils/Users/User';

import UsersWords from '../../../utils/UsersWords/UsersWords';

import { PropsDifficulWord } from '../../interface/interfaces';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord({ objectWord, setUserAggregatedWords, classNameDifficul }: PropsDifficulWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameDifficul.includes('hard');

  const textBtn = 'Добавить сложное слово';

  return (
    <>
      <button
        disabled={wordActive || !resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          console.log('1');

          UsersWords.setDifficult(objectWord.id);
          setUserAggregatedWords((prev) => [...prev, objectWord]);

          if (objectWord.userWord) {
            const result = objectWord.userWord;
            result.difficulty = 'hard';
          } else {
            const result = objectWord;
            result.userWord = {
              difficulty: 'hard',
            };
            console.log(result);
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

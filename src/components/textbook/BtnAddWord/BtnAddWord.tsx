import React from 'react';
import Users from '../../../utils/Users/User';
import UsersWords from '../../../utils/UsersWords/UsersWords';

import { PropsDifficulWord } from '../../interface/interfaces';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord({
  objectWord,
  setUserAggregatedWords,
  classNameDifficul,
  setUserLearned,
}: PropsDifficulWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameDifficul.includes('word active');

  const textBtn = 'Добавить сложное слово';

  return (
    <>
      <button
        disabled={wordActive || !resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          UsersWords.setDifficult(objectWord.id);
          setUserAggregatedWords((prev) => [...prev, objectWord]);
          setUserLearned((prev) => prev.filter((el) => el.word !== objectWord.word));
        }}
      >
        {textBtn}
      </button>
      ;
    </>
  );
}

export default BtnAddWord;

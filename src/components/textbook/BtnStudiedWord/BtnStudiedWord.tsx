import React from 'react';
import Users from '../../../utils/Users/User';
import UsersWords from '../../../utils/UsersWords/UsersWords';
import { PropsLearnedWord } from '../../interface/interfaces';
import './btnWord.css';

function BtnLearnedWord({
  objectWord,
  setUserAggregatedWords,
  classNameLearned,
  setUserLearned,
}: PropsLearnedWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameLearned.includes('no-learned');

  return (
    <>
      <button
        disabled={!wordActive || !resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          UsersWords.setLearned(objectWord.id);
          setUserAggregatedWords((prev) => prev.filter((el) => el.word !== objectWord.word));
          setUserLearned((prev) => [...prev, objectWord]);
        }}
      >
        Слово изучено
      </button>
      ;
    </>
  );
}

export default BtnLearnedWord;

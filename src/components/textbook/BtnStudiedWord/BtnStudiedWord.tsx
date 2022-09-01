import React from 'react';
import Users from '../../../utils/Users/User';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import UsersWords from '../../../utils/UsersWords/UsersWords';
import { PropsDifficulWord } from '../../interface/interfaces';
import './btnWord.css';

function BtnLearnedWord({
  objectWord,
  setUserAggregatedWords,
  classNameDifficul,
}: PropsDifficulWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameDifficul.includes('learned');

  return (
    <>
      <button
        disabled={wordActive || !resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          UsersWords.setLearned(objectWord.id);
          setUserAggregatedWords((prev) => prev.filter((el) => el.word !== objectWord.word));
          if (objectWord.userWord) {
            const result = objectWord.userWord;
            result.difficulty = 'learned';
          } else {
            const result = objectWord;
            result.userWord = {
              difficulty: 'learned',
            };
            console.log(result);
          }
          UserAggregatedWords.getLearnedtWords();
        }}
      >
        Слово изучено
      </button>
      ;
    </>
  );
}

export default BtnLearnedWord;

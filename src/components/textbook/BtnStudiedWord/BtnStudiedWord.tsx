import React from 'react';
import Users from '../../../utils/Users/User';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import UsersWords from '../../../utils/UsersWords/UsersWords';
import { PropsBtnWord } from '../../interface/interfaces';
import './btnWord.css';

function BtnLearnedWord({
  objectWord,
  setUserAggregatedWords,
  classNameDifficulty,
  difficultyLevel,
  setWords,
}: PropsBtnWord) {
  const resultAuthorizad = Users.isAuthorized();
  const wordActive = classNameDifficulty.includes('learned');

  return (
    <>
      <button
        disabled={wordActive || !resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          UsersWords.setLearned(objectWord.id);
          setUserAggregatedWords((arrayWords) =>
            arrayWords.filter((el) => el.word !== objectWord.word)
          );
          if (difficultyLevel === 6) {
            setWords((arrayWords) => arrayWords.filter((el) => el.word !== objectWord.word));
          }

          if (objectWord.userWord) {
            const result = objectWord.userWord;
            result.difficulty = 'learned';
          } else {
            const result = objectWord;
            result.userWord = {
              difficulty: 'learned',
            };
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

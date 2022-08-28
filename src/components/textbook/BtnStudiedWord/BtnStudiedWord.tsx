import React from 'react';
import Users from '../../../utils/Users/User';
import UsersWords from '../../../utils/UsersWords/UserWords';
import { IdWord } from '../../interface/interfaces';
import './btnWord.css';

function BtnStudiedWord({ id }: IdWord) {
  const resultAuthorizad = Users.isAuthorized();
  return (
    <>
      <button
        disabled={!resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="Btn-Word"
        type="button"
        onClick={() => {
          UsersWords.setLearned(id);
        }}
      >
        Слово изучено
      </button>
      ;
    </>
  );
}

export default BtnStudiedWord;

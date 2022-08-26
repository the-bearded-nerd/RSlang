import React from 'react';
import Users from '../../../utils/Users/User';
import './btnWord.css';

function BtnStudiedWord() {
  const resultAuthorizad = Users.isAuthorized();
  console.log(resultAuthorizad);
  return (
    <>
      <button
        disabled={!resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="Btn-Word"
        type="button"
        onClick={(e) => console.log(e)}
      >
        Слово изучено
      </button>
      ;
    </>
  );
}

export default BtnStudiedWord;

import React from 'react';
import Users from '../../../utils/Users/User';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord() {
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
        Сложное слово
      </button>
      ;
    </>
  );
}

export default BtnAddWord;

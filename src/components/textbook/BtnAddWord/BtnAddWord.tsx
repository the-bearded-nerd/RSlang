import React from 'react';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord() {
  return (
    <>
      <button className="Btn-Word" type="button" onClick={(e) => console.log(e)}>
        Сложное слово
      </button>
      ;
    </>
  );
}

export default BtnAddWord;

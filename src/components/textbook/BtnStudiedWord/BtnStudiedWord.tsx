import React from 'react';
import './btnWord.css';

function BtnStudiedWord() {
  return (
    <>
      <button className="Btn-Word" type="button" onClick={(e) => console.log(e)}>
        Слово изучено
      </button>
      ;
    </>
  );
}

export default BtnStudiedWord;

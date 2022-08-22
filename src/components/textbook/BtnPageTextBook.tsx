import React from 'react';
import { PropsBtnPage } from '../interface/interfaces';

export function BtnNextPage({ setNumberPage }: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      Следующая страница
    </button>
  );
}

export function BtnPrevPage({ setNumberPage }: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      предыдущая страница
    </button>
  );
}

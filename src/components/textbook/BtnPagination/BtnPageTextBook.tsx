import React from 'react';

import { PropsBtnPage } from '../../interface/interfaces';

export function BtnNextPage({ setNumberPage, numberPage, loading }: PropsBtnPage) {
  return (
    <button
      className="btn-page"
      disabled={numberPage === 30 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      Следующая страница
    </button>
  );
}

export function BtnPrevPage({ setNumberPage, numberPage, loading }: PropsBtnPage) {
  return (
    <button
      className="btn-page"
      disabled={numberPage === 1 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      предыдущая страница
    </button>
  );
}

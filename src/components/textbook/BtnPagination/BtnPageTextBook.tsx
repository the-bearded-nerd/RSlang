import React from 'react';

import { PropsBtnPage } from '../../interface/interfaces';

export function BtnNextPage({ setNumberPage, numberPage, loading }: PropsBtnPage) {
  return (
    <button
      className="btn-page btn btn-nav"
      disabled={numberPage === 30 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      Дальше
    </button>
  );
}

export function BtnPrevPage({ setNumberPage, numberPage, loading }: PropsBtnPage) {
  return (
    <button
      className="btn-page btn btn-nav"
      disabled={numberPage === 1 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      Назад
    </button>
  );
}

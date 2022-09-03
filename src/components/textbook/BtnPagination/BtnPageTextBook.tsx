import React from 'react';

import { PropsBtnPage } from '../../interface/interfaces';

export function BtnNextPage({ setNumberPage, currentCount, loading }: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      disabled={currentCount === 30 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      Следующая страница
    </button>
  );
}

export function BtnPrevPage({ setNumberPage, currentCount, loading }: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      disabled={currentCount === 1 || loading}
      type="button"
      onClick={() => {
        setNumberPage();
      }}
    >
      предыдущая страница
    </button>
  );
}

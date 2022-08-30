import React from 'react';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import { PropsBtnPage } from '../../interface/interfaces';

export function BtnNextPage({
  setNumberPage,
  currentCount,
  currentWords,
  isLearnPage,
}: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      disabled={currentCount === 30}
      type="button"
      onClick={() => {
        UserAggregatedWords.allLearned(currentWords)
          .then((e) => e)
          .then((i) => isLearnPage(i));
        setNumberPage();
      }}
    >
      Следующая страница
    </button>
  );
}

export function BtnPrevPage({
  setNumberPage,
  currentCount,
  currentWords,
  isLearnPage,
}: PropsBtnPage) {
  return (
    <button
      className="Btn-Word"
      disabled={currentCount === 1}
      type="button"
      onClick={() => {
        UserAggregatedWords.allLearned(currentWords)
          .then((e) => e)
          .then((i) => isLearnPage(i));
        setNumberPage();
      }}
    >
      предыдущая страница
    </button>
  );
}

import React from 'react';
import Users from '../../../utils/Users/User';

import UsersWords from '../../../utils/UsersWords/UserWords';
import { IdWord } from '../../interface/interfaces';
import '../BtnStudiedWord/btnWord.css';

function BtnAddWord({ id }: IdWord) {
  const resultAuthorizad = Users.isAuthorized();

  const [activeAggregatedWords, isActiveAggregatedWords] = React.useState<boolean>();
  const textBtn = activeAggregatedWords ? 'Удалить из сложных слов' : 'Добавить сложное слово';

  return (
    <>
      <button
        disabled={!resultAuthorizad}
        title={!resultAuthorizad ? 'Пожалуйста авторизуйтесь' : ''}
        className="btn-Word"
        type="button"
        onClick={() => {
          if (activeAggregatedWords) {
            isActiveAggregatedWords(false);
            UsersWords.deleteWord(id);
          } else {
            isActiveAggregatedWords(true);
            UsersWords.setDifficult(id);
          }
        }}
      >
        {textBtn}
      </button>
      ;
    </>
  );
}

export default BtnAddWord;

import React from 'react';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import Words from '../../../utils/Words/Words';

import { CurrentWords, PropsWords } from '../../interface/interfaces';
import WordInfo from '../WordInfo/WordsInfo';

import './wordTextBook.css';

function WordsTextBook({
  hard,
  numberPage,
  userAggregatedWords,
  setUserAggregatedWords,
}: PropsWords) {
  const [currentWords, setWords] = React.useState<CurrentWords[]>([]);
  const [currentDisabled, setDisabled] = React.useState<boolean>(false);
  const [flag, setFlag] = React.useState<boolean>(false);

  React.useEffect(() => {
    UserAggregatedWords.getDifficultWords()
      .then((res) => res)
      .then((data) => setUserAggregatedWords(data));
    if (hard !== 6) {
      Words.getWords(hard, numberPage)
        .then((res) => res)
        .then((data) => {
          setWords(data);
        });
    }

    if (hard === 6) {
      UserAggregatedWords.getDifficultWords()
        .then((res) => res)
        .then((data) => setWords(data));
    }
  }, [hard, numberPage]);

  function checkW(word: string) {
    const result = userAggregatedWords.some((e) => e.word === word);
    console.log(result, '8');
    return result;
  }

  return (
    <>
      {currentWords.map((e) => (
        <WordInfo
          key={`${e.id}`}
          objectWord={e}
          currentDisabled={currentDisabled}
          setDisabled={setDisabled}
          setFlag={setFlag}
          flag={flag}
          userAggregatedWords={userAggregatedWords}
          className={checkW(e.word) ? 'word active' : 'word'}
        />
      ))}
    </>
  );
}

export default WordsTextBook;

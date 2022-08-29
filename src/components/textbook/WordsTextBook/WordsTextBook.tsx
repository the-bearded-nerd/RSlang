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
  const [flagPlayAudio, isflagPlayAudio] = React.useState<boolean>(false);

  React.useEffect(() => {
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
    const fillter = userAggregatedWords.filter((e) => e.word === word);
    if (userAggregatedWords && !fillter) {
      return userAggregatedWords;
    }
    const result = userAggregatedWords.find((e) => e.word === word);
    return result;
  }

  React.useEffect(() => {
    UserAggregatedWords.getDifficultWords()
      .then((res) => res)
      .then((data) => setUserAggregatedWords(data));
  }, []);

  return (
    <>
      {currentWords.map((e) => (
        <WordInfo
          key={e.id}
          objectWord={e}
          currentDisabled={currentDisabled}
          setDisabled={setDisabled}
          isflagPlayAudio={isflagPlayAudio}
          flagPlayAudio={flagPlayAudio}
          userAggregatedWords={userAggregatedWords}
          className={checkW(e.word) ? 'word active' : 'word'}
          setUserAggregatedWords={setUserAggregatedWords}
        />
      ))}
    </>
  );
}

export default WordsTextBook;

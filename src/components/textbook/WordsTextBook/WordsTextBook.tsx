import React from 'react';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import Words from '../../../utils/Words/Words';

import { PropsWordsTextBook } from '../../interface/interfaces';
import WordInfo from '../WordInfo/WordsInfo';

import './wordTextBook.css';

function WordsTextBook({
  hard,
  numberPage,
  userAggregatedWords,
  setUserAggregatedWords,
  setWords,
  currentWords,
  setUserLearned,
}: PropsWordsTextBook) {
  const [currentDisabled, setDisabled] = React.useState<boolean>(false);
  const [flagPlayAudio, isflagPlayAudio] = React.useState<boolean>(false);
  console.log(userAggregatedWords, 'user');

  React.useEffect(() => {
    if (hard !== 6) {
      Words.getTextbookWords(hard, numberPage)
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

  console.log(currentWords);

  return (
    <>
      {currentWords.map((word) => {
        return (
          <WordInfo
            key={word.id}
            objectWord={word}
            currentDisabled={currentDisabled}
            setDisabled={setDisabled}
            isflagPlayAudio={isflagPlayAudio}
            flagPlayAudio={flagPlayAudio}
            userAggregatedWords={userAggregatedWords}
            setUserAggregatedWords={setUserAggregatedWords}
            setUserLearned={setUserLearned}
          />
        );
      })}
    </>
  );
}

export default WordsTextBook;

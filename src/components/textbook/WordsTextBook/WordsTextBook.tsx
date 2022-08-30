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
  userLearned,
  setWords,
  currentWords,
  setUserLearned,
}: PropsWordsTextBook) {
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

  function checkWordDifficul(word: string) {
    const result = userAggregatedWords.find((e) => e.word === word);

    return result;
  }

  function checkWordLearned(word: string) {
    const result = userLearned.find((e) => e.word === word);
    return result;
  }
  return (
    <>
      {currentWords.map((e) => {
        const resDifficeul = checkWordDifficul(e.word) ? 'word active' : 'word';
        const resLearned = checkWordLearned(e.word) ? 'learned' : 'no-learned';
        return (
          <WordInfo
            // eslint-disable-next-line no-underscore-dangle
            key={e.id || e._id}
            objectWord={e}
            currentDisabled={currentDisabled}
            setDisabled={setDisabled}
            isflagPlayAudio={isflagPlayAudio}
            flagPlayAudio={flagPlayAudio}
            userAggregatedWords={userAggregatedWords}
            classNameDifficul={resDifficeul}
            setUserAggregatedWords={setUserAggregatedWords}
            classNameLearned={resLearned}
            setUserLearned={setUserLearned}
          />
        );
      })}
    </>
  );
}

export default WordsTextBook;

import React from 'react';
import UserAggregatedWords from '../../../utils/UsersAggregatedWords/UserAggregatedWords';
import Words from '../../../utils/Words/Words';

import { PropsWordsTextBook } from '../../interface/interfaces';
import WordInfo from '../WordInfo/WordsInfo';

import './wordTextBook.css';

function WordsTextBook({
  hard,
  userAggregatedWords,
  setUserAggregatedWords,
  setWords,
  currentWords,
  setUserLearned,
  isClassStudy,
  classStudy,
}: PropsWordsTextBook) {
  const [currentDisabled, setDisabled] = React.useState<boolean>(false);
  const [flagPlayAudio, isflagPlayAudio] = React.useState<boolean>(false);

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
            hard={hard}
            setWords={setWords}
            isClassStudy={isClassStudy}
            classStudy={classStudy}
          />
        );
      })}
    </>
  );
}

export default WordsTextBook;

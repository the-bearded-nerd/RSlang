import React from 'react';

import { PropsWordsTextBook } from '../../interface/interfaces';
import WordInfo from '../WordInfo/TextBookWords';

import './textBook.css';

function TextBook({
  difficultyLevel,
  userAggregatedWords,
  setUserAggregatedWords,
  setWords,
  listWords,
  isClassStudy,
  classStudy,
  setWord,
  setAudioElement,
  audioElement,
}: PropsWordsTextBook) {
  const [audioBtnDisabled, setAudioBtnDisabled] = React.useState<boolean>(false);
  const [flagPlayAudio, isflagPlayAudio] = React.useState<boolean>(false);

  return (
    <>
      {listWords.map((word) => {
        return (
          <WordInfo
            key={word.id}
            objectWord={word}
            audioBtnDisabled={audioBtnDisabled}
            setAudioBtnDisabled={setAudioBtnDisabled}
            isflagPlayAudio={isflagPlayAudio}
            flagPlayAudio={flagPlayAudio}
            userAggregatedWords={userAggregatedWords}
            setUserAggregatedWords={setUserAggregatedWords}
            difficultyLevel={difficultyLevel}
            setWords={setWords}
            isClassStudy={isClassStudy}
            classStudy={classStudy}
            setWord={setWord}
            setAudioElement={setAudioElement}
            audioElement={audioElement}
          />
        );
      })}
    </>
  );
}

export default TextBook;

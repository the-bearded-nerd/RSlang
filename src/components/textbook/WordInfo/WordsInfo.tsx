/* eslint-disable react/no-danger */
import React from 'react';
import DOMPurify from 'dompurify';
import './wordInfo.css';
import { PropsWordInfo } from '../../interface/interfaces';
import BtnAddWord from '../BtnAddWord/BtnAddWord';
import BtnStudiedWord from '../BtnStudiedWord/BtnStudiedWord';
import StudyProgress from '../StudyProgress/StudyProgress';
import Users from '../../../utils/Users/User';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function WordInfo({
  objectWord,
  currentDisabled,
  setDisabled,
  isflagPlayAudio,
  flagPlayAudio,
  setUserAggregatedWords,
  setUserLearned,
  hard,
  setWords,
  isClassStudy,
  classStudy,
  setWord,
  setAudioElement,
  audioElement,
}: PropsWordInfo) {
  let str = '';
  if (objectWord.userWord?.difficulty === 'learned') {
    str = 'learned';
  } else if (objectWord.userWord?.difficulty === 'hard') {
    str = 'hard';
  } else {
    str = 'word';
  }
  const resultAuthorizad = Users.isAuthorized();

  const correctionTextMeaning = DOMPurify.sanitize(objectWord.textMeaning);
  const correctionTranslateTextMeaning = DOMPurify.sanitize(objectWord.textMeaningTranslate);
  const correctionTextExample = DOMPurify.sanitize(objectWord.textExample);
  const correctionTranslateTextExample = DOMPurify.sanitize(objectWord.textExampleTranslate);

  const [isLocalDisabled, setLocalDisabled] = React.useState(true);

  const booleanState = currentDisabled !== true ? currentDisabled : isLocalDisabled;
  const audioWordMeaning = new Audio();
  const audioWordExample = new Audio();
  const audioWord = new Audio();

  const setPlay = (audio: HTMLAudioElement) => {
    audio.play();
  };

  React.useEffect(() => {
    if (!flagPlayAudio) {
      const valueAudio = audioElement;
      valueAudio?.pause();
      setDisabled(false);
      setLocalDisabled(true);
      isflagPlayAudio(false);
    } else {
      setDisabled(true);
    }
  }, [audioElement, flagPlayAudio]);

  return (
    <div className={str}>
      <img className="image-word" src={`${baseURL}${objectWord.image}`} alt="img" width={200} />
      <div className="box-word">
        <button
          type="button"
          disabled={!resultAuthorizad}
          onClick={() => {
            if (classStudy) {
              document.body.style.overflow = '';

              isClassStudy(false);
            } else {
              document.body.style.overflow = 'hidden';
              isClassStudy(true);
              setWord(objectWord);
            }

            console.log('1');
          }}
        >
          Прогресс
        </button>

        <div className="name-word">
          <span>{objectWord.word} </span>
          <span>{objectWord.transcription} </span>
        </div>
        <div>{objectWord.wordTranslate}</div>
        <div className="audio-word">
          <button
            type="button"
            disabled={booleanState}
            onClick={(e) => {
              if (e.target) {
                setLocalDisabled(false);
              }
              audioWordMeaning.src = `${baseURL}${objectWord.audioMeaning}`;
              audioWordExample.src = `${baseURL}${objectWord.audioExample}`;
              audioWord.src = `${baseURL}${objectWord.audio}`;
              if (flagPlayAudio === false) {
                isflagPlayAudio(true);
                setPlay(audioWord);
                setAudioElement(audioWord);
                audioWord.addEventListener('ended', () => {
                  setPlay(audioWordMeaning);
                  setAudioElement(audioWordMeaning);
                });
                audioWordMeaning.addEventListener('ended', () => {
                  setPlay(audioWordExample);
                  setAudioElement(audioWordExample);
                  audioWordExample.play();
                });
                audioWordExample.addEventListener('ended', () => {
                  setDisabled(false);
                  setLocalDisabled(true);
                  isflagPlayAudio(false);
                });
              } else {
                isflagPlayAudio(false);
                audioWord.pause();
                audioWordExample.pause();
                audioWordMeaning.pause();
                setDisabled(true);
              }
              setDisabled(true);
            }}
          >
            click
          </button>
        </div>
        <div dangerouslySetInnerHTML={{ __html: correctionTextMeaning }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTranslateTextMeaning }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTextExample }} />
        <div dangerouslySetInnerHTML={{ __html: correctionTranslateTextExample }} />
        <div className="wrapper-btn-word">
          <BtnAddWord
            objectWord={objectWord}
            setUserAggregatedWords={setUserAggregatedWords}
            classNameDifficul={str}
            setUserLearned={setUserLearned}
            hard={hard}
            setWords={setWords}
          />
          <BtnStudiedWord
            objectWord={objectWord}
            setUserAggregatedWords={setUserAggregatedWords}
            classNameDifficul={str}
            setUserLearned={setUserLearned}
            hard={hard}
            setWords={setWords}
          />
        </div>
      </div>
    </div>
  );
}

export default WordInfo;

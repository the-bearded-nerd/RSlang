/* eslint-disable react/no-danger */
import React from 'react';
import DOMPurify from 'dompurify';
import BtnStudiedWord from '../BtnStudiedWord/BtnStudiedWord';
import './wordInfo.css';
import { PropsAudioWords } from '../../interface/interfaces';
import BtnAddWord from '../BtnAddWord/BtnAddWord';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function WordInfo({ objectWord, currentDisabled, setDisabled, setFlag, flag }: PropsAudioWords) {
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

  const [audioElement, setAudioElement] = React.useState<HTMLAudioElement>();
  React.useEffect(() => {
    if (!flag) {
      const v = audioElement;
      v?.pause();
      setDisabled(false);
      setLocalDisabled(true);
      setFlag(false);
    } else {
      setDisabled(true);
    }
  }, [audioElement, flag]);
  return (
    <div className="word">
      <img className="image-word" src={`${baseURL}${objectWord.image}`} alt="img" width={200} />
      <div className="box-word">
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
              if (flag === false) {
                setFlag(true);

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
                  setFlag(false);
                });
              } else {
                setFlag(false);
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
          <BtnAddWord />
          <BtnStudiedWord />
        </div>
      </div>
    </div>
  );
}

export default WordInfo;

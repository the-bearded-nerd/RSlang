/* eslint-disable react/no-danger */
import React from 'react';
import DOMPurify from 'dompurify';
import BtnStudiedWord from '../BtnStudiedWord/BtnStudiedWord';
import './wordInfo.css';
import { PropsAudioWords } from '../../interface/interfaces';
import BtnAddWord from '../BtnAddWord/BtnAddWord';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function WordInfo({ objectWord, currentDisabled, setDisabled }: PropsAudioWords) {
  const correctionTextMeaning = DOMPurify.sanitize(objectWord.textMeaning);
  const correctionTranslateTextMeaning = DOMPurify.sanitize(objectWord.textMeaningTranslate);
  const correctionTextExample = DOMPurify.sanitize(objectWord.textExample);
  const correctionTranslateTextExample = DOMPurify.sanitize(objectWord.textExampleTranslate);

  const [isLocalDisabled, setLocalDisabled] = React.useState(true);

  const booleanState = currentDisabled !== true ? currentDisabled : isLocalDisabled;

  const [flag, setFlag] = React.useState<boolean>(false);

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
              const audioWordMeaning = new Audio();
              audioWordMeaning.src = `${baseURL}${objectWord.audioMeaning}`;
              const audioWordExample = new Audio();
              audioWordExample.src = `${baseURL}${objectWord.audioExample}`;
              const audioWord = new Audio();
              audioWord.src = `${baseURL}${objectWord.audio}`;

              audioWord.addEventListener('ended', () => {
                audioWordMeaning.play();
              });
              audioWordMeaning.addEventListener('ended', () => {
                audioWordExample.play();
              });
              audioWordExample.addEventListener('ended', () => {
                setDisabled(false);
                setLocalDisabled(true);
              });
              if (e.target) {
                setLocalDisabled(false);
              }
              if (flag) {
                setFlag(false);
              } else {
                setFlag(true);
                audioWord.play();
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

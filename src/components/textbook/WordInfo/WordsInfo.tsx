/* eslint-disable react/no-danger */
import React from 'react';
import DOMPurify from 'dompurify';
import BtnStudiedWord from '../BtnStudiedWord/BtnStudiedWord';
import './wordInfo.css';
import AudioWords from '../AudioWord/AudioWords';
import { PropsAudioWords } from '../../interface/interfaces';
import BtnAddWord from '../BtnAddWord/BtnAddWord';

const baseURL = 'https://rslang-fe2022q1.herokuapp.com/';

function WordInfo({ objectWord, currentDisabled, setDisabled }: PropsAudioWords) {
  const correctionTextMeaning = DOMPurify.sanitize(objectWord.textMeaning);
  const correctionTranslateTextMeaning = DOMPurify.sanitize(objectWord.textMeaningTranslate);
  const correctionTextExample = DOMPurify.sanitize(objectWord.textExample);
  const correctionTranslateTextExample = DOMPurify.sanitize(objectWord.textExampleTranslate);

  return (
    <div className="word">
      <img className="image-word" src={`${baseURL}${objectWord.image}`} alt="img" width={200} />
      <div className="box-word">
        <div className="name-word">
          <span>{objectWord.word} </span>
          <span>{objectWord.transcription} </span>
        </div>
        <div>{objectWord.wordTranslate}</div>
        <AudioWords
          objectWord={objectWord}
          currentDisabled={currentDisabled}
          setDisabled={setDisabled}
        />
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
